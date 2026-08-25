import sqlite3
import os
from datetime import datetime, date, timedelta
import random

DB_PATH = os.environ.get('DATABASE_PATH', './data/fer.db')

def get_db():
    conn = sqlite3.connect(DB_PATH, timeout=15)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    # Suivi de la connexion pour garantir sa fermeture en fin de requete (voir
    # close_db plus bas). Sans ca, une route qui plante avant d'avoir appele
    # db.close() laisse la connexion ouverte, potentiellement avec une
    # transaction en cours -> toutes les requetes suivantes echouent avec
    # "database is locked", jusqu'au redemarrage complet de l'application
    # (exactement ce qui se produit dans les logs : les tentatives repetees
    # apres le premier plantage FOREIGN KEY tombent toutes sur ce blocage).
    try:
        from flask import g
        conns = g.get('_db_conns', [])
        conns.append(conn)
        g._db_conns = conns
    except RuntimeError:
        pass  # appel hors contexte Flask (scripts de migration, tests) - pas grave
    return conn

def close_db(exception=None):
    """A appeler via app.teardown_appcontext : ferme (avec rollback si la
    requete s'est terminee en erreur) TOUTES les connexions ouvertes durant
    cette requete, meme celles qu'une route n'a pas explicitement fermees
    suite a une exception."""
    from flask import g
    conns = g.pop('_db_conns', [])
    for conn in conns:
        try:
            if exception is not None:
                conn.rollback()
        except Exception:
            pass
        try:
            conn.close()
        except Exception:
            pass

def init_db():
    conn = get_db()
    c = conn.cursor()

    c.executescript('''
    CREATE TABLE IF NOT EXISTS produits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom_fr TEXT NOT NULL,
        nom_ar TEXT NOT NULL,
        nom_en TEXT NOT NULL,
        categorie TEXT NOT NULL,
        dimension TEXT,
        unite TEXT DEFAULT 'kg',
        prix_achat_kg REAL DEFAULT 0,   -- prix d'achat de reference (informatif, sert de base marge)
        prix_vente_kg REAL DEFAULT 0,   -- prix de vente : remplace le calcul via prix_fer generique
        actif INTEGER DEFAULT 1,
        created_at TEXT DEFAULT (datetime('now'))
    );

    -- Categories de produits : modifiables par l'utilisateur (avant, une liste
    -- figee dans le code). 'cle' est la valeur stockee dans produits.categorie.
    CREATE TABLE IF NOT EXISTS categories (
        cle TEXT PRIMARY KEY,
        nom_fr TEXT NOT NULL,
        nom_ar TEXT NOT NULL,
        nom_en TEXT,
        icon TEXT DEFAULT '📦',
        ordre INTEGER DEFAULT 0
    );

    -- Reglages globaux du programme
    CREATE TABLE IF NOT EXISTS settings (
        cle TEXT PRIMARY KEY,
        valeur TEXT
    );

    -- Cours du dollar, historique quotidien
    CREATE TABLE IF NOT EXISTS taux_change (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL UNIQUE,
        ls_par_usd REAL NOT NULL,   -- combien de ل.س pour 1 dollar
        note TEXT,
        created_at TEXT DEFAULT (datetime('now'))
    );

    -- prix_unitaire est exprime en USD (coherent avec montant_du_usd des factures).
    -- La conversion vers LS se fait uniquement a l'affichage, au taux du jour.
    CREATE TABLE IF NOT EXISTS operations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom_fr TEXT NOT NULL,
        nom_ar TEXT NOT NULL,
        nom_en TEXT NOT NULL,
        prix_unitaire REAL NOT NULL,     -- exprime en USD (coherent avec le reste de l'app)
        unite TEXT DEFAULT 'unité',
        actif INTEGER DEFAULT 1
    );

    -- Types de lignes libres predefinis (main-d'oeuvre, remise, frais...), configurables
    -- par l'utilisateur dans les Reglages. Le montant reste modifiable a chaque utilisation.
    -- montant_par_defaut est exprime en USD (coherent avec le reste de l'app).
    CREATE TABLE IF NOT EXISTS types_lignes_libres (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom_fr TEXT NOT NULL,
        nom_ar TEXT NOT NULL,
        nom_en TEXT NOT NULL,
        signe_par_defaut TEXT DEFAULT 'plus',   -- 'plus' ou 'moins', pour pre-remplir le signe
        montant_par_defaut REAL DEFAULT 0,      -- en USD, suggestion modifiable
        actif INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        telephone TEXT,
        email TEXT,
        adresse TEXT,
        note TEXT,
        created_at TEXT DEFAULT (datetime('now'))
    );

    -- NOUVEAU : fournisseurs, structure miroir des clients
    CREATE TABLE IF NOT EXISTS fournisseurs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        telephone TEXT,
        email TEXT,
        adresse TEXT,
        note TEXT,
        created_at TEXT DEFAULT (datetime('now'))
    );

    -- Factures de VENTE (existant, enrichi devise + paiement)
    CREATE TABLE IF NOT EXISTS factures (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        numero TEXT NOT NULL UNIQUE,
        client_id INTEGER,
        date_facture TEXT NOT NULL,
        prix_fer_jour REAL NOT NULL,
        devise TEXT DEFAULT 'LS',        -- 'LS' ou 'USD' (devise d'AFFICHAGE)
        taux_change REAL DEFAULT 1,      -- taux figé au moment de la validation
        sous_total_fer REAL DEFAULT 0,
        sous_total_operations REAL DEFAULT 0,
        sous_total_lignes_libres REAL DEFAULT 0,
        total REAL DEFAULT 0,            -- total dans la devise d'affichage
        montant_du_usd REAL DEFAULT 0,   -- NOUVEAU : montant reellement du, fige en USD (protege des fluctuations)
        statut TEXT DEFAULT 'brouillon', -- brouillon | validee | annulee
        statut_paiement TEXT DEFAULT 'en_attente', -- en_attente | credit_differe | paye
        date_paiement TEXT,              -- date a laquelle le paiement a ete recu
        taux_paiement REAL,              -- taux du jour du paiement (pour affichage informatif)
        export_uid_magasin TEXT,         -- identifiant unique si importee depuis Fer Magasin (anti-doublon)
        heure_vente TEXT,                -- heure reelle de la vente (HH:MM) - capturee a la creation,
                                          -- ou recuperee depuis Fer Magasin si importee (distinct de created_at
                                          -- qui, pour une facture importee, ne refleterait que l'heure d'import)
        note TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (client_id) REFERENCES clients(id)
    );

    CREATE TABLE IF NOT EXISTS facture_lignes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        facture_id INTEGER NOT NULL,
        produit_id INTEGER,
        description_fr TEXT,
        description_ar TEXT,
        poids_kg REAL DEFAULT 0,
        prix_kg REAL DEFAULT 0,
        sous_total REAL DEFAULT 0,
        FOREIGN KEY (facture_id) REFERENCES factures(id) ON DELETE CASCADE,
        FOREIGN KEY (produit_id) REFERENCES produits(id)
    );

    CREATE TABLE IF NOT EXISTS facture_operations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        facture_id INTEGER NOT NULL,
        operation_id INTEGER NOT NULL,
        quantite REAL DEFAULT 1,
        prix_unitaire REAL DEFAULT 0,    -- modifiable par facture, independant du prix catalogue
        sous_total REAL DEFAULT 0,
        FOREIGN KEY (facture_id) REFERENCES factures(id) ON DELETE CASCADE,
        FOREIGN KEY (operation_id) REFERENCES operations(id)
    );

    -- NOUVEAU : lignes libres (main-d'oeuvre, remise, ajout divers)
    -- Montant positif = ajout, montant negatif = remise
    CREATE TABLE IF NOT EXISTS facture_lignes_libres (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        facture_id INTEGER NOT NULL,
        description TEXT NOT NULL,
        montant REAL NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (facture_id) REFERENCES factures(id) ON DELETE CASCADE
    );

    -- NOUVEAU : audit trail des factures de vente
    CREATE TABLE IF NOT EXISTS facture_historique (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        facture_id INTEGER NOT NULL,
        action TEXT NOT NULL,          -- 'creation' | 'modification' | 'validation' | 'annulation' | 'suppression_ligne' | ...
        champ TEXT,                    -- quel champ a changé (optionnel)
        ancienne_valeur TEXT,
        nouvelle_valeur TEXT,
        date_action TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (facture_id) REFERENCES factures(id) ON DELETE CASCADE
    );

    -- NOUVEAU : factures d'ACHAT (fournisseurs), miroir des factures de vente
    CREATE TABLE IF NOT EXISTS factures_achat (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        numero TEXT NOT NULL UNIQUE,
        fournisseur_id INTEGER,
        date_facture TEXT NOT NULL,
        devise TEXT DEFAULT 'LS',
        taux_change REAL DEFAULT 1,
        sous_total REAL DEFAULT 0,
        sous_total_lignes_libres REAL DEFAULT 0,
        total REAL DEFAULT 0,
        statut TEXT DEFAULT 'brouillon',
        note TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (fournisseur_id) REFERENCES fournisseurs(id)
    );

    CREATE TABLE IF NOT EXISTS facture_achat_lignes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        facture_achat_id INTEGER NOT NULL,
        produit_id INTEGER,
        description_fr TEXT,
        description_ar TEXT,
        poids_kg REAL DEFAULT 0,
        prix_kg REAL DEFAULT 0,
        sous_total REAL DEFAULT 0,
        FOREIGN KEY (facture_achat_id) REFERENCES factures_achat(id) ON DELETE CASCADE,
        FOREIGN KEY (produit_id) REFERENCES produits(id)
    );

    -- Lignes libres sur factures d'achat (frais de transport, remise fournisseur...)
    -- symetrique a facture_lignes_libres cote ventes
    CREATE TABLE IF NOT EXISTS facture_achat_lignes_libres (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        facture_achat_id INTEGER NOT NULL,
        description TEXT NOT NULL,
        montant REAL NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (facture_achat_id) REFERENCES factures_achat(id) ON DELETE CASCADE
    );

    -- NOUVEAU : audit trail des factures d'achat
    CREATE TABLE IF NOT EXISTS facture_achat_historique (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        facture_achat_id INTEGER NOT NULL,
        action TEXT NOT NULL,
        champ TEXT,
        ancienne_valeur TEXT,
        nouvelle_valeur TEXT,
        date_action TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (facture_achat_id) REFERENCES factures_achat(id) ON DELETE CASCADE
    );

    -- NOUVEAU V4.3 : paiements (acomptes), generique pour ventes ET achats
    -- Permet des paiements partiels dans n'importe quelle devise, converti
    -- et fige en USD au moment du paiement pour un calcul de solde fiable.
    CREATE TABLE IF NOT EXISTS paiements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,              -- 'vente' ou 'achat'
        facture_id INTEGER NOT NULL,     -- reference factures.id (vente) ou factures_achat.id (achat)
        montant REAL NOT NULL,
        devise TEXT NOT NULL DEFAULT 'LS',
        taux_change REAL NOT NULL DEFAULT 1,
        montant_usd REAL NOT NULL DEFAULT 0,  -- fige au moment du paiement
        date_paiement TEXT NOT NULL,
        note TEXT,
        created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS inventaire (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        produit_id INTEGER NOT NULL UNIQUE,
        stock_kg REAL DEFAULT 0,
        stock_min_alerte REAL DEFAULT 100,
        derniere_maj TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (produit_id) REFERENCES produits(id)
    );
    ''')

    conn.commit()

    count = c.execute("SELECT COUNT(*) FROM produits").fetchone()[0]
    if count == 0:
        _seed_demo(conn, c)
    else:
        _migrate_if_needed(conn, c)

    _seed_default_categories(conn, c)

    conn.close()


def _seed_default_categories(conn, c):
    """Categories par defaut : inseree une seule fois (INSERT OR IGNORE), que la
    base soit neuve ou tres ancienne. L'utilisateur peut ensuite les modifier
    ou en ajouter d'autres depuis la page Produits - elles ne sont plus figees
    dans le code."""
    # Migration douce : colonne nom_en ajoutee apres coup sur une base existante
    cols_cat = [r[1] for r in c.execute("PRAGMA table_info(categories)").fetchall()]
    if 'nom_en' not in cols_cat:
        try:
            c.execute("ALTER TABLE categories ADD COLUMN nom_en TEXT")
            conn.commit()
        except Exception as e:
            print(f"Migration categories.nom_en: {e}")

    categories_defaut = [
        ('rond_beton', 'Rond à béton',  'حديد مسلح', 'Rebar',    '🔩', 1),
        ('tube',       'Tube',          'أنبوب',     'Tube',     '▭', 2),
        ('plat',       'Plat',          'حديد مسطح', 'Flat bar', '▬', 3),
        ('corniere',   'Cornière',      'زاوية',     'Angle',    '📐', 4),
        ('profile',    'Profilé',       'بروفيل',    'Profile',  '⌶', 5),
        ('treillis',   'Treillis',      'شبكة',      'Mesh',     '▦', 6),
    ]
    for cle, nom_fr, nom_ar, nom_en, icon, ordre in categories_defaut:
        c.execute(
            "INSERT OR IGNORE INTO categories (cle, nom_fr, nom_ar, nom_en, icon, ordre) VALUES (?,?,?,?,?,?)",
            (cle, nom_fr, nom_ar, nom_en, icon, ordre)
        )
    conn.commit()


def _migrate_if_needed(conn, c):
    """Ajoute les nouvelles colonnes/tables si la base existe déjà (V1 -> V2/V3)."""
    cols = [r[1] for r in c.execute("PRAGMA table_info(factures)").fetchall()]

    # V5.0 : suppression du "cours du fer" generique (voir plus bas, apres l'ajout
    # des colonnes prix_achat_kg/prix_vente_kg dont cette migration a besoin).

    if 'devise' not in cols:
        try:
            c.execute("ALTER TABLE factures ADD COLUMN devise TEXT DEFAULT 'LS'")
        except Exception as e:
            print(f"Migration devise: {e}")

    if 'taux_change' not in cols:
        try:
            c.execute("ALTER TABLE factures ADD COLUMN taux_change REAL DEFAULT 1")
        except Exception as e:
            print(f"Migration taux_change: {e}")

    # Migration one-shot : operations.prix_unitaire et types_lignes_libres.montant_par_defaut
    # etaient stockes en LS jusqu'a V4.9, desormais en USD. On convertit une seule fois,
    # trace par un flag dans settings pour ne jamais reconvertir par erreur.
    c.execute("CREATE TABLE IF NOT EXISTS settings (cle TEXT PRIMARY KEY, valeur TEXT)")
    deja_converti = c.execute("SELECT valeur FROM settings WHERE cle='migration_usd_ops_v49'").fetchone()
    if not deja_converti:
        try:
            taux_row = c.execute("SELECT ls_par_usd FROM taux_change ORDER BY date DESC LIMIT 1").fetchone()
            taux = taux_row['ls_par_usd'] if taux_row else 14500
            if taux and taux > 0:
                c.execute("UPDATE operations SET prix_unitaire = ROUND(prix_unitaire / ?, 2)", (taux,))
                # types_lignes_libres peut ne pas encore exister a ce stade sur une base tres ancienne
                exists_tll = c.execute(
                    "SELECT name FROM sqlite_master WHERE type='table' AND name='types_lignes_libres'"
                ).fetchone()
                if exists_tll:
                    c.execute("UPDATE types_lignes_libres SET montant_par_defaut = ROUND(montant_par_defaut / ?, 2)", (taux,))
            c.execute("INSERT OR REPLACE INTO settings (cle, valeur) VALUES ('migration_usd_ops_v49', '1')")
        except Exception as e:
            print(f"Migration USD operations/types_lignes_libres: {e}")

    if 'updated_at' not in cols:
        try:
            c.execute("ALTER TABLE factures ADD COLUMN updated_at TEXT")
            c.execute("UPDATE factures SET updated_at = datetime('now') WHERE updated_at IS NULL")
        except Exception as e:
            print(f"Migration updated_at: {e}")

    # V4.6 : prix achat/vente par produit
    cols_prod = [r[1] for r in c.execute("PRAGMA table_info(produits)").fetchall()]
    if 'prix_achat_kg' not in cols_prod:
        try:
            c.execute("ALTER TABLE produits ADD COLUMN prix_achat_kg REAL DEFAULT 0")
        except Exception as e:
            print(f"Migration prix_achat_kg: {e}")
    if 'prix_vente_kg' not in cols_prod:
        try:
            c.execute("ALTER TABLE produits ADD COLUMN prix_vente_kg REAL DEFAULT 0")
        except Exception as e:
            print(f"Migration prix_vente_kg: {e}")

    # V5.0 : suppression du "cours du fer" generique. Chaque produit a desormais
    # son propre prix (prix_vente_kg), point. Avant de supprimer la table prix_fer,
    # on comble une derniere fois les produits qui n'auraient pas encore de prix
    # avec le dernier cours connu, pour ne jamais laisser un produit a 0.
    exists_prix_fer = c.execute(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='prix_fer'"
    ).fetchone()
    if exists_prix_fer:
        try:
            dernier_prix = c.execute("SELECT prix_kg FROM prix_fer ORDER BY date DESC LIMIT 1").fetchone()
            if dernier_prix and dernier_prix['prix_kg']:
                c.execute(
                    "UPDATE produits SET prix_vente_kg=? WHERE prix_vente_kg IS NULL OR prix_vente_kg=0",
                    (dernier_prix['prix_kg'],)
                )
                c.execute(
                    "UPDATE produits SET prix_achat_kg=? WHERE prix_achat_kg IS NULL OR prix_achat_kg=0",
                    (round(dernier_prix['prix_kg'] * 0.9, 0),)
                )
        except Exception as e:
            print(f"Migration report prix produits: {e}")
        try:
            c.execute("DROP TABLE IF EXISTS prix_fer")
        except Exception as e:
            print(f"Migration suppression prix_fer: {e}")

    # Table settings (creee ici pour bases anciennes qui n'ont pas le CREATE TABLE initial)
    c.execute("CREATE TABLE IF NOT EXISTS settings (cle TEXT PRIMARY KEY, valeur TEXT)")

    # Valeurs par defaut des reglages si absentes
    defaults = {
        'devise_defaut': 'USD',
        'afficher_devise_secondaire': '1',
    }
    for cle, val in defaults.items():
        exists = c.execute("SELECT 1 FROM settings WHERE cle=?", (cle,)).fetchone()
        if not exists:
            c.execute("INSERT INTO settings (cle, valeur) VALUES (?,?)", (cle, val))

    # Table types_lignes_libres (creee ici pour bases anciennes)
    c.execute('''CREATE TABLE IF NOT EXISTS types_lignes_libres (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom_fr TEXT NOT NULL,
        nom_ar TEXT NOT NULL,
        nom_en TEXT NOT NULL,
        signe_par_defaut TEXT DEFAULT 'plus',
        montant_par_defaut REAL DEFAULT 0,
        actif INTEGER DEFAULT 1
    )''')
    cnt_tll = c.execute("SELECT COUNT(*) FROM types_lignes_libres").fetchone()[0]
    if cnt_tll == 0:
        _seed_types_lignes_libres(c)

    cols_cli = [r[1] for r in c.execute("PRAGMA table_info(clients)").fetchall()]
    if 'email' not in cols_cli:
        try:
            c.execute("ALTER TABLE clients ADD COLUMN email TEXT")
        except Exception as e:
            print(f"Migration email: {e}")

    # V4.2 : montant du fige en USD + statut de paiement
    if 'montant_du_usd' not in cols:
        try:
            c.execute("ALTER TABLE factures ADD COLUMN montant_du_usd REAL DEFAULT 0")
        except Exception as e:
            print(f"Migration montant_du_usd: {e}")

    if 'statut_paiement' not in cols:
        try:
            c.execute("ALTER TABLE factures ADD COLUMN statut_paiement TEXT DEFAULT 'en_attente'")
        except Exception as e:
            print(f"Migration statut_paiement: {e}")

    if 'date_paiement' not in cols:
        try:
            c.execute("ALTER TABLE factures ADD COLUMN date_paiement TEXT")
        except Exception as e:
            print(f"Migration date_paiement: {e}")

    if 'taux_paiement' not in cols:
        try:
            c.execute("ALTER TABLE factures ADD COLUMN taux_paiement REAL")
        except Exception as e:
            print(f"Migration taux_paiement: {e}")

    if 'sous_total_lignes_libres' not in cols:
        try:
            c.execute("ALTER TABLE factures ADD COLUMN sous_total_lignes_libres REAL DEFAULT 0")
        except Exception as e:
            print(f"Migration sous_total_lignes_libres: {e}")

    if 'export_uid_magasin' not in cols:
        try:
            c.execute("ALTER TABLE factures ADD COLUMN export_uid_magasin TEXT")
        except Exception as e:
            print(f"Migration export_uid_magasin: {e}")

    if 'heure_vente' not in cols:
        try:
            c.execute("ALTER TABLE factures ADD COLUMN heure_vente TEXT")
        except Exception as e:
            print(f"Migration heure_vente: {e}")

    # Table facture_lignes_libres (creee par le CREATE TABLE IF NOT EXISTS plus haut,
    # mais on s'assure qu'elle existe meme si la base est tres ancienne)
    c.execute('''CREATE TABLE IF NOT EXISTS facture_lignes_libres (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        facture_id INTEGER NOT NULL,
        description TEXT NOT NULL,
        montant REAL NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (facture_id) REFERENCES factures(id) ON DELETE CASCADE
    )''')

    # V4.3 : table paiements (acomptes), generique ventes + achats
    c.execute('''CREATE TABLE IF NOT EXISTS paiements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        facture_id INTEGER NOT NULL,
        montant REAL NOT NULL,
        devise TEXT NOT NULL DEFAULT 'LS',
        taux_change REAL NOT NULL DEFAULT 1,
        montant_usd REAL NOT NULL DEFAULT 0,
        date_paiement TEXT NOT NULL,
        note TEXT,
        created_at TEXT DEFAULT (datetime('now'))
    )''')

    # V4.3 : montant_du_usd + statut_paiement egalement sur factures_achat
    cols_achat = [r[1] for r in c.execute("PRAGMA table_info(factures_achat)").fetchall()]
    if 'montant_du_usd' not in cols_achat:
        try:
            c.execute("ALTER TABLE factures_achat ADD COLUMN montant_du_usd REAL DEFAULT 0")
        except Exception as e:
            print(f"Migration achat montant_du_usd: {e}")
    if 'statut_paiement' not in cols_achat:
        try:
            c.execute("ALTER TABLE factures_achat ADD COLUMN statut_paiement TEXT DEFAULT 'en_attente'")
        except Exception as e:
            print(f"Migration achat statut_paiement: {e}")
    if 'sous_total_lignes_libres' not in cols_achat:
        try:
            c.execute("ALTER TABLE factures_achat ADD COLUMN sous_total_lignes_libres REAL DEFAULT 0")
        except Exception as e:
            print(f"Migration achat sous_total_lignes_libres: {e}")

    c.execute('''CREATE TABLE IF NOT EXISTS facture_achat_lignes_libres (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        facture_achat_id INTEGER NOT NULL,
        description TEXT NOT NULL,
        montant REAL NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (facture_achat_id) REFERENCES factures_achat(id) ON DELETE CASCADE
    )''')

    # Calcul retroactif montant_du_usd pour factures_achat existantes
    try:
        rows = c.execute("SELECT id, total, devise, taux_change FROM factures_achat WHERE montant_du_usd = 0 OR montant_du_usd IS NULL").fetchall()
        for r in rows:
            if r['devise'] == 'USD':
                usd = r['total']
            else:
                taux = r['taux_change'] if r['taux_change'] else 1
                usd = round(r['total'] / taux, 2) if taux else 0
            c.execute("UPDATE factures_achat SET montant_du_usd=? WHERE id=?", (usd, r['id']))
    except Exception as e:
        print(f"Migration retroactive achat montant_du_usd: {e}")

    # Calcul retroactif du montant_du_usd pour les factures existantes qui n'en ont pas
    try:
        rows = c.execute("SELECT id, total, devise, taux_change FROM factures WHERE montant_du_usd = 0 OR montant_du_usd IS NULL").fetchall()
        for r in rows:
            if r['devise'] == 'USD':
                usd = r['total']
            else:
                taux = r['taux_change'] if r['taux_change'] else 1
                usd = round(r['total'] / taux, 2) if taux else 0
            c.execute("UPDATE factures SET montant_du_usd=? WHERE id=?", (usd, r['id']))
    except Exception as e:
        print(f"Migration retroactive montant_du_usd: {e}")

    cnt = c.execute("SELECT COUNT(*) FROM taux_change").fetchone()[0]
    if cnt == 0:
        _seed_taux_change(c)

    cnt_f = c.execute("SELECT COUNT(*) FROM fournisseurs").fetchone()[0]
    if cnt_f == 0:
        _seed_fournisseurs(c)

    conn.commit()


def _seed_taux_change(c):
    today = date.today()
    taux = 14500.0  # ل.س pour 1 USD, ordre de grandeur réaliste
    for i in range(90, -1, -1):
        d = today - timedelta(days=i)
        variation = random.uniform(-80, 100)
        taux = max(13000, min(16000, taux + variation))
        c.execute(
            "INSERT OR IGNORE INTO taux_change (date, ls_par_usd) VALUES (?,?)",
            (d.isoformat(), round(taux, 0))
        )


def _seed_fournisseurs(c):
    fournisseurs = [
        ('Hadid Al-Sharq', '+963 41 556 234', 'contact@hadidsharq.sy', 'المنطقة الصناعية، حمص', 'Fournisseur principal rond à béton'),
        ('Metal Import Latakia', '+963 41 778 900', '', 'اللاذقية، الميناء', 'Import tubes et profilés'),
        ('Ets. Karam Fer', '+963 43 221 456', '', 'طرطوس', 'Fournisseur local, livraison rapide'),
    ]
    c.executemany(
        "INSERT INTO fournisseurs (nom, telephone, email, adresse, note) VALUES (?,?,?,?,?)",
        fournisseurs
    )


def _seed_types_lignes_libres(c):
    """Types predefinis de lignes libres (main-d'oeuvre, remises, frais divers),
    configurables ensuite par l'utilisateur dans les Reglages.
    Montants exprimes en USD."""
    types = [
        # (nom_fr, nom_ar, nom_en, signe, montant_suggere_usd)
        ("Main-d'œuvre",         'أجرة عمل',           'Labor',                'plus',  1.5),
        ('Main-d\'œuvre spécialisée', 'أجرة عمل متخصصة', 'Specialized labor',   'plus',  2.5),
        ('Frais de transport',   'أجور نقل',           'Transport fee',        'plus',  1.0),
        ('Frais de livraison',   'أجور توصيل',         'Delivery fee',         'plus',  0.7),
        ('Remise fidélité',      'تخفيض للزبون المميز', 'Loyalty discount',    'moins', 0.7),
        ('Remise quantité',      'تخفيض على الكمية',   'Bulk discount',        'moins', 1.0),
        ('Remise commerciale',   'تخفيض تجاري',        'Commercial discount',  'moins', 1.5),
        ('Ajustement divers',    'تعديل متنوع',        'Miscellaneous adjustment', 'plus', 0),
    ]
    c.executemany(
        "INSERT INTO types_lignes_libres (nom_fr, nom_ar, nom_en, signe_par_defaut, montant_par_defaut) VALUES (?,?,?,?,?)",
        types
    )


def _seed_demo(conn, c, scenario='standard'):
    """Insère des données de démonstration réalistes.
    scenario: 'standard' (activite normale), 'gros_volume' (beaucoup de factures),
              'credits' (beaucoup de paiements differes/en attente)."""

    SCENARIOS = {
        'standard':    {'nb_factures': 30, 'nb_achats': 15, 'pct_credit': 0.15},
        'gros_volume': {'nb_factures': 90, 'nb_achats': 40, 'pct_credit': 0.15},
        'credits':     {'nb_factures': 35, 'nb_achats': 15, 'pct_credit': 0.55},
    }
    conf = SCENARIOS.get(scenario, SCENARIOS['standard'])

    produits = [
        ('Rond à béton 8mm',   'حديد مسلح 8 ملم',  'Rebar 8mm',   'rond_beton', 'Ø8mm',    'kg'),
        ('Rond à béton 10mm',  'حديد مسلح 10 ملم', 'Rebar 10mm',  'rond_beton', 'Ø10mm',   'kg'),
        ('Rond à béton 12mm',  'حديد مسلح 12 ملم', 'Rebar 12mm',  'rond_beton', 'Ø12mm',   'kg'),
        ('Rond à béton 14mm',  'حديد مسلح 14 ملم', 'Rebar 14mm',  'rond_beton', 'Ø14mm',   'kg'),
        ('Rond à béton 16mm',  'حديد مسلح 16 ملم', 'Rebar 16mm',  'rond_beton', 'Ø16mm',   'kg'),
        ('Tube carré 20×20',   'أنبوب مربع 20×20', 'Square tube 20×20', 'tube', '20×20mm', 'piece'),
        ('Tube carré 40×40',   'أنبوب مربع 40×40', 'Square tube 40×40', 'tube', '40×40mm', 'piece'),
        ('Tube rectangulaire 40×20', 'أنبوب مستطيل 40×20', 'Rect tube 40×20', 'tube', '40×20mm', 'piece'),
        ('Plat 30×3',          'حديد مسطح 30×3',   'Flat bar 30×3', 'plat', '30×3mm',    'kg'),
        ('Plat 50×5',          'حديد مسطح 50×5',   'Flat bar 50×5', 'plat', '50×5mm',    'kg'),
        ('Cornière 30×30×3',   'زاوية 30×30×3',    'Angle 30×30×3', 'corniere', '30×30×3mm', 'kg'),
        ('Cornière 50×50×5',   'زاوية 50×50×5',    'Angle 50×50×5', 'corniere', '50×50×5mm', 'kg'),
        ('Profilé IPE 80',     'بروفيل IPE 80',     'IPE 80',      'profile', 'IPE80',    'piece'),
        ('Treillis soudé',     'شبكة حديد ملحوم',  'Welded mesh', 'treillis', 'standard', 'piece'),
    ]
    c.executemany(
        "INSERT INTO produits (nom_fr, nom_ar, nom_en, categorie, dimension, unite) VALUES (?,?,?,?,?,?)",
        produits
    )

    # Prix des operations exprimes en USD (coherent avec le reste de l'app)
    operations = [
        ('Coupe simple',       'قطع بسيط',        'Simple cut',    0.035,  'coupe'),
        ('Coupe sur mesure',   'قطع على المقاس',   'Custom cut',    0.055,  'coupe'),
        ('Cintrage',           'ثني',              'Bending',       0.085,  'cintrage'),
        ('Perçage (par trou)', 'حفر (لكل ثقب)',    'Drilling',      0.02,   'percage'),
        ('Soudure (par cm)',   'لحام (لكل سم)',    'Welding',       0.01,   'soudure'),
        ('Galvanisation',      'جلفنة',            'Galvanizing',   0.14,   'traitement'),
    ]
    c.executemany(
        "INSERT INTO operations (nom_fr, nom_ar, nom_en, prix_unitaire, unite) VALUES (?,?,?,?,?)",
        operations
    )

    clients = [
        ('Ahmad Al-Hassan',   '+963 933 112 233', 'ahmad.hassan@example.sy', 'طرطوس، شارع الميناء', 'Client régulier'),
        ('Société Al-Bina',   '+963 41 234 567',  'contact@albina.sy', 'طرطوس، المنطقة الصناعية', 'Entreprise BTP'),
        ('Khalil Mahmoud',    '+963 955 887 766', '', 'بانياس', 'Particulier'),
        ('Entreprise Nour',   '+963 41 345 678',  'nour@example.sy', 'طرطوس', 'Chantier résidentiel'),
        ('Georges Antoun',    '+963 932 445 566', '', 'صافيتا', 'Client occasionnel'),
        ('Omar Al-Rifai',     '+963 944 221 100', '', 'طرطوس، حي الرمل', 'Gros chantier'),
    ]
    c.executemany(
        "INSERT INTO clients (nom, telephone, email, adresse, note) VALUES (?,?,?,?,?)",
        clients
    )

    _seed_fournisseurs(c)
    _seed_types_lignes_libres(c)

    today = date.today()
    _seed_taux_change(c)

    # Prix achat/vente demo pour chaque produit (marge realiste ~12-18%), chacun
    # a son propre prix (LS/kg ou LS/piece) : c'est la seule source de prix, il n'y a
    # plus de "cours du fer" generique. base_prix sert juste de point de depart realiste.
    base_prix = round(random.uniform(7500, 10500), 0)
    for prod_id in range(1, 15):
        prod_unite = c.execute("SELECT unite FROM produits WHERE id=?", (prod_id,)).fetchone()
        unite = prod_unite['unite'] if prod_unite else 'kg'

        if unite == 'piece':
            # Une piece equivaut en moyenne a 15-40 kg de matiere premiere
            poids_moyen_piece = random.uniform(15, 40)
            prix_achat = round(base_prix * random.uniform(0.92, 0.98) * poids_moyen_piece, 0)
        else:
            prix_achat = round(base_prix * random.uniform(0.92, 0.98), 0)

        marge = random.uniform(1.12, 1.18)
        prix_vente = round(prix_achat * marge, 0)
        c.execute(
            "UPDATE produits SET prix_achat_kg=?, prix_vente_kg=? WHERE id=?",
            (prix_achat, prix_vente, prod_id)
        )

    facture_num = 1
    for i in range(conf['nb_factures'], 0, -1):
        d = today - timedelta(days=max(1, i * (90 // conf['nb_factures'])))
        d_str = d.isoformat()

        client_id = random.randint(1, 6)
        num = f"FAC-{d.year}-{facture_num:04d}"
        facture_num += 1
        devise = random.choice(['LS','LS','LS','USD'])  # majorité en LS

        c.execute(
            """INSERT INTO factures
               (numero, client_id, date_facture, prix_fer_jour, devise, taux_change, statut)
               VALUES (?,?,?,0,?,1,'validee')""",
            (num, client_id, d_str, devise)
        )
        fac_id = c.lastrowid

        sous_total_fer = 0
        sous_total_ops = 0
        for _ in range(random.randint(2, 4)):
            prod_id = random.randint(1, 14)
            prod = c.execute("SELECT nom_fr, nom_ar, unite, prix_vente_kg FROM produits WHERE id=?", (prod_id,)).fetchone()
            unite = prod['unite'] or 'kg'
            prix_vente_prod = prod['prix_vente_kg']

            if unite == 'piece':
                quantite = round(random.uniform(1, 20), 0)
            else:
                quantite = round(random.uniform(50, 800), 1)

            # Prix de reference : chaque produit a son propre prix_vente_kg, deja assigne plus haut
            prix_ref = prix_vente_prod or base_prix
            sous = round(quantite * prix_ref, 0)
            sous_total_fer += sous
            c.execute(
                """INSERT INTO facture_lignes
                   (facture_id, produit_id, description_fr, description_ar, poids_kg, prix_kg, sous_total)
                   VALUES (?,?,?,?,?,?,?)""",
                (fac_id, prod_id, prod['nom_fr'], prod['nom_ar'], quantite, prix_ref, sous)
            )

        for _ in range(random.randint(0, 2)):
            op_id = random.randint(1, 6)
            op = c.execute("SELECT prix_unitaire FROM operations WHERE id=?", (op_id,)).fetchone()
            qte = random.randint(1, 10)
            sous = op[0] * qte
            sous_total_ops += sous
            c.execute(
                """INSERT INTO facture_operations
                   (facture_id, operation_id, quantite, prix_unitaire, sous_total)
                   VALUES (?,?,?,?,?)""",
                (fac_id, op_id, qte, op[0], sous)
            )

        total_ls = sous_total_fer + sous_total_ops
        taux_ce_jour = c.execute(
            "SELECT ls_par_usd FROM taux_change WHERE date <= ? ORDER BY date DESC LIMIT 1", (d_str,)
        ).fetchone()
        taux_val = taux_ce_jour[0] if taux_ce_jour else 14500
        total_final = round(total_ls / taux_val, 2) if devise == 'USD' else round(total_ls, 0)
        sous_fer_final = round(sous_total_fer / taux_val, 2) if devise == 'USD' else round(sous_total_fer, 0)
        sous_ops_final = round(sous_total_ops / taux_val, 2) if devise == 'USD' else round(sous_total_ops, 0)
        montant_usd = round(total_final, 2) if devise == 'USD' else round(total_final / taux_val, 2)

        # Paiement reel selon le scenario (pct_credit = probabilite d'avoir un solde impaye),
        # pour que le solde restant affiche dans l'app soit coherent (calcule a partir de
        # vrais paiements, pas d'une simple etiquette cosmetique).
        rand = random.random()
        if rand < conf['pct_credit'] * 0.55:
            statut_paiement = 'en_attente'  # rien paye
        elif rand < conf['pct_credit']:
            statut_paiement = 'partiellement_paye'
            pct_paye = round(random.uniform(0.25, 0.75), 2)
            montant_paye = round(montant_usd * pct_paye, 2)
            date_paiement = (d + timedelta(days=random.randint(0, 3))).isoformat()
            c.execute(
                """INSERT INTO paiements (type, facture_id, montant, devise, taux_change, montant_usd, date_paiement, note)
                   VALUES ('vente', ?, ?, 'USD', ?, ?, ?, 'Acompte (démo)')""",
                (fac_id, montant_paye, taux_val, montant_paye, date_paiement)
            )
        else:
            statut_paiement = 'paye'
            date_paiement = (d + timedelta(days=random.randint(0, 6))).isoformat()
            c.execute(
                """INSERT INTO paiements (type, facture_id, montant, devise, taux_change, montant_usd, date_paiement, note)
                   VALUES ('vente', ?, ?, 'USD', ?, ?, ?, 'Paiement (démo)')""",
                (fac_id, montant_usd, taux_val, montant_usd, date_paiement)
            )

        c.execute(
            """UPDATE factures SET
               sous_total_fer=?, sous_total_operations=?, total=?, taux_change=?,
               montant_du_usd=?, statut_paiement=?
               WHERE id=?""",
            (sous_fer_final, sous_ops_final, total_final, taux_val, montant_usd, statut_paiement, fac_id)
        )
        c.execute(
            """INSERT INTO facture_historique (facture_id, action, nouvelle_valeur)
               VALUES (?, 'creation', 'Facture créée (démo)')""",
            (fac_id,)
        )

    # Quelques factures d'achat de démo
    achat_num = 1
    for i in range(conf['nb_achats'], 0, -1):
        d = today - timedelta(days=max(1, i * (90 // conf['nb_achats'])))
        d_str = d.isoformat()
        fourn_id = random.randint(1, 3)
        num = f"ACH-{d.year}-{achat_num:04d}"
        achat_num += 1

        c.execute(
            """INSERT INTO factures_achat (numero, fournisseur_id, date_facture, devise, taux_change, statut)
               VALUES (?,?,?,?,1,'validee')""",
            (num, fourn_id, d_str, 'LS')
        )
        ach_id = c.lastrowid
        sous_total = 0
        for _ in range(random.randint(1, 3)):
            prod_id = random.randint(1, 14)
            poids = round(random.uniform(200, 2000), 1)
            prix_achat = round(random.uniform(7000, 9000), 0)
            sous = round(poids * prix_achat, 0)
            sous_total += sous
            prod = c.execute("SELECT nom_fr, nom_ar FROM produits WHERE id=?", (prod_id,)).fetchone()
            c.execute(
                """INSERT INTO facture_achat_lignes
                   (facture_achat_id, produit_id, description_fr, description_ar, poids_kg, prix_kg, sous_total)
                   VALUES (?,?,?,?,?,?,?)""",
                (ach_id, prod_id, prod[0], prod[1], poids, prix_achat, sous)
            )
            # Impact positif sur inventaire
            c.execute(
                """INSERT INTO inventaire (produit_id, stock_kg) VALUES (?,?)
                   ON CONFLICT(produit_id) DO UPDATE SET stock_kg = stock_kg + ?""",
                (prod_id, poids, poids)
            )
        c.execute("UPDATE factures_achat SET sous_total=?, total=? WHERE id=?", (sous_total, sous_total, ach_id))
        c.execute(
            """INSERT INTO facture_achat_historique (facture_achat_id, action, nouvelle_valeur)
               VALUES (?, 'creation', 'Facture achat créée (démo)')""",
            (ach_id,)
        )

    # Inventaire fictif de base (si pas déjà couvert par les achats)
    # Pour les produits vendus a la piece, stock exprime en nombre de pieces (valeurs plus faibles, realistes)
    for prod_id in range(1, 15):
        exists = c.execute("SELECT 1 FROM inventaire WHERE produit_id=?", (prod_id,)).fetchone()
        if not exists:
            prod_unite = c.execute("SELECT unite FROM produits WHERE id=?", (prod_id,)).fetchone()
            unite = prod_unite['unite'] if prod_unite else 'kg'
            if unite == 'piece':
                stock = round(random.uniform(15, 200), 0)
            else:
                stock = round(random.uniform(200, 5000), 1)
            c.execute("INSERT INTO inventaire (produit_id, stock_kg, stock_min_alerte) VALUES (?,?,?)",
                      (prod_id, stock, 20 if unite=='piece' else 100))

    # Reglages par defaut
    c.execute("INSERT OR IGNORE INTO settings (cle, valeur) VALUES ('devise_defaut', 'USD')")
    c.execute("INSERT OR IGNORE INTO settings (cle, valeur) VALUES ('afficher_devise_secondaire', '1')")

    conn.commit()
