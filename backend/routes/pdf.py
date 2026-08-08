from flask import Blueprint, send_file, abort
import io

try:
    from weasyprint import HTML
    WEASYPRINT_OK = True
except Exception:
    HTML = None
    WEASYPRINT_OK = False

pdf_bp = Blueprint('pdf', __name__)

TEMPLATE = """
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Cairo', Arial, sans-serif; font-size: 13px; color: #1c2226; direction: rtl; }
  .page { padding: 30px 35px; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #1a6b74; padding-bottom: 20px; margin-bottom: 24px; }
  .logo-area h1 { font-size: 22px; font-weight: 900; color: #1a6b74; }
  .logo-area p { color: #5a6a72; font-size: 11px; margin-top: 4px; }
  .fac-meta { text-align: left; }
  .fac-num { font-size: 18px; font-weight: 700; color: #1a6b74; }
  .fac-date { color: #5a6a72; font-size: 11px; margin-top: 4px; }
  .badge { display: inline-block; background: #22909c; color: white; padding: 2px 10px; border-radius: 12px; font-size: 10px; margin-top: 6px; }
  .badge.validee { background: #27ae60; }
  .client-box { background: #f5f0e8; border-right: 4px solid #1a6b74; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px; }
  .client-box .label { font-size: 10px; color: #5a6a72; font-weight: 700; text-transform: uppercase; margin-bottom: 4px; }
  .client-box .nom { font-size: 15px; font-weight: 700; }
  .client-box .detail { font-size: 11px; color: #5a6a72; margin-top: 2px; }
  .prix-fer-banner { background: #e8f4f5; border: 1px solid #1a6b74; border-radius: 6px; padding: 8px 16px; margin-bottom: 20px; font-size: 12px; color: #1a6b74; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
  table th { background: #1a6b74; color: white; padding: 9px 12px; font-size: 11px; font-weight: 700; text-align: right; }
  table td { padding: 8px 12px; border-bottom: 1px solid #ece8df; font-size: 12px; }
  table tr:nth-child(even) td { background: #faf8f4; }
  .section-title { font-size: 12px; font-weight: 700; color: #1a6b74; margin: 16px 0 8px; border-bottom: 1px solid #e0ece9; padding-bottom: 4px; }
  .totals { margin-right: auto; margin-left: 0; width: 280px; }
  .totals table td { border-bottom: none; }
  .totals .grand-total td { background: #1a6b74 !important; color: white; font-weight: 700; font-size: 14px; }
  .footer { margin-top: 40px; border-top: 1px solid #ddd; padding-top: 14px; text-align: center; color: #5a6a72; font-size: 10px; }
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
  <div class="prix-fer-banner">
    سعر الحديد المرجعي: <strong>{{ "{:,.0f}".format(facture.prix_fer_jour) }} ل.س / كغ</strong>
    {% if facture.devise == 'USD' %} · سعر الصرف: <strong>{{ "{:,.0f}".format(facture.taux_change) }} ل.س = 1$</strong>{% endif %}
  </div>
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
    if not WEASYPRINT_OK:
        return "<h2>PDF non disponible en mode développement Windows.<br>Disponible uniquement sur le serveur Tartous.</h2>", 503

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
    pdf_bytes = HTML(string=html_str).write_pdf()
    return send_file(
        io.BytesIO(pdf_bytes),
        mimetype='application/pdf',
        as_attachment=True,
        download_name=f"{fac['numero']}.pdf"
    )
