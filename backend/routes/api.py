from flask import Blueprint, request, jsonify
from database import get_db
from datetime import date, datetime

api = Blueprint('api', __name__)

# ══════════════════════════════════════════════
#  TAUX DE CHANGE (USD / ل.س)
# ══════════════════════════════════════════════

@api.route('/taux-change', methods=['GET'])
def get_taux_change():
    jours = request.args.get('jours', 30, type=int)
    db = get_db()
    rows = db.execute("SELECT date, ls_par_usd, note FROM taux_change ORDER BY date DESC LIMIT ?", (jours,)).fetchall()
    db.close()
    return jsonify([dict(r) for r in rows])

@api.route('/taux-change/today', methods=['GET'])
def get_taux_today():
    db = get_db()
    today = date.today().isoformat()
    row = db.execute("SELECT date, ls_par_usd, note FROM taux_change WHERE date <= ? ORDER BY date DESC LIMIT 1", (today,)).fetchone()
    db.close()
    return jsonify(dict(row) if row else {'ls_par_usd': 0, 'date': today})

@api.route('/taux-change', methods=['POST'])
def set_taux_change():
    data = request.json
    db = get_db()
    today = date.today().isoformat()
    db.execute(
        "INSERT OR REPLACE INTO taux_change (date, ls_par_usd, note) VALUES (?,?,?)",
        (data.get('date', today), data['ls_par_usd'], data.get('note', ''))
    )
    db.commit(); db.close()
    return jsonify({'ok': True})

# ══════════════════════════════════════════════
#  CATEGORIES DE PRODUITS
# ══════════════════════════════════════════════

@api.route('/categories', methods=['GET'])
def get_categories():
    db = get_db()
    rows = db.execute("SELECT * FROM categories ORDER BY ordre, nom_fr").fetchall()
    db.close()
    return jsonify([dict(r) for r in rows])

@api.route('/categories', methods=['POST'])
def create_categorie():
    data = request.json
    nom_fr = (data.get('nom_fr') or '').strip()
    nom_ar = (data.get('nom_ar') or '').strip()
    nom_en = (data.get('nom_en') or '').strip()
    if not nom_fr and not nom_ar:
        return jsonify({'error': 'Le nom (français ou arabe) est requis.'}), 400

    # Cle technique generee depuis le nom (slug), utilisee comme identifiant
    # stable pour produits.categorie - jamais montree a l'utilisateur.
    import re, unicodedata
    base = nom_fr or nom_ar
    slug = unicodedata.normalize('NFKD', base).encode('ascii', 'ignore').decode('ascii')
    slug = re.sub(r'[^a-zA-Z0-9]+', '_', slug).strip('_').lower() or 'categorie'

    db = get_db()
    cle = slug
    n = 2
    while db.execute("SELECT 1 FROM categories WHERE cle=?", (cle,)).fetchone():
        cle = f"{slug}_{n}"; n += 1

    ordre_max = db.execute("SELECT COALESCE(MAX(ordre),0) FROM categories").fetchone()[0]
    db.execute(
        "INSERT INTO categories (cle, nom_fr, nom_ar, nom_en, icon, ordre) VALUES (?,?,?,?,?,?)",
        (cle, nom_fr or nom_ar, nom_ar or nom_fr, nom_en or nom_fr or nom_ar, data.get('icon') or '📦', ordre_max + 1)
    )
    db.commit(); db.close()
    return jsonify({'ok': True, 'cle': cle})

@api.route('/categories/<cle>', methods=['PUT'])
def update_categorie(cle):
    data = request.json
    db = get_db()
    existe = db.execute("SELECT 1 FROM categories WHERE cle=?", (cle,)).fetchone()
    if not existe:
        db.close()
        return jsonify({'error': 'Catégorie introuvable'}), 404
    db.execute(
        "UPDATE categories SET nom_fr=?, nom_ar=?, nom_en=?, icon=? WHERE cle=?",
        (data.get('nom_fr',''), data.get('nom_ar',''), data.get('nom_en',''), data.get('icon') or '📦', cle)
    )
    db.commit(); db.close()
    return jsonify({'ok': True})

@api.route('/categories/<cle>', methods=['DELETE'])
def delete_categorie(cle):
    db = get_db()
    nb_produits = db.execute("SELECT COUNT(*) FROM produits WHERE categorie=? AND actif=1", (cle,)).fetchone()[0]
    if nb_produits > 0:
        db.close()
        return jsonify({
            'error': f"Impossible de supprimer : {nb_produits} produit(s) utilisent encore cette catégorie. "
                     f"Changez d'abord leur catégorie."
        }), 400
    db.execute("DELETE FROM categories WHERE cle=?", (cle,))
    db.commit(); db.close()
    return jsonify({'ok': True})

# ══════════════════════════════════════════════
#  PRODUITS
# ══════════════════════════════════════════════

@api.route('/produits', methods=['GET'])
def get_produits():
    db = get_db()
    rows = db.execute("SELECT * FROM produits WHERE actif=1 ORDER BY categorie, nom_fr").fetchall()
    db.close()
    return jsonify([dict(r) for r in rows])

@api.route('/produits', methods=['POST'])
def add_produit():
    data = request.json
    db = get_db()
    db.execute(
        """INSERT INTO produits (nom_fr, nom_ar, nom_en, categorie, dimension, unite, prix_achat_kg, prix_vente_kg)
           VALUES (?,?,?,?,?,?,?,?)""",
        (data['nom_fr'], data['nom_ar'], data.get('nom_en',''), data['categorie'], data.get('dimension',''),
         data.get('unite', 'kg'), float(data.get('prix_achat_kg', 0)), float(data.get('prix_vente_kg', 0)))
    )
    new_id = db.execute("SELECT last_insert_rowid()").fetchone()[0]
    db.commit(); db.close()
    return jsonify({'ok': True, 'id': new_id})

@api.route('/produits/<int:prod_id>', methods=['PUT'])
def update_produit(prod_id):
    data = request.json
    db = get_db()
    prod = db.execute("SELECT * FROM produits WHERE id=?", (prod_id,)).fetchone()
    if not prod:
        db.close()
        return jsonify({'error': 'not found'}), 404
    db.execute(
        """UPDATE produits SET nom_fr=?, nom_ar=?, nom_en=?, categorie=?, dimension=?, unite=?,
           prix_achat_kg=?, prix_vente_kg=? WHERE id=?""",
        (data.get('nom_fr', prod['nom_fr']), data.get('nom_ar', prod['nom_ar']),
         data.get('nom_en', prod['nom_en']), data.get('categorie', prod['categorie']),
         data.get('dimension', prod['dimension']), data.get('unite', prod['unite'] or 'kg'),
         float(data.get('prix_achat_kg', prod['prix_achat_kg'] or 0)),
         float(data.get('prix_vente_kg', prod['prix_vente_kg'] or 0)),
         prod_id)
    )
    db.commit(); db.close()
    return jsonify({'ok': True})

@api.route('/produits/<int:prod_id>', methods=['DELETE'])
def delete_produit(prod_id):
    """Suppression logique (actif=0) pour ne jamais casser l'historique des factures existantes
    qui referencent ce produit_id."""
    db = get_db()
    prod = db.execute("SELECT * FROM produits WHERE id=?", (prod_id,)).fetchone()
    if not prod:
        db.close()
        return jsonify({'error': 'not found'}), 404
    db.execute("UPDATE produits SET actif=0 WHERE id=?", (prod_id,))
    db.commit(); db.close()
    return jsonify({'ok': True})

# ══════════════════════════════════════════════
#  OPÉRATIONS
# ══════════════════════════════════════════════

@api.route('/operations', methods=['GET'])
def get_operations():
    db = get_db()
    rows = db.execute("SELECT * FROM operations WHERE actif=1 ORDER BY nom_fr").fetchall()
    db.close()
    return jsonify([dict(r) for r in rows])

@api.route('/operations', methods=['POST'])
def add_operation():
    data = request.json
    db = get_db()
    db.execute(
        "INSERT INTO operations (nom_fr, nom_ar, nom_en, prix_unitaire, unite) VALUES (?,?,?,?,?)",
        (data['nom_fr'], data['nom_ar'], data.get('nom_en',''), data['prix_unitaire'], data.get('unite','unité'))
    )
    db.commit(); db.close()
    return jsonify({'ok': True})

@api.route('/operations/<int:op_id>', methods=['PUT'])
def update_operation(op_id):
    data = request.json
    db = get_db()
    db.execute(
        "UPDATE operations SET nom_fr=?, nom_ar=?, prix_unitaire=? WHERE id=?",
        (data['nom_fr'], data['nom_ar'], data['prix_unitaire'], op_id)
    )
    db.commit(); db.close()
    return jsonify({'ok': True})

@api.route('/operations/<int:op_id>', methods=['DELETE'])
def delete_operation(op_id):
    db = get_db()
    db.execute("UPDATE operations SET actif=0 WHERE id=?", (op_id,))
    db.commit(); db.close()
    return jsonify({'ok': True})

# ══════════════════════════════════════════════
#  TYPES DE LIGNES LIBRES (main-d'oeuvre, remises, frais...)
#  Configurables par l'utilisateur, reutilises dans les factures
#  de vente ET d'achat, ainsi que dans Fer Magasin.
# ══════════════════════════════════════════════

@api.route('/types-lignes-libres', methods=['GET'])
def get_types_lignes_libres():
    db = get_db()
    rows = db.execute("SELECT * FROM types_lignes_libres WHERE actif=1 ORDER BY signe_par_defaut DESC, nom_fr").fetchall()
    db.close()
    return jsonify([dict(r) for r in rows])

@api.route('/types-lignes-libres', methods=['POST'])
def add_type_ligne_libre():
    data = request.json
    db = get_db()
    db.execute(
        """INSERT INTO types_lignes_libres (nom_fr, nom_ar, nom_en, signe_par_defaut, montant_par_defaut)
           VALUES (?,?,?,?,?)""",
        (data['nom_fr'], data['nom_ar'], data.get('nom_en',''),
         data.get('signe_par_defaut','plus'), float(data.get('montant_par_defaut', 0)))
    )
    new_id = db.execute("SELECT last_insert_rowid()").fetchone()[0]
    db.commit(); db.close()
    return jsonify({'ok': True, 'id': new_id})

@api.route('/types-lignes-libres/<int:type_id>', methods=['PUT'])
def update_type_ligne_libre(type_id):
    data = request.json
    db = get_db()
    t = db.execute("SELECT * FROM types_lignes_libres WHERE id=?", (type_id,)).fetchone()
    if not t:
        db.close()
        return jsonify({'error': 'not found'}), 404
    db.execute(
        """UPDATE types_lignes_libres SET nom_fr=?, nom_ar=?, nom_en=?, signe_par_defaut=?, montant_par_defaut=?
           WHERE id=?""",
        (data.get('nom_fr', t['nom_fr']), data.get('nom_ar', t['nom_ar']), data.get('nom_en', t['nom_en']),
         data.get('signe_par_defaut', t['signe_par_defaut']),
         float(data.get('montant_par_defaut', t['montant_par_defaut'] or 0)),
         type_id)
    )
    db.commit(); db.close()
    return jsonify({'ok': True})

@api.route('/types-lignes-libres/<int:type_id>', methods=['DELETE'])
def delete_type_ligne_libre(type_id):
    db = get_db()
    db.execute("UPDATE types_lignes_libres SET actif=0 WHERE id=?", (type_id,))
    db.commit(); db.close()
    return jsonify({'ok': True})

# ══════════════════════════════════════════════
#  CLIENTS
# ══════════════════════════════════════════════

@api.route('/clients', methods=['GET'])
def get_clients():
    db = get_db()
    rows = db.execute("SELECT * FROM clients ORDER BY nom").fetchall()
    db.close()
    return jsonify([dict(r) for r in rows])

@api.route('/clients', methods=['POST'])
def add_client():
    data = request.json
    db = get_db()
    db.execute(
        "INSERT INTO clients (nom, telephone, email, adresse, note) VALUES (?,?,?,?,?)",
        (data['nom'], data.get('telephone',''), data.get('email',''), data.get('adresse',''), data.get('note',''))
    )
    db.commit(); db.close()
    return jsonify({'ok': True})

@api.route('/clients/<int:client_id>', methods=['GET'])
def get_client(client_id):
    db = get_db()
    client = db.execute("SELECT * FROM clients WHERE id=?", (client_id,)).fetchone()
    factures = db.execute(
        "SELECT id, numero, date_facture, total, devise, statut FROM factures WHERE client_id=? ORDER BY date_facture DESC",
        (client_id,)
    ).fetchall()
    db.close()
    return jsonify({'client': dict(client), 'factures': [dict(f) for f in factures]})

@api.route('/clients/<int:client_id>', methods=['PUT'])
def update_client(client_id):
    data = request.json
    db = get_db()
    db.execute(
        "UPDATE clients SET nom=?, telephone=?, email=?, adresse=?, note=? WHERE id=?",
        (data['nom'], data.get('telephone',''), data.get('email',''), data.get('adresse',''), data.get('note',''), client_id)
    )
    db.commit(); db.close()
    return jsonify({'ok': True})

# ══════════════════════════════════════════════
#  FOURNISSEURS
# ══════════════════════════════════════════════

@api.route('/fournisseurs', methods=['GET'])
def get_fournisseurs():
    db = get_db()
    rows = db.execute("SELECT * FROM fournisseurs ORDER BY nom").fetchall()
    db.close()
    return jsonify([dict(r) for r in rows])

@api.route('/fournisseurs', methods=['POST'])
def add_fournisseur():
    data = request.json
    db = get_db()
    db.execute(
        "INSERT INTO fournisseurs (nom, telephone, email, adresse, note) VALUES (?,?,?,?,?)",
        (data['nom'], data.get('telephone',''), data.get('email',''), data.get('adresse',''), data.get('note',''))
    )
    db.commit(); db.close()
    return jsonify({'ok': True})

@api.route('/fournisseurs/<int:f_id>', methods=['GET'])
def get_fournisseur(f_id):
    db = get_db()
    fourn = db.execute("SELECT * FROM fournisseurs WHERE id=?", (f_id,)).fetchone()
    achats = db.execute(
        "SELECT id, numero, date_facture, total, devise, statut FROM factures_achat WHERE fournisseur_id=? ORDER BY date_facture DESC",
        (f_id,)
    ).fetchall()
    db.close()
    return jsonify({'fournisseur': dict(fourn), 'achats': [dict(a) for a in achats]})

@api.route('/fournisseurs/<int:f_id>', methods=['PUT'])
def update_fournisseur(f_id):
    data = request.json
    db = get_db()
    db.execute(
        "UPDATE fournisseurs SET nom=?, telephone=?, email=?, adresse=?, note=? WHERE id=?",
        (data['nom'], data.get('telephone',''), data.get('email',''), data.get('adresse',''), data.get('note',''), f_id)
    )
    db.commit(); db.close()
    return jsonify({'ok': True})

# ══════════════════════════════════════════════
#  FACTURES DE VENTE
# ══════════════════════════════════════════════

def _next_numero(db, table, prefix):
    year = date.today().year
    row = db.execute(
        f"SELECT numero FROM {table} WHERE numero LIKE ? ORDER BY id DESC LIMIT 1",
        (f"{prefix}-{year}-%",)
    ).fetchone()
    n = int(row[0].split('-')[-1]) + 1 if row else 1
    return f"{prefix}-{year}-{n:04d}"

def _log_hist(db, table, fk_col, fac_id, action, champ=None, ancienne=None, nouvelle=None):
    db.execute(
        f"INSERT INTO {table} (facture_id, action, champ, ancienne_valeur, nouvelle_valeur) VALUES (?,?,?,?,?)"
        if fk_col == 'facture_id' else
        f"INSERT INTO {table} (facture_achat_id, action, champ, ancienne_valeur, nouvelle_valeur) VALUES (?,?,?,?,?)",
        (fac_id, action, champ, str(ancienne) if ancienne is not None else None, str(nouvelle) if nouvelle is not None else None)
    )

@api.route('/factures', methods=['GET'])
def get_factures():
    statut = request.args.get('statut', '')
    limit  = request.args.get('limit', 50, type=int)
    db = get_db()
    q = """SELECT f.*, c.nom as client_nom,
           COALESCE((SELECT SUM(montant_usd) FROM paiements WHERE type='vente' AND facture_id=f.id), 0) as total_paye_usd
           FROM factures f
           LEFT JOIN clients c ON f.client_id=c.id"""
    if statut:
        q += " WHERE f.statut=?"
        rows = db.execute(q + " ORDER BY f.date_facture DESC LIMIT ?", (statut, limit)).fetchall()
    else:
        rows = db.execute(q + " ORDER BY f.date_facture DESC LIMIT ?", (limit,)).fetchall()
    db.close()
    result = []
    for r in rows:
        d = dict(r)
        montant_du = d['montant_du_usd'] or 0
        total_paye = round(d.pop('total_paye_usd') or 0, 2)
        solde = round(montant_du - total_paye, 2)
        if solde <= 0.005:
            d['statut_paiement'] = 'paye'
        elif total_paye > 0:
            d['statut_paiement'] = 'partiellement_paye'
        else:
            d['statut_paiement'] = 'en_attente'
        d['total_paye_usd'] = total_paye
        d['solde_usd'] = solde
        result.append(d)
    return jsonify(result)

@api.route('/factures', methods=['POST'])
def create_facture():
    data = request.json
    db = get_db()
    today = date.today().isoformat()
    heure = datetime.now().strftime('%H:%M')
    taux_row = db.execute("SELECT ls_par_usd FROM taux_change WHERE date <= ? ORDER BY date DESC LIMIT 1", (today,)).fetchone()
    taux = taux_row[0] if taux_row else 1

    devise_defaut_row = db.execute("SELECT valeur FROM settings WHERE cle='devise_defaut'").fetchone()
    devise_defaut = devise_defaut_row['valeur'] if devise_defaut_row else 'USD'
    devise = data.get('devise', devise_defaut)

    numero = _next_numero(db, 'factures', 'FAC')
    db.execute(
        """INSERT INTO factures (numero, client_id, date_facture, prix_fer_jour, devise, taux_change, statut, heure_vente)
           VALUES (?,?,?,0,?,?,'brouillon',?)""",
        (numero, data.get('client_id'), today, devise, taux, heure)
    )
    fac_id = db.execute("SELECT last_insert_rowid()").fetchone()[0]
    _log_hist(db, 'facture_historique', 'facture_id', fac_id, 'creation', nouvelle=f'Facture {numero} créée')
    db.commit(); db.close()
    return jsonify({'ok': True, 'facture_id': fac_id, 'numero': numero})

@api.route('/factures/<int:fac_id>', methods=['GET'])
def get_facture(fac_id):
    db = get_db()
    fac = db.execute(
        """SELECT f.*, c.nom as client_nom, c.telephone as client_tel, c.adresse as client_adresse, c.email as client_email
           FROM factures f LEFT JOIN clients c ON f.client_id=c.id WHERE f.id=?""", (fac_id,)
    ).fetchone()
    lignes = db.execute(
        """SELECT fl.*, p.nom_fr, p.nom_ar, p.categorie, p.dimension
           FROM facture_lignes fl LEFT JOIN produits p ON fl.produit_id=p.id WHERE fl.facture_id=?""", (fac_id,)
    ).fetchall()
    ops = db.execute(
        """SELECT fo.*, o.nom_fr, o.nom_ar FROM facture_operations fo
           LEFT JOIN operations o ON fo.operation_id=o.id WHERE fo.facture_id=?""", (fac_id,)
    ).fetchall()
    lignes_libres = db.execute(
        "SELECT * FROM facture_lignes_libres WHERE facture_id=? ORDER BY id", (fac_id,)
    ).fetchall()
    hist = db.execute(
        "SELECT * FROM facture_historique WHERE facture_id=? ORDER BY date_action DESC", (fac_id,)
    ).fetchall()
    db.close()
    return jsonify({
        'facture': dict(fac),
        'lignes': [dict(l) for l in lignes],
        'operations': [dict(o) for o in ops],
        'lignes_libres': [dict(l) for l in lignes_libres],
        'historique': [dict(h) for h in hist],
    })

@api.route('/factures/<int:fac_id>', methods=['PUT'])
def update_facture_meta(fac_id):
    """Modifier date, note, devise même sur facture validée -> log historique."""
    data = request.json
    db = get_db()
    fac = db.execute("SELECT * FROM factures WHERE id=?", (fac_id,)).fetchone()
    if not fac:
        db.close()
        return jsonify({'error': 'not found'}), 404

    champs_modifiables = ['date_facture', 'note', 'devise']
    for champ in champs_modifiables:
        if champ in data and data[champ] != fac[champ]:
            _log_hist(db, 'facture_historique', 'facture_id', fac_id, 'modification', champ, fac[champ], data[champ])
            db.execute(f"UPDATE factures SET {champ}=? WHERE id=?", (data[champ], fac_id))

    db.execute("UPDATE factures SET updated_at=datetime('now') WHERE id=?", (fac_id,))
    db.commit(); db.close()
    return jsonify({'ok': True})

@api.route('/factures/<int:fac_id>/ligne', methods=['POST'])
def add_ligne(fac_id):
    data = request.json
    db = get_db()
    fac = db.execute("SELECT devise, taux_change, statut FROM factures WHERE id=?", (fac_id,)).fetchone()
    prod = db.execute("SELECT nom_fr, nom_ar, prix_vente_kg FROM produits WHERE id=?", (data['produit_id'],)).fetchone()

    # Chaque produit a son propre prix de vente (LS), fixe dans sa fiche produit.
    prix_ref = prod['prix_vente_kg'] or 0

    prix_kg = prix_ref
    if fac['devise'] == 'USD':
        prix_kg = round(prix_ref / fac['taux_change'], 4)
    poids = float(data.get('poids_kg', 0))
    sous = round(poids * prix_kg, 2 if fac['devise']=='USD' else 0)

    db.execute(
        """INSERT INTO facture_lignes
           (facture_id, produit_id, description_fr, description_ar, poids_kg, prix_kg, sous_total)
           VALUES (?,?,?,?,?,?,?)""",
        (fac_id, data['produit_id'], prod['nom_fr'], prod['nom_ar'], poids, prix_kg, sous)
    )
    if fac['statut'] == 'validee':
        _log_hist(db, 'facture_historique', 'facture_id', fac_id, 'ajout_ligne', nouvelle=f"{prod['nom_fr']} {poids}kg")
    _recalc_facture(db, fac_id)
    db.commit(); db.close()
    return jsonify({'ok': True})

@api.route('/factures/<int:fac_id>/operation', methods=['POST'])
def add_operation_facture(fac_id):
    data = request.json
    db = get_db()
    fac = db.execute("SELECT statut, devise, taux_change FROM factures WHERE id=?", (fac_id,)).fetchone()
    op  = db.execute("SELECT prix_unitaire, nom_fr FROM operations WHERE id=?", (data['operation_id'],)).fetchone()
    qte = float(data.get('quantite', 1))

    # op['prix_unitaire'] est stocke en USD. On convertit vers la devise de la facture.
    prix_usd = op['prix_unitaire']
    if fac['devise'] == 'USD':
        prix_facture = round(prix_usd, 4)
        sous = round(prix_facture * qte, 2)
    else:
        prix_facture = round(prix_usd * fac['taux_change'], 0)
        sous = round(prix_facture * qte, 0)

    db.execute(
        """INSERT INTO facture_operations (facture_id, operation_id, quantite, prix_unitaire, sous_total)
           VALUES (?,?,?,?,?)""",
        (fac_id, data['operation_id'], qte, prix_facture, sous)
    )
    if fac['statut'] == 'validee':
        _log_hist(db, 'facture_historique', 'facture_id', fac_id, 'ajout_operation', nouvelle=f"{op['nom_fr']} x{qte}")
    _recalc_facture(db, fac_id)
    db.commit(); db.close()
    return jsonify({'ok': True})

@api.route('/factures/<int:fac_id>/valider', methods=['POST'])
def valider_facture(fac_id):
    db = get_db()
    db.execute("UPDATE factures SET statut='validee', updated_at=datetime('now') WHERE id=?", (fac_id,))
    _log_hist(db, 'facture_historique', 'facture_id', fac_id, 'validation', nouvelle='Facture validée')
    db.commit(); db.close()
    return jsonify({'ok': True})

@api.route('/factures/<int:fac_id>/annuler', methods=['POST'])
def annuler_facture(fac_id):
    data = request.json or {}
    db = get_db()
    fac = db.execute("SELECT statut FROM factures WHERE id=?", (fac_id,)).fetchone()
    db.execute("UPDATE factures SET statut='annulee', updated_at=datetime('now') WHERE id=?", (fac_id,))
    _log_hist(db, 'facture_historique', 'facture_id', fac_id, 'annulation', 'statut', fac['statut'], 'annulee')
    if data.get('raison'):
        _log_hist(db, 'facture_historique', 'facture_id', fac_id, 'note_annulation', nouvelle=data['raison'])
    db.commit(); db.close()
    return jsonify({'ok': True})

@api.route('/factures/<int:fac_id>/reactiver', methods=['POST'])
def reactiver_facture(fac_id):
    """Repasse une facture annulée en brouillon."""
    db = get_db()
    db.execute("UPDATE factures SET statut='brouillon', updated_at=datetime('now') WHERE id=?", (fac_id,))
    _log_hist(db, 'facture_historique', 'facture_id', fac_id, 'reactivation', nouvelle='Repassée en brouillon')
    db.commit(); db.close()
    return jsonify({'ok': True})

@api.route('/factures/<int:fac_id>', methods=['DELETE'])
def delete_facture(fac_id):
    """Suppression réelle - uniquement autorisée sur brouillon pour éviter la perte de traçabilité."""
    db = get_db()
    fac = db.execute("SELECT statut FROM factures WHERE id=?", (fac_id,)).fetchone()
    if not fac:
        db.close()
        return jsonify({'error': 'not found'}), 404
    if fac['statut'] == 'validee':
        db.close()
        return jsonify({'error': 'Impossible de supprimer une facture validée. Annulez-la plutôt.'}), 400
    db.execute("DELETE FROM factures WHERE id=?", (fac_id,))
    db.commit(); db.close()
    return jsonify({'ok': True})

@api.route('/factures/<int:fac_id>/ligne/<int:ligne_id>', methods=['DELETE'])
def delete_ligne(fac_id, ligne_id):
    db = get_db()
    fac = db.execute("SELECT statut FROM factures WHERE id=?", (fac_id,)).fetchone()
    ligne = db.execute("SELECT * FROM facture_lignes WHERE id=?", (ligne_id,)).fetchone()
    db.execute("DELETE FROM facture_lignes WHERE id=? AND facture_id=?", (ligne_id, fac_id))
    if fac and fac['statut'] == 'validee' and ligne:
        _log_hist(db, 'facture_historique', 'facture_id', fac_id, 'suppression_ligne', nouvelle=f"{ligne['description_fr']} {ligne['poids_kg']}kg")
    _recalc_facture(db, fac_id)
    db.commit(); db.close()
    return jsonify({'ok': True})

@api.route('/factures/<int:fac_id>/operation/<int:op_id>', methods=['PUT'])
def update_op_facture(fac_id, op_id):
    """Modifier le prix ou la quantite d'une operation SUR CETTE FACTURE, sans toucher au catalogue."""
    data = request.json
    db = get_db()
    fac = db.execute("SELECT statut FROM factures WHERE id=?", (fac_id,)).fetchone()
    ligne = db.execute("SELECT * FROM facture_operations WHERE id=? AND facture_id=?", (op_id, fac_id)).fetchone()
    if not ligne:
        db.close()
        return jsonify({'error': 'not found'}), 404

    prix = float(data.get('prix_unitaire', ligne['prix_unitaire']))
    qte = float(data.get('quantite', ligne['quantite']))
    sous = round(prix * qte, 0)

    db.execute(
        "UPDATE facture_operations SET prix_unitaire=?, quantite=?, sous_total=? WHERE id=?",
        (prix, qte, sous, op_id)
    )
    if fac and fac['statut'] == 'validee':
        _log_hist(db, 'facture_historique', 'facture_id', fac_id, 'modification_operation',
                   'prix_unitaire', ligne['prix_unitaire'], prix)
    _recalc_facture(db, fac_id)
    db.commit(); db.close()
    return jsonify({'ok': True})

@api.route('/factures/<int:fac_id>/operation/<int:op_id>', methods=['DELETE'])
def delete_op_facture(fac_id, op_id):
    db = get_db()
    fac = db.execute("SELECT statut FROM factures WHERE id=?", (fac_id,)).fetchone()
    db.execute("DELETE FROM facture_operations WHERE id=? AND facture_id=?", (op_id, fac_id))
    if fac and fac['statut'] == 'validee':
        _log_hist(db, 'facture_historique', 'facture_id', fac_id, 'suppression_operation')
    _recalc_facture(db, fac_id)
    db.commit(); db.close()
    return jsonify({'ok': True})

# ══════════════════════════════════════════════
#  LIGNES LIBRES (main-d'oeuvre, remise, ajustements)
# ══════════════════════════════════════════════

@api.route('/factures/<int:fac_id>/ligne-libre', methods=['POST'])
def add_ligne_libre(fac_id):
    """Montant positif = ajout (ex: main-d'oeuvre), montant negatif = remise.
    Le montant recu est en USD (coherent avec types_lignes_libres.montant_par_defaut),
    converti ici vers la devise de la facture avant stockage."""
    data = request.json
    db = get_db()
    fac = db.execute("SELECT statut, devise, taux_change FROM factures WHERE id=?", (fac_id,)).fetchone()
    description = data.get('description', '').strip()
    montant_usd = float(data.get('montant', 0))
    if not description:
        db.close()
        return jsonify({'error': 'Description requise'}), 400

    if fac['devise'] == 'USD':
        montant = round(montant_usd, 2)
    else:
        montant = round(montant_usd * fac['taux_change'], 0)

    db.execute(
        "INSERT INTO facture_lignes_libres (facture_id, description, montant) VALUES (?,?,?)",
        (fac_id, description, montant)
    )
    if fac and fac['statut'] == 'validee':
        signe = '+' if montant >= 0 else ''
        _log_hist(db, 'facture_historique', 'facture_id', fac_id, 'ajout_ligne_libre',
                   nouvelle=f"{description}: {signe}{montant}")
    _recalc_facture(db, fac_id)
    db.commit(); db.close()
    return jsonify({'ok': True})

@api.route('/factures/<int:fac_id>/ligne-libre/<int:ll_id>', methods=['DELETE'])
def delete_ligne_libre(fac_id, ll_id):
    db = get_db()
    fac = db.execute("SELECT statut FROM factures WHERE id=?", (fac_id,)).fetchone()
    ligne = db.execute("SELECT * FROM facture_lignes_libres WHERE id=?", (ll_id,)).fetchone()
    db.execute("DELETE FROM facture_lignes_libres WHERE id=? AND facture_id=?", (ll_id, fac_id))
    if fac and fac['statut'] == 'validee' and ligne:
        _log_hist(db, 'facture_historique', 'facture_id', fac_id, 'suppression_ligne_libre',
                   nouvelle=f"{ligne['description']}: {ligne['montant']}")
    _recalc_facture(db, fac_id)
    db.commit(); db.close()
    return jsonify({'ok': True})

# ══════════════════════════════════════════════
#  PAIEMENTS (acomptes) - ventes ET achats
#  Le montant du (montant_du_usd) ne change JAMAIS.
#  Chaque paiement est converti et fige en USD au moment ou il est recu.
#  Le solde restant = montant_du_usd - somme(paiements.montant_usd)
#  Le statut est calcule automatiquement a partir du solde.
# ══════════════════════════════════════════════

def _table_for(ptype):
    return 'factures' if ptype == 'vente' else 'factures_achat'

def _hist_table_for(ptype):
    return ('facture_historique', 'facture_id') if ptype == 'vente' else ('facture_achat_historique', 'facture_achat_id')

def _get_solde(db, ptype, fac_id):
    """Retourne (montant_du_usd, total_paye_usd, solde_usd, statut_calcule)."""
    table = _table_for(ptype)
    fac = db.execute(f"SELECT montant_du_usd FROM {table} WHERE id=?", (fac_id,)).fetchone()
    if not fac:
        return None
    montant_du = fac['montant_du_usd'] or 0
    total_paye = db.execute(
        "SELECT COALESCE(SUM(montant_usd),0) FROM paiements WHERE type=? AND facture_id=?",
        (ptype, fac_id)
    ).fetchone()[0]
    solde = round(montant_du - total_paye, 2)
    if solde <= 0.005:
        statut = 'paye'
    elif total_paye > 0:
        statut = 'partiellement_paye'
    else:
        statut = 'en_attente'
    return montant_du, round(total_paye, 2), solde, statut

def _sync_statut(db, ptype, fac_id):
    r = _get_solde(db, ptype, fac_id)
    if not r:
        return
    _, _, _, statut = r
    table = _table_for(ptype)
    db.execute(f"UPDATE {table} SET statut_paiement=? WHERE id=?", (statut, fac_id))

@api.route('/paiements/<ptype>/<int:fac_id>', methods=['GET'])
def get_paiements(ptype, fac_id):
    if ptype not in ('vente', 'achat'):
        return jsonify({'error': 'type invalide'}), 400
    db = get_db()
    solde_info = _get_solde(db, ptype, fac_id)
    if not solde_info:
        db.close()
        return jsonify({'error': 'not found'}), 404
    montant_du, total_paye, solde, statut = solde_info
    paiements = db.execute(
        "SELECT * FROM paiements WHERE type=? AND facture_id=? ORDER BY date_paiement DESC, id DESC",
        (ptype, fac_id)
    ).fetchall()
    db.close()
    return jsonify({
        'montant_du_usd': montant_du,
        'total_paye_usd': total_paye,
        'solde_usd': solde,
        'statut_paiement': statut,
        'paiements': [dict(p) for p in paiements]
    })

@api.route('/paiements/<ptype>/<int:fac_id>', methods=['POST'])
def add_paiement(ptype, fac_id):
    if ptype not in ('vente', 'achat'):
        return jsonify({'error': 'type invalide'}), 400
    data = request.json
    db = get_db()
    table = _table_for(ptype)
    fac = db.execute(f"SELECT * FROM {table} WHERE id=?", (fac_id,)).fetchone()
    if not fac:
        db.close()
        return jsonify({'error': 'not found'}), 404

    montant = float(data.get('montant', 0))
    devise = data.get('devise', 'LS')
    date_paiement = data.get('date_paiement') or date.today().isoformat()
    note = data.get('note', '')

    if montant <= 0:
        db.close()
        return jsonify({'error': 'Montant invalide'}), 400

    # Taux du jour du paiement (pas celui de la facture)
    taux_row = db.execute(
        "SELECT ls_par_usd FROM taux_change WHERE date <= ? ORDER BY date DESC LIMIT 1", (date_paiement,)
    ).fetchone()
    taux = taux_row['ls_par_usd'] if taux_row else 1

    montant_usd = round(montant, 2) if devise == 'USD' else round(montant / taux, 2)

    # Empeche de payer plus que ce qui reste reellement du (tolerance de 1
    # centime pour absorber les arrondis de conversion de devise).
    solde_avant = _get_solde(db, ptype, fac_id)
    if solde_avant:
        _, _, solde_restant, _ = solde_avant
        if montant_usd > solde_restant + 0.01:
            db.close()
            return jsonify({
                'error': f"Ce montant dépasse le solde restant ({solde_restant:.2f}$). "
                         f"Maximum accepté : {solde_restant:.2f}$."
            }), 400

    db.execute(
        """INSERT INTO paiements (type, facture_id, montant, devise, taux_change, montant_usd, date_paiement, note)
           VALUES (?,?,?,?,?,?,?,?)""",
        (ptype, fac_id, montant, devise, taux, montant_usd, date_paiement, note)
    )

    hist_table, hist_col = _hist_table_for(ptype)
    _log_hist(db, hist_table, hist_col, fac_id, 'paiement_recu',
               nouvelle=f"{fmt_num(montant)} {devise} (= {montant_usd}$) le {date_paiement}")

    _sync_statut(db, ptype, fac_id)
    db.commit()

    solde_info = _get_solde(db, ptype, fac_id)
    db.close()
    montant_du, total_paye, solde, statut = solde_info
    return jsonify({'ok': True, 'solde_usd': solde, 'statut_paiement': statut})

@api.route('/paiements/<ptype>/<int:fac_id>/<int:paiement_id>', methods=['DELETE'])
def delete_paiement(ptype, fac_id, paiement_id):
    if ptype not in ('vente', 'achat'):
        return jsonify({'error': 'type invalide'}), 400
    db = get_db()
    p = db.execute("SELECT * FROM paiements WHERE id=? AND type=? AND facture_id=?", (paiement_id, ptype, fac_id)).fetchone()
    if not p:
        db.close()
        return jsonify({'error': 'not found'}), 404
    db.execute("DELETE FROM paiements WHERE id=?", (paiement_id,))

    hist_table, hist_col = _hist_table_for(ptype)
    _log_hist(db, hist_table, hist_col, fac_id, 'suppression_paiement',
               nouvelle=f"{fmt_num(p['montant'])} {p['devise']} du {p['date_paiement']}")

    _sync_statut(db, ptype, fac_id)
    db.commit()
    solde_info = _get_solde(db, ptype, fac_id)
    db.close()
    montant_du, total_paye, solde, statut = solde_info
    return jsonify({'ok': True, 'solde_usd': solde, 'statut_paiement': statut})

def fmt_num(n):
    return f"{n:,.0f}" if n == int(n) else f"{n:,.2f}"

def _recalc_facture(db, fac_id):
    fac = db.execute("SELECT devise, taux_change FROM factures WHERE id=?", (fac_id,)).fetchone()
    decimals = 2 if fac and fac['devise'] == 'USD' else 0
    r1 = db.execute("SELECT COALESCE(SUM(sous_total),0) FROM facture_lignes WHERE facture_id=?", (fac_id,)).fetchone()[0]
    r2 = db.execute("SELECT COALESCE(SUM(sous_total),0) FROM facture_operations WHERE facture_id=?", (fac_id,)).fetchone()[0]
    r3 = db.execute("SELECT COALESCE(SUM(montant),0) FROM facture_lignes_libres WHERE facture_id=?", (fac_id,)).fetchone()[0]
    total = round(r1 + r2 + r3, decimals)

    # Montant du fixe en USD, calcule une seule fois au moment du calcul (protege des fluctuations futures)
    taux = fac['taux_change'] if fac and fac['taux_change'] else 1
    if fac and fac['devise'] == 'USD':
        montant_usd = round(total, 2)
    else:
        montant_usd = round(total / taux, 2) if taux else 0

    db.execute(
        """UPDATE factures SET sous_total_fer=?, sous_total_operations=?, sous_total_lignes_libres=?,
           total=?, montant_du_usd=?, updated_at=datetime('now') WHERE id=?""",
        (round(r1,decimals), round(r2,decimals), round(r3,decimals), total, montant_usd, fac_id)
    )

# ══════════════════════════════════════════════
#  FACTURES D'ACHAT (FOURNISSEURS)
# ══════════════════════════════════════════════

@api.route('/factures-achat', methods=['GET'])
def get_factures_achat():
    limit = request.args.get('limit', 50, type=int)
    db = get_db()
    rows = db.execute(
        """SELECT fa.*, f.nom as fournisseur_nom FROM factures_achat fa
           LEFT JOIN fournisseurs f ON fa.fournisseur_id=f.id
           ORDER BY fa.date_facture DESC LIMIT ?""", (limit,)
    ).fetchall()
    db.close()
    return jsonify([dict(r) for r in rows])

@api.route('/factures-achat', methods=['POST'])
def create_facture_achat():
    data = request.json
    db = get_db()
    today = date.today().isoformat()
    taux_row = db.execute("SELECT ls_par_usd FROM taux_change WHERE date <= ? ORDER BY date DESC LIMIT 1", (today,)).fetchone()
    taux = taux_row[0] if taux_row else 1

    devise_defaut_row = db.execute("SELECT valeur FROM settings WHERE cle='devise_defaut'").fetchone()
    devise_defaut = devise_defaut_row['valeur'] if devise_defaut_row else 'USD'
    devise = data.get('devise', devise_defaut)

    numero = _next_numero(db, 'factures_achat', 'ACH')
    db.execute(
        """INSERT INTO factures_achat (numero, fournisseur_id, date_facture, devise, taux_change, statut)
           VALUES (?,?,?,?,?,'brouillon')""",
        (numero, data.get('fournisseur_id'), today, devise, taux)
    )
    ach_id = db.execute("SELECT last_insert_rowid()").fetchone()[0]
    _log_hist(db, 'facture_achat_historique', 'facture_achat_id', ach_id, 'creation', nouvelle=f'Facture {numero} créée')
    db.commit(); db.close()
    return jsonify({'ok': True, 'facture_id': ach_id, 'numero': numero})

@api.route('/factures-achat/<int:ach_id>', methods=['GET'])
def get_facture_achat(ach_id):
    db = get_db()
    fac = db.execute(
        """SELECT fa.*, f.nom as fournisseur_nom, f.telephone as fournisseur_tel, f.adresse as fournisseur_adresse
           FROM factures_achat fa LEFT JOIN fournisseurs f ON fa.fournisseur_id=f.id WHERE fa.id=?""", (ach_id,)
    ).fetchone()
    lignes = db.execute(
        """SELECT fal.*, p.nom_fr, p.nom_ar FROM facture_achat_lignes fal
           LEFT JOIN produits p ON fal.produit_id=p.id WHERE fal.facture_achat_id=?""", (ach_id,)
    ).fetchall()
    lignes_libres = db.execute(
        "SELECT * FROM facture_achat_lignes_libres WHERE facture_achat_id=? ORDER BY id", (ach_id,)
    ).fetchall()
    hist = db.execute(
        "SELECT * FROM facture_achat_historique WHERE facture_achat_id=? ORDER BY date_action DESC", (ach_id,)
    ).fetchall()
    db.close()
    return jsonify({
        'facture': dict(fac),
        'lignes': [dict(l) for l in lignes],
        'lignes_libres': [dict(l) for l in lignes_libres],
        'historique': [dict(h) for h in hist]
    })

@api.route('/factures-achat/<int:ach_id>', methods=['PUT'])
def update_facture_achat_meta(ach_id):
    data = request.json
    db = get_db()
    fac = db.execute("SELECT * FROM factures_achat WHERE id=?", (ach_id,)).fetchone()
    if not fac:
        db.close()
        return jsonify({'error': 'not found'}), 404
    for champ in ['date_facture', 'note', 'devise']:
        if champ in data and data[champ] != fac[champ]:
            _log_hist(db, 'facture_achat_historique', 'facture_achat_id', ach_id, 'modification', champ, fac[champ], data[champ])
            db.execute(f"UPDATE factures_achat SET {champ}=? WHERE id=?", (data[champ], ach_id))
    db.execute("UPDATE factures_achat SET updated_at=datetime('now') WHERE id=?", (ach_id,))
    db.commit(); db.close()
    return jsonify({'ok': True})

@api.route('/factures-achat/<int:ach_id>/ligne', methods=['POST'])
def add_ligne_achat(ach_id):
    data = request.json
    db = get_db()
    poids = float(data.get('poids_kg', 0))
    prix_kg = float(data.get('prix_kg', 0))
    sous = round(poids * prix_kg, 0)
    prod = db.execute("SELECT nom_fr, nom_ar FROM produits WHERE id=?", (data['produit_id'],)).fetchone()
    db.execute(
        """INSERT INTO facture_achat_lignes
           (facture_achat_id, produit_id, description_fr, description_ar, poids_kg, prix_kg, sous_total)
           VALUES (?,?,?,?,?,?,?)""",
        (ach_id, data['produit_id'], prod['nom_fr'], prod['nom_ar'], poids, prix_kg, sous)
    )
    _recalc_facture_achat(db, ach_id)
    db.commit(); db.close()
    return jsonify({'ok': True})

@api.route('/factures-achat/<int:ach_id>/ligne/<int:ligne_id>', methods=['DELETE'])
def delete_ligne_achat(ach_id, ligne_id):
    db = get_db()
    db.execute("DELETE FROM facture_achat_lignes WHERE id=? AND facture_achat_id=?", (ligne_id, ach_id))
    _recalc_facture_achat(db, ach_id)
    db.commit(); db.close()
    return jsonify({'ok': True})

@api.route('/factures-achat/<int:ach_id>/ligne-libre', methods=['POST'])
def add_ligne_libre_achat(ach_id):
    """Montant positif = frais supplementaire, montant negatif = remise fournisseur.
    Le montant recu est en USD, converti ici vers la devise de la facture d'achat."""
    data = request.json
    db = get_db()
    fac = db.execute("SELECT devise, taux_change FROM factures_achat WHERE id=?", (ach_id,)).fetchone()
    description = data.get('description', '').strip()
    montant_usd = float(data.get('montant', 0))
    if not description:
        db.close()
        return jsonify({'error': 'Description requise'}), 400

    if fac and fac['devise'] == 'USD':
        montant = round(montant_usd, 2)
    else:
        taux = fac['taux_change'] if fac and fac['taux_change'] else 1
        montant = round(montant_usd * taux, 0)

    db.execute(
        "INSERT INTO facture_achat_lignes_libres (facture_achat_id, description, montant) VALUES (?,?,?)",
        (ach_id, description, montant)
    )
    _recalc_facture_achat(db, ach_id)
    db.commit(); db.close()
    return jsonify({'ok': True})

@api.route('/factures-achat/<int:ach_id>/ligne-libre/<int:ll_id>', methods=['DELETE'])
def delete_ligne_libre_achat(ach_id, ll_id):
    db = get_db()
    db.execute("DELETE FROM facture_achat_lignes_libres WHERE id=? AND facture_achat_id=?", (ll_id, ach_id))
    _recalc_facture_achat(db, ach_id)
    db.commit(); db.close()
    return jsonify({'ok': True})

def _recalc_facture_achat(db, ach_id):
    r1 = db.execute("SELECT COALESCE(SUM(sous_total),0) FROM facture_achat_lignes WHERE facture_achat_id=?", (ach_id,)).fetchone()[0]
    r2 = db.execute("SELECT COALESCE(SUM(montant),0) FROM facture_achat_lignes_libres WHERE facture_achat_id=?", (ach_id,)).fetchone()[0]
    total = round(r1 + r2, 0)
    db.execute(
        "UPDATE factures_achat SET sous_total=?, sous_total_lignes_libres=?, total=?, updated_at=datetime('now') WHERE id=?",
        (round(r1,0), round(r2,0), total, ach_id)
    )

@api.route('/factures-achat/<int:ach_id>/valider', methods=['POST'])
def valider_facture_achat(ach_id):
    """Valider une facture d'achat impacte automatiquement l'inventaire en +."""
    db = get_db()
    lignes = db.execute("SELECT produit_id, poids_kg FROM facture_achat_lignes WHERE facture_achat_id=?", (ach_id,)).fetchall()
    for l in lignes:
        db.execute(
            """INSERT INTO inventaire (produit_id, stock_kg) VALUES (?,?)
               ON CONFLICT(produit_id) DO UPDATE SET stock_kg = stock_kg + ?, derniere_maj=datetime('now')""",
            (l['produit_id'], l['poids_kg'], l['poids_kg'])
        )
    db.execute("UPDATE factures_achat SET statut='validee', updated_at=datetime('now') WHERE id=?", (ach_id,))
    _log_hist(db, 'facture_achat_historique', 'facture_achat_id', ach_id, 'validation', nouvelle='Validée, stock mis à jour')
    db.commit(); db.close()
    return jsonify({'ok': True})

@api.route('/factures-achat/<int:ach_id>/annuler', methods=['POST'])
def annuler_facture_achat(ach_id):
    """Annuler une facture validée retire le stock qui avait été ajouté."""
    db = get_db()
    fac = db.execute("SELECT statut FROM factures_achat WHERE id=?", (ach_id,)).fetchone()
    if fac and fac['statut'] == 'validee':
        lignes = db.execute("SELECT produit_id, poids_kg FROM facture_achat_lignes WHERE facture_achat_id=?", (ach_id,)).fetchall()
        for l in lignes:
            db.execute("UPDATE inventaire SET stock_kg = stock_kg - ?, derniere_maj=datetime('now') WHERE produit_id=?", (l['poids_kg'], l['produit_id']))
    db.execute("UPDATE factures_achat SET statut='annulee', updated_at=datetime('now') WHERE id=?", (ach_id,))
    _log_hist(db, 'facture_achat_historique', 'facture_achat_id', ach_id, 'annulation', nouvelle='Annulée, stock retiré')
    db.commit(); db.close()
    return jsonify({'ok': True})

@api.route('/factures-achat/<int:ach_id>', methods=['DELETE'])
def delete_facture_achat(ach_id):
    db = get_db()
    fac = db.execute("SELECT statut FROM factures_achat WHERE id=?", (ach_id,)).fetchone()
    if not fac:
        db.close()
        return jsonify({'error': 'not found'}), 404
    if fac['statut'] == 'validee':
        db.close()
        return jsonify({'error': 'Impossible de supprimer une facture validée. Annulez-la plutôt.'}), 400
    db.execute("DELETE FROM factures_achat WHERE id=?", (ach_id,))
    db.commit(); db.close()
    return jsonify({'ok': True})

# ══════════════════════════════════════════════
#  INVENTAIRE
# ══════════════════════════════════════════════

@api.route('/inventaire', methods=['GET'])
def get_inventaire():
    db = get_db()
    rows = db.execute(
        """SELECT i.*, p.nom_fr, p.nom_ar, p.categorie, p.dimension
           FROM inventaire i JOIN produits p ON i.produit_id=p.id ORDER BY p.categorie, p.nom_fr"""
    ).fetchall()
    db.close()
    return jsonify([dict(r) for r in rows])

@api.route('/inventaire/<int:prod_id>', methods=['PUT'])
def update_inventaire(prod_id):
    data = request.json
    db = get_db()
    existing = db.execute("SELECT * FROM inventaire WHERE produit_id=?", (prod_id,)).fetchone()

    if existing:
        stock_kg = data.get('stock_kg', existing['stock_kg'])
        seuil = data.get('stock_min_alerte', existing['stock_min_alerte'])
        db.execute(
            "UPDATE inventaire SET stock_kg=?, stock_min_alerte=?, derniere_maj=datetime('now') WHERE produit_id=?",
            (stock_kg, seuil, prod_id)
        )
    else:
        stock_kg = data.get('stock_kg', 0)
        seuil = data.get('stock_min_alerte', 100)
        db.execute(
            "INSERT INTO inventaire (produit_id, stock_kg, stock_min_alerte) VALUES (?,?,?)",
            (prod_id, stock_kg, seuil)
        )
    db.commit(); db.close()
    return jsonify({'ok': True})

# ══════════════════════════════════════════════
#  SAUVEGARDE / RESTAURATION BASE DE DONNÉES
# ══════════════════════════════════════════════

@api.route('/backup/export', methods=['GET'])
def export_backup():
    import os
    from flask import send_file
    db_path = os.environ.get('DATABASE_PATH', './data/fer.db')
    return send_file(db_path, as_attachment=True, download_name=f"fer-backup-{date.today().isoformat()}.db")

@api.route('/backup/import', methods=['POST'])
def import_backup():
    import os, shutil
    if 'file' not in request.files:
        return jsonify({'error': 'no file'}), 400
    f = request.files['file']
    db_path = os.environ.get('DATABASE_PATH', './data/fer.db')
    backup_old = db_path + '.before-import'
    shutil.copy(db_path, backup_old)
    f.save(db_path)
    return jsonify({'ok': True})

# ══════════════════════════════════════════════
#  REGLAGES DU PROGRAMME
# ══════════════════════════════════════════════

@api.route('/settings', methods=['GET'])
def get_settings():
    db = get_db()
    rows = db.execute("SELECT cle, valeur FROM settings").fetchall()
    db.close()
    return jsonify({r['cle']: r['valeur'] for r in rows})

@api.route('/settings', methods=['PUT'])
def update_settings():
    data = request.json
    db = get_db()
    for cle, valeur in data.items():
        db.execute(
            "INSERT INTO settings (cle, valeur) VALUES (?,?) ON CONFLICT(cle) DO UPDATE SET valeur=?",
            (cle, str(valeur), str(valeur))
        )
    db.commit(); db.close()
    return jsonify({'ok': True})

@api.route('/settings/reset-complet', methods=['POST'])
def reset_complet():
    """
    Efface TOUTES les donnees (factures, clients, produits, etc.) pour repartir
    d'une base vide. Necessite une confirmation explicite pour eviter tout accident.
    """
    data = request.json or {}
    if data.get('confirme') != 'EFFACER':
        return jsonify({'error': 'Confirmation invalide. Le mot "EFFACER" doit etre saisi exactement.'}), 400

    db = get_db()
    tables_a_vider = [
        'facture_lignes', 'facture_operations', 'facture_lignes_libres', 'facture_historique',
        'factures', 'facture_achat_lignes', 'facture_achat_historique', 'factures_achat',
        'paiements', 'clients', 'fournisseurs', 'inventaire', 'produits', 'operations',
        'taux_change'
    ]
    for table in tables_a_vider:
        try:
            db.execute(f"DELETE FROM {table}")
        except Exception as e:
            print(f"Reset table {table}: {e}")
    db.execute("DELETE FROM sqlite_sequence")  # remet les compteurs auto-increment a zero
    db.commit(); db.close()
    return jsonify({'ok': True})

@api.route('/settings/import-demo', methods=['POST'])
def import_demo():
    """Importe un jeu de donnees de demonstration. Vide d'abord la base (comme reset-complet)
    puis reinjecte des donnees realistes."""
    data = request.json or {}
    if data.get('confirme') != 'EFFACER':
        return jsonify({'error': 'Confirmation invalide. Le mot "EFFACER" doit etre saisi exactement.'}), 400

    scenario = data.get('scenario', 'standard')

    from database import get_db as _get_db, _seed_demo
    db = get_db()
    tables_a_vider = [
        'facture_lignes', 'facture_operations', 'facture_lignes_libres', 'facture_historique',
        'factures', 'facture_achat_lignes', 'facture_achat_historique', 'factures_achat',
        'paiements', 'clients', 'fournisseurs', 'inventaire', 'produits', 'operations',
        'taux_change'
    ]
    for table in tables_a_vider:
        try:
            db.execute(f"DELETE FROM {table}")
        except Exception as e:
            print(f"Reset table {table}: {e}")
    db.execute("DELETE FROM sqlite_sequence")
    db.commit()

    c = db.cursor()
    try:
        _seed_demo(db, c, scenario=scenario)
    except Exception as e:
        # La base a deja ete videe a ce stade (commit juste au-dessus) : si le
        # remplissage de la demo echoue en cours de route, il ne faut jamais
        # repondre "ok" alors que la base est restee vide ou a moitie remplie.
        # L'erreur reelle remonte ici pour etre visible (voir aussi le
        # gestionnaire d'erreur global dans app.py).
        db.close()
        import traceback
        traceback.print_exc()
        return jsonify({
            'error': f"Le nettoyage a reussi mais le remplissage de la démo a échoué : {e}. "
                     f"La base est actuellement vide. Utilisez 'Restaurer une sauvegarde' si vous en aviez fait une."
        }), 500

    nb_factures = db.execute("SELECT COUNT(*) FROM factures").fetchone()[0]
    db.close()
    return jsonify({'ok': True, 'scenario': scenario, 'nb_factures': nb_factures})

# ══════════════════════════════════════════════
#  CAISSE (rapport encaissements / decaissements par devise)
# ══════════════════════════════════════════════

@api.route('/caisse', methods=['GET'])
def get_caisse():
    date_debut = request.args.get('debut', '')
    date_fin = request.args.get('fin', date.today().isoformat())
    if not date_debut:
        from datetime import timedelta
        date_debut = (date.today() - timedelta(days=30)).isoformat()

    db = get_db()
    ventes_ls = db.execute(
        "SELECT COALESCE(SUM(total),0) FROM factures WHERE devise='LS' AND statut='validee' AND date_facture BETWEEN ? AND ?",
        (date_debut, date_fin)
    ).fetchone()[0]
    ventes_usd = db.execute(
        "SELECT COALESCE(SUM(total),0) FROM factures WHERE devise='USD' AND statut='validee' AND date_facture BETWEEN ? AND ?",
        (date_debut, date_fin)
    ).fetchone()[0]
    achats_ls = db.execute(
        "SELECT COALESCE(SUM(total),0) FROM factures_achat WHERE devise='LS' AND statut='validee' AND date_facture BETWEEN ? AND ?",
        (date_debut, date_fin)
    ).fetchone()[0]
    achats_usd = db.execute(
        "SELECT COALESCE(SUM(total),0) FROM factures_achat WHERE devise='USD' AND statut='validee' AND date_facture BETWEEN ? AND ?",
        (date_debut, date_fin)
    ).fetchone()[0]
    db.close()

    return jsonify({
        'periode': {'debut': date_debut, 'fin': date_fin},
        'encaissements': {'LS': ventes_ls, 'USD': ventes_usd},
        'decaissements': {'LS': achats_ls, 'USD': achats_usd},
        'solde': {'LS': round(ventes_ls - achats_ls, 0), 'USD': round(ventes_usd - achats_usd, 2)}
    })

# ══════════════════════════════════════════════
#  SYNCHRONISATION AVEC FER MAGASIN
#  Export du catalogue vers Fer Magasin, et import
#  des ventes saisies au magasin.
# ══════════════════════════════════════════════

@api.route('/magasin/export-catalogue', methods=['GET'])
def export_catalogue_magasin():
    """Genere le fichier a donner a Fer Magasin (produits + prix + clients + types de lignes libres + devise)."""
    db = get_db()
    produits = db.execute(
        "SELECT id, nom_fr, nom_ar, categorie, dimension, unite, prix_vente_kg FROM produits WHERE actif=1"
    ).fetchall()
    categories = {c['cle']: dict(c) for c in db.execute("SELECT * FROM categories").fetchall()}
    produits_enrichis = []
    for p in produits:
        pd = dict(p)
        cat = categories.get(p['categorie'])
        pd['categorie_nom_fr'] = cat['nom_fr'] if cat else pd['categorie']
        pd['categorie_nom_ar'] = cat['nom_ar'] if cat else pd['categorie']
        pd['categorie_nom_en'] = (cat['nom_en'] if cat else '') or pd['categorie']
        pd['categorie_icon'] = cat['icon'] if cat else '📦'
        produits_enrichis.append(pd)
    clients = db.execute(
        "SELECT id, nom, telephone FROM clients ORDER BY nom"
    ).fetchall()
    types_ll = db.execute(
        "SELECT id, nom_fr, nom_ar, signe_par_defaut, montant_par_defaut FROM types_lignes_libres WHERE actif=1"
    ).fetchall()
    today = date.today().isoformat()
    taux_row = db.execute(
        "SELECT ls_par_usd FROM taux_change WHERE date <= ? ORDER BY date DESC LIMIT 1", (today,)
    ).fetchone()
    taux = taux_row['ls_par_usd'] if taux_row else 1

    devise_defaut_row = db.execute("SELECT valeur FROM settings WHERE cle='devise_defaut'").fetchone()
    devise_defaut = devise_defaut_row['valeur'] if devise_defaut_row else 'USD'
    afficher_sec_row = db.execute("SELECT valeur FROM settings WHERE cle='afficher_devise_secondaire'").fetchone()
    afficher_devise_secondaire = afficher_sec_row['valeur'] if afficher_sec_row else '1'

    db.close()
    return jsonify({
        'produits': produits_enrichis,
        'clients': [dict(c) for c in clients],
        'types_lignes_libres': [dict(t) for t in types_ll],
        'taux_change_jour': taux,
        'devise_defaut': devise_defaut,
        'afficher_devise_secondaire': afficher_devise_secondaire,
        'date_export': datetime.now().isoformat()
    })

@api.route('/magasin/import-ventes', methods=['POST'])
def import_ventes_magasin():
    """
    Recoit le paquet exporte depuis Fer Magasin et cree les factures correspondantes.
    Detection de doublons via export_uid : si une facture avec ce meme export_uid_magasin
    existe deja, la vente est ignoree (pas de double import).
    """
    data = request.json
    ventes = data.get('ventes', [])
    if not ventes:
        return jsonify({'error': 'Aucune vente dans le fichier'}), 400

    db = get_db()

    # S'assurer que la colonne existe (migration douce si base plus ancienne)
    cols = [r[1] for r in db.execute("PRAGMA table_info(factures)").fetchall()]
    if 'export_uid_magasin' not in cols:
        db.execute("ALTER TABLE factures ADD COLUMN export_uid_magasin TEXT")

    importees = 0
    ignorees_doublon = 0
    clients_crees = 0
    detail_importees = []

    for v in ventes:
        export_uid = v.get('export_uid')
        if not export_uid:
            continue

        # Doublon ?
        existe = db.execute(
            "SELECT id FROM factures WHERE export_uid_magasin=?", (export_uid,)
        ).fetchone()
        if existe:
            ignorees_doublon += 1
            continue

        # Trouver ou creer le client
        client_nom = (v.get('client_nom') or '').strip()
        client_id = None
        if client_nom:
            c = db.execute("SELECT id FROM clients WHERE nom=?", (client_nom,)).fetchone()
            if c:
                client_id = c['id']
            else:
                db.execute("INSERT INTO clients (nom) VALUES (?)", (client_nom,))
                client_id = db.execute("SELECT last_insert_rowid()").fetchone()[0]
                clients_crees += 1

        numero = _next_numero(db, 'factures', 'FAC')
        date_facture = v.get('date_vente') or date.today().isoformat()
        heure_vente = v.get('heure_vente', '')
        prix_fer_jour = v.get('prix_fer_jour', 0)
        devise = v.get('devise', 'LS')
        total = v.get('total', 0)
        sous_total_ll = sum(l.get('montant', 0) for l in v.get('lignes_libres', []))
        sous_total_fer = total - sous_total_ll

        db.execute(
            """INSERT INTO factures
               (numero, client_id, date_facture, prix_fer_jour, devise, taux_change,
                sous_total_fer, sous_total_lignes_libres, total, statut, export_uid_magasin, note, heure_vente)
               VALUES (?,?,?,?,?,1,?,?,?,'validee',?,?,?)""",
            (numero, client_id, date_facture, prix_fer_jour, devise, sous_total_fer, sous_total_ll, total,
             export_uid, 'Importee depuis Fer Magasin', heure_vente)
        )
        fac_id = db.execute("SELECT last_insert_rowid()").fetchone()[0]
        detail_importees.append({
            'numero': numero, 'client_nom': client_nom, 'date_facture': date_facture,
            'heure_vente': heure_vente, 'total': total, 'devise': devise
        })

        for l in v.get('lignes', []):
            # Un produit_id venant de Fer Magasin peut correspondre a un
            # produit AJOUTE LOCALEMENT en boutique, jamais synchronise vers
            # Fer Manager - son id n'existe alors pas ici. On verifie avant
            # d'inserer : si absent, on garde la ligne (description + prix
            # deja "snapshotes") mais avec produit_id=NULL, plutot que de
            # planter sur la contrainte de cle etrangere et perdre toute la vente.
            produit_id = l.get('produit_id')
            if produit_id is not None:
                existe_produit = db.execute("SELECT 1 FROM produits WHERE id=?", (produit_id,)).fetchone()
                if not existe_produit:
                    produit_id = None
            db.execute(
                """INSERT INTO facture_lignes
                   (facture_id, produit_id, description_fr, description_ar, poids_kg, prix_kg, sous_total)
                   VALUES (?,?,?,?,?,?,?)""",
                (fac_id, produit_id, l.get('description_fr'), l.get('description_ar'),
                 l.get('poids_kg', 0), l.get('prix_kg', 0), l.get('sous_total', 0))
            )

        for ll in v.get('lignes_libres', []):
            db.execute(
                "INSERT INTO facture_lignes_libres (facture_id, description, montant) VALUES (?,?,?)",
                (fac_id, ll.get('description', ''), ll.get('montant', 0))
            )

        # Recalcul du montant_du_usd pour cette facture
        taux_row = db.execute(
            "SELECT ls_par_usd FROM taux_change WHERE date <= ? ORDER BY date DESC LIMIT 1", (date_facture,)
        ).fetchone()
        taux = taux_row['ls_par_usd'] if taux_row else 1
        montant_usd = round(total, 2) if devise == 'USD' else round(total / taux, 2) if taux else 0
        db.execute("UPDATE factures SET montant_du_usd=? WHERE id=?", (montant_usd, fac_id))

        _log_hist(db, 'facture_historique', 'facture_id', fac_id, 'import_magasin',
                   nouvelle=f"Importee depuis Fer Magasin (uid: {export_uid[:8]}...)")

        importees += 1

    db.commit()
    db.close()

    return jsonify({
        'ok': True,
        'importees': importees,
        'ignorees_doublon': ignorees_doublon,
        'clients_crees': clients_crees,
        'detail': detail_importees
    })

# ══════════════════════════════════════════════
#  DASHBOARD
# ══════════════════════════════════════════════

@api.route('/dashboard', methods=['GET'])
def get_dashboard():
    db = get_db()
    today = date.today().isoformat()

    # IMPORTANT : on agrege sur montant_du_usd (le montant fixe en USD, calcule
    # pour CHAQUE facture quelle que soit sa devise - voir _recalc_facture) et
    # non plus sur 'total' filtre par devise='LS', qui excluait silencieusement
    # toutes les ventes en USD des chiffres du tableau de bord.
    ca_jour_usd = db.execute(
        "SELECT COALESCE(SUM(montant_du_usd),0) FROM factures WHERE date_facture=? AND statut='validee'", (today,)
    ).fetchone()[0]
    mois = today[:7]
    ca_mois_usd = db.execute(
        "SELECT COALESCE(SUM(montant_du_usd),0) FROM factures WHERE date_facture LIKE ? AND statut='validee'", (f"{mois}%",)
    ).fetchone()[0]
    nb_factures = db.execute(
        "SELECT COUNT(*) FROM factures WHERE date_facture LIKE ? AND statut='validee'", (f"{mois}%",)
    ).fetchone()[0]

    taux_row = db.execute("SELECT ls_par_usd, date FROM taux_change WHERE date <= ? ORDER BY date DESC LIMIT 1", (today,)).fetchone()
    taux = dict(taux_row) if taux_row else {'ls_par_usd': 0, 'date': today}

    alertes = db.execute(
        """SELECT p.nom_fr, p.nom_ar, i.stock_kg, i.stock_min_alerte
           FROM inventaire i JOIN produits p ON i.produit_id=p.id WHERE i.stock_kg < i.stock_min_alerte"""
    ).fetchall()

    ca_par_mois = db.execute(
        """SELECT substr(date_facture,1,7) as mois, SUM(montant_du_usd) as ca_usd FROM factures
           WHERE statut='validee' GROUP BY mois ORDER BY mois DESC LIMIT 6"""
    ).fetchall()

    cours_usd = db.execute("SELECT date, ls_par_usd FROM taux_change ORDER BY date DESC LIMIT 30").fetchall()

    top_clients = db.execute(
        """SELECT c.nom, SUM(f.montant_du_usd) as ca_usd FROM factures f JOIN clients c ON f.client_id=c.id
           WHERE f.date_facture LIKE ? AND f.statut='validee'
           GROUP BY c.id ORDER BY ca_usd DESC LIMIT 5""", (f"{mois}%",)
    ).fetchall()

    nb_achats_mois = db.execute(
        "SELECT COUNT(*) FROM factures_achat WHERE date_facture LIKE ? AND statut='validee'", (f"{mois}%",)
    ).fetchone()[0]

    db.close()
    return jsonify({
        'ca_jour_usd': ca_jour_usd, 'ca_mois_usd': ca_mois_usd, 'nb_factures': nb_factures,
        'nb_achats_mois': nb_achats_mois,
        'taux_change': taux,
        'alertes_stock': [dict(a) for a in alertes],
        'ca_par_mois': [dict(r) for r in reversed(ca_par_mois)],
        'cours_usd': [dict(r) for r in reversed(cours_usd)],
        'top_clients': [dict(r) for r in top_clients],
    })
