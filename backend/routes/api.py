from flask import Blueprint, request, jsonify
from database import get_db
from datetime import date, datetime

api = Blueprint('api', __name__)

# ══════════════════════════════════════════════
#  PRIX DU FER
# ══════════════════════════════════════════════

@api.route('/prix-fer', methods=['GET'])
def get_prix_fer():
    jours = request.args.get('jours', 30, type=int)
    db = get_db()
    rows = db.execute("SELECT date, prix_kg, note FROM prix_fer ORDER BY date DESC LIMIT ?", (jours,)).fetchall()
    db.close()
    return jsonify([dict(r) for r in rows])

@api.route('/prix-fer/today', methods=['GET'])
def get_prix_today():
    db = get_db()
    today = date.today().isoformat()
    row = db.execute("SELECT date, prix_kg, note FROM prix_fer WHERE date <= ? ORDER BY date DESC LIMIT 1", (today,)).fetchone()
    db.close()
    return jsonify(dict(row) if row else {'prix_kg': 0, 'date': today})

@api.route('/prix-fer', methods=['POST'])
def set_prix_fer():
    data = request.json
    db = get_db()
    today = date.today().isoformat()
    db.execute(
        "INSERT OR REPLACE INTO prix_fer (date, prix_kg, note) VALUES (?,?,?)",
        (data.get('date', today), data['prix_kg'], data.get('note', ''))
    )
    db.commit(); db.close()
    return jsonify({'ok': True})

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
        "INSERT INTO produits (nom_fr, nom_ar, nom_en, categorie, dimension) VALUES (?,?,?,?,?)",
        (data['nom_fr'], data['nom_ar'], data.get('nom_en',''), data['categorie'], data.get('dimension',''))
    )
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
    q = """SELECT f.*, c.nom as client_nom FROM factures f
           LEFT JOIN clients c ON f.client_id=c.id"""
    if statut:
        q += " WHERE f.statut=?"
        rows = db.execute(q + " ORDER BY f.date_facture DESC LIMIT ?", (statut, limit)).fetchall()
    else:
        rows = db.execute(q + " ORDER BY f.date_facture DESC LIMIT ?", (limit,)).fetchall()
    db.close()
    return jsonify([dict(r) for r in rows])

@api.route('/factures', methods=['POST'])
def create_facture():
    data = request.json
    db = get_db()
    today = date.today().isoformat()
    row = db.execute("SELECT prix_kg FROM prix_fer WHERE date <= ? ORDER BY date DESC LIMIT 1", (today,)).fetchone()
    prix_fer = row[0] if row else 0
    taux_row = db.execute("SELECT ls_par_usd FROM taux_change WHERE date <= ? ORDER BY date DESC LIMIT 1", (today,)).fetchone()
    taux = taux_row[0] if taux_row else 1
    devise = data.get('devise', 'LS')

    numero = _next_numero(db, 'factures', 'FAC')
    db.execute(
        """INSERT INTO factures (numero, client_id, date_facture, prix_fer_jour, devise, taux_change, statut)
           VALUES (?,?,?,?,?,?,'brouillon')""",
        (numero, data.get('client_id'), today, prix_fer, devise, taux)
    )
    fac_id = db.execute("SELECT last_insert_rowid()").fetchone()[0]
    _log_hist(db, 'facture_historique', 'facture_id', fac_id, 'creation', nouvelle=f'Facture {numero} créée')
    db.commit(); db.close()
    return jsonify({'ok': True, 'facture_id': fac_id, 'numero': numero, 'prix_fer_jour': prix_fer})

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
    hist = db.execute(
        "SELECT * FROM facture_historique WHERE facture_id=? ORDER BY date_action DESC", (fac_id,)
    ).fetchall()
    db.close()
    return jsonify({
        'facture': dict(fac),
        'lignes': [dict(l) for l in lignes],
        'operations': [dict(o) for o in ops],
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
    fac = db.execute("SELECT prix_fer_jour, devise, taux_change, statut FROM factures WHERE id=?", (fac_id,)).fetchone()
    prix_kg = fac['prix_fer_jour']
    if fac['devise'] == 'USD':
        prix_kg = round(prix_kg / fac['taux_change'], 4)
    poids = float(data.get('poids_kg', 0))
    sous = round(poids * prix_kg, 2 if fac['devise']=='USD' else 0)
    prod = db.execute("SELECT nom_fr, nom_ar FROM produits WHERE id=?", (data['produit_id'],)).fetchone()

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
    fac = db.execute("SELECT statut FROM factures WHERE id=?", (fac_id,)).fetchone()
    op  = db.execute("SELECT prix_unitaire, nom_fr FROM operations WHERE id=?", (data['operation_id'],)).fetchone()
    qte = float(data.get('quantite', 1))
    sous = round(op['prix_unitaire'] * qte, 0)
    db.execute(
        """INSERT INTO facture_operations (facture_id, operation_id, quantite, prix_unitaire, sous_total)
           VALUES (?,?,?,?,?)""",
        (fac_id, data['operation_id'], qte, op['prix_unitaire'], sous)
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

def _recalc_facture(db, fac_id):
    fac = db.execute("SELECT devise FROM factures WHERE id=?", (fac_id,)).fetchone()
    decimals = 2 if fac and fac['devise'] == 'USD' else 0
    r1 = db.execute("SELECT COALESCE(SUM(sous_total),0) FROM facture_lignes WHERE facture_id=?", (fac_id,)).fetchone()[0]
    r2 = db.execute("SELECT COALESCE(SUM(sous_total),0) FROM facture_operations WHERE facture_id=?", (fac_id,)).fetchone()[0]
    db.execute(
        "UPDATE factures SET sous_total_fer=?, sous_total_operations=?, total=?, updated_at=datetime('now') WHERE id=?",
        (round(r1,decimals), round(r2,decimals), round(r1+r2,decimals), fac_id)
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
    devise = data.get('devise', 'LS')
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
    hist = db.execute(
        "SELECT * FROM facture_achat_historique WHERE facture_achat_id=? ORDER BY date_action DESC", (ach_id,)
    ).fetchall()
    db.close()
    return jsonify({'facture': dict(fac), 'lignes': [dict(l) for l in lignes], 'historique': [dict(h) for h in hist]})

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

def _recalc_facture_achat(db, ach_id):
    r = db.execute("SELECT COALESCE(SUM(sous_total),0) FROM facture_achat_lignes WHERE facture_achat_id=?", (ach_id,)).fetchone()[0]
    db.execute("UPDATE factures_achat SET sous_total=?, total=?, updated_at=datetime('now') WHERE id=?", (round(r,0), round(r,0), ach_id))

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
    db.execute(
        """INSERT INTO inventaire (produit_id, stock_kg) VALUES (?,?)
           ON CONFLICT(produit_id) DO UPDATE SET stock_kg=?, derniere_maj=datetime('now')""",
        (prod_id, data['stock_kg'], data['stock_kg'])
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
#  DASHBOARD
# ══════════════════════════════════════════════

@api.route('/dashboard', methods=['GET'])
def get_dashboard():
    db = get_db()
    today = date.today().isoformat()

    ca_jour = db.execute(
        "SELECT COALESCE(SUM(total),0) FROM factures WHERE date_facture=? AND statut='validee' AND devise='LS'", (today,)
    ).fetchone()[0]
    mois = today[:7]
    ca_mois = db.execute(
        "SELECT COALESCE(SUM(total),0) FROM factures WHERE date_facture LIKE ? AND statut='validee' AND devise='LS'", (f"{mois}%",)
    ).fetchone()[0]
    nb_factures = db.execute(
        "SELECT COUNT(*) FROM factures WHERE date_facture LIKE ? AND statut='validee'", (f"{mois}%",)
    ).fetchone()[0]

    prix_row = db.execute("SELECT prix_kg, date FROM prix_fer WHERE date <= ? ORDER BY date DESC LIMIT 1", (today,)).fetchone()
    prix_fer = dict(prix_row) if prix_row else {'prix_kg': 0, 'date': today}

    taux_row = db.execute("SELECT ls_par_usd, date FROM taux_change WHERE date <= ? ORDER BY date DESC LIMIT 1", (today,)).fetchone()
    taux = dict(taux_row) if taux_row else {'ls_par_usd': 0, 'date': today}

    alertes = db.execute(
        """SELECT p.nom_fr, p.nom_ar, i.stock_kg, i.stock_min_alerte
           FROM inventaire i JOIN produits p ON i.produit_id=p.id WHERE i.stock_kg < i.stock_min_alerte"""
    ).fetchall()

    ca_par_mois = db.execute(
        """SELECT substr(date_facture,1,7) as mois, SUM(total) as ca FROM factures
           WHERE statut='validee' AND devise='LS' GROUP BY mois ORDER BY mois DESC LIMIT 6"""
    ).fetchall()

    cours_fer = db.execute("SELECT date, prix_kg FROM prix_fer ORDER BY date DESC LIMIT 30").fetchall()
    cours_usd = db.execute("SELECT date, ls_par_usd FROM taux_change ORDER BY date DESC LIMIT 30").fetchall()

    top_clients = db.execute(
        """SELECT c.nom, SUM(f.total) as ca FROM factures f JOIN clients c ON f.client_id=c.id
           WHERE f.date_facture LIKE ? AND f.statut='validee' AND f.devise='LS'
           GROUP BY c.id ORDER BY ca DESC LIMIT 5""", (f"{mois}%",)
    ).fetchall()

    nb_achats_mois = db.execute(
        "SELECT COUNT(*) FROM factures_achat WHERE date_facture LIKE ? AND statut='validee'", (f"{mois}%",)
    ).fetchone()[0]

    db.close()
    return jsonify({
        'ca_jour': ca_jour, 'ca_mois': ca_mois, 'nb_factures': nb_factures,
        'nb_achats_mois': nb_achats_mois,
        'prix_fer': prix_fer, 'taux_change': taux,
        'alertes_stock': [dict(a) for a in alertes],
        'ca_par_mois': [dict(r) for r in reversed(ca_par_mois)],
        'cours_fer': [dict(r) for r in reversed(cours_fer)],
        'cours_usd': [dict(r) for r in reversed(cours_usd)],
        'top_clients': [dict(r) for r in top_clients],
    })
