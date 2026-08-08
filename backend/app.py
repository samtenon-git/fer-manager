from flask import Flask, send_from_directory
from flask_cors import CORS
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.abspath(os.path.join(BASE_DIR, '..', 'frontend'))

app = Flask(__name__)
CORS(app)

from routes.api import api
from routes.pdf import pdf_bp
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

from database import init_db

with app.app_context():
    db_path = os.environ.get('DATABASE_PATH', '')
    if not db_path:
        data_dir = os.path.abspath(os.path.join(BASE_DIR, '..', 'data'))
        os.makedirs(data_dir, exist_ok=True)
        os.environ['DATABASE_PATH'] = os.path.join(data_dir, 'fer.db')
    else:
        os.makedirs(os.path.dirname(db_path), exist_ok=True)
    init_db()
    print(f"✓ Base de données: {os.environ.get('DATABASE_PATH')}")
    print(f"✓ Frontend: {FRONTEND_DIR}")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
