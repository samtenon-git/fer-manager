import sys
import os

def safe_pause():
    """Pause interactive seulement si un vrai terminal est disponible (pas en Docker)."""
    try:
        input("Appuyez sur Entree pour fermer...")
    except EOFError:
        pass

print("=" * 50)
print("  DEMARRAGE DE L'APPLICATION FER-MANAGER")
print("=" * 50)

try:
    from flask import Flask, send_from_directory
    from flask_cors import CORS
except ImportError as e:
    print(f"ERREUR: Un module Python manque : {e}")
    print("Lancez : python -m pip install flask flask-cors python-dateutil")
    safe_pause()
    sys.exit(1)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Cherche le frontend a plusieurs emplacements possibles :
# - Docker : /app/frontend (car app.py est copie a la racine /app)
# - Local  : ../frontend (car app.py est dans backend/)
_candidates = [
    os.path.join(BASE_DIR, 'frontend'),
    os.path.abspath(os.path.join(BASE_DIR, '..', 'frontend')),
]
FRONTEND_DIR = next((p for p in _candidates if os.path.exists(os.path.join(p, 'index.html'))), _candidates[-1])

print(f"[OK] Dossier backend  : {BASE_DIR}")
print(f"[OK] Dossier frontend : {FRONTEND_DIR}")

if not os.path.exists(FRONTEND_DIR):
    print(f"ERREUR: Le dossier frontend n'existe pas : {FRONTEND_DIR}")
    safe_pause()
    sys.exit(1)

if not os.path.exists(os.path.join(FRONTEND_DIR, 'index.html')):
    print(f"ERREUR: index.html introuvable dans {FRONTEND_DIR}")
    safe_pause()
    sys.exit(1)

app = Flask(__name__)
CORS(app)

try:
    from routes.api import api
    print("[OK] Module api.py charge")
except Exception as e:
    print(f"ERREUR lors du chargement de routes/api.py : {e}")
    import traceback
    traceback.print_exc()
    safe_pause()
    sys.exit(1)

try:
    from routes.pdf import pdf_bp
    print("[OK] Module pdf.py charge")
except Exception as e:
    print(f"ERREUR lors du chargement de routes/pdf.py : {e}")
    import traceback
    traceback.print_exc()
    safe_pause()
    sys.exit(1)

app.register_blueprint(api, url_prefix='/api')
app.register_blueprint(pdf_bp, url_prefix='/api')

@app.route('/')
def index():
    return send_from_directory(FRONTEND_DIR, 'index.html')

@app.route('/<path:path>')
def serve_file(path):
    full = os.path.join(FRONTEND_DIR, path)
    if os.path.exists(full) and os.path.isfile(full):
        return send_from_directory(FRONTEND_DIR, path)
    return send_from_directory(FRONTEND_DIR, 'index.html')

try:
    from database import init_db
    print("[OK] Module database.py charge")
except Exception as e:
    print(f"ERREUR lors du chargement de database.py : {e}")
    import traceback
    traceback.print_exc()
    safe_pause()
    sys.exit(1)

with app.app_context():
    db_path = os.environ.get('DATABASE_PATH', '')
    if not db_path:
        data_dir = os.path.abspath(os.path.join(BASE_DIR, '..', 'data'))
        os.makedirs(data_dir, exist_ok=True)
        os.environ['DATABASE_PATH'] = os.path.join(data_dir, 'fer.db')
    else:
        os.makedirs(os.path.dirname(db_path), exist_ok=True)

    print(f"[OK] Base de donnees : {os.environ.get('DATABASE_PATH')}")

    try:
        init_db()
        print("[OK] Base de donnees initialisee/verifiee")
    except Exception as e:
        print(f"ERREUR lors de l'initialisation de la base de donnees : {e}")
        import traceback
        traceback.print_exc()
        safe_pause()
        sys.exit(1)

print("=" * 50)
print("  TOUT EST PRET. Demarrage du serveur web...")
print("  Ouvrez votre navigateur sur : http://localhost:5000")
print("  Pour arreter : fermez cette fenetre ou Ctrl+C")
print("=" * 50)

if __name__ == '__main__':
    try:
        app.run(host='0.0.0.0', port=5000, debug=False)
    except Exception as e:
        print(f"ERREUR au demarrage du serveur : {e}")
        import traceback
        traceback.print_exc()
        safe_pause()
        sys.exit(1)
