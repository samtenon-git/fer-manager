from flask import Blueprint, send_file, abort
import io

# Playwright (Chromium headless) au lieu de WeasyPrint : WeasyPrint a besoin de
# bibliotheques systeme (GTK/Cairo/Pango) simples a installer via apt sous Linux
# (voir Dockerfile) mais penibles sous Windows natif - d'ou le PDF desactive en
# mode developpement jusqu'ici. Playwright s'installe pareil des deux cotes :
# `pip install playwright` puis `playwright install chromium`, sans etape
# systeme separee a gerer manuellement sous Windows.
try:
    from playwright.sync_api import sync_playwright
    PDF_OK = True
    _PDF_ERROR = None
except Exception as e:
    sync_playwright = None
    PDF_OK = False
    _PDF_ERROR = str(e)

def _html_to_pdf_bytes(html_content):
    """Convertit du HTML en PDF via Chromium headless (rendu identique a un
    navigateur reel, polices Google Fonts chargees normalement)."""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.set_content(html_content, wait_until='networkidle')
        pdf_bytes = page.pdf(format='A4', print_background=True, margin={'top':'0','bottom':'0','left':'0','right':'0'})
        browser.close()
    return pdf_bytes

pdf_bp = Blueprint('pdf', __name__)

TEMPLATE = """
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Cairo', Arial, sans-serif; font-size: 13px; color: #201a17; direction: rtl; }
  .page { padding: 30px 35px; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #b14a24; padding-bottom: 20px; margin-bottom: 24px; }
  .logo-area h1 { font-size: 22px; font-weight: 900; color: #2b2420; }
  .logo-area p { color: #7a6f65; font-size: 11px; margin-top: 4px; }
  .fac-meta { text-align: left; }
  .fac-num { font-size: 18px; font-weight: 700; color: #b14a24; }
  .fac-date { color: #7a6f65; font-size: 11px; margin-top: 4px; }
  .badge { display: inline-block; background: #c65d2e; color: white; padding: 2px 10px; border-radius: 12px; font-size: 10px; margin-top: 6px; }
  .badge.validee { background: #2f8f5b; }
  .client-box { background: #f6f1ea; border-right: 4px solid #b14a24; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px; }
  .client-box .label { font-size: 10px; color: #7a6f65; font-weight: 700; text-transform: uppercase; margin-bottom: 4px; }
  .client-box .nom { font-size: 15px; font-weight: 700; }
  .client-box .detail { font-size: 11px; color: #7a6f65; margin-top: 2px; }
  .taux-banner { background: #eef2f5; border: 1px solid #2c6f8a; border-radius: 6px; padding: 8px 16px; margin-bottom: 20px; font-size: 12px; color: #235870; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
  table th { background: #2b2420; color: white; padding: 9px 12px; font-size: 11px; font-weight: 700; text-align: right; }
  table td { padding: 8px 12px; border-bottom: 1px solid #ece5db; font-size: 12px; }
  table tr:nth-child(even) td { background: #faf8f4; }
  .section-title { font-size: 12px; font-weight: 700; color: #b14a24; margin: 16px 0 8px; border-bottom: 1px solid #ece5db; padding-bottom: 4px; }
  .totals { margin-right: auto; margin-left: 0; width: 280px; }
  .totals table td { border-bottom: none; }
  .totals .grand-total td { background: #2b2420 !important; color: white; font-weight: 700; font-size: 14px; }
  .footer { margin-top: 40px; border-top: 1px solid #ddd; padding-top: 14px; text-align: center; color: #7a6f65; font-size: 10px; }
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <div class="logo-area">
      <h1>مخزن الحديد</h1>
      <p>طرطوس – سوريا</p>
    </div>
    <div class="fac-meta">
      <div class="fac-num">{{ facture.numero }}</div>
      <div class="fac-date">{{ facture.date_facture }}</div>
      <span class="badge {{ facture.statut }}">{{ statut_label }}</span>
    </div>
  </div>
  {% if facture.client_nom %}
  <div class="client-box">
    <div class="label">العميل</div>
    <div class="nom">{{ facture.client_nom }}</div>
    {% if facture.client_tel %}<div class="detail">📞 {{ facture.client_tel }}</div>{% endif %}
    {% if facture.client_adresse %}<div class="detail">📍 {{ facture.client_adresse }}</div>{% endif %}
  </div>
  {% endif %}
  {% if facture.devise == 'USD' %}
  <div class="taux-banner">
    سعر الصرف عند البيع: <strong>{{ "{:,.0f}".format(facture.taux_change) }} ل.س = 1$</strong>
  </div>
  {% endif %}
  {% if lignes %}
  <div class="section-title">📦 المواد والحديد</div>
  <table>
    <thead><tr><th>المنتج</th><th>الوزن (كغ)</th><th>السعر / كغ</th><th>المجموع (ل.س)</th></tr></thead>
    <tbody>
      {% for l in lignes %}
      <tr>
        <td>{{ l.nom_ar or l.description_ar }}</td>
        <td>{{ "{:,.1f}".format(l.poids_kg) }}</td>
        <td>{{ "{:,.0f}".format(l.prix_kg) }}</td>
        <td>{{ "{:,.0f}".format(l.sous_total) }}</td>
      </tr>
      {% endfor %}
    </tbody>
  </table>
  {% endif %}
  {% if operations %}
  <div class="section-title">⚙️ عمليات المكائن</div>
  <table>
    <thead><tr><th>العملية</th><th>الكمية</th><th>السعر</th><th>المجموع (ل.س)</th></tr></thead>
    <tbody>
      {% for o in operations %}
      <tr>
        <td>{{ o.nom_ar }}</td>
        <td>{{ o.quantite }}</td>
        <td>{{ "{:,.0f}".format(o.prix_unitaire) }}</td>
        <td>{{ "{:,.0f}".format(o.sous_total) }}</td>
      </tr>
      {% endfor %}
    </tbody>
  </table>
  {% endif %}
  <div class="totals">
    <table>
      <tr><td>مجموع الحديد</td><td><strong>{{ "{:,.2f}".format(facture.sous_total_fer) if facture.devise=='USD' else "{:,.0f}".format(facture.sous_total_fer) }} {{ '$' if facture.devise=='USD' else 'ل.س' }}</strong></td></tr>
      <tr><td>مجموع العمليات</td><td><strong>{{ "{:,.0f}".format(facture.sous_total_operations) }} ل.س</strong></td></tr>
      <tr class="grand-total"><td>المجموع الكلي</td><td>{{ "{:,.2f}".format(facture.total) if facture.devise=='USD' else "{:,.0f}".format(facture.total) }} {{ '$' if facture.devise=='USD' else 'ل.س' }}</td></tr>
    </table>
  </div>
  <div class="footer">شكراً لتعاملكم معنا · مخزن الحديد – طرطوس</div>
</div>
</body>
</html>
"""

@pdf_bp.route('/factures/<int:fac_id>/pdf')
def generate_pdf(fac_id):
    if not PDF_OK:
        return (
            "<h2>Génération PDF indisponible.</h2>"
            "<p>Il manque Playwright ou son navigateur Chromium. "
            "Dans un terminal, lancez :</p>"
            "<pre>pip install playwright\nplaywright install chromium</pre>"
            f"<p style='color:#999;font-size:12px'>Détail technique : {_PDF_ERROR}</p>"
        ), 503

    from database import get_db
    db = get_db()
    fac = db.execute(
        """SELECT f.*, c.nom as client_nom, c.telephone as client_tel, c.adresse as client_adresse
           FROM factures f LEFT JOIN clients c ON f.client_id=c.id WHERE f.id=?""",
        (fac_id,)
    ).fetchone()
    if not fac:
        db.close()
        abort(404)

    lignes = db.execute(
        """SELECT fl.*, p.nom_ar FROM facture_lignes fl
           LEFT JOIN produits p ON fl.produit_id=p.id
           WHERE fl.facture_id=?""", (fac_id,)
    ).fetchall()
    ops = db.execute(
        """SELECT fo.*, o.nom_ar FROM facture_operations fo
           LEFT JOIN operations o ON fo.operation_id=o.id
           WHERE fo.facture_id=?""", (fac_id,)
    ).fetchall()
    db.close()

    from jinja2 import Environment
    env = Environment()
    tmpl = env.from_string(TEMPLATE)
    statut_map = {'brouillon': 'مسودة', 'validee': 'مؤكدة', 'annulee': 'ملغاة'}
    html_str = tmpl.render(
        facture=dict(fac),
        lignes=[dict(l) for l in lignes],
        operations=[dict(o) for o in ops],
        statut_label=statut_map.get(fac['statut'], fac['statut'])
    )
    try:
        pdf_bytes = _html_to_pdf_bytes(html_str)
    except Exception as e:
        return (
            "<h2>Erreur lors de la génération du PDF.</h2>"
            f"<pre>{e}</pre>"
            "<p>Si Chromium n'a jamais été téléchargé, lancez : "
            "<code>playwright install chromium</code></p>"
        ), 500
    return send_file(
        io.BytesIO(pdf_bytes),
        mimetype='application/pdf',
        as_attachment=True,
        download_name=f"{fac['numero']}.pdf"
    )
