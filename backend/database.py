import sqlite3
import os
from datetime import datetime, date, timedelta
import random

DB_PATH = os.environ.get('DATABASE_PATH', './data/fer.db')

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn

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
        actif INTEGER DEFAULT 1,
        created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS prix_fer (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL UNIQUE,
        prix_kg REAL NOT NULL,
        note TEXT,
        created_at TEXT DEFAULT (datetime('now'))
    );

    -- NOUVEAU : cours du dollar, historique quotidien comme le fer
    CREATE TABLE IF NOT EXISTS taux_change (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL UNIQUE,
        ls_par_usd REAL NOT NULL,   -- combien de ل.س pour 1 dollar
        note TEXT,
        created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS operations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom_fr TEXT NOT NULL,
        nom_ar TEXT NOT NULL,
        nom_en TEXT NOT NULL,
        prix_unitaire REAL NOT NULL,
        unite TEXT DEFAULT 'unité',
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

    -- Factures de VENTE (existant, enrichi devise)
    CREATE TABLE IF NOT EXISTS factures (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        numero TEXT NOT NULL UNIQUE,
        client_id INTEGER,
        date_facture TEXT NOT NULL,
        prix_fer_jour REAL NOT NULL,
        devise TEXT DEFAULT 'LS',        -- 'LS' ou 'USD'
        taux_change REAL DEFAULT 1,      -- taux figé au moment de la validation
        sous_total_fer REAL DEFAULT 0,
        sous_total_operations REAL DEFAULT 0,
        total REAL DEFAULT 0,            -- total dans la devise de la facture
        statut TEXT DEFAULT 'brouillon', -- brouillon | validee | annulee
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
        prix_unitaire REAL DEFAULT 0,
        sous_total REAL DEFAULT 0,
        FOREIGN KEY (facture_id) REFERENCES factures(id) ON DELETE CASCADE,
        FOREIGN KEY (operation_id) REFERENCES operations(id)
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

    conn.close()


def _migrate_if_needed(conn, c):
    """Ajoute les nouvelles colonnes/tables si la base existe déjà (V1 -> V2/V3)."""
    cols = [r[1] for r in c.execute("PRAGMA table_info(factures)").fetchall()]

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

    if 'updated_at' not in cols:
        try:
            c.execute("ALTER TABLE factures ADD COLUMN updated_at TEXT")
            c.execute("UPDATE factures SET updated_at = datetime('now') WHERE updated_at IS NULL")
        except Exception as e:
            print(f"Migration updated_at: {e}")

    cols_cli = [r[1] for r in c.execute("PRAGMA table_info(clients)").fetchall()]
    if 'email' not in cols_cli:
        try:
            c.execute("ALTER TABLE clients ADD COLUMN email TEXT")
        except Exception as e:
            print(f"Migration email: {e}")

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


def _seed_demo(conn, c):
    """Insère des données de démonstration réalistes."""

    produits = [
        ('Rond à béton 8mm',   'حديد مسلح 8 ملم',  'Rebar 8mm',   'rond_beton', 'Ø8mm'),
        ('Rond à béton 10mm',  'حديد مسلح 10 ملم', 'Rebar 10mm',  'rond_beton', 'Ø10mm'),
        ('Rond à béton 12mm',  'حديد مسلح 12 ملم', 'Rebar 12mm',  'rond_beton', 'Ø12mm'),
        ('Rond à béton 14mm',  'حديد مسلح 14 ملم', 'Rebar 14mm',  'rond_beton', 'Ø14mm'),
        ('Rond à béton 16mm',  'حديد مسلح 16 ملم', 'Rebar 16mm',  'rond_beton', 'Ø16mm'),
        ('Tube carré 20×20',   'أنبوب مربع 20×20', 'Square tube 20×20', 'tube', '20×20mm'),
        ('Tube carré 40×40',   'أنبوب مربع 40×40', 'Square tube 40×40', 'tube', '40×40mm'),
        ('Tube rectangulaire 40×20', 'أنبوب مستطيل 40×20', 'Rect tube 40×20', 'tube', '40×20mm'),
        ('Plat 30×3',          'حديد مسطح 30×3',   'Flat bar 30×3', 'plat', '30×3mm'),
        ('Plat 50×5',          'حديد مسطح 50×5',   'Flat bar 50×5', 'plat', '50×5mm'),
        ('Cornière 30×30×3',   'زاوية 30×30×3',    'Angle 30×30×3', 'corniere', '30×30×3mm'),
        ('Cornière 50×50×5',   'زاوية 50×50×5',    'Angle 50×50×5', 'corniere', '50×50×5mm'),
        ('Profilé IPE 80',     'بروفيل IPE 80',     'IPE 80',      'profile', 'IPE80'),
        ('Treillis soudé',     'شبكة حديد ملحوم',  'Welded mesh', 'treillis', 'standard'),
    ]
    c.executemany(
        "INSERT INTO produits (nom_fr, nom_ar, nom_en, categorie, dimension) VALUES (?,?,?,?,?)",
        produits
    )

    operations = [
        ('Coupe simple',       'قطع بسيط',        'Simple cut',    500,  'coupe'),
        ('Coupe sur mesure',   'قطع على المقاس',   'Custom cut',    800,  'coupe'),
        ('Cintrage',           'ثني',              'Bending',       1200, 'cintrage'),
        ('Perçage (par trou)', 'حفر (لكل ثقب)',    'Drilling',      300,  'percage'),
        ('Soudure (par cm)',   'لحام (لكل سم)',    'Welding',       150,  'soudure'),
        ('Galvanisation',      'جلفنة',            'Galvanizing',   2000, 'traitement'),
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

    today = date.today()
    prix_base = 8500.0
    for i in range(90, -1, -1):
        d = today - timedelta(days=i)
        variation = random.uniform(-150, 200)
        prix_base = max(7500, min(10500, prix_base + variation))
        note = 'Révision prix fournisseur' if i % 15 == 0 else None
        c.execute(
            "INSERT OR IGNORE INTO prix_fer (date, prix_kg, note) VALUES (?,?,?)",
            (d.isoformat(), round(prix_base, 0), note)
        )

    _seed_taux_change(c)

    facture_num = 1
    for i in range(30, 0, -1):
        d = today - timedelta(days=i * 3)
        d_str = d.isoformat()
        row = c.execute(
            "SELECT prix_kg FROM prix_fer WHERE date <= ? ORDER BY date DESC LIMIT 1", (d_str,)
        ).fetchone()
        prix_fer = row[0] if row else 8500

        client_id = random.randint(1, 6)
        num = f"FAC-{d.year}-{facture_num:04d}"
        facture_num += 1
        devise = random.choice(['LS','LS','LS','USD'])  # majorité en LS

        c.execute(
            """INSERT INTO factures
               (numero, client_id, date_facture, prix_fer_jour, devise, taux_change, statut)
               VALUES (?,?,?,?,?,1,'validee')""",
            (num, client_id, d_str, prix_fer, devise)
        )
        fac_id = c.lastrowid

        sous_total_fer = 0
        sous_total_ops = 0
        for _ in range(random.randint(2, 4)):
            prod_id = random.randint(1, 14)
            poids = round(random.uniform(50, 800), 1)
            sous = round(poids * prix_fer, 0)
            sous_total_fer += sous
            prod = c.execute("SELECT nom_fr, nom_ar FROM produits WHERE id=?", (prod_id,)).fetchone()
            c.execute(
                """INSERT INTO facture_lignes
                   (facture_id, produit_id, description_fr, description_ar, poids_kg, prix_kg, sous_total)
                   VALUES (?,?,?,?,?,?,?)""",
                (fac_id, prod_id, prod[0], prod[1], poids, prix_fer, sous)
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

        c.execute(
            """UPDATE factures SET
               sous_total_fer=?, sous_total_operations=?, total=?, taux_change=?
               WHERE id=?""",
            (sous_fer_final, sous_ops_final, total_final, taux_val, fac_id)
        )
        c.execute(
            """INSERT INTO facture_historique (facture_id, action, nouvelle_valeur)
               VALUES (?, 'creation', 'Facture créée (démo)')""",
            (fac_id,)
        )

    # Quelques factures d'achat de démo
    achat_num = 1
    for i in range(15, 0, -1):
        d = today - timedelta(days=i * 6)
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
    for prod_id in range(1, 15):
        exists = c.execute("SELECT 1 FROM inventaire WHERE produit_id=?", (prod_id,)).fetchone()
        if not exists:
            stock = round(random.uniform(200, 5000), 1)
            c.execute("INSERT INTO inventaire (produit_id, stock_kg) VALUES (?,?)", (prod_id, stock))

    conn.commit()
