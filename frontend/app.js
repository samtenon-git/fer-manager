// ═══════════════════════════════════════════════════════════
//  TRADUCTIONS
// ═══════════════════════════════════════════════════════════
const TR = {
  fr: {
    app_title:"Gestion Fer",
    nav_dashboard:"Tableau de bord", nav_factures:"Ventes", nav_achats:"Achats",
    nav_clients:"Clients", nav_fournisseurs:"Fournisseurs", nav_produits:"Produits",
    nav_prix:"Prix du fer", nav_taux:"Cours du dollar", nav_inventaire:"Inventaire",
    nav_operations:"Opérations", nav_caisse:"Caisse", nav_backup:"Sauvegarde",
    dashboard_title:"Tableau de bord", ca_jour:"Ventes du jour", ca_mois:"Ventes du mois",
    nb_factures:"Factures ce mois", nb_achats:"Achats ce mois", prix_fer_today:"Prix du fer",
    taux_today:"Cours USD", chart_cours_fer:"Cours du fer (30j)", chart_cours_usd:"Cours du dollar (30j)",
    chart_ca_mois:"CA mensuel", top_clients:"Meilleurs clients", alertes_stock:"Alertes stock",
    new_facture:"Nouvelle vente", new_achat:"Nouvel achat", factures_list:"Factures de vente",
    achats_list:"Factures d'achat", client:"Client", fournisseur:"Fournisseur",
    date:"Date", total:"Total", statut:"Statut", actions:"Actions", devise:"Devise",
    brouillon:"Brouillon", validee:"Validée", annulee:"Annulée",
    voir_pdf:"PDF", valider:"Valider", annuler_facture:"Annuler", reactiver:"Réactiver", supprimer:"Supprimer",
    ajouter_ligne:"Ajouter produit", ajouter_operation:"Ajouter opération",
    poids_kg:"Poids (kg)", prix_kg:"Prix/kg", prix_fer_ref:"Prix fer référence",
    sous_total_fer:"Sous-total fer", sous_total_ops:"Sous-total opérations", sous_total:"Sous-total",
    total_facture:"Total", clients_list:"Clients", nouveau_client:"Nouveau client",
    fournisseurs_list:"Fournisseurs", nouveau_fournisseur:"Nouveau fournisseur",
    nom:"Nom", telephone:"Téléphone", email:"Email", adresse:"Adresse", note:"Note",
    sauvegarder:"Sauvegarder", annuler:"Annuler", fermer:"Fermer",
    prix_du_jour:"Prix du jour", historique_prix:"Historique", update_prix:"Mettre à jour",
    taux_du_jour:"Cours du jour (ل.س pour 1$)", historique_taux:"Historique du cours",
    produits_list:"Catalogue produits", nouveau_produit:"Nouveau produit",
    categorie:"Catégorie", dimension:"Dimension", stock_actuel:"Stock (kg)",
    alerte_min:"Alerte mini (kg)", inventaire_title:"Inventaire",
    operations_list:"Opérations machines", nouvelle_operation:"Nouvelle opération",
    prix_unitaire:"Prix unitaire", quantite:"Quantité",
    loading:"Chargement...", save_ok:"✓ Sauvegardé", LS:"ل.س", USD:"$", kg:"kg",
    facture_num:"N° Facture", achat_num:"N° Achat",
    select_client:"-- Sélectionner un client --", select_fournisseur:"-- Sélectionner un fournisseur --",
    select_produit:"-- Sélectionner un produit --", select_operation:"-- Sélectionner une opération --",
    delete:"Supprimer", retour:"← Retour", historique:"Historique des modifications",
    caisse_title:"Caisse", encaissements:"Encaissements (ventes)", decaissements:"Décaissements (achats)",
    solde:"Solde", periode:"Période", du:"Du", au:"au",
    backup_title:"Sauvegarde de la base de données",
    backup_export:"Télécharger une sauvegarde", backup_import:"Restaurer une sauvegarde",
    backup_warning:"⚠️ Restaurer remplacera toutes les données actuelles.",
    raison_annulation:"Raison de l'annulation", confirmer:"Confirmer",
    modifier_date:"Modifier la date", modifier: "Modifier",
    aucune_donnee:"Aucune donnée", champ:"Champ", avant:"Avant", apres:"Après", quand:"Quand",
  },
  ar: {
    app_title:"إدارة الحديد",
    nav_dashboard:"لوحة التحكم", nav_factures:"المبيعات", nav_achats:"المشتريات",
    nav_clients:"العملاء", nav_fournisseurs:"الموردون", nav_produits:"المنتجات",
    nav_prix:"سعر الحديد", nav_taux:"سعر الدولار", nav_inventaire:"المخزون",
    nav_operations:"العمليات", nav_caisse:"الصندوق", nav_backup:"النسخ الاحتياطي",
    dashboard_title:"لوحة التحكم", ca_jour:"مبيعات اليوم", ca_mois:"مبيعات الشهر",
    nb_factures:"فواتير هذا الشهر", nb_achats:"مشتريات هذا الشهر", prix_fer_today:"سعر الحديد",
    taux_today:"سعر الدولار", chart_cours_fer:"تطور سعر الحديد (30 يوم)", chart_cours_usd:"تطور سعر الدولار (30 يوم)",
    chart_ca_mois:"المبيعات الشهرية", top_clients:"أفضل العملاء", alertes_stock:"تنبيهات المخزون",
    new_facture:"عملية بيع جديدة", new_achat:"عملية شراء جديدة", factures_list:"فواتير المبيعات",
    achats_list:"فواتير المشتريات", client:"العميل", fournisseur:"المورد",
    date:"التاريخ", total:"الإجمالي", statut:"الحالة", actions:"إجراءات", devise:"العملة",
    brouillon:"مسودة", validee:"مؤكدة", annulee:"ملغاة",
    voir_pdf:"PDF", valider:"تأكيد", annuler_facture:"إلغاء", reactiver:"إعادة تفعيل", supprimer:"حذف",
    ajouter_ligne:"إضافة منتج", ajouter_operation:"إضافة عملية",
    poids_kg:"الوزن (كغ)", prix_kg:"السعر/كغ", prix_fer_ref:"سعر الحديد المرجعي",
    sous_total_fer:"مجموع الحديد", sous_total_ops:"مجموع العمليات", sous_total:"المجموع الفرعي",
    total_facture:"المجموع الكلي", clients_list:"العملاء", nouveau_client:"عميل جديد",
    fournisseurs_list:"الموردون", nouveau_fournisseur:"مورد جديد",
    nom:"الاسم", telephone:"الهاتف", email:"البريد الإلكتروني", adresse:"العنوان", note:"ملاحظة",
    sauvegarder:"حفظ", annuler:"إلغاء", fermer:"إغلاق",
    prix_du_jour:"سعر اليوم", historique_prix:"سجل الأسعار", update_prix:"تحديث السعر",
    taux_du_jour:"سعر اليوم (ل.س مقابل 1$)", historique_taux:"سجل سعر الصرف",
    produits_list:"كتالوج المنتجات", nouveau_produit:"منتج جديد",
    categorie:"الفئة", dimension:"القياس", stock_actuel:"المخزون (كغ)",
    alerte_min:"حد التنبيه (كغ)", inventaire_title:"المخزون",
    operations_list:"عمليات المكائن", nouvelle_operation:"عملية جديدة",
    prix_unitaire:"السعر", quantite:"الكمية",
    loading:"جار التحميل...", save_ok:"✓ تم الحفظ", LS:"ل.س", USD:"$", kg:"كغ",
    facture_num:"رقم الفاتورة", achat_num:"رقم فاتورة الشراء",
    select_client:"-- اختر عميلاً --", select_fournisseur:"-- اختر مورداً --",
    select_produit:"-- اختر منتجاً --", select_operation:"-- اختر عملية --",
    delete:"حذف", retour:"→ رجوع", historique:"سجل التعديلات",
    caisse_title:"الصندوق", encaissements:"المقبوضات (المبيعات)", decaissements:"المدفوعات (المشتريات)",
    solde:"الرصيد", periode:"الفترة", du:"من", au:"إلى",
    backup_title:"نسخ احتياطي لقاعدة البيانات",
    backup_export:"تنزيل نسخة احتياطية", backup_import:"استعادة نسخة احتياطية",
    backup_warning:"⚠️ الاستعادة ستستبدل جميع البيانات الحالية.",
    raison_annulation:"سبب الإلغاء", confirmer:"تأكيد",
    modifier_date:"تعديل التاريخ", modifier:"تعديل",
    aucune_donnee:"لا توجد بيانات", champ:"الحقل", avant:"قبل", apres:"بعد", quand:"متى",
  },
  en: {
    app_title:"Iron Manager",
    nav_dashboard:"Dashboard", nav_factures:"Sales", nav_achats:"Purchases",
    nav_clients:"Clients", nav_fournisseurs:"Suppliers", nav_produits:"Products",
    nav_prix:"Iron Price", nav_taux:"USD Rate", nav_inventaire:"Inventory",
    nav_operations:"Operations", nav_caisse:"Cash", nav_backup:"Backup",
    dashboard_title:"Dashboard", ca_jour:"Today Sales", ca_mois:"Month Sales",
    nb_factures:"Invoices this month", nb_achats:"Purchases this month", prix_fer_today:"Iron price",
    taux_today:"USD rate", chart_cours_fer:"Iron price (30d)", chart_cours_usd:"USD rate (30d)",
    chart_ca_mois:"Monthly revenue", top_clients:"Top clients", alertes_stock:"Stock alerts",
    new_facture:"New sale", new_achat:"New purchase", factures_list:"Sales invoices",
    achats_list:"Purchase invoices", client:"Client", fournisseur:"Supplier",
    date:"Date", total:"Total", statut:"Status", actions:"Actions", devise:"Currency",
    brouillon:"Draft", validee:"Validated", annulee:"Cancelled",
    voir_pdf:"PDF", valider:"Validate", annuler_facture:"Cancel", reactiver:"Reactivate", supprimer:"Delete",
    ajouter_ligne:"Add product", ajouter_operation:"Add operation",
    poids_kg:"Weight (kg)", prix_kg:"Price/kg", prix_fer_ref:"Iron reference price",
    sous_total_fer:"Iron subtotal", sous_total_ops:"Operations subtotal", sous_total:"Subtotal",
    total_facture:"Total", clients_list:"Clients", nouveau_client:"New client",
    fournisseurs_list:"Suppliers", nouveau_fournisseur:"New supplier",
    nom:"Name", telephone:"Phone", email:"Email", adresse:"Address", note:"Note",
    sauvegarder:"Save", annuler:"Cancel", fermer:"Close",
    prix_du_jour:"Today price", historique_prix:"History", update_prix:"Update price",
    taux_du_jour:"Today rate (SYP per 1$)", historique_taux:"Rate history",
    produits_list:"Products", nouveau_produit:"New product",
    categorie:"Category", dimension:"Dimension", stock_actuel:"Stock (kg)",
    alerte_min:"Min alert (kg)", inventaire_title:"Inventory",
    operations_list:"Machine operations", nouvelle_operation:"New operation",
    prix_unitaire:"Unit price", quantite:"Quantity",
    loading:"Loading...", save_ok:"✓ Saved", LS:"SYP", USD:"$", kg:"kg",
    facture_num:"Invoice #", achat_num:"Purchase #",
    select_client:"-- Select client --", select_fournisseur:"-- Select supplier --",
    select_produit:"-- Select product --", select_operation:"-- Select operation --",
    delete:"Delete", retour:"← Back", historique:"Change history",
    caisse_title:"Cash register", encaissements:"Income (sales)", decaissements:"Expenses (purchases)",
    solde:"Balance", periode:"Period", du:"From", au:"to",
    backup_title:"Database backup",
    backup_export:"Download backup", backup_import:"Restore backup",
    backup_warning:"⚠️ Restoring will replace all current data.",
    raison_annulation:"Cancellation reason", confirmer:"Confirm",
    modifier_date:"Edit date", modifier:"Edit",
    aucune_donnee:"No data", champ:"Field", avant:"Before", apres:"After", quand:"When",
  }
};

let lang = localStorage.getItem('lang')||'ar';
function t(k){return TR[lang][k]||k;}

function setLang(l){
  lang=l; localStorage.setItem('lang',l);
  applyLangDom();
  renderApp();
}
function applyLangDom(){
  document.documentElement.lang=lang;
  document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  document.body.className=lang==='ar'?'rtl':'ltr';
  ['ar','fr','en'].forEach(x=>{
    const b=document.getElementById('lb-'+x);
    if(b) b.classList.toggle('active',x===lang);
  });
}

const fmt=n=>Number(n||0).toLocaleString('fr-SY');
const fmtK=n=>Number(n||0).toLocaleString('fr-SY',{maximumFractionDigits:1});
const fmtUSD=n=>Number(n||0).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});

async function api(path,opts={}){
  const r=await fetch('/api'+path,{headers:{'Content-Type':'application/json'},...opts});
  return r.json();
}

function toast(msg,ok=true){
  const el=document.getElementById('toast');
  el.textContent=msg; el.style.background=ok?'#27ae60':'#c0392b';
  el.style.display='block'; setTimeout(()=>el.style.display='none',2500);
}
function showModal(title,body,footer=''){
  document.getElementById('modal-title').textContent=title;
  document.getElementById('modal-body').innerHTML=body;
  document.getElementById('modal-footer').innerHTML=footer;
  document.getElementById('modal-overlay').style.display='flex';
}
function closeModal(e){if(e.target===document.getElementById('modal-overlay'))closeModalDirect();}
function closeModalDirect(){document.getElementById('modal-overlay').style.display='none';}

function devLabel(d){return d==='USD'?t('USD'):t('LS');}
function fmtMoney(n,dev){return dev==='USD' ? fmtUSD(n)+' '+t('USD') : fmt(n)+' '+t('LS');}

let currentPage='dashboard';
let chartFer=null,chartCA=null,chartUsd=null;

function goTo(page){
  currentPage=page;
  document.querySelectorAll('#sidenav a').forEach(a=>a.classList.remove('active'));
  const el=document.getElementById('nav-'+page);
  if(el) el.classList.add('active');
  renderApp();
}

const NAV_KEYS=['dashboard','factures','achats','clients','fournisseurs','produits','prix','taux','inventaire','operations','caisse','backup'];

function updateNav(){
  NAV_KEYS.forEach(k=>{
    const el=document.getElementById('nl-'+k);
    if(el) el.textContent=t('nav_'+k);
  });
  document.getElementById('s-title').textContent=t('app_title');
}

function renderApp(){
  updateNav(); applyLangDom();
  document.getElementById('page-title').textContent=t('nav_'+currentPage)||t('dashboard_title');
  const p=currentPage;
  const map={
    dashboard:renderDashboard, factures:renderFactures, achats:renderAchats,
    clients:renderClients, fournisseurs:renderFournisseurs, produits:renderProduits,
    prix:renderPrix, taux:renderTaux, inventaire:renderInventaire,
    operations:renderOperations, caisse:renderCaisse, backup:renderBackup,
  };
  if(map[p]) map[p]();
}

// ═══════════════════════════════════════════════════════════
//  DASHBOARD
// ═══════════════════════════════════════════════════════════
async function renderDashboard(){
  document.getElementById('page-title').textContent=t('dashboard_title');
  const d=await api('/dashboard');
  document.getElementById('prix-topbar').textContent=
    t('prix_fer_today')+': '+fmt(d.prix_fer.prix_kg)+' '+t('LS')+'  |  '+t('taux_today')+': '+fmt(d.taux_change.ls_par_usd);

  let alertHTML='';
  if(d.alertes_stock.length>0){
    alertHTML=`<div class="alert alert-warn">⚠️ ${t('alertes_stock')}: `+
      d.alertes_stock.map(a=>lang==='ar'?a.nom_ar:a.nom_fr).join(', ')+'</div>';
  }
  const topHTML=d.top_clients.length?d.top_clients.map(c=>
    `<div class="prix-row"><span>${c.nom}</span><span class="prix-val">${fmt(c.ca)} ${t('LS')}</span></div>`
  ).join(''):`<div class="empty-state"><p>—</p></div>`;

  document.getElementById('content').innerHTML=`
    ${alertHTML}
    <div class="stats-grid">
      <div class="stat-card"><span class="ico">💰</span><div class="lbl">${t('ca_jour')}</div><div class="val">${fmt(d.ca_jour)}</div><div class="sub">${t('LS')}</div></div>
      <div class="stat-card gold"><span class="ico">📅</span><div class="lbl">${t('ca_mois')}</div><div class="val">${fmt(d.ca_mois)}</div><div class="sub">${t('LS')}</div></div>
      <div class="stat-card green"><span class="ico">📄</span><div class="lbl">${t('nb_factures')}</div><div class="val">${d.nb_factures}</div><div class="sub">${t('nb_achats')}: ${d.nb_achats_mois}</div></div>
      <div class="stat-card warn"><span class="ico">📈</span><div class="lbl">${t('prix_fer_today')}</div><div class="val">${fmt(d.prix_fer.prix_kg)}</div><div class="sub">${t('LS')}/${t('kg')}</div></div>
      <div class="stat-card" style="border-color:#2980b9"><span class="ico">💵</span><div class="lbl">${t('taux_today')}</div><div class="val">${fmt(d.taux_change.ls_par_usd)}</div><div class="sub">${t('LS')} = 1$</div></div>
    </div>
    <div class="charts-grid">
      <div class="chart-card"><h3>${t('chart_cours_fer')}</h3><canvas id="cFer"></canvas></div>
      <div class="chart-card"><h3>${t('chart_ca_mois')}</h3><canvas id="cCA"></canvas></div>
    </div>
    <div class="charts-grid">
      <div class="chart-card"><h3>${t('chart_cours_usd')}</h3><canvas id="cUsd"></canvas></div>
      <div class="table-card"><div class="table-header"><h3>${t('top_clients')}</h3></div>${topHTML}</div>
    </div>`;

  if(chartFer){chartFer.destroy();chartFer=null;}
  if(chartCA){chartCA.destroy();chartCA=null;}
  if(chartUsd){chartUsd.destroy();chartUsd=null;}

  chartFer=new Chart(document.getElementById('cFer'),{type:'line',data:{
    labels:d.cours_fer.map(r=>r.date.slice(5)),
    datasets:[{label:t('LS')+'/'+t('kg'),data:d.cours_fer.map(r=>r.prix_kg),
      borderColor:'#1a6b74',backgroundColor:'rgba(26,107,116,.1)',tension:.3,fill:true,pointRadius:2}]
  },options:{plugins:{legend:{display:false}},scales:{y:{beginAtZero:false}},responsive:true}});

  chartCA=new Chart(document.getElementById('cCA'),{type:'bar',data:{
    labels:d.ca_par_mois.map(r=>r.mois),
    datasets:[{label:t('LS'),data:d.ca_par_mois.map(r=>r.ca),backgroundColor:'#c8953a',borderRadius:6}]
  },options:{plugins:{legend:{display:false}},responsive:true}});

  chartUsd=new Chart(document.getElementById('cUsd'),{type:'line',data:{
    labels:d.cours_usd.map(r=>r.date.slice(5)),
    datasets:[{label:t('LS'),data:d.cours_usd.map(r=>r.ls_par_usd),
      borderColor:'#2980b9',backgroundColor:'rgba(41,128,185,.1)',tension:.3,fill:true,pointRadius:2}]
  },options:{plugins:{legend:{display:false}},scales:{y:{beginAtZero:false}},responsive:true}});
}

// ═══════════════════════════════════════════════════════════
//  FACTURES DE VENTE
// ═══════════════════════════════════════════════════════════
async function renderFactures(){
  document.getElementById('page-title').textContent=t('factures_list');
  document.getElementById('content').innerHTML=`<div class="empty-state"><div class="empty-icon">⏳</div></div>`;
  const facs=await api('/factures?limit=100');
  const rows=facs.map(f=>`
    <tr>
      <td><strong>${f.numero}</strong></td>
      <td>${f.client_nom||'—'}</td>
      <td>${f.date_facture}</td>
      <td>${fmtMoney(f.total,f.devise)}</td>
      <td><span class="badge dev-${f.devise}">${f.devise}</span></td>
      <td><span class="badge ${f.statut}">${t(f.statut)}</span></td>
      <td style="white-space:nowrap">
        <button class="btn btn-ghost btn-sm" onclick="viewFacture(${f.id})">👁</button>
        <a class="btn btn-primary btn-sm" href="/api/factures/${f.id}/pdf" target="_blank">📥</a>
      </td>
    </tr>`).join('') || `<tr><td colspan="7"><div class="empty-state"><div class="empty-icon">📄</div><p>${t('aucune_donnee')}</p></div></td></tr>`;

  document.getElementById('content').innerHTML=`
    <div class="table-card">
      <div class="table-header">
        <h3>${t('factures_list')}</h3>
        <button class="btn btn-primary" onclick="newFacture()">+ ${t('new_facture')}</button>
      </div>
      <div style="overflow-x:auto">
        <table class="data">
          <thead><tr><th>${t('facture_num')}</th><th>${t('client')}</th><th>${t('date')}</th><th>${t('total')}</th><th>${t('devise')}</th><th>${t('statut')}</th><th>${t('actions')}</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
}

async function newFacture(){
  const clients=await api('/clients');
  const opts=clients.map(c=>`<option value="${c.id}">${c.nom}</option>`).join('');
  showModal(t('new_facture'),`
    <div class="form-group"><label>${t('client')}</label>
      <select class="form-control" id="nf-client"><option value="">${t('select_client')}</option>${opts}</select>
    </div>
    <div class="form-group"><label>${t('devise')}</label>
      <select class="form-control" id="nf-devise">
        <option value="LS">${t('LS')}</option>
        <option value="USD">${t('USD')}</option>
      </select>
    </div>`,
    `<button class="btn btn-primary" onclick="createFacture()">✓ ${t('sauvegarder')}</button>
     <button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);
}
async function createFacture(){
  const cid=document.getElementById('nf-client').value;
  const devise=document.getElementById('nf-devise').value;
  const res=await api('/factures',{method:'POST',body:JSON.stringify({client_id:cid||null,devise})});
  closeModalDirect(); toast(t('save_ok'));
  viewFacture(res.facture_id);
}

async function viewFacture(id){
  document.getElementById('content').innerHTML=`<div class="empty-state"><div class="empty-icon">⏳</div></div>`;
  const {facture,lignes,operations,historique}=await api(`/factures/${id}`);
  const prods=await api('/produits');
  const ops=await api('/operations');
  const dev=facture.devise;

  const prodsOpts=prods.map(p=>`<option value="${p.id}">${lang==='ar'?p.nom_ar:p.nom_fr} (${p.dimension||''})</option>`).join('');
  const opsOpts=ops.map(o=>`<option value="${o.id}">${lang==='ar'?o.nom_ar:o.nom_fr} — ${fmt(o.prix_unitaire)} ${t('LS')}</option>`).join('');

  const canEdit = facture.statut!=='annulee';

  const lignesHTML=lignes.length?lignes.map(l=>`
    <tr>
      <td>${lang==='ar'?(l.nom_ar||l.description_ar):(l.nom_fr||l.description_fr)}</td>
      <td>${fmtK(l.poids_kg)} ${t('kg')}</td>
      <td>${dev==='USD'?fmtUSD(l.prix_kg):fmt(l.prix_kg)}</td>
      <td><strong>${fmtMoney(l.sous_total,dev)}</strong></td>
      <td>${canEdit?`<button class="btn btn-danger btn-sm" onclick="delLigne(${id},${l.id})">✕</button>`:''}</td>
    </tr>`).join(''):`<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:16px">—</td></tr>`;

  const opsHTML=operations.length?operations.map(o=>`
    <tr>
      <td>${lang==='ar'?o.nom_ar:o.nom_fr}</td>
      <td>${o.quantite}</td>
      <td>${fmt(o.prix_unitaire)}</td>
      <td><strong>${fmt(o.sous_total)} ${t('LS')}</strong></td>
      <td>${canEdit?`<button class="btn btn-danger btn-sm" onclick="delOpFac(${id},${o.id})">✕</button>`:''}</td>
    </tr>`).join(''):`<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:16px">—</td></tr>`;

  const addForms = canEdit ? `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:20px">
      <div class="table-card" style="padding:16px">
        <h4 style="margin-bottom:10px;font-size:.9rem;color:var(--sea)">+ ${t('ajouter_ligne')}</h4>
        <div class="form-group"><label>${t('nav_produits')}</label><select class="form-control" id="ap-prod">${prodsOpts}</select></div>
        <div class="form-group"><label>${t('poids_kg')}</label><input type="number" class="form-control" id="ap-poids" value="100" step="0.1" min="0"></div>
        <button class="btn btn-primary" style="width:100%" onclick="addLigne(${id})">+ ${t('ajouter_ligne')}</button>
      </div>
      <div class="table-card" style="padding:16px">
        <h4 style="margin-bottom:10px;font-size:.9rem;color:var(--gold)">+ ${t('ajouter_operation')}</h4>
        <div class="form-group"><label>${t('nav_operations')}</label><select class="form-control" id="ap-op">${opsOpts}</select></div>
        <div class="form-group"><label>${t('quantite')}</label><input type="number" class="form-control" id="ap-qte" value="1" min="1"></div>
        <button class="btn btn-gold" style="width:100%" onclick="addOp(${id})">+ ${t('ajouter_operation')}</button>
      </div>
    </div>`:'';

  const actionsHTML = `
    <div style="margin-top:16px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      ${facture.statut==='brouillon' ? `<button class="btn btn-primary" style="padding:10px 24px" onclick="validerFac(${id})">✓ ${t('valider')}</button>` : ''}
      ${facture.statut!=='annulee' ? `<button class="btn btn-danger" onclick="annulerFacModal(${id})">✕ ${t('annuler_facture')}</button>` : ''}
      ${facture.statut==='annulee' ? `<button class="btn btn-gold" onclick="reactiverFac(${id})">↺ ${t('reactiver')}</button>` : ''}
      ${facture.statut==='brouillon' ? `<button class="btn btn-ghost" onclick="deleteFacModal(${id})">🗑 ${t('supprimer')}</button>` : ''}
      <button class="btn btn-ghost" onclick="editFacDateModal(${id},'${facture.date_facture}')">📅 ${t('modifier_date')}</button>
    </div>`;

  const histHTML = historique.length ? `
    <div class="table-card" style="margin-top:20px">
      <div class="table-header"><h3>📜 ${t('historique')}</h3></div>
      <div style="overflow-x:auto"><table class="data">
        <thead><tr><th>${t('quand')}</th><th>Action</th><th>${t('champ')}</th><th>${t('avant')}</th><th>${t('apres')}</th></tr></thead>
        <tbody>${historique.map(h=>`
          <tr>
            <td style="font-size:.78rem">${h.date_action}</td>
            <td>${h.action}</td>
            <td>${h.champ||'—'}</td>
            <td style="font-size:.78rem">${h.ancienne_valeur||'—'}</td>
            <td style="font-size:.78rem">${h.nouvelle_valeur||'—'}</td>
          </tr>`).join('')}</tbody>
      </table></div>
    </div>` : '';

  document.getElementById('content').innerHTML=`
    <div style="margin-bottom:16px">
      <button class="btn btn-ghost btn-sm" onclick="renderFactures()">← ${t('nav_factures')}</button>
    </div>
    <div class="table-card" style="padding:24px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:10px">
        <div>
          <h2 style="font-size:1.25rem;font-weight:900">${facture.numero}</h2>
          <p style="color:var(--muted);font-size:.85rem;margin-top:4px">${facture.date_facture} · ${facture.client_nom||'—'}</p>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <span class="badge dev-${facture.devise}">${facture.devise}</span>
          <span class="badge ${facture.statut}">${t(facture.statut)}</span>
          <a class="btn btn-primary btn-sm" href="/api/factures/${id}/pdf" target="_blank">📥 PDF</a>
        </div>
      </div>
      <div class="alert alert-success" style="margin-bottom:16px">
        ${t('prix_fer_ref')}: <strong>${fmt(facture.prix_fer_jour)} ${t('LS')}/${t('kg')}</strong>
        ${facture.devise==='USD'?` · ${t('taux_today')}: <strong>${fmt(facture.taux_change)} ${t('LS')}</strong>`:''}
      </div>
      <h4 style="margin-bottom:8px;color:var(--muted);font-size:.85rem">📦 ${t('nav_produits')}</h4>
      <div style="overflow-x:auto"><table class="data">
        <thead><tr><th>${lang==='ar'?'المنتج':'Produit'}</th><th>${t('poids_kg')}</th><th>${t('prix_kg')}</th><th>${t('total')}</th><th></th></tr></thead>
        <tbody>${lignesHTML}</tbody>
      </table></div>
      <h4 style="margin:16px 0 8px;color:var(--muted);font-size:.85rem">⚙️ ${t('nav_operations')}</h4>
      <div style="overflow-x:auto"><table class="data">
        <thead><tr><th>${lang==='ar'?'العملية':'Opération'}</th><th>${t('quantite')}</th><th>${t('prix_unitaire')}</th><th>${t('total')}</th><th></th></tr></thead>
        <tbody>${opsHTML}</tbody>
      </table></div>
      <div class="facture-totals">
        <div class="total-row"><span>${t('sous_total_fer')}</span><span>${fmtMoney(facture.sous_total_fer,dev)}</span></div>
        <div class="total-row"><span>${t('sous_total_ops')}</span><span>${fmt(facture.sous_total_operations)} ${t('LS')}</span></div>
        <div class="total-row grand"><span>${t('total_facture')}</span><span>${fmtMoney(facture.total,dev)}</span></div>
      </div>
      ${addForms}
      ${actionsHTML}
    </div>
    ${histHTML}`;
}

async function addLigne(facId){
  await api(`/factures/${facId}/ligne`,{method:'POST',body:JSON.stringify({produit_id:document.getElementById('ap-prod').value,poids_kg:document.getElementById('ap-poids').value})});
  toast(t('save_ok')); viewFacture(facId);
}
async function addOp(facId){
  await api(`/factures/${facId}/operation`,{method:'POST',body:JSON.stringify({operation_id:document.getElementById('ap-op').value,quantite:document.getElementById('ap-qte').value})});
  toast(t('save_ok')); viewFacture(facId);
}
async function delLigne(facId,lid){await api(`/factures/${facId}/ligne/${lid}`,{method:'DELETE'}); viewFacture(facId);}
async function delOpFac(facId,oid){await api(`/factures/${facId}/operation/${oid}`,{method:'DELETE'}); viewFacture(facId);}
async function validerFac(facId){await api(`/factures/${facId}/valider`,{method:'POST'}); toast(t('save_ok')); viewFacture(facId);}
async function reactiverFac(facId){await api(`/factures/${facId}/reactiver`,{method:'POST'}); toast(t('save_ok')); viewFacture(facId);}

function annulerFacModal(facId){
  showModal(t('annuler_facture'),`
    <div class="form-group"><label>${t('raison_annulation')}</label><input class="form-control" id="ann-raison" placeholder="..."></div>`,
    `<button class="btn btn-danger" onclick="doAnnulerFac(${facId})">✓ ${t('confirmer')}</button>
     <button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);
}
async function doAnnulerFac(facId){
  const raison=document.getElementById('ann-raison').value;
  await api(`/factures/${facId}/annuler`,{method:'POST',body:JSON.stringify({raison})});
  closeModalDirect(); toast(t('save_ok')); viewFacture(facId);
}
function deleteFacModal(facId){
  showModal(t('supprimer'),`<p>${lang==='ar'?'هل أنت متأكد؟ لا يمكن التراجع عن هذا.':'Êtes-vous sûr ? Cette action est irréversible.'}</p>`,
    `<button class="btn btn-danger" onclick="doDeleteFac(${facId})">✓ ${t('confirmer')}</button>
     <button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);
}
async function doDeleteFac(facId){
  const r=await api(`/factures/${facId}`,{method:'DELETE'});
  closeModalDirect();
  if(r.error){toast(r.error,false);return;}
  toast(t('save_ok')); renderFactures();
}
function editFacDateModal(facId,currentDate){
  showModal(t('modifier_date'),`
    <div class="form-group"><label>${t('date')}</label><input type="date" class="form-control" id="ed-date" value="${currentDate}"></div>`,
    `<button class="btn btn-primary" onclick="doEditFacDate(${facId})">✓ ${t('sauvegarder')}</button>
     <button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);
}
async function doEditFacDate(facId){
  const nd=document.getElementById('ed-date').value;
  await api(`/factures/${facId}`,{method:'PUT',body:JSON.stringify({date_facture:nd})});
  closeModalDirect(); toast(t('save_ok')); viewFacture(facId);
}

// ═══════════════════════════════════════════════════════════
//  FACTURES D'ACHAT
// ═══════════════════════════════════════════════════════════
async function renderAchats(){
  document.getElementById('page-title').textContent=t('achats_list');
  document.getElementById('content').innerHTML=`<div class="empty-state"><div class="empty-icon">⏳</div></div>`;
  const achats=await api('/factures-achat?limit=100');
  const rows=achats.map(a=>`
    <tr>
      <td><strong>${a.numero}</strong></td>
      <td>${a.fournisseur_nom||'—'}</td>
      <td>${a.date_facture}</td>
      <td>${fmtMoney(a.total,a.devise)}</td>
      <td><span class="badge dev-${a.devise}">${a.devise}</span></td>
      <td><span class="badge ${a.statut}">${t(a.statut)}</span></td>
      <td><button class="btn btn-ghost btn-sm" onclick="viewAchat(${a.id})">👁</button></td>
    </tr>`).join('') || `<tr><td colspan="7"><div class="empty-state"><div class="empty-icon">📥</div><p>${t('aucune_donnee')}</p></div></td></tr>`;

  document.getElementById('content').innerHTML=`
    <div class="table-card">
      <div class="table-header">
        <h3>${t('achats_list')}</h3>
        <button class="btn btn-gold" onclick="newAchat()">+ ${t('new_achat')}</button>
      </div>
      <div style="overflow-x:auto"><table class="data">
        <thead><tr><th>${t('achat_num')}</th><th>${t('fournisseur')}</th><th>${t('date')}</th><th>${t('total')}</th><th>${t('devise')}</th><th>${t('statut')}</th><th>${t('actions')}</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
    </div>`;
}

async function newAchat(){
  const fourns=await api('/fournisseurs');
  const opts=fourns.map(f=>`<option value="${f.id}">${f.nom}</option>`).join('');
  showModal(t('new_achat'),`
    <div class="form-group"><label>${t('fournisseur')}</label>
      <select class="form-control" id="na-fourn"><option value="">${t('select_fournisseur')}</option>${opts}</select>
    </div>
    <div class="form-group"><label>${t('devise')}</label>
      <select class="form-control" id="na-devise"><option value="LS">${t('LS')}</option><option value="USD">${t('USD')}</option></select>
    </div>`,
    `<button class="btn btn-gold" onclick="createAchat()">✓ ${t('sauvegarder')}</button>
     <button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);
}
async function createAchat(){
  const fid=document.getElementById('na-fourn').value;
  const devise=document.getElementById('na-devise').value;
  const res=await api('/factures-achat',{method:'POST',body:JSON.stringify({fournisseur_id:fid||null,devise})});
  closeModalDirect(); toast(t('save_ok'));
  viewAchat(res.facture_id);
}

async function viewAchat(id){
  document.getElementById('content').innerHTML=`<div class="empty-state"><div class="empty-icon">⏳</div></div>`;
  const {facture,lignes,historique}=await api(`/factures-achat/${id}`);
  const prods=await api('/produits');
  const dev=facture.devise;
  const canEdit=facture.statut==='brouillon';

  const prodsOpts=prods.map(p=>`<option value="${p.id}">${lang==='ar'?p.nom_ar:p.nom_fr} (${p.dimension||''})</option>`).join('');

  const lignesHTML=lignes.length?lignes.map(l=>`
    <tr>
      <td>${lang==='ar'?(l.nom_ar||l.description_ar):(l.nom_fr||l.description_fr)}</td>
      <td>${fmtK(l.poids_kg)} ${t('kg')}</td>
      <td>${fmt(l.prix_kg)}</td>
      <td><strong>${fmtMoney(l.sous_total,dev)}</strong></td>
      <td>${canEdit?`<button class="btn btn-danger btn-sm" onclick="delLigneAchat(${id},${l.id})">✕</button>`:''}</td>
    </tr>`).join(''):`<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:16px">—</td></tr>`;

  const addForm = canEdit ? `
    <div class="table-card" style="padding:16px;margin-top:20px">
      <h4 style="margin-bottom:10px;font-size:.9rem;color:var(--gold)">+ ${t('ajouter_ligne')}</h4>
      <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:10px">
        <div class="form-group"><label>${t('nav_produits')}</label><select class="form-control" id="aa-prod">${prodsOpts}</select></div>
        <div class="form-group"><label>${t('poids_kg')}</label><input type="number" class="form-control" id="aa-poids" value="500" step="1" min="0"></div>
        <div class="form-group"><label>${t('prix_kg')}</label><input type="number" class="form-control" id="aa-prix" value="8000" step="50" min="0"></div>
      </div>
      <button class="btn btn-gold" style="width:100%" onclick="addLigneAchat(${id})">+ ${t('ajouter_ligne')}</button>
    </div>`:'';

  const actionsHTML=`
    <div style="margin-top:16px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      ${facture.statut==='brouillon' ? `<button class="btn btn-primary" style="padding:10px 24px" onclick="validerAchat(${id})">✓ ${t('valider')}</button>` : ''}
      ${facture.statut!=='annulee' ? `<button class="btn btn-danger" onclick="annulerAchat(${id})">✕ ${t('annuler_facture')}</button>` : ''}
      ${facture.statut==='brouillon' ? `<button class="btn btn-ghost" onclick="deleteAchatConfirm(${id})">🗑 ${t('supprimer')}</button>` : ''}
    </div>`;

  const histHTML = historique.length ? `
    <div class="table-card" style="margin-top:20px">
      <div class="table-header"><h3>📜 ${t('historique')}</h3></div>
      <div style="overflow-x:auto"><table class="data">
        <thead><tr><th>${t('quand')}</th><th>Action</th><th>${t('apres')}</th></tr></thead>
        <tbody>${historique.map(h=>`<tr><td style="font-size:.78rem">${h.date_action}</td><td>${h.action}</td><td style="font-size:.78rem">${h.nouvelle_valeur||'—'}</td></tr>`).join('')}</tbody>
      </table></div>
    </div>`:'';

  document.getElementById('content').innerHTML=`
    <div style="margin-bottom:16px"><button class="btn btn-ghost btn-sm" onclick="renderAchats()">← ${t('nav_achats')}</button></div>
    <div class="table-card" style="padding:24px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:10px">
        <div>
          <h2 style="font-size:1.25rem;font-weight:900">${facture.numero}</h2>
          <p style="color:var(--muted);font-size:.85rem;margin-top:4px">${facture.date_facture} · ${facture.fournisseur_nom||'—'}</p>
        </div>
        <div style="display:flex;gap:8px">
          <span class="badge dev-${facture.devise}">${facture.devise}</span>
          <span class="badge ${facture.statut}">${t(facture.statut)}</span>
        </div>
      </div>
      ${facture.statut==='validee'?`<div class="alert alert-success">✓ ${lang==='ar'?'تم تحديث المخزون تلقائياً':'Stock mis à jour automatiquement'}</div>`:''}
      <div style="overflow-x:auto"><table class="data">
        <thead><tr><th>${lang==='ar'?'المنتج':'Produit'}</th><th>${t('poids_kg')}</th><th>${t('prix_kg')}</th><th>${t('total')}</th><th></th></tr></thead>
        <tbody>${lignesHTML}</tbody>
      </table></div>
      <div class="facture-totals">
        <div class="total-row grand"><span>${t('total_facture')}</span><span>${fmtMoney(facture.total,dev)}</span></div>
      </div>
      ${addForm}
      ${actionsHTML}
    </div>
    ${histHTML}`;
}

async function addLigneAchat(id){
  await api(`/factures-achat/${id}/ligne`,{method:'POST',body:JSON.stringify({
    produit_id:document.getElementById('aa-prod').value,
    poids_kg:document.getElementById('aa-poids').value,
    prix_kg:document.getElementById('aa-prix').value
  })});
  toast(t('save_ok')); viewAchat(id);
}
async function delLigneAchat(id,lid){await api(`/factures-achat/${id}/ligne/${lid}`,{method:'DELETE'}); viewAchat(id);}
async function validerAchat(id){await api(`/factures-achat/${id}/valider`,{method:'POST'}); toast(t('save_ok')); viewAchat(id);}
async function annulerAchat(id){await api(`/factures-achat/${id}/annuler`,{method:'POST'}); toast(t('save_ok')); viewAchat(id);}
async function deleteAchatConfirm(id){
  const r=await api(`/factures-achat/${id}`,{method:'DELETE'});
  if(r.error){toast(r.error,false);return;}
  toast(t('save_ok')); renderAchats();
}

// ═══════════════════════════════════════════════════════════
//  CLIENTS
// ═══════════════════════════════════════════════════════════
async function renderClients(){
  document.getElementById('page-title').textContent=t('clients_list');
  document.getElementById('content').innerHTML=`<div class="empty-state"><div class="empty-icon">⏳</div></div>`;
  const clients=await api('/clients');
  const rows=clients.map(c=>`
    <tr>
      <td><strong>${c.nom}</strong></td><td>${c.telephone||'—'}</td><td>${c.email||'—'}</td><td>${c.adresse||'—'}</td>
      <td><button class="btn btn-ghost btn-sm" onclick="editClient(${c.id})">✏️</button></td>
    </tr>`).join('');
  document.getElementById('content').innerHTML=`
    <div class="table-card">
      <div class="table-header"><h3>${t('clients_list')}</h3><button class="btn btn-primary" onclick="addClientModal()">+ ${t('nouveau_client')}</button></div>
      <div style="overflow-x:auto"><table class="data">
        <thead><tr><th>${t('nom')}</th><th>${t('telephone')}</th><th>${t('email')}</th><th>${t('adresse')}</th><th></th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
    </div>`;
}
function cfHTML(c={}){return `
  <div class="form-group"><label>${t('nom')} *</label><input class="form-control" id="c-nom" value="${c.nom||''}"></div>
  <div class="form-group"><label>${t('telephone')}</label><input class="form-control" id="c-tel" value="${c.telephone||''}"></div>
  <div class="form-group"><label>${t('email')}</label><input class="form-control" id="c-email" value="${c.email||''}" type="email"></div>
  <div class="form-group"><label>${t('adresse')}</label><input class="form-control" id="c-adr" value="${c.adresse||''}"></div>
  <div class="form-group"><label>${t('note')}</label><input class="form-control" id="c-note" value="${c.note||''}"></div>`;}
function addClientModal(){showModal(t('nouveau_client'),cfHTML(),`<button class="btn btn-primary" onclick="saveClient()">✓ ${t('sauvegarder')}</button><button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);}
async function editClient(id){const{client}=await api(`/clients/${id}`);showModal(client.nom,cfHTML(client),`<button class="btn btn-primary" onclick="saveClient(${id})">✓ ${t('sauvegarder')}</button><button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);}
async function saveClient(id=null){
  const data={nom:document.getElementById('c-nom').value,telephone:document.getElementById('c-tel').value,email:document.getElementById('c-email').value,adresse:document.getElementById('c-adr').value,note:document.getElementById('c-note').value};
  if(!data.nom)return;
  if(id) await api(`/clients/${id}`,{method:'PUT',body:JSON.stringify(data)});
  else await api('/clients',{method:'POST',body:JSON.stringify(data)});
  toast(t('save_ok')); closeModalDirect(); renderClients();
}

// ═══════════════════════════════════════════════════════════
//  FOURNISSEURS
// ═══════════════════════════════════════════════════════════
async function renderFournisseurs(){
  document.getElementById('page-title').textContent=t('fournisseurs_list');
  document.getElementById('content').innerHTML=`<div class="empty-state"><div class="empty-icon">⏳</div></div>`;
  const fourns=await api('/fournisseurs');
  const rows=fourns.map(f=>`
    <tr>
      <td><strong>${f.nom}</strong></td><td>${f.telephone||'—'}</td><td>${f.email||'—'}</td><td>${f.adresse||'—'}</td>
      <td><button class="btn btn-ghost btn-sm" onclick="editFournisseur(${f.id})">✏️</button></td>
    </tr>`).join('');
  document.getElementById('content').innerHTML=`
    <div class="table-card">
      <div class="table-header"><h3>${t('fournisseurs_list')}</h3><button class="btn btn-gold" onclick="addFournModal()">+ ${t('nouveau_fournisseur')}</button></div>
      <div style="overflow-x:auto"><table class="data">
        <thead><tr><th>${t('nom')}</th><th>${t('telephone')}</th><th>${t('email')}</th><th>${t('adresse')}</th><th></th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
    </div>`;
}
function ffHTML(f={}){return `
  <div class="form-group"><label>${t('nom')} *</label><input class="form-control" id="f-nom" value="${f.nom||''}"></div>
  <div class="form-group"><label>${t('telephone')}</label><input class="form-control" id="f-tel" value="${f.telephone||''}"></div>
  <div class="form-group"><label>${t('email')}</label><input class="form-control" id="f-email" value="${f.email||''}" type="email"></div>
  <div class="form-group"><label>${t('adresse')}</label><input class="form-control" id="f-adr" value="${f.adresse||''}"></div>
  <div class="form-group"><label>${t('note')}</label><input class="form-control" id="f-note" value="${f.note||''}"></div>`;}
function addFournModal(){showModal(t('nouveau_fournisseur'),ffHTML(),`<button class="btn btn-gold" onclick="saveFourn()">✓ ${t('sauvegarder')}</button><button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);}
async function editFournisseur(id){const{fournisseur}=await api(`/fournisseurs/${id}`);showModal(fournisseur.nom,ffHTML(fournisseur),`<button class="btn btn-gold" onclick="saveFourn(${id})">✓ ${t('sauvegarder')}</button><button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);}
async function saveFourn(id=null){
  const data={nom:document.getElementById('f-nom').value,telephone:document.getElementById('f-tel').value,email:document.getElementById('f-email').value,adresse:document.getElementById('f-adr').value,note:document.getElementById('f-note').value};
  if(!data.nom)return;
  if(id) await api(`/fournisseurs/${id}`,{method:'PUT',body:JSON.stringify(data)});
  else await api('/fournisseurs',{method:'POST',body:JSON.stringify(data)});
  toast(t('save_ok')); closeModalDirect(); renderFournisseurs();
}

// ═══════════════════════════════════════════════════════════
//  PRODUITS
// ═══════════════════════════════════════════════════════════
async function renderProduits(){
  document.getElementById('page-title').textContent=t('produits_list');
  document.getElementById('content').innerHTML=`<div class="empty-state"><div class="empty-icon">⏳</div></div>`;
  const prods=await api('/produits');
  const cats={rond_beton:'🔩',tube:'🔲',plat:'▬',corniere:'📐',profile:'📏',treillis:'🔲'};
  const grouped={};
  prods.forEach(p=>{if(!grouped[p.categorie])grouped[p.categorie]=[];grouped[p.categorie].push(p);});
  let html=`<div class="table-header" style="background:white;border-radius:14px;padding:16px 20px;box-shadow:0 2px 10px rgba(0,0,0,.06);margin-bottom:16px">
    <h3>${t('produits_list')}</h3><button class="btn btn-primary" onclick="addProdModal()">+ ${t('nouveau_produit')}</button></div>`;
  Object.entries(grouped).forEach(([cat,ps])=>{
    html+=`<div class="table-card" style="margin-bottom:14px">
      <div class="table-header"><h3>${cats[cat]||''} ${cat}</h3></div>
      <table class="data"><thead><tr><th>${lang==='ar'?'الاسم':'Nom'}</th><th>${t('dimension')}</th></tr></thead>
      <tbody>${ps.map(p=>`<tr><td><strong>${lang==='ar'?p.nom_ar:p.nom_fr}</strong></td><td>${p.dimension||'—'}</td></tr>`).join('')}</tbody></table></div>`;
  });
  document.getElementById('content').innerHTML=html;
}
function addProdModal(){showModal(t('nouveau_produit'),`
  <div class="form-group"><label>اسم بالعربية</label><input class="form-control" id="p-ar" placeholder="حديد مسلح 10 ملم"></div>
  <div class="form-group"><label>Nom Français</label><input class="form-control" id="p-fr" placeholder="Rond à béton 10mm"></div>
  <div class="form-group"><label>${t('categorie')}</label><select class="form-control" id="p-cat">
    <option value="rond_beton">Rond à béton / حديد مسلح</option>
    <option value="tube">Tube / أنبوب</option>
    <option value="plat">Plat / مسطح</option>
    <option value="corniere">Cornière / زاوية</option>
    <option value="profile">Profilé / بروفيل</option>
    <option value="treillis">Treillis / شبكة</option>
  </select></div>
  <div class="form-group"><label>${t('dimension')}</label><input class="form-control" id="p-dim" placeholder="Ø10mm"></div>`,
  `<button class="btn btn-primary" onclick="saveProd()">✓ ${t('sauvegarder')}</button><button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);}
async function saveProd(){
  await api('/produits',{method:'POST',body:JSON.stringify({nom_ar:document.getElementById('p-ar').value,nom_fr:document.getElementById('p-fr').value,categorie:document.getElementById('p-cat').value,dimension:document.getElementById('p-dim').value})});
  toast(t('save_ok')); closeModalDirect(); renderProduits();
}

// ═══════════════════════════════════════════════════════════
//  PRIX DU FER
// ═══════════════════════════════════════════════════════════
async function renderPrix(){
  document.getElementById('page-title').textContent=t('nav_prix');
  const today=await api('/prix-fer/today');
  const hist=await api('/prix-fer?jours=60');
  const histHTML=hist.map(r=>`<div class="prix-row"><span>${r.date}</span><span class="prix-val">${fmt(r.prix_kg)} ${t('LS')}</span><span class="prix-note">${r.note||''}</span></div>`).join('');
  document.getElementById('content').innerHTML=`
    <div style="display:grid;grid-template-columns:1fr 2fr;gap:18px">
      <div>
        <div class="table-card" style="padding:20px;margin-bottom:14px">
          <h3 style="margin-bottom:14px">${t('update_prix')}</h3>
          <div class="form-group"><label>${t('prix_du_jour')}</label><input type="number" class="form-control" id="np" value="${today.prix_kg}" step="50"></div>
          <div class="form-group"><label>${t('note')}</label><input class="form-control" id="np-note"></div>
          <button class="btn btn-primary" style="width:100%" onclick="savePrix()">✓ ${t('update_prix')}</button>
        </div>
        <div class="stat-card warn">
          <div class="lbl">${t('prix_fer_today')}</div><div class="val">${fmt(today.prix_kg)}</div>
          <div class="sub">${t('LS')}/${t('kg')} · ${today.date}</div>
        </div>
      </div>
      <div class="table-card"><div class="table-header"><h3>${t('historique_prix')}</h3></div>
        <div style="max-height:400px;overflow-y:auto">${histHTML}</div></div>
    </div>`;
}
async function savePrix(){
  await api('/prix-fer',{method:'POST',body:JSON.stringify({prix_kg:parseFloat(document.getElementById('np').value),note:document.getElementById('np-note').value})});
  toast(t('save_ok')); renderPrix();
}

// ═══════════════════════════════════════════════════════════
//  COURS DU DOLLAR
// ═══════════════════════════════════════════════════════════
async function renderTaux(){
  document.getElementById('page-title').textContent=t('nav_taux');
  const today=await api('/taux-change/today');
  const hist=await api('/taux-change?jours=60');
  const histHTML=hist.map(r=>`<div class="prix-row"><span>${r.date}</span><span class="prix-val">${fmt(r.ls_par_usd)} ${t('LS')}</span><span class="prix-note">${r.note||''}</span></div>`).join('');
  document.getElementById('content').innerHTML=`
    <div style="display:grid;grid-template-columns:1fr 2fr;gap:18px">
      <div>
        <div class="table-card" style="padding:20px;margin-bottom:14px">
          <h3 style="margin-bottom:14px">${t('update_prix')}</h3>
          <div class="form-group"><label>${t('taux_du_jour')}</label><input type="number" class="form-control" id="nt" value="${today.ls_par_usd}" step="10"></div>
          <div class="form-group"><label>${t('note')}</label><input class="form-control" id="nt-note"></div>
          <button class="btn btn-primary" style="width:100%;background:#2980b9" onclick="saveTaux()">✓ ${t('update_prix')}</button>
        </div>
        <div class="stat-card" style="border-color:#2980b9">
          <div class="lbl">${t('taux_today')}</div><div class="val">${fmt(today.ls_par_usd)}</div>
          <div class="sub">${t('LS')} = 1$ · ${today.date}</div>
        </div>
      </div>
      <div class="table-card"><div class="table-header"><h3>${t('historique_taux')}</h3></div>
        <div style="max-height:400px;overflow-y:auto">${histHTML}</div></div>
    </div>`;
}
async function saveTaux(){
  await api('/taux-change',{method:'POST',body:JSON.stringify({ls_par_usd:parseFloat(document.getElementById('nt').value),note:document.getElementById('nt-note').value})});
  toast(t('save_ok')); renderTaux();
}

// ═══════════════════════════════════════════════════════════
//  INVENTAIRE
// ═══════════════════════════════════════════════════════════
async function renderInventaire(){
  document.getElementById('page-title').textContent=t('inventaire_title');
  const inv=await api('/inventaire');
  const rows=inv.map(i=>`
    <tr style="${i.stock_kg<i.stock_min_alerte?'background:#fff3cd':''}">
      <td><strong>${lang==='ar'?i.nom_ar:i.nom_fr}</strong></td>
      <td>${i.dimension||'—'}</td>
      <td><input type="number" class="form-control" value="${i.stock_kg}" step="10" style="width:110px;display:inline-block" onchange="updateStock(${i.produit_id},this.value)"> ${t('kg')}</td>
      <td>${i.stock_kg<i.stock_min_alerte?'⚠️':'✅'}</td>
    </tr>`).join('');
  document.getElementById('content').innerHTML=`
    <div class="alert alert-warn" style="margin-bottom:14px">⚠️ ${lang==='ar'?'المخزون يتحدث تلقائياً مع المبيعات والمشتريات المؤكدة':'Le stock se met à jour automatiquement avec les ventes et achats validés'}</div>
    <div class="table-card"><div class="table-header"><h3>${t('inventaire_title')}</h3></div>
      <div style="overflow-x:auto"><table class="data">
        <thead><tr><th>${lang==='ar'?'المنتج':'Produit'}</th><th>${t('dimension')}</th><th>${t('stock_actuel')}</th><th></th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div></div>`;
}
async function updateStock(pid,v){await api(`/inventaire/${pid}`,{method:'PUT',body:JSON.stringify({stock_kg:parseFloat(v)})});toast(t('save_ok'));}

// ═══════════════════════════════════════════════════════════
//  OPÉRATIONS
// ═══════════════════════════════════════════════════════════
async function renderOperations(){
  document.getElementById('page-title').textContent=t('operations_list');
  const ops=await api('/operations');
  const rows=ops.map(o=>`
    <tr>
      <td><strong>${lang==='ar'?o.nom_ar:o.nom_fr}</strong></td>
      <td style="color:var(--muted);font-size:.85rem">${o.nom_fr}</td>
      <td><input type="number" class="form-control" value="${o.prix_unitaire}" step="50" style="width:130px;display:inline-block" onchange="updateOp(${o.id},'${o.nom_fr}','${o.nom_ar}',this.value)"> ${t('LS')}</td>
    </tr>`).join('');
  document.getElementById('content').innerHTML=`
    <div class="table-card">
      <div class="table-header"><h3>${t('operations_list')}</h3><button class="btn btn-primary" onclick="addOpModal()">+ ${t('nouvelle_operation')}</button></div>
      <div style="overflow-x:auto"><table class="data">
        <thead><tr><th>${lang==='ar'?'الاسم بالعربية':'Nom arabe'}</th><th>Français</th><th>${t('prix_unitaire')}</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div></div>`;
}
async function updateOp(id,nf,na,p){await api(`/operations/${id}`,{method:'PUT',body:JSON.stringify({nom_fr:nf,nom_ar:na,prix_unitaire:parseFloat(p)})});toast(t('save_ok'));}
function addOpModal(){showModal(t('nouvelle_operation'),`
  <div class="form-group"><label>Nom Français</label><input class="form-control" id="op-fr" placeholder="Coupe simple"></div>
  <div class="form-group"><label>الاسم بالعربية</label><input class="form-control" id="op-ar" placeholder="قطع بسيط"></div>
  <div class="form-group"><label>${t('prix_unitaire')}</label><input type="number" class="form-control" id="op-prix" placeholder="500" step="50"></div>`,
  `<button class="btn btn-primary" onclick="saveOp()">✓ ${t('sauvegarder')}</button><button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);}
async function saveOp(){
  await api('/operations',{method:'POST',body:JSON.stringify({nom_fr:document.getElementById('op-fr').value,nom_ar:document.getElementById('op-ar').value,prix_unitaire:parseFloat(document.getElementById('op-prix').value)})});
  toast(t('save_ok')); closeModalDirect(); renderOperations();
}

// ═══════════════════════════════════════════════════════════
//  CAISSE
// ═══════════════════════════════════════════════════════════
async function renderCaisse(periodeDebut,periodeFin){
  document.getElementById('page-title').textContent=t('caisse_title');
  const params=new URLSearchParams();
  if(periodeDebut) params.set('debut',periodeDebut);
  if(periodeFin) params.set('fin',periodeFin);
  const d=await api('/caisse?'+params.toString());

  document.getElementById('content').innerHTML=`
    <div class="table-card" style="padding:20px;margin-bottom:18px">
      <h3 style="margin-bottom:14px">${t('periode')}</h3>
      <div style="display:flex;gap:12px;align-items:end;flex-wrap:wrap">
        <div class="form-group" style="margin-bottom:0"><label>${t('du')}</label><input type="date" class="form-control" id="ca-debut" value="${d.periode.debut}"></div>
        <div class="form-group" style="margin-bottom:0"><label>${t('au')}</label><input type="date" class="form-control" id="ca-fin" value="${d.periode.fin}"></div>
        <button class="btn btn-primary" onclick="filterCaisse()">🔍 ${lang==='ar'?'تطبيق':'Filtrer'}</button>
      </div>
    </div>
    <div class="stats-grid">
      <div class="stat-card green"><div class="lbl">${t('encaissements')} (${t('LS')})</div><div class="val">${fmt(d.encaissements.LS)}</div></div>
      <div class="stat-card green"><div class="lbl">${t('encaissements')} ($)</div><div class="val">${fmtUSD(d.encaissements.USD)}</div></div>
      <div class="stat-card" style="border-color:var(--danger)"><div class="lbl">${t('decaissements')} (${t('LS')})</div><div class="val">${fmt(d.decaissements.LS)}</div></div>
      <div class="stat-card" style="border-color:var(--danger)"><div class="lbl">${t('decaissements')} ($)</div><div class="val">${fmtUSD(d.decaissements.USD)}</div></div>
    </div>
    <div class="stats-grid" style="grid-template-columns:1fr 1fr">
      <div class="stat-card gold"><div class="lbl">${t('solde')} (${t('LS')})</div><div class="val">${fmt(d.solde.LS)}</div></div>
      <div class="stat-card gold"><div class="lbl">${t('solde')} ($)</div><div class="val">${fmtUSD(d.solde.USD)}</div></div>
    </div>`;
}
function filterCaisse(){
  renderCaisse(document.getElementById('ca-debut').value,document.getElementById('ca-fin').value);
}

// ═══════════════════════════════════════════════════════════
//  BACKUP
// ═══════════════════════════════════════════════════════════
function renderBackup(){
  document.getElementById('page-title').textContent=t('backup_title');
  document.getElementById('content').innerHTML=`
    <div class="table-card" style="padding:24px;max-width:520px">
      <h3 style="margin-bottom:16px">${t('backup_export')}</h3>
      <p style="color:var(--muted);font-size:.88rem;margin-bottom:14px">${lang==='ar'?'قم بتنزيل نسخة من قاعدة البيانات بالكامل.':'Téléchargez une copie complète de la base de données.'}</p>
      <a class="btn btn-primary" href="/api/backup/export" download>📥 ${t('backup_export')}</a>
    </div>
    <div class="table-card" style="padding:24px;max-width:520px;margin-top:18px">
      <h3 style="margin-bottom:16px">${t('backup_import')}</h3>
      <div class="alert alert-warn">${t('backup_warning')}</div>
      <input type="file" id="bk-file" accept=".db" class="form-control" style="margin-bottom:12px">
      <button class="btn btn-danger" onclick="doImportBackup()">📤 ${t('backup_import')}</button>
    </div>`;
}
async function doImportBackup(){
  const f=document.getElementById('bk-file').files[0];
  if(!f){toast('...',false);return;}
  const fd=new FormData(); fd.append('file',f);
  const r=await fetch('/api/backup/import',{method:'POST',body:fd});
  const j=await r.json();
  if(j.ok){toast(t('save_ok')); setTimeout(()=>location.reload(),1000);}
  else toast('Erreur',false);
}

// ═══════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════
applyLangDom();
document.getElementById('nav-dashboard').classList.add('active');
renderApp();
