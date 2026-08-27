// ═══════════════════════════════════════════════════════════
//  TRADUCTIONS
// ═══════════════════════════════════════════════════════════
const TR = {
  fr: {
    app_title:"Gestion Fer",
    nav_dashboard:"Tableau de bord", nav_factures:"Ventes", nav_achats:"Achats",
    nav_clients:"Clients", nav_fournisseurs:"Fournisseurs", nav_produits:"Produits",
    nav_taux:"Cours du dollar", nav_inventaire:"Inventaire",
    nav_operations:"Opérations", nav_caisse:"Caisse", nav_settings:"Réglages", nav_magasin:"Synchro Magasin",
    dashboard_title:"Tableau de bord", ca_jour:"Ventes du jour", ca_mois:"Ventes du mois",
    nb_factures:"Factures ce mois", nb_achats:"Achats ce mois",
    taux_today:"Cours USD", chart_cours_usd:"Cours du dollar (30j)",
    chart_ca_mois:"CA mensuel", top_clients:"Meilleurs clients", alertes_stock:"Alertes stock",
    new_facture:"Nouvelle vente", new_achat:"Nouvel achat", factures_list:"Factures de vente",
    achats_list:"Factures d'achat", client:"Client", fournisseur:"Fournisseur",
    date:"Date", total:"Total", statut:"Statut", actions:"Actions", devise:"Devise",
    brouillon:"Brouillon", validee:"Validée", annulee:"Annulée",
    voir_pdf:"PDF", valider:"Valider", valider_et_payer:"Valider + payer", annuler_facture:"Annuler", reactiver:"Réactiver", supprimer:"Supprimer",
    ajouter_ligne:"Ajouter produit", ajouter_operation:"Ajouter opération",
    poids_kg:"Poids (kg)", prix_kg:"Prix/kg",
    sous_total_fer:"Sous-total produits", sous_total_ops:"Sous-total opérations", sous_total:"Sous-total",
    total_facture:"Total", clients_list:"Clients", nouveau_client:"Nouveau client",
    fournisseurs_list:"Fournisseurs", nouveau_fournisseur:"Nouveau fournisseur",
    nom:"Nom", telephone:"Téléphone", email:"Email", adresse:"Adresse", note:"Note",
    sauvegarder:"Sauvegarder", annuler:"Annuler", fermer:"Fermer",
    taux_du_jour:"Cours du jour (ل.س pour 1$)", historique_taux:"Historique du cours", mettre_a_jour_taux:"Mettre à jour",
    produits_list:"Catalogue produits", nouveau_produit:"Nouveau produit",
    categorie:"Catégorie", dimension:"Dimension", stock_actuel:"Stock (kg)",
    alerte_min:"Alerte mini (kg)", inventaire_title:"Inventaire",
    operations_list:"Opérations machines", nouvelle_operation:"Nouvelle opération",
    prix_unitaire:"Prix unitaire", quantite:"Quantité", sous_total_ligne:"Sous-total",
    loading:"Chargement...", save_ok:"✓ Sauvegardé", LS:"ل.س", USD:"$", kg:"kg",
    facture_num:"N° Facture", achat_num:"N° Achat",
    select_client:"-- Sélectionner un client --", select_fournisseur:"-- Sélectionner un fournisseur --",
    select_produit:"-- Sélectionner un produit --", select_operation:"-- Sélectionner une opération --",
    delete:"Supprimer", retour:"← Retour", retour_categories:"← Catégories", choisir_produit:"Choisir un produit", choisir_produit_aide:"Catégorie puis modèle, comme dans Fer Magasin.", historique:"Historique des modifications",
    caisse_title:"Caisse", encaissements:"Encaissements (ventes)", decaissements:"Décaissements (achats)",
    solde:"Solde", periode:"Période", du:"Du", au:"au",
    backup_title:"Sauvegarde de la base de données",
    backup_export:"Sauvegarder la BD complète", backup_import:"Restaurer une sauvegarde", proposer_sauvegarde:"Voulez-vous sauvegarder la base de données avant de continuer ? C'est fortement recommandé.", puis_import_demo:"Une fois effacé, le programme importe automatiquement la démo",
    backup_warning:"⚠️ Restaurer remplacera toutes les données actuelles.",
    raison_annulation:"Raison de l'annulation", confirmer:"Confirmer",
    modifier_date:"Modifier la date", modifier: "Modifier",
    aucune_donnee:"Aucune donnée", champ:"Champ", avant:"Avant", apres:"Après", quand:"Quand",
    ligne_libre:"Main-d'œuvre / Remise", ligne_libre_placeholder:"Ex: Main-d'œuvre spécialisée, Remise fidélité...",
    ligne_libre_aide:"Montant positif = ajout (ex: main-d'œuvre). Montant négatif = remise.",
    description:"Description", montant:"Montant", ajouter:"Ajouter", nouveau:"Nouveau", champs_requis:"Description et montant requis",
    paiement_title:"Paiement", montant_du_fixe:"Montant dû (fixé)",
    montant_du_aide:"Ce montant en dollars ne change jamais, même si le cours fluctue.",
    paiement_en_attente:"En attente", paiement_credit_differe:"Crédit différé", paiement_paye:"Payé",
    marquer_paye:"Marquer payé", paye_le:"Payé le",
    paiement_partiellement_paye:"Partiellement payé", ajouter_paiement:"Ajouter un paiement", payer_solde_restant:"Payer le solde restant",
    total_paye:"Total payé", solde_restant:"Solde restant", aucun_paiement:"Aucun paiement enregistré",
    prix_achat:"Prix d'achat", prix_vente:"Prix de vente", marge:"Marge", modifier_produit:"Modifier",
    prix_obligatoire:"Chaque produit doit avoir un prix de vente (LS) pour pouvoir être vendu.", gerer_categories:"Catégories de produits", nouvelle_categorie:"Nouvelle catégorie", modifier_categorie:"Modifier la catégorie", icone:"Icône", icone_perso:"Autre (coller un emoji)",
    stock_bas:"Stock bas", stock_critique:"Stock critique", stock_ok:"Stock OK",
    settings_title:"Réglages du programme", devise_defaut:"Devise par défaut de l'application",
    afficher_devise_secondaire:"Afficher l'autre devise en équivalent", oui:"Oui", non:"Non",
    zone_danger:"Zone de danger", effacer_donnees:"Effacer toutes les données",
    effacer_donnees_desc:"Supprime définitivement toutes les factures, clients, produits et données. Action irréversible.",
    taper_effacer:"Tapez EFFACER pour confirmer", importer_demo:"Importer une démo", catalogue_tartous_titre:"Catalogue depuis Tartous", catalogue_tartous_desc:"Ouvrez la page à cocher directement (si Tartous a accès à Fer Manager), ou importez le fichier envoyé manuellement.", ct_ouvrir_page:"Ouvrir la page à cocher", ct_ouvrir_page_aide:"À ouvrir depuis Tartous (même appareil ou même réseau que Fer Manager) — l'import se fait directement, sans fichier à envoyer.", ct_ou_fichier:"Ou bien, si le fichier a été envoyé séparément (WhatsApp, email) :", catalogue_tartous_mode:"Que faire avec la sélection ?", ct_mode_ajouter:"Ajouter à la base existante", ct_mode_remplacer:"Effacer tout le catalogue actuel et le remplacer", ct_remplacer_avertissement:"Tous les produits et opérations actuels seront désactivés (pas supprimés définitivement — vos factures existantes restent intactes) et remplacés par la sélection.", ct_prix_a_definir:"Pensez à définir les prix de ces nouveaux produits/opérations avant de les vendre.", importer:"Importer",
    demo_standard:"Démo standard", demo_standard_desc:"30 ventes, 15 achats, activité normale",
    demo_volume:"Démo gros volume", demo_volume_desc:"90 ventes, 40 achats, commerce très actif",
    demo_credits:"Démo crédits", demo_credits_desc:"Beaucoup de paiements en attente/différés",
    unite_vente:"Unité de vente", unite_kg:"Au kilo (kg)", unite_piece:"À la pièce", unite_piece_short:"pièce", quantite_piece:"Quantité (pièces)",
    type_ligne:"Type", autre_texte_libre:"Autre (texte libre)",
    nouveau_type_ligne:"Nouveau type", gerer_types_lignes:"Types de lignes libres", signe:"Signe", plus:"Ajout (+)", moins:"Remise (−)", montant_defaut:"Montant suggéré",
  },
  ar: {
    app_title:"إدارة الحديد",
    nav_dashboard:"اللوحة الرئيسية", nav_factures:"المبيعات", nav_achats:"المشتريات",
    nav_clients:"الزبائن", nav_fournisseurs:"التجار", nav_produits:"المنتجات",
    nav_taux:"سعر الدولار", nav_inventaire:"المخزون",
    nav_operations:"العمليات", nav_caisse:"الصندوق", nav_settings:"الإعدادات", nav_magasin:"مزامنة المتجر",
    dashboard_title:"اللوحة الرئيسية", ca_jour:"مبيعات اليوم", ca_mois:"مبيعات الشهر",
    nb_factures:"فواتير هذا الشهر", nb_achats:"مشتريات هذا الشهر",
    taux_today:"سعر الدولار", chart_cours_usd:"تطور سعر الدولار (30 يوم)",
    chart_ca_mois:"المبيعات الشهرية", top_clients:"أفضل زبون", alertes_stock:"تنبيهات المخزون",
    new_facture:"عملية بيع جديدة", new_achat:"عملية شراء جديدة", factures_list:"فواتير المبيعات",
    achats_list:"فواتير المشتريات", client:"الزبون", fournisseur:"التاجر",
    date:"التاريخ", total:"الإجمالي", statut:"الحالة", actions:"إجراءات", devise:"العملة",
    brouillon:"مسودة", validee:"مؤكدة", annulee:"ملغاة",
    voir_pdf:"PDF", valider:"تأكيد", valider_et_payer:"تأكيد + دفع كامل", annuler_facture:"إلغاء", reactiver:"إعادة تفعيل", supprimer:"حذف",
    ajouter_ligne:"إضافة منتج", ajouter_operation:"إضافة عملية",
    poids_kg:"الوزن (كغ)", prix_kg:"السعر/كغ",
    sous_total_fer:"مجموع المنتجات", sous_total_ops:"مجموع العمليات", sous_total:"المجموع الفرعي",
    total_facture:"المجموع الكلي", clients_list:"الزبائن", nouveau_client:"زبون جديد",
    fournisseurs_list:"التجار", nouveau_fournisseur:"تاجر جديد",
    nom:"الاسم", telephone:"الهاتف", email:"البريد الإلكتروني", adresse:"العنوان", note:"ملاحظة",
    sauvegarder:"حفظ", annuler:"إلغاء", fermer:"إغلاق",
    taux_du_jour:"سعر اليوم (ل.س مقابل 1$)", historique_taux:"سجل سعر الصرف", mettre_a_jour_taux:"تحديث",
    produits_list:"كتالوج المنتجات", nouveau_produit:"منتج جديد",
    categorie:"الفئة", dimension:"القياس", stock_actuel:"المخزون (كغ)",
    alerte_min:"حد التنبيه (كغ)", inventaire_title:"المخزون",
    operations_list:"عمليات الآلات", nouvelle_operation:"عملية جديدة",
    prix_unitaire:"السعر", quantite:"الكمية", sous_total_ligne:"المجموع الفرعي",
    loading:"جار التحميل...", save_ok:"✓ تم الحفظ", LS:"ل.س", USD:"$", kg:"كغ",
    facture_num:"رقم الفاتورة", achat_num:"رقم فاتورة الشراء",
    select_client:"-- اختر الزبون --", select_fournisseur:"-- اختر التاجر --",
    select_produit:"-- اختر منتجاً --", select_operation:"-- اختر عملية --",
    delete:"حذف", retour:"→ رجوع", retour_categories:"→ الفئات", choisir_produit:"اختيار منتج", choisir_produit_aide:"الفئة ثم الصنف، كما في متجر الحديد.", historique:"سجل التعديلات",
    caisse_title:"الصندوق", encaissements:"المقبوضات (المبيعات)", decaissements:"المدفوعات (المشتريات)",
    solde:"الرصيد", periode:"الفترة", du:"من", au:"إلى",
    backup_title:"نسخ احتياطي لقاعدة البيانات",
    backup_export:"حفظ نسخة كاملة من قاعدة البيانات", backup_import:"استعادة نسخة احتياطية", proposer_sauvegarde:"هل تريد حفظ نسخة احتياطية من قاعدة البيانات قبل المتابعة؟ يُنصح بشدة بذلك.", puis_import_demo:"بعد الحذف، سيقوم البرنامج تلقائياً باستيراد العرض التجريبي",
    backup_warning:"⚠️ الاستعادة ستستبدل جميع البيانات الحالية.",
    raison_annulation:"سبب الإلغاء", confirmer:"تأكيد",
    modifier_date:"تعديل التاريخ", modifier:"تعديل",
    aucune_donnee:"لا توجد بيانات", champ:"الحقل", avant:"قبل", apres:"بعد", quand:"متى",
    ligne_libre:"أجرة / تخفيض", ligne_libre_placeholder:"مثال: أجرة عمل إضافية، تخفيض للزبون المميز...",
    ligne_libre_aide:"مبلغ موجب = إضافة (مثل أجرة العمل). مبلغ سالب = تخفيض.",
    description:"الوصف", montant:"المبلغ", ajouter:"إضافة", nouveau:"جديد", champs_requis:"الوصف والمبلغ مطلوبان",
    paiement_title:"الدفع", montant_du_fixe:"المبلغ المستحق (ثابت)",
    montant_du_aide:"هذا المبلغ بالدولار لا يتغير أبداً، حتى لو تغير سعر الصرف.",
    paiement_en_attente:"بانتظار الدفع", paiement_credit_differe:"دفع آجل", paiement_paye:"مدفوعة",
    marquer_paye:"تحديد كمدفوعة", paye_le:"دُفعت في",
    paiement_partiellement_paye:"مدفوعة جزئياً", ajouter_paiement:"إضافة دفعة", payer_solde_restant:"دفع كامل المتبقي",
    total_paye:"المدفوع", solde_restant:"المتبقي", aucun_paiement:"لا توجد دفعات مسجلة",
    prix_achat:"سعر الشراء", prix_vente:"سعر البيع", marge:"الهامش", modifier_produit:"تعديل",
    prix_obligatoire:"يجب أن يكون لكل منتج سعر بيع (ل.س) ليصبح قابلاً للبيع.", gerer_categories:"فئات المنتجات", nouvelle_categorie:"فئة جديدة", modifier_categorie:"تعديل الفئة", icone:"أيقونة", icone_perso:"أخرى (الصق رمزاً تعبيرياً)",
    stock_bas:"مخزون منخفض", stock_critique:"مخزون حرج", stock_ok:"مخزون جيد",
    settings_title:"إعدادات البرنامج", devise_defaut:"العملة الافتراضية للتطبيق",
    afficher_devise_secondaire:"عرض العملة الأخرى كمعادل", oui:"نعم", non:"لا",
    zone_danger:"منطقة الخطر", effacer_donnees:"حذف جميع البيانات",
    effacer_donnees_desc:"يحذف نهائياً جميع الفواتير والعملاء والمنتجات والبيانات. إجراء لا رجعة فيه.",
    taper_effacer:"اكتب EFFACER للتأكيد", importer_demo:"استيراد بيانات تجريبية", catalogue_tartous_titre:"كتالوج من طرطوس", catalogue_tartous_desc:"افتح صفحة الاختيار مباشرة (إذا كان لدى طرطوس وصول إلى Fer Manager)، أو استورد الملف المُرسل يدوياً.", ct_ouvrir_page:"فتح صفحة الاختيار", ct_ouvrir_page_aide:"يُفتح من طرطوس (نفس الجهاز أو نفس الشبكة) - يتم الاستيراد مباشرة دون إرسال ملف.", ct_ou_fichier:"أو إذا تم إرسال الملف بشكل منفصل (واتساب، إيميل):", catalogue_tartous_mode:"ماذا تفعل بالتحديد؟", ct_mode_ajouter:"إضافة إلى القاعدة الحالية", ct_mode_remplacer:"حذف الكتالوج الحالي بالكامل واستبداله", ct_remplacer_avertissement:"سيتم تعطيل جميع المنتجات والعمليات الحالية (وليس حذفها نهائياً - فواتيرك الحالية تبقى سليمة) واستبدالها بالتحديد الجديد.", ct_prix_a_definir:"لا تنس تحديد أسعار هذه المنتجات/العمليات الجديدة قبل بيعها.", importer:"استيراد",
    demo_standard:"عرض قياسي", demo_standard_desc:"30 عملية بيع، 15 شراء، نشاط عادي",
    demo_volume:"عرض حجم كبير", demo_volume_desc:"90 عملية بيع، 40 شراء، تجارة نشطة جداً",
    demo_credits:"عرض الديون", demo_credits_desc:"الكثير من المدفوعات المعلقة أو الآجلة",
    unite_vente:"وحدة البيع", unite_kg:"بالكيلو (كغ)", unite_piece:"بالقطعة", unite_piece_short:"قطعة", quantite_piece:"الكمية (قطع)",
    type_ligne:"النوع", autre_texte_libre:"أخرى (نص حر)",
    nouveau_type_ligne:"نوع جديد", gerer_types_lignes:"أنواع البنود الحرة", signe:"الإشارة", plus:"إضافة (+)", moins:"تخفيض (−)", montant_defaut:"المبلغ المقترح",
  },
  en: {
    app_title:"Iron Manager",
    nav_dashboard:"Dashboard", nav_factures:"Sales", nav_achats:"Purchases",
    nav_clients:"Clients", nav_fournisseurs:"Suppliers", nav_produits:"Products",
    nav_taux:"USD Rate", nav_inventaire:"Inventory",
    nav_operations:"Operations", nav_caisse:"Cash", nav_settings:"Settings", nav_magasin:"Store Sync",
    dashboard_title:"Dashboard", ca_jour:"Today Sales", ca_mois:"Month Sales",
    nb_factures:"Invoices this month", nb_achats:"Purchases this month",
    taux_today:"USD rate", chart_cours_usd:"USD rate (30d)",
    chart_ca_mois:"Monthly revenue", top_clients:"Top clients", alertes_stock:"Stock alerts",
    new_facture:"New sale", new_achat:"New purchase", factures_list:"Sales invoices",
    achats_list:"Purchase invoices", client:"Client", fournisseur:"Supplier",
    date:"Date", total:"Total", statut:"Status", actions:"Actions", devise:"Currency",
    brouillon:"Draft", validee:"Validated", annulee:"Cancelled",
    voir_pdf:"PDF", valider:"Validate", valider_et_payer:"Validate + pay in full", annuler_facture:"Cancel", reactiver:"Reactivate", supprimer:"Delete",
    ajouter_ligne:"Add product", ajouter_operation:"Add operation",
    poids_kg:"Weight (kg)", prix_kg:"Price/kg",
    sous_total_fer:"Products subtotal", sous_total_ops:"Operations subtotal", sous_total:"Subtotal",
    total_facture:"Total", clients_list:"Clients", nouveau_client:"New client",
    fournisseurs_list:"Suppliers", nouveau_fournisseur:"New supplier",
    nom:"Name", telephone:"Phone", email:"Email", adresse:"Address", note:"Note",
    sauvegarder:"Save", annuler:"Cancel", fermer:"Close",
    taux_du_jour:"Today rate (SYP per 1$)", historique_taux:"Rate history", mettre_a_jour_taux:"Update",
    produits_list:"Products", nouveau_produit:"New product",
    categorie:"Category", dimension:"Dimension", stock_actuel:"Stock (kg)",
    alerte_min:"Min alert (kg)", inventaire_title:"Inventory",
    operations_list:"Machine operations", nouvelle_operation:"New operation",
    prix_unitaire:"Unit price", quantite:"Quantity", sous_total_ligne:"Subtotal",
    loading:"Loading...", save_ok:"✓ Saved", LS:"SYP", USD:"$", kg:"kg",
    facture_num:"Invoice #", achat_num:"Purchase #",
    select_client:"-- Select client --", select_fournisseur:"-- Select supplier --",
    select_produit:"-- Select product --", select_operation:"-- Select operation --",
    delete:"Delete", retour:"← Back", retour_categories:"← Categories", choisir_produit:"Choose a product", choisir_produit_aide:"Category then model, just like Fer Magasin.", historique:"Change history",
    caisse_title:"Cash register", encaissements:"Income (sales)", decaissements:"Expenses (purchases)",
    solde:"Balance", periode:"Period", du:"From", au:"to",
    backup_title:"Database backup",
    backup_export:"Back up the entire database", backup_import:"Restore backup", proposer_sauvegarde:"Would you like to back up the database before continuing? Strongly recommended.", puis_import_demo:"Once erased, the program automatically imports the demo",
    backup_warning:"⚠️ Restoring will replace all current data.",
    raison_annulation:"Cancellation reason", confirmer:"Confirm",
    modifier_date:"Edit date", modifier:"Edit",
    aucune_donnee:"No data", champ:"Field", avant:"Before", apres:"After", quand:"When",
    ligne_libre:"Labor / Discount", ligne_libre_placeholder:"E.g: Specialized labor, Loyalty discount...",
    ligne_libre_aide:"Positive amount = addition (e.g. labor). Negative amount = discount.",
    description:"Description", montant:"Amount", ajouter:"Add", nouveau:"New", champs_requis:"Description and amount required",
    paiement_title:"Payment", montant_du_fixe:"Amount due (fixed)",
    montant_du_aide:"This amount in dollars never changes, even if the exchange rate fluctuates.",
    paiement_en_attente:"Pending", paiement_credit_differe:"Deferred credit", paiement_paye:"Paid",
    marquer_paye:"Mark as paid", paye_le:"Paid on",
    paiement_partiellement_paye:"Partially paid", ajouter_paiement:"Add payment", payer_solde_restant:"Pay remaining balance",
    total_paye:"Total paid", solde_restant:"Remaining balance", aucun_paiement:"No payment recorded",
    prix_achat:"Purchase price", prix_vente:"Sale price", marge:"Margin", modifier_produit:"Edit",
    prix_obligatoire:"Every product must have a sale price (SYP) before it can be sold.", gerer_categories:"Product categories", nouvelle_categorie:"New category", modifier_categorie:"Edit category", icone:"Icon", icone_perso:"Other (paste an emoji)",
    stock_bas:"Low stock", stock_critique:"Critical stock", stock_ok:"Stock OK",
    settings_title:"Program settings", devise_defaut:"Default currency of the application",
    afficher_devise_secondaire:"Show the other currency as equivalent", oui:"Yes", non:"No",
    zone_danger:"Danger zone", effacer_donnees:"Erase all data",
    effacer_donnees_desc:"Permanently deletes all invoices, clients, products and data. Irreversible action.",
    taper_effacer:"Type EFFACER to confirm", importer_demo:"Import a demo", catalogue_tartous_titre:"Catalogue from Tartous", catalogue_tartous_desc:"Open the checklist page directly (if Tartous has access to Fer Manager), or import the file sent manually.", ct_ouvrir_page:"Open the checklist page", ct_ouvrir_page_aide:"To be opened from Tartous (same device or network as Fer Manager) — the import happens directly, no file to send.", ct_ou_fichier:"Or, if the file was sent separately (WhatsApp, email):", catalogue_tartous_mode:"What to do with the selection?", ct_mode_ajouter:"Add to existing catalogue", ct_mode_remplacer:"Erase the whole current catalogue and replace it", ct_remplacer_avertissement:"All current products and operations will be deactivated (not permanently deleted — your existing invoices stay intact) and replaced by the selection.", ct_prix_a_definir:"Remember to set prices for these new products/operations before selling them.", importer:"Import",
    demo_standard:"Standard demo", demo_standard_desc:"30 sales, 15 purchases, normal activity",
    demo_volume:"High volume demo", demo_volume_desc:"90 sales, 40 purchases, very active business",
    demo_credits:"Credits demo", demo_credits_desc:"Lots of pending/deferred payments",
    unite_vente:"Sale unit", unite_kg:"By kilogram (kg)", unite_piece:"By piece", unite_piece_short:"piece", quantite_piece:"Quantity (pieces)",
    type_ligne:"Type", autre_texte_libre:"Other (free text)",
    nouveau_type_ligne:"New type", gerer_types_lignes:"Free line types", signe:"Sign", plus:"Add (+)", moins:"Discount (−)", montant_defaut:"Suggested amount",
  }
};

let lang = localStorage.getItem('lang')||'ar';
let appSettings = { devise_defaut: 'USD', afficher_devise_secondaire: '1' };
let currentFactureCtx = { devise: 'LS', taux: 1 };
let currentProdsList = [];

// Categories dynamiques (avant : liste figee dans le code). Chargees au
// demarrage via loadCategories(), modifiables depuis la page Produits.
// Meme systeme de classement que Fer Magasin (icone + libelle par categorie).
let CATEGORIES = { autre: {ar:'أخرى', fr:'Autre', en:'Other', icon:'📦'} };
async function loadCategories(){
  try {
    const cats = await api('/categories');
    if(Array.isArray(cats)){
      const map = { autre: {ar:'أخرى', fr:'Autre', en:'Other', icon:'📦'} };
      cats.forEach(c=>{ map[c.cle] = {ar:c.nom_ar, fr:c.nom_fr, en:c.nom_en||c.nom_fr, icon:c.icon||'📦'}; });
      CATEGORIES = map;
    }
  } catch(e){ /* garde les valeurs par defaut si l'appel echoue */ }
}
function catLabel(cle){ return (CATEGORIES[cle] || CATEGORIES.autre)[lang]; }
function catIcon(cle){ return (CATEGORIES[cle] || CATEGORIES.autre).icon; }

async function loadAppSettings(){
  try {
    const s = await api('/settings');
    if(s && s.devise_defaut) appSettings = s;
  } catch(e){ /* garde les valeurs par defaut si l'appel echoue */ }
}
function t(k){return TR[lang][k]||k;}
/** Affiche un nom (produit, operation, type de ligne libre...) dans la langue
 * de l'interface. Avant : toujours "arabe ou francais", meme quand la langue
 * active etait l'anglais - l'anglais n'etait jamais reellement utilise. */
function nomL(obj){
  if(!obj) return '';
  if(lang==='ar') return obj.nom_ar || obj.nom_fr || obj.nom_en || '';
  if(lang==='en') return obj.nom_en || obj.nom_fr || obj.nom_ar || '';
  return obj.nom_fr || obj.nom_ar || obj.nom_en || '';
}

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
function showModal(title,body,footer='',wide=false){
  document.getElementById('modal-title').textContent=title;
  document.getElementById('modal-body').innerHTML=body;
  document.getElementById('modal-footer').innerHTML=footer;
  document.getElementById('modal-box').classList.toggle('modal-wide', !!wide);
  document.getElementById('modal-overlay').style.display='flex';
}
function closeModal(e){if(e.target===document.getElementById('modal-overlay'))closeModalDirect();}
function closeModalDirect(){document.getElementById('modal-overlay').style.display='none';}

function devLabel(d){return d==='USD'?t('USD'):t('LS');}
function fmtMoney(n,dev){return dev==='USD' ? fmtUSD(n)+' '+t('USD') : fmt(n)+' '+t('LS');}

/**
 * Affiche un montant en priorite en dollars (montant_du_usd, fixe et protege),
 * avec l'equivalent en livres syriennes en petit texte, calcule au taux
 * de la facture (taux fige a la creation, jamais recalcule apres coup).
 * Retourne du HTML pret a inserer.
 */
function fmtMoneyDual(montantUsd, taux, opts={}){
  const usd = fmtUSD(montantUsd);
  const size = opts.size || '1rem';
  const subSize = opts.subSize || '.72rem';
  const afficherSecondaire = appSettings.afficher_devise_secondaire !== '0';
  if(!afficherSecondaire){
    return `<span class="num" style="font-weight:800;font-size:${size};color:var(--sea)">${usd} ${t('USD')}</span>`;
  }
  const ls = fmt(Math.round((montantUsd||0) * (taux||1)));
  return `<span class="num" style="font-weight:800;font-size:${size};color:var(--sea)">${usd} ${t('USD')}</span>
    <div class="num" style="font-size:${subSize};color:var(--muted);margin-top:2px">≈ ${ls} ${t('LS')} <span style="opacity:.7">(${fmt(taux)} ${t('LS')}/$)</span></div>`;
}

/** Version compacte sur une seule ligne, pour les tableaux */
function fmtMoneyDualInline(montantUsd, taux){
  const usd = fmtUSD(montantUsd);
  const afficherSecondaire = appSettings.afficher_devise_secondaire !== '0';
  if(!afficherSecondaire){
    return `<strong class="num" style="color:var(--sea)">${usd} ${t('USD')}</strong>`;
  }
  const ls = fmt(Math.round((montantUsd||0) * (taux||1)));
  return `<strong class="num" style="color:var(--sea)">${usd} ${t('USD')}</strong> <span class="num" style="color:var(--muted);font-size:.78rem">(≈${ls} ${t('LS')})</span>`;
}

let currentPage='dashboard';
let chartCA=null,chartUsd=null;

function goTo(page){
  currentPage=page;
  document.querySelectorAll('#sidenav a').forEach(a=>a.classList.remove('active'));
  const el=document.getElementById('nav-'+page);
  if(el) el.classList.add('active');
  if(window.resetContentScroll) window.resetContentScroll();
  renderApp();
  closeSidebar();
}

function openSidebar(){
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebar-overlay').classList.add('open');
}
function closeSidebar(){
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('open');
}

const NAV_KEYS=['dashboard','factures','achats','clients','fournisseurs','produits','taux','inventaire','operations','caisse','settings','magasin'];

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
    taux:renderTaux, inventaire:renderInventaire,
    operations:renderOperations, caisse:renderCaisse, settings:renderSettings, magasin:renderMagasin,
  };
  if(map[p]) map[p]();
}

// ═══════════════════════════════════════════════════════════
//  DASHBOARD
// ═══════════════════════════════════════════════════════════
async function renderDashboard(){
  document.getElementById('page-title').textContent=t('dashboard_title');
  const d=await api('/dashboard');
  const taux = d.taux_change.ls_par_usd || 1;
  const devDefaut = appSettings.devise_defaut || 'USD';
  document.getElementById('prix-topbar').innerHTML=
    `<span>${t('taux_today')}:</span> <bdi style="unicode-bidi:isolate;direction:ltr">1$ = ${fmt(taux)} ${t('LS')}</bdi>`;

  // Tous les montants remontent du serveur en USD (universel, quelle que soit
  // la devise de chaque facture - voir montant_du_usd) ; on les affiche ici
  // selon la devise par defaut choisie dans les Reglages, comme sur la page Produits.
  const fmtCA = (usd) => devDefaut==='USD' ? fmtUSD(usd)+' '+t('USD') : fmt(Math.round(usd*taux))+' '+t('LS');

  let alertHTML='';
  if(d.alertes_stock.length>0){
    alertHTML=`<div class="alert alert-warn">⚠️ ${t('alertes_stock')}: `+
      d.alertes_stock.map(a=>nomL(a)).join(', ')+'</div>';
  }
  const topHTML=d.top_clients.length?d.top_clients.map(c=>
    `<div class="prix-row"><span>${c.nom}</span><span class="prix-val num">${fmtCA(c.ca_usd)}</span></div>`
  ).join(''):`<div class="empty-state"><p>—</p></div>`;

  document.getElementById('content').innerHTML=`
    ${alertHTML}
    <div class="stats-grid">
      <div class="stat-card"><span class="ico">💰</span><div class="lbl">${t('ca_jour')}</div><div class="val num">${fmtCA(d.ca_jour_usd)}</div></div>
      <div class="stat-card gold"><span class="ico">📅</span><div class="lbl">${t('ca_mois')}</div><div class="val num">${fmtCA(d.ca_mois_usd)}</div></div>
      <div class="stat-card green"><span class="ico">📄</span><div class="lbl">${t('nb_factures')}</div><div class="val">${d.nb_factures}</div><div class="sub">${t('nb_achats')}: ${d.nb_achats_mois}</div></div>
      <div class="stat-card" style="border-color:#2c6f8a"><span class="ico">💵</span><div class="lbl">${t('taux_today')}</div><div class="val num">${fmt(taux)}</div><div class="sub"><bdi style="unicode-bidi:isolate;direction:ltr">1$ = ${fmt(taux)} ${t('LS')}</bdi></div></div>
    </div>
    <div class="charts-grid">
      <div class="chart-card"><h3>${t('chart_ca_mois')}</h3><canvas id="cCA"></canvas></div>
      <div class="table-card"><div class="table-header"><h3>${t('top_clients')}</h3></div>${topHTML}</div>
    </div>
    <div class="chart-card">
      <h3>${t('chart_cours_usd')}</h3><canvas id="cUsd"></canvas>
    </div>`;

  if(chartCA){chartCA.destroy();chartCA=null;}
  if(chartUsd){chartUsd.destroy();chartUsd=null;}

  chartCA=new Chart(document.getElementById('cCA'),{type:'bar',data:{
    labels:d.ca_par_mois.map(r=>r.mois),
    datasets:[{label:devDefaut, data:d.ca_par_mois.map(r=>devDefaut==='USD'?r.ca_usd:Math.round((r.ca_usd||0)*taux)),backgroundColor:'#c1522a',borderRadius:5}]
  },options:{plugins:{legend:{display:false}},responsive:true}});

  chartUsd=new Chart(document.getElementById('cUsd'),{type:'line',data:{
    labels:d.cours_usd.map(r=>r.date.slice(5)),
    datasets:[{label:t('LS'),data:d.cours_usd.map(r=>r.ls_par_usd),
      borderColor:'#2c6f8a',backgroundColor:'rgba(44,111,138,.1)',tension:.3,fill:true,pointRadius:2}]
  },options:{plugins:{legend:{display:false}},scales:{y:{beginAtZero:false}},responsive:true}});
}

// ═══════════════════════════════════════════════════════════
//  FACTURES DE VENTE
// ═══════════════════════════════════════════════════════════
async function renderFactures(){
  document.getElementById('page-title').textContent=t('factures_list');
  document.getElementById('content').innerHTML=`<div class="empty-state"><div class="empty-icon">⏳</div></div>`;
  const facs=await api('/factures?limit=100');
  const payBadgeClass = {en_attente:'brouillon', partiellement_paye:'dev-USD', paye:'validee'};
  const rows=facs.map(f=>`
    <tr class="row-clickable" onclick="viewFacture(${f.id})">
      <td onclick="event.stopPropagation()"><input type="checkbox" class="fac-check" value="${f.id}" onchange="updateBulkDeleteBar()"></td>
      <td><strong>${f.numero}</strong></td>
      <td>${f.client_nom||'—'}</td>
      <td class="num">${f.date_facture}${f.heure_vente?`<br><span style="color:var(--muted);font-size:.76rem">${f.heure_vente}</span>`:''}</td>
      <td>${fmtMoneyDualInline(f.montant_du_usd, f.taux_change)}</td>
      <td><span class="badge ${f.statut}">${t(f.statut)}</span></td>
      <td>${f.statut!=='annulee' ? `<span class="badge ${payBadgeClass[f.statut_paiement]}">${t('paiement_'+f.statut_paiement)}</span>${f.statut_paiement!=='paye'?`<div class="num" style="font-size:.72rem;color:var(--muted);margin-top:3px">${t('solde_restant')}: ${fmtUSD(f.solde_usd)} ${t('USD')}</div>`:''}` : '—'}</td>
      <td style="white-space:nowrap" onclick="event.stopPropagation()">
        <button class="btn btn-ghost btn-sm" onclick="viewFacture(${f.id})">👁</button>
        <a class="btn btn-primary btn-sm" href="/api/factures/${f.id}/pdf" target="_blank">📥</a>
        <button class="btn btn-danger btn-sm" onclick="deleteFacModal(${f.id})">🗑</button>
      </td>
    </tr>`).join('') || `<tr><td colspan="8"><div class="empty-state"><div class="empty-icon">📄</div><p>${t('aucune_donnee')}</p></div></td></tr>`;

  document.getElementById('content').innerHTML=`
    <div class="table-card">
      <div class="table-header">
        <h3>${t('factures_list')}</h3>
        <div style="display:flex;gap:8px;align-items:center">
          <div id="bulk-delete-bar" style="display:none">
            <button class="btn btn-danger btn-sm" onclick="deleteBulkFacModal()">🗑 <span id="bulk-delete-count"></span></button>
          </div>
          <button class="btn btn-primary" onclick="newFacture()">+ ${t('new_facture')}</button>
        </div>
      </div>
      <div style="overflow-x:auto">
        <table class="data">
          <thead><tr>
            <th><input type="checkbox" id="fac-check-all" onchange="toggleAllFacCheck(this)"></th>
            <th>${t('facture_num')}</th><th>${t('client')}</th><th>${t('date')}</th><th>${t('total')}</th><th>${t('statut')}</th><th>${t('paiement_title')}</th><th>${t('actions')}</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
}
function toggleAllFacCheck(cb){
  document.querySelectorAll('.fac-check').forEach(c=>c.checked=cb.checked);
  updateBulkDeleteBar();
}
function updateBulkDeleteBar(){
  const checked = document.querySelectorAll('.fac-check:checked');
  const bar = document.getElementById('bulk-delete-bar');
  if(!bar) return;
  if(checked.length>0){
    bar.style.display='block';
    document.getElementById('bulk-delete-count').textContent = `${t('supprimer')} (${checked.length})`;
  } else {
    bar.style.display='none';
  }
}
function deleteBulkFacModal(){
  const ids = [...document.querySelectorAll('.fac-check:checked')].map(c=>parseInt(c.value));
  if(!ids.length) return;
  showModal(t('supprimer'), `<div class="alert alert-danger">⚠️ ${lang==='ar'?`سيتم حذف ${ids.length} فاتورة نهائياً، مع كل مدفوعاتها. لا يمكن التراجع.`:`${ids.length} facture(s) seront supprimées définitivement, avec tous leurs paiements associés. Action irréversible.`}</div>`,
    `<button class="btn btn-danger" onclick="doDeleteBulkFac([${ids.join(',')}])">✓ ${t('confirmer')}</button>
     <button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);
}
async function doDeleteBulkFac(ids){
  const res = await api('/factures/delete-bulk', {method:'POST', body: JSON.stringify({ids})});
  closeModalDirect();
  if(res.error){ toast(res.error, false); return; }
  toast(t('save_ok'));
  renderFactures();
}

async function newFacture(){
  const clients=await api('/clients');
  const opts=clients.map(c=>`<option value="${c.id}">${c.nom}</option>`).join('');
  showModal(t('new_facture'),`
    <div class="form-group">
      <label>${t('client')}</label>
      <div style="display:flex;gap:8px">
        <select class="form-control" id="nf-client" style="flex:1"><option value="">${t('select_client')}</option>${opts}</select>
        <button type="button" class="btn btn-ghost btn-sm" onclick="quickNewClient('nf-client')" title="${t('nouveau_client')}" style="flex-shrink:0">+ ${t('nouveau')}</button>
      </div>
    </div>
    <div class="form-group"><label>${t('devise')}</label>
      <select class="form-control" id="nf-devise">
        <option value="USD" ${appSettings.devise_defaut==='USD'?'selected':''}>${t('USD')}</option>
        <option value="LS" ${appSettings.devise_defaut==='LS'?'selected':''}>${t('LS')}</option>
      </select>
    </div>`,
    `<button class="btn btn-primary" onclick="createFacture()">✓ ${t('sauvegarder')}</button>
     <button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);
}

async function quickNewClient(targetSelectId){
  showModal(t('nouveau_client'),`
    <div class="form-group"><label>${t('nom')} *</label><input class="form-control" id="qc-nom"></div>
    <div class="form-group"><label>${t('telephone')}</label><input class="form-control" id="qc-tel"></div>`,
    `<button class="btn btn-primary" onclick="saveQuickClient('${targetSelectId}')">✓ ${t('sauvegarder')}</button>
     <button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);
}
async function saveQuickClient(targetSelectId){
  const nom=document.getElementById('qc-nom').value.trim();
  const telephone=document.getElementById('qc-tel').value.trim();
  if(!nom){toast(t('champs_requis'),false);return;}
  await api('/clients',{method:'POST',body:JSON.stringify({nom,telephone})});
  const clients=await api('/clients');
  const nouveau=clients.find(c=>c.nom===nom);
  const select=document.getElementById(targetSelectId);
  if(select){
    select.innerHTML=`<option value="">${t('select_client')}</option>`+clients.map(c=>`<option value="${c.id}">${c.nom}</option>`).join('');
    if(nouveau) select.value=nouveau.id;
  }
  toast(t('save_ok'));
  // Reouvre le formulaire de facture avec le select mis a jour
  if(targetSelectId==='nf-client'){
    const devise=document.getElementById('nf-devise')?.value||appSettings.devise_defaut;
    showModal(t('new_facture'),`
      <div class="form-group">
        <label>${t('client')}</label>
        <div style="display:flex;gap:8px">
          <select class="form-control" id="nf-client" style="flex:1">${select.innerHTML}</select>
          <button type="button" class="btn btn-ghost btn-sm" onclick="quickNewClient('nf-client')" style="flex-shrink:0">+ ${t('nouveau')}</button>
        </div>
      </div>
      <div class="form-group"><label>${t('devise')}</label>
        <select class="form-control" id="nf-devise">
          <option value="LS" ${devise==='LS'?'selected':''}>${t('LS')}</option>
          <option value="USD" ${devise==='USD'?'selected':''}>${t('USD')}</option>
        </select>
      </div>`,
      `<button class="btn btn-primary" onclick="createFacture()">✓ ${t('sauvegarder')}</button>
       <button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);
    document.getElementById('nf-client').value = nouveau ? nouveau.id : '';
  }
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
  venteMainView = 'menu';
  const {facture,lignes,operations,lignes_libres,historique}=await api(`/factures/${id}`);
  const prods=await api('/produits');
  const ops=await api('/operations');
  const typesLL=await api('/types-lignes-libres');
  const dev=facture.devise;
  currentFactureCtx = { devise: facture.devise, taux: facture.taux_change || 1 };

  currentProdsList = prods;
  currentOpsList = ops;
  currentTypesLLOpts=typesLL.map(tl=>{
    const montantConverti = dev==='USD' ? tl.montant_par_defaut : Math.round(tl.montant_par_defaut * currentFactureCtx.taux);
    return `<option value="${tl.id}" data-signe="${tl.signe_par_defaut}" data-montant="${montantConverti}" data-nom-fr="${tl.nom_fr}" data-nom-ar="${tl.nom_ar}">${(tl.signe_par_defaut==='moins'?'➖ ':'➕ ')}${nomL(tl)}</option>`;
  }).join('');

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
      <td>${nomL(o)}</td>
      <td>${canEdit?`<input type="number" class="form-control" value="${o.quantite}" style="width:70px;display:inline-block" onchange="updateOpFacture(${id},${o.id},this.value,${o.prix_unitaire})">`:o.quantite}</td>
      <td>${canEdit?`<input type="number" class="form-control" value="${o.prix_unitaire}" step="50" style="width:110px;display:inline-block" onchange="updateOpFacture(${id},${o.id},${o.quantite},this.value)">`:fmt(o.prix_unitaire)}</td>
      <td><strong>${fmt(o.sous_total)} ${devLabel(dev)}</strong></td>
      <td>${canEdit?`<button class="btn btn-danger btn-sm" onclick="delOpFac(${id},${o.id})">✕</button>`:''}</td>
    </tr>`).join(''):`<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:16px">—</td></tr>`;

  const llHTML = lignes_libres && lignes_libres.length ? lignes_libres.map(ll=>`
    <tr>
      <td>${ll.description}</td>
      <td style="text-align:${ll.montant<0?'left':'left'}"><strong style="color:${ll.montant<0?'var(--danger)':'var(--success)'}">${ll.montant>=0?'+':''}${fmt(ll.montant)} ${devLabel(dev)}</strong></td>
      <td>${canEdit?`<button class="btn btn-danger btn-sm" onclick="delLigneLibre(${id},${ll.id})">✕</button>`:''}</td>
    </tr>`).join('') : '';

  const actionsHTML = `
    <div style="margin-top:16px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      ${facture.statut==='brouillon' ? `<button class="btn btn-primary" style="padding:10px 24px" onclick="validerFac(${id})">✓ ${t('valider')}</button>` : ''}
      ${facture.statut==='brouillon' && facture.montant_du_usd>0.005 ? `<button class="btn btn-gold" style="padding:10px 24px" onclick="validerEtPayerFac(${id},${facture.montant_du_usd})">💰 ${t('valider_et_payer')}</button>` : ''}
      ${facture.statut!=='annulee' ? `<button class="btn btn-danger" onclick="annulerFacModal(${id})">✕ ${t('annuler_facture')}</button>` : ''}
      ${facture.statut==='annulee' ? `<button class="btn btn-gold" onclick="reactiverFac(${id})">↺ ${t('reactiver')}</button>` : ''}
      <button class="btn btn-ghost" onclick="deleteFacModal(${id})">🗑 ${t('supprimer')}</button>
      <button class="btn btn-ghost" onclick="editFacDateModal(${id},'${facture.date_facture}')">📅 ${t('modifier_date')}</button>
    </div>`;

  const paiementHTML = `
    <div class="table-card" style="padding:16px;margin-top:20px" id="paiement-block">
      <h4 style="margin-bottom:10px;font-size:.9rem;color:var(--sea)">💰 ${t('paiement_title')}</h4>
      <div id="paiement-content"><div class="empty-state" style="padding:16px"><div class="empty-icon" style="font-size:1.5rem">⏳</div></div></div>
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
    <div class="vente-layout">
      <div class="vente-main">
        ${canEdit ? `<div class="table-card" style="padding:20px"><div id="vente-picker-zone"></div></div>` : `
          <div class="table-card" style="padding:30px;text-align:center;color:var(--muted)">
            <div style="font-size:2rem;margin-bottom:10px">🔒</div>
            <p>${lang==='ar'?'الفاتورة ملغاة - للقراءة فقط':'Facture annulée - lecture seule'}</p>
          </div>`}
      </div>
      <div class="vente-side">
        <div class="table-card" style="padding:20px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px">
            <div>
              <h2 style="font-size:1.15rem;font-weight:900">${facture.numero}</h2>
              <p style="color:var(--muted);font-size:.82rem;margin-top:3px" class="num">${facture.date_facture}${facture.heure_vente?' · '+facture.heure_vente:''}</p>
              <p style="color:var(--muted);font-size:.85rem;margin-top:2px">👤 ${facture.client_nom||'—'}</p>
            </div>
            <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
              <span class="badge dev-${facture.devise}">${facture.devise}</span>
              <span class="badge ${facture.statut}">${t(facture.statut)}</span>
            </div>
          </div>
          <a class="btn btn-primary btn-sm" style="width:100%;justify-content:center;margin-bottom:12px" href="/api/factures/${id}/pdf" target="_blank">📥 PDF</a>
          ${facture.devise==='USD'?`<div class="alert alert-success" style="margin-bottom:12px;font-size:.82rem">${t('taux_today')}: <strong class="num">${fmt(facture.taux_change)} ${t('LS')}</strong></div>`:''}

          <div class="panier-header" style="background:var(--sea);color:white;padding:10px 14px;border-radius:8px 8px 0 0;font-size:.85rem;font-weight:700">🛒 ${t('nav_produits')} / ${t('nav_operations')}</div>
          <div style="border:1px solid var(--border);border-top:none;border-radius:0 0 8px 8px;margin-bottom:14px;overflow:hidden">
            <div style="overflow-x:auto"><table class="data" style="font-size:.82rem">
              <tbody>${lignesHTML}</tbody>
            </table></div>
            <div style="overflow-x:auto"><table class="data" style="font-size:.82rem">
              <tbody>${opsHTML}</tbody>
            </table></div>
            ${llHTML ? `<div style="overflow-x:auto"><table class="data" style="font-size:.82rem"><tbody>${llHTML}</tbody></table></div>` : ''}
          </div>

          <div class="facture-totals">
            <div class="total-row"><span>${t('sous_total_fer')}</span><span class="num">${fmtMoney(facture.sous_total_fer,dev)}</span></div>
            <div class="total-row"><span>${t('sous_total_ops')}</span><span class="num">${fmtMoney(facture.sous_total_operations,dev)}</span></div>
            ${facture.sous_total_lignes_libres?`<div class="total-row"><span>${t('ligne_libre')}</span><span class="num">${facture.sous_total_lignes_libres>=0?'+':''}${fmtMoney(Math.abs(facture.sous_total_lignes_libres),dev)}</span></div>`:''}
            <div class="total-row grand" style="flex-direction:column;align-items:flex-end;gap:2px">
              <span style="align-self:flex-start">${t('total_facture')}</span>
              <div style="text-align:${lang==='ar'?'left':'right'}">${fmtMoneyDual(facture.montant_du_usd, facture.taux_change, {size:'1.2rem'})}</div>
            </div>
          </div>

          ${actionsHTML}
        </div>

        ${paiementHTML}
      </div>
    </div>
    ${histHTML}`;

  if(canEdit) renderVentePicker(id);
  renderPaiementBlock('vente', id, canEdit);
}

async function renderPaiementBlock(ptype, facId, canEdit){
  const container = document.getElementById('paiement-content');
  if(!container) return;
  const d = await api(`/paiements/${ptype}/${facId}`);

  const badgeClass = {en_attente:'brouillon', partiellement_paye:'dev-USD', paye:'validee'}[d.statut_paiement] || 'brouillon';

  const paiementsHTML = d.paiements.length ? d.paiements.map(p=>`
    <div class="prix-row">
      <span>${p.date_paiement}</span>
      <span class="prix-val">${fmt(p.montant)} ${p.devise==='USD'?t('USD'):t('LS')} <span style="color:var(--muted);font-weight:400">(= ${fmtUSD(p.montant_usd)} ${t('USD')})</span></span>
      ${canEdit?`<button class="btn btn-danger btn-sm" onclick="delPaiement('${ptype}',${facId},${p.id})">✕</button>`:''}
    </div>`).join('') : `<p style="color:var(--muted);font-size:.82rem;padding:8px 0">${t('aucun_paiement')}</p>`;

  const formHTML = canEdit && d.solde_usd > 0.005 ? `
    <div style="display:grid;grid-template-columns:1fr 1fr auto;gap:10px;align-items:end;margin-top:12px">
      <div class="form-group" style="margin-bottom:0"><label>${t('montant')}</label><input type="number" class="form-control" id="pay-montant-${facId}" step="0.01" min="0"></div>
      <div class="form-group" style="margin-bottom:0"><label>${t('devise')}</label>
        <select class="form-control" id="pay-devise-${facId}">
          <option value="USD" ${appSettings.devise_defaut==='USD'?'selected':''}>${t('USD')}</option>
          <option value="LS" ${appSettings.devise_defaut==='LS'?'selected':''}>${t('LS')}</option>
        </select>
      </div>
      <button class="btn btn-primary" onclick="addPaiement('${ptype}',${facId})">+ ${t('ajouter_paiement')}</button>
    </div>
    <button class="btn btn-gold btn-sm" style="margin-top:10px" onclick="payerSoldeRestant('${ptype}',${facId},${d.solde_usd})">💰 ${t('payer_solde_restant')} (${fmtUSD(d.solde_usd)} ${t('USD')})</button>` : '';

  container.innerHTML = `
    <div class="alert alert-success" style="margin-bottom:12px">
      ${t('montant_du_fixe')}: <strong>${fmtUSD(d.montant_du_usd)} ${t('USD')}</strong>
      <div style="font-size:.75rem;color:var(--muted);margin-top:4px">${t('montant_du_aide')}</div>
    </div>
    <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:10px">
      <span class="badge ${badgeClass}">${t('paiement_'+d.statut_paiement)}</span>
      <span style="font-size:.85rem">${t('total_paye')}: <strong>${fmtUSD(d.total_paye_usd)} ${t('USD')}</strong></span>
      <span style="font-size:.85rem">${t('solde_restant')}: <strong style="color:${d.solde_usd>0.005?'var(--danger)':'var(--success)'}">${fmtUSD(d.solde_usd)} ${t('USD')}</strong></span>
    </div>
    <div class="prix-list" style="max-height:200px;overflow-y:auto;border-top:1px solid var(--border);padding-top:8px">${paiementsHTML}</div>
    ${formHTML}`;
}

async function addPaiement(ptype, facId){
  const montant = document.getElementById(`pay-montant-${facId}`).value;
  const devise = document.getElementById(`pay-devise-${facId}`).value;
  if(!montant || parseFloat(montant) <= 0){ toast(t('champs_requis'), false); return; }
  const res = await api(`/paiements/${ptype}/${facId}`, {method:'POST', body: JSON.stringify({montant, devise})});
  if(res.error){ toast(res.error, false); return; }
  toast(t('save_ok'));
  renderPaiementBlock(ptype, facId, true);
}
/** Regle en un clic exactement ce qui reste du, en USD (le montant fixe),
 * pour eviter tout ecart d'arrondi lie a une conversion de devise. */
async function payerSoldeRestant(ptype, facId, soldeUsd){
  const res = await api(`/paiements/${ptype}/${facId}`, {method:'POST', body: JSON.stringify({montant: soldeUsd, devise:'USD'})});
  if(res.error){ toast(res.error, false); return; }
  toast(t('save_ok'));
  renderPaiementBlock(ptype, facId, true);
}
async function delPaiement(ptype, facId, paiementId){
  await api(`/paiements/${ptype}/${facId}/${paiementId}`, {method:'DELETE'});
  renderPaiementBlock(ptype, facId, true);
}

/** Picker en ligne (colonne de gauche de la vente) : categories de produits +
 * operations + main-d'oeuvre/remise, toutes en tuiles au meme "menu" - exactement
 * le meme principe que Fer Magasin, transpose dans la fiche facture de Manager. */
let venteMainView = 'menu';
let currentOpsList = [];

function renderVentePicker(facId){
  const zone = document.getElementById('vente-picker-zone');
  if(!zone) return;

  if(venteMainView === 'operations'){
    renderVenteOperationTiles(facId);
    return;
  }
  if(venteMainView !== 'menu' && CATEGORIES[venteMainView]){
    renderVenteProduitTiles(facId, venteMainView);
    return;
  }

  const prods = currentProdsList;
  const parCategorie = {};
  prods.forEach(p=>{
    const cle = (p.categorie && CATEGORIES[p.categorie]) ? p.categorie : 'autre';
    if(!parCategorie[cle]) parCategorie[cle] = [];
    parCategorie[cle].push(p);
  });

  const catsHTML = Object.keys(parCategorie).map(cle=>`
    <button class="tile-btn" onclick="selectVenteCategorie(${facId},'${cle}')">
      <span class="tile-icon">${catIcon(cle)}</span>
      ${catLabel(cle)}
      <span class="tile-sub">${parCategorie[cle].length} ${lang==='ar'?'صنف':(lang==='fr'?'modèles':'models')}</span>
    </button>`).join('');

  const opsTile = `
    <button class="tile-btn" style="border-color:var(--gold)" onclick="selectVenteOperations(${facId})">
      <span class="tile-icon">⚙️</span>
      ${t('nav_operations')}
      <span class="tile-sub">${currentOpsList.length}</span>
    </button>`;

  const llTile = `
    <button class="tile-btn" style="border-color:var(--muted)" onclick="ligneLibreModal(${facId})">
      <span class="tile-icon">🛠️</span>
      ${t('ligne_libre')}
    </button>`;

  zone.innerHTML = `
    <h4 style="margin-bottom:10px;color:var(--muted);font-size:.85rem">📦 ${t('choisir_produit')}</h4>
    <div class="tiles-grid">${catsHTML}${opsTile}${llTile}</div>`;
}
function selectVenteCategorie(facId, cle){
  venteMainView = cle;
  renderVentePicker(facId);
}
function selectVenteOperations(facId){
  venteMainView = 'operations';
  renderVentePicker(facId);
}
function retourVenteMenu(facId){
  venteMainView = 'menu';
  renderVentePicker(facId);
}
function renderVenteProduitTiles(facId, cle){
  const zone = document.getElementById('vente-picker-zone');
  const prods = currentProdsList.filter(p=>((p.categorie && CATEGORIES[p.categorie])?p.categorie:'autre')===cle);
  const dev = currentFactureCtx.devise;
  const prodsHTML = prods.length ? prods.map(p=>{
    const prixConverti = dev==='USD' ? Math.round(((p.prix_vente_kg||0) / currentFactureCtx.taux) * 10000) / 10000 : (p.prix_vente_kg||0);
    const prixLabel = dev==='USD' ? fmtUSD(prixConverti) : fmt(prixConverti);
    return `
    <button class="tile-btn" onclick="selectProduitPickerProduit(${facId},${p.id})">
      ${nomL(p)}
      <span class="tile-sub">${p.dimension||''}</span>
      <span class="tile-prix num">${prixLabel} ${devLabel(dev)}</span>
    </button>`;
  }).join('') : `<p style="grid-column:1/-1;text-align:center;color:var(--muted);padding:20px">${t('aucune_donnee')}</p>`;

  zone.innerHTML = `
    <button class="btn btn-ghost btn-sm" style="margin-bottom:12px" onclick="retourVenteMenu(${facId})">${t('retour_categories')}</button>
    <h4 style="margin-bottom:10px;color:var(--muted);font-size:.85rem">${catIcon(cle)} ${catLabel(cle)}</h4>
    <div class="tiles-grid">${prodsHTML}</div>`;
}
function renderVenteOperationTiles(facId){
  const zone = document.getElementById('vente-picker-zone');
  const dev = currentFactureCtx.devise;
  const opsHTML = currentOpsList.length ? currentOpsList.map(o=>{
    const prixConverti = dev==='USD' ? o.prix_unitaire : Math.round(o.prix_unitaire * currentFactureCtx.taux);
    const prixLabel = dev==='USD' ? fmtUSD(prixConverti) : fmt(prixConverti);
    return `
    <button class="tile-btn" onclick="selectVenteOperationTile(${facId},${o.id})">
      ${nomL(o)}
      <span class="tile-prix num">${prixLabel} ${devLabel(dev)}</span>
    </button>`;
  }).join('') : `<p style="grid-column:1/-1;text-align:center;color:var(--muted);padding:20px">${t('aucune_donnee')}</p>`;

  zone.innerHTML = `
    <button class="btn btn-ghost btn-sm" style="margin-bottom:12px" onclick="retourVenteMenu(${facId})">${t('retour_categories')}</button>
    <h4 style="margin-bottom:10px;color:var(--muted);font-size:.85rem">⚙️ ${t('nav_operations')}</h4>
    <div class="tiles-grid">${opsHTML}</div>`;
}
function selectVenteOperationTile(facId, opId){
  const o = currentOpsList.find(x=>x.id===opId);
  if(!o) return;
  const dev = currentFactureCtx.devise;
  const prixConverti = dev==='USD' ? o.prix_unitaire : Math.round(o.prix_unitaire * currentFactureCtx.taux);
  showModal(nomL(o), `
    <input type="hidden" id="ap-op" value="${o.id}" data-prix="${prixConverti}">
    <div class="form-group"><label>${t('quantite')}</label><input type="number" class="form-control" id="ap-qte" value="1" min="1" oninput="updateAopPreview()" style="font-size:1.2rem;text-align:center"></div>
    <div id="ap-op-preview" class="num" style="font-size:.92rem;color:var(--muted);margin:-4px 0 4px;text-align:${lang==='ar'?'left':'right'}"></div>
  `, `
    <button class="btn btn-gold" onclick="addOp(${facId})">✓ ${t('ajouter')}</button>
    <button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>
  `, true);
  updateAopPreview();
  setTimeout(()=>{ const inp=document.getElementById('ap-qte'); if(inp) inp.select(); }, 80);
}
let currentTypesLLOpts = '';
function ligneLibreModal(facId){
  showModal(t('ligne_libre'), `
    <div class="form-group"><label>${t('type_ligne')}</label>
      <select class="form-control" id="ll-type" onchange="updateLigneLibreForm()">
        ${currentTypesLLOpts}
        <option value="autre">✏️ ${t('autre_texte_libre')}</option>
      </select>
    </div>
    <div id="ll-desc-wrap" style="display:none" class="form-group">
      <label>${t('description')}</label>
      <input type="text" class="form-control" id="ll-desc" placeholder="${t('ligne_libre_placeholder')}">
    </div>
    <div class="form-group"><label>${t('montant')} (${t('USD')})</label><input type="number" class="form-control" id="ll-montant" placeholder="±0" step="0.5"></div>
    <p style="font-size:.75rem;color:var(--muted)">${t('ligne_libre_aide')}</p>
  `, `
    <button class="btn btn-ghost" onclick="addLigneLibre(${facId})">+ ${t('ajouter')}</button>
    <button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>
  `, true);
  updateLigneLibreForm();
}


function selectProduitPickerProduit(facId, prodId){
  const p = currentProdsList.find(x=>x.id===prodId);
  if(!p) return;
  const dev = currentFactureCtx.devise;
  const prixConverti = dev==='USD' ? Math.round(((p.prix_vente_kg||0) / currentFactureCtx.taux) * 10000) / 10000 : (p.prix_vente_kg||0);
  const unite = p.unite || 'kg';
  const poidsDefaut = unite==='piece' ? 1 : 100;
  const poidsStep = unite==='piece' ? 1 : 0.1;
  const poidsLabel = unite==='piece' ? t('quantite_piece') : t('poids_kg');

  showModal(`${nomL(p)}${p.dimension?' ('+p.dimension+')':''}`, `
    <select id="ap-prod" style="display:none"><option value="${p.id}" data-unite="${unite}" data-prix="${prixConverti}" selected></option></select>
    <div class="form-group"><label id="ap-poids-label">${poidsLabel}</label><input type="number" class="form-control" id="ap-poids" value="${poidsDefaut}" step="${poidsStep}" min="0" oninput="updateApPreview()" style="font-size:1.2rem;text-align:center"></div>
    <div id="ap-preview" class="num" style="font-size:.92rem;color:var(--muted);margin:-4px 0 4px;text-align:${lang==='ar'?'left':'right'}"></div>
  `, `
    <button class="btn btn-primary" onclick="addLigne(${facId})">✓ ${t('ajouter')}</button>
    <button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>
  `, true);
  updateApPreview();
  setTimeout(()=>{ const inp=document.getElementById('ap-poids'); if(inp) inp.select(); }, 80);
}

function updateQuantiteLabel(selectId, labelId, inputId){
  inputId = inputId || (selectId==='ap-prod' ? 'ap-poids' : 'aa-poids');
  const select = document.getElementById(selectId);
  const label = document.getElementById(labelId);
  const input = document.getElementById(inputId);
  if(!select || !label) return;
  const opt = select.options[select.selectedIndex];
  const unite = opt ? opt.getAttribute('data-unite') : 'kg';
  if(unite==='piece'){
    label.textContent = t('quantite_piece');
    if(input){ input.step = '1'; input.value = '1'; }
  } else {
    label.textContent = t('poids_kg');
    if(input){ input.step = '0.1'; input.value = '100'; }
  }
}

/** Apercu en direct poids x prix = sous-total, avant meme de cliquer "Ajouter" */
function updateApPreview(){
  const select = document.getElementById('ap-prod');
  const poidsInput = document.getElementById('ap-poids');
  const preview = document.getElementById('ap-preview');
  if(!select || !poidsInput || !preview) return;
  const opt = select.options[select.selectedIndex];
  const prix = opt ? parseFloat(opt.getAttribute('data-prix')) || 0 : 0;
  const poids = parseFloat(poidsInput.value) || 0;
  const dev = currentFactureCtx.devise;
  const sousTotal = poids * prix;
  if(!prix){
    preview.innerHTML = `<span style="color:var(--warn)">⚠️ ${t('prix_obligatoire')}</span>`;
    return;
  }
  const prixLabel = dev==='USD' ? fmtUSD(prix) : fmt(prix);
  const totalLabel = dev==='USD' ? fmtUSD(sousTotal) : fmt(sousTotal);
  preview.textContent = `${fmtK(poids)} × ${prixLabel} = ${totalLabel} ${devLabel(dev)}`;
}

/** Meme apercu en direct pour les operations : quantite x prix = sous-total */
function updateAopPreview(){
  const el = document.getElementById('ap-op');
  const qteInput = document.getElementById('ap-qte');
  const preview = document.getElementById('ap-op-preview');
  if(!el || !qteInput || !preview) return;
  const prix = parseFloat(el.getAttribute('data-prix')) || 0;
  const qte = parseFloat(qteInput.value) || 0;
  const dev = currentFactureCtx.devise;
  const sousTotal = qte * prix;
  const prixLabel = dev==='USD' ? fmtUSD(prix) : fmt(prix);
  const totalLabel = dev==='USD' ? fmtUSD(sousTotal) : fmt(sousTotal);
  preview.textContent = `${qte} × ${prixLabel} = ${totalLabel} ${devLabel(dev)}`;
}

async function addLigne(facId){
  const poids = document.getElementById('ap-poids').value;
  if(!poids || parseFloat(poids)<=0){ toast(t('champs_requis'), false); return; }
  const res = await api(`/factures/${facId}/ligne`,{method:'POST',body:JSON.stringify({produit_id:document.getElementById('ap-prod').value,poids_kg:poids})});
  if(res.error){ toast(res.error, false); return; }
  closeModalDirect();
  venteMainView = 'menu';
  toast(t('save_ok')); viewFacture(facId);
}
async function addOp(facId){
  const qte = document.getElementById('ap-qte').value;
  if(!qte || parseFloat(qte)<=0){ toast(t('champs_requis'), false); return; }
  const res = await api(`/factures/${facId}/operation`,{method:'POST',body:JSON.stringify({operation_id:document.getElementById('ap-op').value,quantite:qte})});
  if(res.error){ toast(res.error, false); return; }
  closeModalDirect();
  venteMainView = 'menu';
  toast(t('save_ok')); viewFacture(facId);
}
async function updateOpFacture(facId,opId,qte,prix){
  await api(`/factures/${facId}/operation/${opId}`,{method:'PUT',body:JSON.stringify({quantite:qte,prix_unitaire:prix})});
  toast(t('save_ok')); viewFacture(facId);
}
function updateLigneLibreForm(){
  const select = document.getElementById('ll-type');
  const opt = select.options[select.selectedIndex];
  const descWrap = document.getElementById('ll-desc-wrap');
  const montantInput = document.getElementById('ll-montant');

  if(opt.value === 'autre'){
    descWrap.style.display = 'block';
    document.getElementById('ll-desc').value = '';
    montantInput.value = '';
  } else {
    descWrap.style.display = 'none';
    const signe = opt.getAttribute('data-signe');
    const montantDefaut = parseFloat(opt.getAttribute('data-montant')) || 0;
    montantInput.value = signe==='moins' ? -Math.abs(montantDefaut) : Math.abs(montantDefaut);
  }
}

async function addLigneLibre(facId){
  const select = document.getElementById('ll-type');
  const opt = select.options[select.selectedIndex];
  const montant = document.getElementById('ll-montant').value;

  let description;
  if(opt.value === 'autre'){
    description = document.getElementById('ll-desc').value.trim();
  } else {
    description = lang==='ar' ? opt.getAttribute('data-nom-ar') : opt.getAttribute('data-nom-fr');
  }

  if(!description||!montant){toast(t('champs_requis'),false);return;}
  const res = await api(`/factures/${facId}/ligne-libre`,{method:'POST',body:JSON.stringify({description,montant})});
  if(res.error){ toast(res.error, false); return; }
  closeModalDirect();
  venteMainView = 'menu';
  toast(t('save_ok')); viewFacture(facId);
}
async function delLigneLibre(facId,llId){await api(`/factures/${facId}/ligne-libre/${llId}`,{method:'DELETE'}); viewFacture(facId);}
async function delLigne(facId,lid){await api(`/factures/${facId}/ligne/${lid}`,{method:'DELETE'}); viewFacture(facId);}
async function delOpFac(facId,oid){await api(`/factures/${facId}/operation/${oid}`,{method:'DELETE'}); viewFacture(facId);}
async function validerFac(facId){await api(`/factures/${facId}/valider`,{method:'POST'}); toast(t('save_ok')); viewFacture(facId);}
async function validerEtPayerFac(facId, montantDuUsd){
  const res = await api(`/factures/${facId}/valider`,{method:'POST'});
  if(res.error){ toast(res.error, false); return; }
  const payRes = await api(`/paiements/vente/${facId}`, {method:'POST', body: JSON.stringify({montant: montantDuUsd, devise:'USD'})});
  if(payRes.error){ toast(payRes.error, false); viewFacture(facId); return; }
  toast(t('save_ok'));
  viewFacture(facId);
}
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
      <td>${fmtMoneyDualInline(a.montant_du_usd, a.taux_change)}</td>
      <td><span class="badge ${a.statut}">${t(a.statut)}</span></td>
      <td><button class="btn btn-ghost btn-sm" onclick="viewAchat(${a.id})">👁</button></td>
    </tr>`).join('') || `<tr><td colspan="6"><div class="empty-state"><div class="empty-icon">📥</div><p>${t('aucune_donnee')}</p></div></td></tr>`;

  document.getElementById('content').innerHTML=`
    <div class="table-card">
      <div class="table-header">
        <h3>${t('achats_list')}</h3>
        <button class="btn btn-gold" onclick="newAchat()">+ ${t('new_achat')}</button>
      </div>
      <div style="overflow-x:auto"><table class="data">
        <thead><tr><th>${t('achat_num')}</th><th>${t('fournisseur')}</th><th>${t('date')}</th><th>${t('total')}</th><th>${t('statut')}</th><th>${t('actions')}</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
    </div>`;
}

async function newAchat(){
  const fourns=await api('/fournisseurs');
  const opts=fourns.map(f=>`<option value="${f.id}">${f.nom}</option>`).join('');
  showModal(t('new_achat'),`
    <div class="form-group">
      <label>${t('fournisseur')}</label>
      <div style="display:flex;gap:8px">
        <select class="form-control" id="na-fourn" style="flex:1"><option value="">${t('select_fournisseur')}</option>${opts}</select>
        <button type="button" class="btn btn-ghost btn-sm" onclick="quickNewFournisseur('na-fourn')" style="flex-shrink:0">+ ${t('nouveau')}</button>
      </div>
    </div>
    <div class="form-group"><label>${t('devise')}</label>
      <select class="form-control" id="na-devise"><option value="USD" ${appSettings.devise_defaut==='USD'?'selected':''}>${t('USD')}</option><option value="LS" ${appSettings.devise_defaut==='LS'?'selected':''}>${t('LS')}</option></select>
    </div>`,
    `<button class="btn btn-gold" onclick="createAchat()">✓ ${t('sauvegarder')}</button>
     <button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);
}

async function quickNewFournisseur(targetSelectId){
  showModal(t('nouveau_fournisseur'),`
    <div class="form-group"><label>${t('nom')} *</label><input class="form-control" id="qf-nom"></div>
    <div class="form-group"><label>${t('telephone')}</label><input class="form-control" id="qf-tel"></div>`,
    `<button class="btn btn-gold" onclick="saveQuickFournisseur('${targetSelectId}')">✓ ${t('sauvegarder')}</button>
     <button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);
}
async function saveQuickFournisseur(targetSelectId){
  const nom=document.getElementById('qf-nom').value.trim();
  const telephone=document.getElementById('qf-tel').value.trim();
  if(!nom){toast(t('champs_requis'),false);return;}
  await api('/fournisseurs',{method:'POST',body:JSON.stringify({nom,telephone})});
  const fourns=await api('/fournisseurs');
  const nouveau=fourns.find(f=>f.nom===nom);
  const optsHTML=`<option value="">${t('select_fournisseur')}</option>`+fourns.map(f=>`<option value="${f.id}">${f.nom}</option>`).join('');
  toast(t('save_ok'));
  if(targetSelectId==='na-fourn'){
    const devise=document.getElementById('na-devise')?.value||appSettings.devise_defaut;
    showModal(t('new_achat'),`
      <div class="form-group">
        <label>${t('fournisseur')}</label>
        <div style="display:flex;gap:8px">
          <select class="form-control" id="na-fourn" style="flex:1">${optsHTML}</select>
          <button type="button" class="btn btn-ghost btn-sm" onclick="quickNewFournisseur('na-fourn')" style="flex-shrink:0">+ ${t('nouveau')}</button>
        </div>
      </div>
      <div class="form-group"><label>${t('devise')}</label>
        <select class="form-control" id="na-devise">
          <option value="LS" ${devise==='LS'?'selected':''}>${t('LS')}</option>
          <option value="USD" ${devise==='USD'?'selected':''}>${t('USD')}</option>
        </select>
      </div>`,
      `<button class="btn btn-gold" onclick="createAchat()">✓ ${t('sauvegarder')}</button>
       <button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);
    document.getElementById('na-fourn').value = nouveau ? nouveau.id : '';
  }
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
  const {facture,lignes,lignes_libres,historique}=await api(`/factures-achat/${id}`);
  const prods=await api('/produits');
  const typesLL=await api('/types-lignes-libres');
  const dev=facture.devise;
  const canEdit=facture.statut==='brouillon';

  const prodsOpts=prods.map(p=>`<option value="${p.id}" data-unite="${p.unite||'kg'}">${nomL(p)} (${p.dimension||''})</option>`).join('');
  const typesLLOpts=typesLL.map(tl=>`<option value="${tl.id}" data-signe="${tl.signe_par_defaut}" data-montant="${tl.montant_par_defaut}" data-nom-fr="${tl.nom_fr}" data-nom-ar="${tl.nom_ar}">${(tl.signe_par_defaut==='moins'?'➖ ':'➕ ')}${nomL(tl)}</option>`).join('');

  const lignesHTML=lignes.length?lignes.map(l=>`
    <tr>
      <td>${lang==='ar'?(l.nom_ar||l.description_ar):(l.nom_fr||l.description_fr)}</td>
      <td>${fmtK(l.poids_kg)} ${t('kg')}</td>
      <td>${fmt(l.prix_kg)}</td>
      <td><strong>${fmtMoney(l.sous_total,dev)}</strong></td>
      <td>${canEdit?`<button class="btn btn-danger btn-sm" onclick="delLigneAchat(${id},${l.id})">✕</button>`:''}</td>
    </tr>`).join(''):`<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:16px">—</td></tr>`;

  const llHTML = lignes_libres && lignes_libres.length ? lignes_libres.map(ll=>`
    <tr>
      <td>${ll.description}</td>
      <td><strong style="color:${ll.montant<0?'var(--danger)':'var(--success)'}">${ll.montant>=0?'+':''}${fmt(ll.montant)} ${devLabel(dev)}</strong></td>
      <td>${canEdit?`<button class="btn btn-danger btn-sm" onclick="delLigneLibreAchat(${id},${ll.id})">✕</button>`:''}</td>
    </tr>`).join('') : '';

  const addForm = canEdit ? `
    <div class="table-card" style="padding:16px;margin-top:20px">
      <h4 style="margin-bottom:10px;font-size:.9rem;color:var(--gold)">+ ${t('ajouter_ligne')}</h4>
      <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:10px">
        <div class="form-group"><label>${t('nav_produits')}</label><select class="form-control" id="aa-prod" onchange="updateQuantiteLabel('aa-prod','aa-poids-label','aa-poids')">${prodsOpts}</select></div>
        <div class="form-group"><label id="aa-poids-label">${t('poids_kg')}</label><input type="number" class="form-control" id="aa-poids" value="500" step="1" min="0"></div>
        <div class="form-group"><label>${t('prix_kg')}</label><input type="number" class="form-control" id="aa-prix" value="8000" step="50" min="0"></div>
      </div>
      <button class="btn btn-gold" style="width:100%" onclick="addLigneAchat(${id})">+ ${t('ajouter_ligne')}</button>
    </div>
    <div class="table-card" style="padding:16px;margin-top:16px">
      <h4 style="margin-bottom:10px;font-size:.9rem;color:var(--muted)">± ${t('ligne_libre')}</h4>
      <div class="form-group"><label>${t('type_ligne')}</label>
        <select class="form-control" id="lla-type" onchange="updateLigneLibreAchatForm()">
          ${typesLLOpts}
          <option value="autre">✏️ ${t('autre_texte_libre')}</option>
        </select>
      </div>
      <div id="lla-desc-wrap" style="display:none" class="form-group">
        <label>${t('description')}</label>
        <input type="text" class="form-control" id="lla-desc" placeholder="${t('ligne_libre_placeholder')}">
      </div>
      <div style="display:grid;grid-template-columns:1fr auto;gap:10px;align-items:end">
        <div class="form-group" style="margin-bottom:0"><label>${t('montant')} (${t('USD')})</label><input type="number" class="form-control" id="lla-montant" placeholder="±0" step="0.5"></div>
        <button class="btn btn-ghost" onclick="addLigneLibreAchat(${id})">+ ${t('ajouter')}</button>
      </div>
      <p style="font-size:.75rem;color:var(--muted);margin-top:8px">${t('ligne_libre_aide')}</p>
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
      <h4 style="margin-bottom:8px;color:var(--muted);font-size:.85rem">📦 ${t('nav_produits')}</h4>
      <div style="overflow-x:auto"><table class="data">
        <thead><tr><th>${lang==='ar'?'المنتج':'Produit'}</th><th>${t('poids_kg')}</th><th>${t('prix_kg')}</th><th>${t('total')}</th><th></th></tr></thead>
        <tbody>${lignesHTML}</tbody>
      </table></div>
      ${llHTML ? `
      <h4 style="margin:16px 0 8px;color:var(--muted);font-size:.85rem">± ${t('ligne_libre')}</h4>
      <div style="overflow-x:auto"><table class="data">
        <thead><tr><th>${t('description')}</th><th>${t('montant')}</th><th></th></tr></thead>
        <tbody>${llHTML}</tbody>
      </table></div>` : ''}
      <div class="facture-totals">
        <div class="total-row"><span>${t('sous_total_fer')}</span><span>${fmt(facture.sous_total)} ${devLabel(dev)}</span></div>
        ${facture.sous_total_lignes_libres?`<div class="total-row"><span>${t('ligne_libre')}</span><span>${facture.sous_total_lignes_libres>=0?'+':''}${fmt(facture.sous_total_lignes_libres)} ${devLabel(dev)}</span></div>`:''}
        <div class="total-row grand" style="flex-direction:column;align-items:flex-end;gap:2px">
          <span style="align-self:flex-start">${t('total_facture')}</span>
          <div style="text-align:${lang==='ar'?'left':'right'}">${fmtMoneyDual(facture.montant_du_usd, facture.taux_change, {size:'1.3rem'})}</div>
        </div>
      </div>
      ${addForm}
      ${actionsHTML}
    </div>
    <div class="table-card" style="padding:16px;margin-top:20px" id="paiement-block">
      <h4 style="margin-bottom:10px;font-size:.9rem;color:var(--sea)">💰 ${t('paiement_title')}</h4>
      <div id="paiement-content"><div class="empty-state" style="padding:16px"><div class="empty-icon" style="font-size:1.5rem">⏳</div></div></div>
    </div>
    ${histHTML}`;

  renderPaiementBlock('achat', id, facture.statut!=='annulee');
}

function updateLigneLibreAchatForm(){
  const select = document.getElementById('lla-type');
  const opt = select.options[select.selectedIndex];
  const descWrap = document.getElementById('lla-desc-wrap');
  const montantInput = document.getElementById('lla-montant');

  if(opt.value === 'autre'){
    descWrap.style.display = 'block';
    document.getElementById('lla-desc').value = '';
    montantInput.value = '';
  } else {
    descWrap.style.display = 'none';
    const signe = opt.getAttribute('data-signe');
    const montantDefaut = parseFloat(opt.getAttribute('data-montant')) || 0;
    montantInput.value = signe==='moins' ? -Math.abs(montantDefaut) : Math.abs(montantDefaut);
  }
}

async function addLigneLibreAchat(achId){
  const select = document.getElementById('lla-type');
  const opt = select.options[select.selectedIndex];
  const montant = document.getElementById('lla-montant').value;

  let description;
  if(opt.value === 'autre'){
    description = document.getElementById('lla-desc').value.trim();
  } else {
    description = lang==='ar' ? opt.getAttribute('data-nom-ar') : opt.getAttribute('data-nom-fr');
  }

  if(!description||!montant){toast(t('champs_requis'),false);return;}
  await api(`/factures-achat/${achId}/ligne-libre`,{method:'POST',body:JSON.stringify({description,montant})});
  toast(t('save_ok')); viewAchat(achId);
}
async function delLigneLibreAchat(achId,llId){
  await api(`/factures-achat/${achId}/ligne-libre/${llId}`,{method:'DELETE'});
  viewAchat(achId);
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
  await loadCategories();
  const prods=await api('/produits');
  const categories=await api('/categories');
  const tauxToday=await api('/taux-change/today');
  const taux = (tauxToday && tauxToday.ls_par_usd) ? tauxToday.ls_par_usd : 1;
  const devDefaut = appSettings.devise_defaut || 'USD';
  // Les prix sont toujours STOCKES en ل.س (fiche produit inchangee), mais
  // AFFICHES ici selon la devise par defaut choisie dans les Reglages -
  // avec conversion en direct via le cours du jour, comme sur les factures.
  const fmtPrix = (val) => {
    if(!val) return '—';
    if(devDefaut==='USD') return fmtUSD(val/taux)+' '+t('USD');
    return fmt(val)+' '+t('LS');
  };
  const grouped={};
  prods.forEach(p=>{const cle=p.categorie||'autre'; if(!grouped[cle])grouped[cle]=[]; grouped[cle].push(p);});

  const catsManagerHTML = categories.map(c=>`
    <div class="prix-row">
      <span>${c.icon} ${nomL(c)}</span>
      <span style="display:flex;gap:6px;align-items:center">
        <span class="num" style="color:var(--muted);font-size:.76rem">${(grouped[c.cle]||[]).length} ${lang==='ar'?'صنف':'produits'}</span>
        <button class="btn btn-ghost btn-sm" onclick="editCategorieModal('${c.cle}')">✏️</button>
        <button class="btn btn-danger btn-sm" onclick="deleteCategorieConfirm('${c.cle}')">🗑</button>
      </span>
    </div>`).join('');

  let html=`<div class="table-header" style="background:white;border-radius:14px;padding:16px 20px;box-shadow:0 2px 10px rgba(0,0,0,.06);margin-bottom:16px">
    <h3>${t('produits_list')}</h3><button class="btn btn-primary" onclick="addProdModal()">+ ${t('nouveau_produit')}</button></div>

    <div class="table-card" style="margin-bottom:16px">
      <div class="table-header"><h3>${t('gerer_categories')}</h3><button class="btn btn-gold btn-sm" onclick="addCategorieModal()">+ ${t('nouvelle_categorie')}</button></div>
      ${catsManagerHTML || `<p style="text-align:center;color:var(--muted);padding:16px">${t('aucune_donnee')}</p>`}
    </div>`;
  Object.entries(grouped).forEach(([cle,ps])=>{
    html+=`<div class="table-card" style="margin-bottom:14px">
      <div class="table-header"><h3>${catIcon(cle)} ${catLabel(cle)}</h3></div>
      <div style="overflow-x:auto"><table class="data">
        <thead><tr><th>${lang==='ar'?'الاسم':'Nom'}</th><th>${t('dimension')}</th><th>${t('unite_vente')}</th><th>${t('prix_achat')}</th><th>${t('prix_vente')}</th><th>${t('marge')}</th><th>${t('actions')}</th></tr></thead>
        <tbody>${ps.map(p=>{
          const achat = p.prix_achat_kg || 0;
          const vente = p.prix_vente_kg || 0;
          const marge = achat>0 ? (((vente-achat)/achat)*100).toFixed(1) : '—';
          const uniteLabel = p.unite==='piece' ? t('unite_piece') : t('unite_kg');
          const uniteSuffix = p.unite==='piece' ? t('unite_piece_short') : t('kg');
          return `<tr>
            <td><strong>${nomL(p)}</strong></td>
            <td>${p.dimension||'—'}</td>
            <td><span class="badge" style="background:${p.unite==='piece'?'#dbe7ec':'#f3e6dc'};color:${p.unite==='piece'?'#2c6f8a':'var(--sea)'}">${uniteLabel}</span></td>
            <td class="num">${fmtPrix(achat)}${achat?'/'+uniteSuffix:''}</td>
            <td class="num">${fmtPrix(vente)}${vente?'/'+uniteSuffix:''}</td>
            <td>${marge!=='—'?marge+'%':'—'}</td>
            <td style="white-space:nowrap">
              <button class="btn btn-ghost btn-sm" onclick="editProdModal(${p.id})">✏️</button>
              <button class="btn btn-danger btn-sm" onclick="deleteProdConfirm(${p.id})">🗑</button>
            </td>
          </tr>`;
        }).join('')}</tbody>
      </table></div></div>`;
  });
  document.getElementById('content').innerHTML=html;
}

let currentTauxForm = 1;
function prodFormHTML(p={}){
  const unite = p.unite || 'kg';
  const devDefaut = appSettings.devise_defaut || 'USD';
  const suffixDev = devDefaut==='USD' ? t('USD') : t('LS');
  // Les prix sont stockes en LS en base ; on affiche/saisit ici dans la devise
  // par defaut choisie dans les Reglages, convertie via le cours du jour -
  // la conversion inverse se fait a l'enregistrement (voir saveProd).
  const toDisplay = (v) => {
    if(!v) return '';
    return devDefaut==='USD' ? (Math.round((v/currentTauxForm)*10000)/10000) : v;
  };
  return `
    <div class="form-group"><label>الاسم بالعربية *</label><input class="form-control" id="p-ar" value="${p.nom_ar||''}" placeholder="حديد مسلح 10 ملم"></div>
    <div class="form-group"><label>Nom Français</label><input class="form-control" id="p-fr" value="${p.nom_fr||''}" placeholder="Rond à béton 10mm"></div>
    <div class="form-group"><label>English name</label><input class="form-control" id="p-en" value="${p.nom_en||''}" placeholder="Rebar 10mm"></div>
    <div class="form-group"><label>${t('categorie')}</label><select class="form-control" id="p-cat">
      ${Object.entries(CATEGORIES).filter(([cle])=>cle!=='autre').map(([cle,c])=>
        `<option value="${cle}" ${p.categorie===cle?'selected':''}>${c.icon} ${c.fr} / ${c.ar}</option>`
      ).join('')}
    </select></div>
    <div class="form-group"><label>${t('dimension')}</label><input class="form-control" id="p-dim" value="${p.dimension||''}" placeholder="Ø10mm"></div>
    <div class="form-group">
      <label>${t('unite_vente')}</label>
      <select class="form-control" id="p-unite" onchange="updatePrixLabels()">
        <option value="kg" ${unite==='kg'?'selected':''}>${t('unite_kg')}</option>
        <option value="piece" ${unite==='piece'?'selected':''}>${t('unite_piece')}</option>
      </select>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div class="form-group"><label id="p-achat-label">${t('prix_achat')} (${suffixDev}/${unite==='piece'?t('unite_piece_short'):t('kg')})</label><input type="number" class="form-control" id="p-achat" value="${toDisplay(p.prix_achat_kg)}" step="${devDefaut==='USD'?'0.0001':'50'}"></div>
      <div class="form-group"><label id="p-vente-label">${t('prix_vente')} (${suffixDev}/${unite==='piece'?t('unite_piece_short'):t('kg')})</label><input type="number" class="form-control" id="p-vente" value="${toDisplay(p.prix_vente_kg)}" step="${devDefaut==='USD'?'0.0001':'50'}"></div>
    </div>`;
}
function updatePrixLabels(){
  const unite = document.getElementById('p-unite').value;
  const suffix = unite==='piece' ? t('unite_piece_short') : t('kg');
  const devDefaut = appSettings.devise_defaut || 'USD';
  const suffixDev = devDefaut==='USD' ? t('USD') : t('LS');
  document.getElementById('p-achat-label').textContent = `${t('prix_achat')} (${suffixDev}/${suffix})`;
  document.getElementById('p-vente-label').textContent = `${t('prix_vente')} (${suffixDev}/${suffix})`;
}

async function addProdModal(){
  const tauxToday = await api('/taux-change/today');
  currentTauxForm = (tauxToday && tauxToday.ls_par_usd) ? tauxToday.ls_par_usd : 1;
  showModal(t('nouveau_produit'), prodFormHTML(),
    `<button class="btn btn-primary" onclick="saveProd()">✓ ${t('sauvegarder')}</button><button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);
}
async function editProdModal(prodId){
  const prods = await api('/produits');
  const p = prods.find(x=>x.id===prodId);
  if(!p) return;
  const tauxToday = await api('/taux-change/today');
  currentTauxForm = (tauxToday && tauxToday.ls_par_usd) ? tauxToday.ls_par_usd : 1;
  showModal(t('modifier_produit'), prodFormHTML(p),
    `<button class="btn btn-primary" onclick="saveProd(${prodId})">✓ ${t('sauvegarder')}</button><button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);
}
async function saveProd(prodId=null){
  const devDefaut = appSettings.devise_defaut || 'USD';
  const achatSaisi = parseFloat(document.getElementById('p-achat').value) || 0;
  const venteSaisi = parseFloat(document.getElementById('p-vente').value) || 0;
  // Les champs sont saisis dans la devise par defaut (voir prodFormHTML) mais
  // toujours stockes en LS - on reconvertit ici avant l'envoi si besoin.
  const toLS = (v) => devDefaut==='USD' ? Math.round(v*currentTauxForm) : v;
  const data = {
    nom_ar: document.getElementById('p-ar').value,
    nom_fr: document.getElementById('p-fr').value,
    nom_en: document.getElementById('p-en').value,
    categorie: document.getElementById('p-cat').value,
    dimension: document.getElementById('p-dim').value,
    unite: document.getElementById('p-unite').value,
    prix_achat_kg: toLS(achatSaisi),
    prix_vente_kg: toLS(venteSaisi),
  };
  if(prodId) await api(`/produits/${prodId}`,{method:'PUT',body:JSON.stringify(data)});
  else await api('/produits',{method:'POST',body:JSON.stringify(data)});
  toast(t('save_ok')); closeModalDirect(); renderProduits();
}
function deleteProdConfirm(prodId){
  showModal(t('supprimer'), `<p>${lang==='ar'?'هل أنت متأكد؟':'Êtes-vous sûr ?'}</p>`,
    `<button class="btn btn-danger" onclick="doDeleteProd(${prodId})">✓ ${t('confirmer')}</button>
     <button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);
}
async function doDeleteProd(prodId){
  await api(`/produits/${prodId}`,{method:'DELETE'});
  closeModalDirect(); toast(t('save_ok')); renderProduits();
}

// ═══════════════════════════════════════════════════════════
//  CATEGORIES DE PRODUITS
// ═══════════════════════════════════════════════════════════
// Choix d'icones adaptes a un commerce de fer/quincaillerie, cliquables plutot
// que de devoir taper/coller un emoji a la main (invisible pour la plupart des
// gens sur Windows - d'ou la confusion "je ne sais pas comment le changer").
const ICON_CHOICES = ['🔩','▭','▬','📐','⌶','▦','🧱','🏗️','⚙️','🔧','🛠️','📏','⛓️','🪝','🗜️','🔨','🚧','🏭','🔗','📦','✨','🔲','🔳','⬜'];
function iconPickerHTML(selected){
  const cur = selected || '📦';
  return `
    <div class="form-group">
      <label>${t('icone')}</label>
      <input type="hidden" id="cat-icon" value="${cur}">
      <div id="icon-picker-grid" style="display:grid;grid-template-columns:repeat(8,1fr);gap:6px;margin-bottom:8px">
        ${ICON_CHOICES.map(ic=>`<button type="button" class="icon-choice-btn${ic===cur?' active':''}" onclick="selectIcon('${ic}')">${ic}</button>`).join('')}
      </div>
      <input class="form-control" id="cat-icon-custom" value="${cur}" maxlength="4" placeholder="${t('icone_perso')}"
        oninput="document.getElementById('cat-icon').value=this.value; syncIconGrid(this.value)"
        style="font-size:1.1rem;text-align:center;max-width:160px">
    </div>`;
}
function selectIcon(ic){
  document.getElementById('cat-icon').value = ic;
  document.getElementById('cat-icon-custom').value = ic;
  syncIconGrid(ic);
}
function syncIconGrid(ic){
  document.querySelectorAll('.icon-choice-btn').forEach(b=>{
    b.classList.toggle('active', b.textContent.trim() === ic);
  });
}

function categorieFormHTML(c={}){
  return `
    <div class="form-group"><label>Nom Français *</label><input class="form-control" id="cat-fr" value="${c.nom_fr||''}" placeholder="Ex: Silver Tube"></div>
    <div class="form-group"><label>الاسم بالعربية</label><input class="form-control" id="cat-ar" value="${c.nom_ar||''}" placeholder="مثال: أنبوب فضي"></div>
    <div class="form-group"><label>English name</label><input class="form-control" id="cat-en" value="${c.nom_en||''}" placeholder="Ex: Silver Tube"></div>
    ${iconPickerHTML(c.icon)}`;
}
function addCategorieModal(){
  showModal(t('nouvelle_categorie'), categorieFormHTML(),
    `<button class="btn btn-primary" onclick="saveCategorie()">✓ ${t('sauvegarder')}</button><button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);
}
async function editCategorieModal(cle){
  const cats = await api('/categories');
  const c = cats.find(x=>x.cle===cle);
  if(!c) return;
  showModal(t('modifier_categorie'), categorieFormHTML(c),
    `<button class="btn btn-primary" onclick="saveCategorie('${cle}')">✓ ${t('sauvegarder')}</button><button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);
}
async function saveCategorie(cle=null){
  const data = {
    nom_fr: document.getElementById('cat-fr').value.trim(),
    nom_ar: document.getElementById('cat-ar').value.trim(),
    nom_en: document.getElementById('cat-en').value.trim(),
    icon: document.getElementById('cat-icon').value.trim() || '📦',
  };
  if(!data.nom_fr && !data.nom_ar){ toast(t('champs_requis'), false); return; }
  const res = cle
    ? await api(`/categories/${cle}`,{method:'PUT',body:JSON.stringify(data)})
    : await api('/categories',{method:'POST',body:JSON.stringify(data)});
  if(res.error){ toast(res.error, false); return; }
  closeModalDirect(); toast(t('save_ok')); renderProduits();
}
function deleteCategorieConfirm(cle){
  showModal(t('supprimer'), `<p>${lang==='ar'?'هل أنت متأكد؟':'Êtes-vous sûr ?'}</p>`,
    `<button class="btn btn-danger" onclick="doDeleteCategorie('${cle}')">✓ ${t('confirmer')}</button>
     <button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);
}
async function doDeleteCategorie(cle){
  const res = await api(`/categories/${cle}`,{method:'DELETE'});
  closeModalDirect();
  if(res.error){ toast(res.error, false); return; }
  toast(t('save_ok')); renderProduits();
}

// ═══════════════════════════════════════════════════════════
//  COURS DU DOLLAR
// ═══════════════════════════════════════════════════════════
async function renderTaux(){
  document.getElementById('page-title').textContent=t('nav_taux');
  const today=await api('/taux-change/today');
  const hist=await api('/taux-change?jours=60');
  const histHTML=hist.map(r=>`<div class="prix-row"><span>${r.date}</span><span class="prix-val">${fmt(r.ls_par_usd)} ${t('LS')}</span></div>`).join('');
  document.getElementById('content').innerHTML=`
    <div style="display:grid;grid-template-columns:1fr 2fr;gap:18px">
      <div>
        <div class="table-card" style="padding:20px;margin-bottom:14px">
          <h3 style="margin-bottom:14px">${t('mettre_a_jour_taux')}</h3>
          <div class="form-group"><label>${t('taux_du_jour')}</label><input type="number" class="form-control" id="nt" value="${today.ls_par_usd}" step="10"></div>
          <button class="btn btn-primary" style="width:100%;background:#2c6f8a" onclick="saveTaux()">✓ ${t('mettre_a_jour_taux')}</button>
        </div>
        <div class="stat-card" style="border-color:#2c6f8a">
          <div class="lbl">${t('taux_today')}</div><div class="val num">${fmt(today.ls_par_usd)}</div>
          <div class="sub"><bdi style="unicode-bidi:isolate;direction:ltr">1$ = ${fmt(today.ls_par_usd)} ${t('LS')}</bdi> · ${today.date}</div>
        </div>
      </div>
      <div class="table-card"><div class="table-header"><h3>${t('historique_taux')}</h3></div>
        <div style="max-height:400px;overflow-y:auto">${histHTML}</div></div>
    </div>`;
}
async function saveTaux(){
  await api('/taux-change',{method:'POST',body:JSON.stringify({ls_par_usd:parseFloat(document.getElementById('nt').value)})});
  toast(t('save_ok')); renderTaux();
}

// ═══════════════════════════════════════════════════════════
//  INVENTAIRE
// ═══════════════════════════════════════════════════════════
function stockStatus(stock, seuil){
  if(stock <= seuil * 0.5) return {level:'critique', color:'var(--danger)', bg:'#f8d7da', icon:'🔴'};
  if(stock <= seuil) return {level:'bas', color:'var(--warn)', bg:'#fff3cd', icon:'🟡'};
  return {level:'ok', color:'var(--success)', bg:'#d1f0e0', icon:'🟢'};
}

async function renderInventaire(){
  document.getElementById('page-title').textContent=t('inventaire_title');
  const inv=await api('/inventaire');
  const rows=inv.map(i=>{
    const st = stockStatus(i.stock_kg, i.stock_min_alerte);
    return `
    <tr style="background:${st.bg}">
      <td><strong>${nomL(i)}</strong></td>
      <td>${i.dimension||'—'}</td>
      <td><input type="number" class="form-control" value="${i.stock_kg}" step="10" style="width:110px;display:inline-block" onchange="updateStock(${i.produit_id},this.value)"> ${t('kg')}</td>
      <td><input type="number" class="form-control" value="${i.stock_min_alerte}" step="10" style="width:90px;display:inline-block" onchange="updateSeuil(${i.produit_id},this.value)"> ${t('kg')}</td>
      <td><span style="color:${st.color};font-weight:700">${st.icon} ${t('stock_'+(st.level==='ok'?'ok':st.level==='bas'?'bas':'critique'))}</span></td>
    </tr>`;
  }).join('');
  document.getElementById('content').innerHTML=`
    <div class="alert alert-warn" style="margin-bottom:14px">⚠️ ${lang==='ar'?'المخزون يتحدث تلقائياً مع المبيعات والمشتريات المؤكدة':'Le stock se met à jour automatiquement avec les ventes et achats validés'}</div>
    <div class="table-card"><div class="table-header"><h3>${t('inventaire_title')}</h3></div>
      <div style="overflow-x:auto"><table class="data">
        <thead><tr><th>${lang==='ar'?'المنتج':'Produit'}</th><th>${t('dimension')}</th><th>${t('stock_actuel')}</th><th>${t('alerte_min')}</th><th></th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div></div>`;
}
async function updateStock(pid,v){await api(`/inventaire/${pid}`,{method:'PUT',body:JSON.stringify({stock_kg:parseFloat(v)})});toast(t('save_ok')); renderInventaire();}
async function updateSeuil(pid,v){await api(`/inventaire/${pid}`,{method:'PUT',body:JSON.stringify({stock_min_alerte:parseFloat(v)})});toast(t('save_ok')); renderInventaire();}

// ═══════════════════════════════════════════════════════════
//  OPÉRATIONS
// ═══════════════════════════════════════════════════════════
async function renderOperations(){
  document.getElementById('page-title').textContent=t('operations_list');
  const ops=await api('/operations');
  const typesLL = await api('/types-lignes-libres');
  const rows=ops.map(o=>`
    <tr>
      <td><strong>${nomL(o)}</strong></td>
      <td style="color:var(--muted);font-size:.85rem">${o.nom_fr}</td>
      <td><input type="number" class="form-control" value="${o.prix_unitaire}" step="0.05" min="0" style="width:130px;display:inline-block" onchange="updateOp(${o.id},'${o.nom_fr}','${o.nom_ar}',this.value)"> ${t('USD')}</td>
    </tr>`).join('');
  const typesLLHTML = typesLL.map(tl => `
    <tr>
      <td>${nomL(tl)}</td>
      <td><span class="badge" style="background:${tl.signe_par_defaut==='moins'?'#f8d7da':'#d1f0e0'};color:${tl.signe_par_defaut==='moins'?'#721c24':'#155724'}">${tl.signe_par_defaut==='moins'?t('moins'):t('plus')}</span></td>
      <td>${fmtUSD(tl.montant_par_defaut)} ${t('USD')}</td>
      <td>
        <button class="btn btn-ghost btn-sm" onclick="editTypeLLModal(${tl.id})">✏️</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTypeLL(${tl.id})">🗑</button>
      </td>
    </tr>`).join('');
  document.getElementById('content').innerHTML=`
    <div class="table-card">
      <div class="table-header"><h3>${t('operations_list')}</h3><button class="btn btn-primary" onclick="addOpModal()">+ ${t('nouvelle_operation')}</button></div>
      <div style="overflow-x:auto"><table class="data">
        <thead><tr><th>${lang==='ar'?'الاسم بالعربية':'Nom arabe'}</th><th>Français</th><th>${t('prix_unitaire')}</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div></div>

    <div class="table-card" style="margin-top:18px">
      <div class="table-header">
        <h3>${t('gerer_types_lignes')}</h3>
        <button class="btn btn-gold btn-sm" onclick="addTypeLLModal()">+ ${t('nouveau_type_ligne')}</button>
      </div>
      <div style="overflow-x:auto"><table class="data">
        <thead><tr><th>${lang==='ar'?'الاسم':'Nom'}</th><th>${t('signe')}</th><th>${t('montant_defaut')}</th><th></th></tr></thead>
        <tbody>${typesLLHTML || `<tr><td colspan="4" style="text-align:center;color:var(--muted);padding:16px">${t('aucune_donnee')}</td></tr>`}</tbody>
      </table></div>
    </div>`;
}
async function updateOp(id,nf,na,p){await api(`/operations/${id}`,{method:'PUT',body:JSON.stringify({nom_fr:nf,nom_ar:na,prix_unitaire:parseFloat(p)})});toast(t('save_ok'));}
function addOpModal(){showModal(t('nouvelle_operation'),`
  <div class="form-group"><label>Nom Français</label><input class="form-control" id="op-fr" placeholder="Coupe simple"></div>
  <div class="form-group"><label>الاسم بالعربية</label><input class="form-control" id="op-ar" placeholder="قطع بسيط"></div>
  <div class="form-group"><label>${t('prix_unitaire')} (${t('USD')})</label><input type="number" class="form-control" id="op-prix" placeholder="0.05" step="0.05" min="0"></div>`,
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
async function renderSettings(){
  document.getElementById('page-title').textContent=t('settings_title');
  document.getElementById('content').innerHTML=`<div class="empty-state"><div class="empty-icon">⏳</div></div>`;
  const settings = await api('/settings');
  const devise = settings.devise_defaut || 'USD';
  const afficherSecondaire = settings.afficher_devise_secondaire !== '0';

  document.getElementById('content').innerHTML=`
    <div class="table-card" style="padding:24px;max-width:560px">
      <h3 style="margin-bottom:16px">${t('settings_title')}</h3>

      <div class="form-group">
        <label>${t('devise_defaut')}</label>
        <select class="form-control" id="set-devise">
          <option value="USD" ${devise==='USD'?'selected':''}>${t('USD')}</option>
          <option value="LS" ${devise==='LS'?'selected':''}>${t('LS')}</option>
        </select>
      </div>

      <div class="form-group">
        <label>${t('afficher_devise_secondaire')}</label>
        <select class="form-control" id="set-secondaire">
          <option value="1" ${afficherSecondaire?'selected':''}>${t('oui')}</option>
          <option value="0" ${!afficherSecondaire?'selected':''}>${t('non')}</option>
        </select>
      </div>

      <button class="btn btn-primary" onclick="saveSettings()">✓ ${t('sauvegarder')}</button>
    </div>

    <div class="table-card" style="padding:24px;max-width:560px;margin-top:18px">
      <h3 style="margin-bottom:16px">${t('backup_export')}</h3>
      <p style="color:var(--muted);font-size:.88rem;margin-bottom:14px">${lang==='ar'?'قم بتنزيل نسخة من قاعدة البيانات بالكامل.':'Téléchargez une copie complète de la base de données.'}</p>
      <a class="btn btn-primary" href="/api/backup/export" download>📥 ${t('backup_export')}</a>
    </div>

    <div class="table-card" style="padding:24px;max-width:560px;margin-top:18px">
      <h3 style="margin-bottom:16px">${t('backup_import')}</h3>
      <div class="alert alert-warn">${t('backup_warning')}</div>
      <input type="file" id="bk-file" accept=".db" class="form-control" style="margin-bottom:12px">
      <button class="btn btn-danger" onclick="doImportBackup()">📤 ${t('backup_import')}</button>
    </div>

    <div class="table-card" style="padding:24px;max-width:560px;margin-top:18px">
      <h3 style="margin-bottom:16px">🇸🇾 ${t('catalogue_tartous_titre')}</h3>
      <p style="color:var(--muted);font-size:.88rem;margin-bottom:14px">${t('catalogue_tartous_desc')}</p>

      <a class="btn btn-gold" style="width:100%;display:flex;justify-content:center;margin-bottom:10px" href="/catalogue-tartous.html" target="_blank">🔗 ${t('ct_ouvrir_page')}</a>
      <p style="color:var(--muted);font-size:.78rem;margin-bottom:18px">${t('ct_ouvrir_page_aide')}</p>

      <div style="border-top:1px dashed var(--border);padding-top:16px">
        <p style="color:var(--muted);font-size:.8rem;margin-bottom:10px">${t('ct_ou_fichier')}</p>
        <input type="file" id="ct-file" accept=".json" class="form-control" style="margin-bottom:12px" onchange="previewCatalogueTartous()">
        <div id="ct-preview" style="margin-bottom:12px"></div>
        <div id="ct-mode-choice" style="display:none">
          <div class="form-group">
            <label>${t('catalogue_tartous_mode')}</label>
            <select class="form-control" id="ct-mode">
              <option value="ajouter">${t('ct_mode_ajouter')}</option>
              <option value="remplacer">${t('ct_mode_remplacer')}</option>
            </select>
          </div>
          <button class="btn btn-gold" style="width:100%" onclick="confirmImportCatalogueTartous()">📥 ${t('importer')}</button>
        </div>
        <div id="ct-result" style="margin-top:14px"></div>
      </div>
    </div>

    <div class="table-card" style="padding:24px;max-width:560px;margin-top:18px">
      <h3 style="margin-bottom:16px">🎭 ${t('importer_demo')}</h3>
      <div class="alert alert-warn" style="margin-bottom:16px">${t('effacer_donnees_desc')}</div>

      <div style="display:flex;flex-direction:column;gap:10px">
        <div class="stat-card" style="border-color:var(--sea);cursor:pointer" onclick="confirmImportDemo('standard')">
          <div class="lbl">${t('demo_standard')}</div>
          <div style="font-size:.85rem;color:var(--muted);margin-top:6px">${t('demo_standard_desc')}</div>
        </div>
        <div class="stat-card gold" style="cursor:pointer" onclick="confirmImportDemo('gros_volume')">
          <div class="lbl">${t('demo_volume')}</div>
          <div style="font-size:.85rem;color:var(--muted);margin-top:6px">${t('demo_volume_desc')}</div>
        </div>
        <div class="stat-card" style="border-color:var(--warn);cursor:pointer" onclick="confirmImportDemo('credits')">
          <div class="lbl">${t('demo_credits')}</div>
          <div style="font-size:.85rem;color:var(--muted);margin-top:6px">${t('demo_credits_desc')}</div>
        </div>
      </div>
    </div>

    <div class="table-card" style="padding:24px;max-width:560px;margin-top:18px;border:2px solid var(--danger)">
      <h3 style="margin-bottom:10px;color:var(--danger)">⚠️ ${t('zone_danger')}</h3>
      <p style="color:var(--muted);font-size:.88rem;margin-bottom:16px">${t('effacer_donnees_desc')}</p>
      <button class="btn btn-danger" onclick="confirmResetComplet()">🗑 ${t('effacer_donnees')}</button>
    </div>`;
}

function typeLLFormHTML(tl={}){
  const signe = tl.signe_par_defaut || 'plus';
  return `
    <div class="form-group"><label>${lang==='ar'?'الاسم بالعربية':'Nom AR'} *</label><input class="form-control" id="tll-ar" value="${tl.nom_ar||''}"></div>
    <div class="form-group"><label>${lang==='ar'?'الاسم بالفرنسية':'Nom FR'}</label><input class="form-control" id="tll-fr" value="${tl.nom_fr||''}"></div>
    <div class="form-group"><label>${t('signe')}</label>
      <select class="form-control" id="tll-signe">
        <option value="plus" ${signe==='plus'?'selected':''}>${t('plus')}</option>
        <option value="moins" ${signe==='moins'?'selected':''}>${t('moins')}</option>
      </select>
    </div>
    <div class="form-group"><label>${t('montant_defaut')} (${t('USD')})</label><input type="number" class="form-control" id="tll-montant" value="${tl.montant_par_defaut||0}" step="0.5" min="0"></div>`;
}
function addTypeLLModal(){
  showModal(t('nouveau_type_ligne'), typeLLFormHTML(),
    `<button class="btn btn-primary" onclick="saveTypeLL()">✓ ${t('sauvegarder')}</button><button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);
}
async function editTypeLLModal(typeId){
  const types = await api('/types-lignes-libres');
  const tl = types.find(x=>x.id===typeId);
  if(!tl) return;
  showModal(nomL(tl), typeLLFormHTML(tl),
    `<button class="btn btn-primary" onclick="saveTypeLL(${typeId})">✓ ${t('sauvegarder')}</button><button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);
}
async function saveTypeLL(typeId=null){
  const data = {
    nom_ar: document.getElementById('tll-ar').value,
    nom_fr: document.getElementById('tll-fr').value,
    signe_par_defaut: document.getElementById('tll-signe').value,
    montant_par_defaut: document.getElementById('tll-montant').value || 0,
  };
  if(typeId) await api(`/types-lignes-libres/${typeId}`,{method:'PUT',body:JSON.stringify(data)});
  else await api('/types-lignes-libres',{method:'POST',body:JSON.stringify(data)});
  toast(t('save_ok')); closeModalDirect(); renderOperations();
}
async function deleteTypeLL(typeId){
  await api(`/types-lignes-libres/${typeId}`,{method:'DELETE'});
  toast(t('save_ok')); renderOperations();
}

async function saveSettings(){
  const devise_defaut = document.getElementById('set-devise').value;
  const afficher_devise_secondaire = document.getElementById('set-secondaire').value;
  await api('/settings', {method:'PUT', body: JSON.stringify({devise_defaut, afficher_devise_secondaire})});
  appSettings.devise_defaut = devise_defaut;
  appSettings.afficher_devise_secondaire = afficher_devise_secondaire;
  toast(t('save_ok'));
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

let _catalogueTartousData = null;

/** Apercu du fichier choisi (genere par catalogue-a-cocher.html) avant
 * import : combien de produits/categories/operations, avant de decider
 * ajouter ou remplacer. */
async function previewCatalogueTartous(){
  const f = document.getElementById('ct-file').files[0];
  const previewDiv = document.getElementById('ct-preview');
  const modeChoice = document.getElementById('ct-mode-choice');
  document.getElementById('ct-result').innerHTML = '';
  _catalogueTartousData = null;
  modeChoice.style.display = 'none';
  if(!f){ previewDiv.innerHTML = ''; return; }

  const text = await f.text();
  let data;
  try{ data = JSON.parse(text); } catch(e){
    previewDiv.innerHTML = `<div class="alert alert-danger">${lang==='ar'?'ملف غير صالح':'Fichier invalide'}</div>`;
    return;
  }
  if(data.type !== 'catalogue_tartous_selection'){
    previewDiv.innerHTML = `<div class="alert alert-danger">${lang==='ar'?'هذا الملف ليس من أداة اختيار الكتالوج':"Ce fichier ne vient pas de l'outil de sélection catalogue"}</div>`;
    return;
  }
  _catalogueTartousData = data;
  const produits = data.produits || [];
  const operations = data.operations || [];
  const categories = [...new Set(produits.map(p=>p.categorie_nom_fr))];

  previewDiv.innerHTML = `
    <div class="table-card">
      <div class="table-header"><h3>${lang==='ar'?`معاينة: ${produits.length} منتج، ${operations.length} عملية`:`Aperçu : ${produits.length} produit(s), ${operations.length} opération(s)`}</h3></div>
      <div style="max-height:220px;overflow-y:auto">
        ${produits.map(p=>`<div class="prix-row"><span>${p.categorie_icon||'📦'} ${lang==='ar'?p.nom_ar:p.nom_fr}${p.dimension?' — '+p.dimension:''}</span></div>`).join('')}
        ${operations.map(o=>`<div class="prix-row"><span>⚙️ ${lang==='ar'?o.nom_ar:o.nom_fr}</span></div>`).join('')}
      </div>
    </div>`;
  document.getElementById('ct-mode-choice').style.display = 'block';
}

function confirmImportCatalogueTartous(){
  const mode = document.getElementById('ct-mode').value;
  if(mode === 'remplacer'){
    showModal(t('catalogue_tartous_titre'), `
      <div class="alert alert-warn">💾 ${t('proposer_sauvegarde')}</div>
      <a class="btn btn-gold" style="width:100%;display:flex;justify-content:center;margin-bottom:16px" href="/api/backup/export" download>📥 ${t('backup_export')}</a>
      <div class="alert alert-danger">⚠️ ${t('ct_remplacer_avertissement')}</div>`,
      `<button class="btn btn-danger" onclick="doImportCatalogueTartous('remplacer')">✓ ${t('confirmer')}</button>
       <button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);
  } else {
    doImportCatalogueTartous('ajouter');
  }
}

async function doImportCatalogueTartous(mode){
  if(!_catalogueTartousData){ toast(t('champs_requis'), false); return; }
  closeModalDirect();
  const payload = {..._catalogueTartousData, mode};
  const res = await api('/catalogue-tartous/import', {method:'POST', body: JSON.stringify(payload)});
  if(res.error){ toast(res.error, false); return; }
  document.getElementById('ct-result').innerHTML = `
    <div class="alert alert-success">
      ✓ ${res.nb_categories_creees} ${lang==='ar'?'فئة جديدة':'nouvelle(s) catégorie(s)'}<br>
      ✓ ${res.nb_produits_crees} ${lang==='ar'?'منتج جديد':'nouveau(x) produit(s)'}<br>
      ✓ ${res.nb_operations_creees} ${lang==='ar'?'عملية جديدة':'nouvelle(s) opération(s)'}<br>
      <strong>${t('ct_prix_a_definir')}</strong>
    </div>`;
  toast(t('save_ok'));
}

function confirmResetComplet(){
  showModal(t('effacer_donnees'), `
    <div class="alert alert-warn">💾 ${t('proposer_sauvegarde')}</div>
    <a class="btn btn-gold" style="width:100%;display:flex;justify-content:center;margin-bottom:16px" href="/api/backup/export" download>📥 ${t('backup_export')}</a>
    <div class="alert alert-danger">⚠️ ${t('effacer_donnees_desc')}</div>
    <div class="form-group"><label>${t('taper_effacer')}</label><input class="form-control" id="confirm-effacer-input" placeholder="EFFACER"></div>`,
    `<button class="btn-xl danger" onclick="doResetComplet()" style="padding:10px 20px">✓ ${t('confirmer')}</button>
     <button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);
}
async function doResetComplet(){
  const val = document.getElementById('confirm-effacer-input').value;
  const res = await api('/settings/reset-complet', {method:'POST', body: JSON.stringify({confirme: val})});
  if(res.error){ toast(res.error, false); return; }
  closeModalDirect();
  toast(t('save_ok'));
  setTimeout(()=>location.reload(), 1000);
}

function confirmImportDemo(scenario){
  const labels = {standard: t('demo_standard'), gros_volume: t('demo_volume'), credits: t('demo_credits')};
  showModal(labels[scenario], `
    <div class="alert alert-warn">💾 ${t('proposer_sauvegarde')}</div>
    <a class="btn btn-gold" style="width:100%;display:flex;justify-content:center;margin-bottom:16px" href="/api/backup/export" download>📥 ${t('backup_export')}</a>
    <div class="alert alert-danger">⚠️ ${t('effacer_donnees_desc')}<br><strong>${t('puis_import_demo')} « ${labels[scenario]} ».</strong></div>
    <div class="form-group"><label>${t('taper_effacer')}</label><input class="form-control" id="confirm-demo-input" placeholder="EFFACER"></div>`,
    `<button class="btn-xl gold" onclick="doImportDemo('${scenario}')" style="padding:10px 20px">✓ ${t('confirmer')}</button>
     <button class="btn btn-ghost" onclick="closeModalDirect()">${t('annuler')}</button>`);
}
async function doImportDemo(scenario){
  const val = document.getElementById('confirm-demo-input').value;
  const res = await api('/settings/import-demo', {method:'POST', body: JSON.stringify({confirme: val, scenario})});
  if(res.error){ toast(res.error, false); return; }
  closeModalDirect();
  toast(`✓ ${res.nb_factures||0} ${lang==='ar'?'فاتورة تم استيرادها':'factures importées'}`);
  setTimeout(()=>location.reload(), 1200);
}

// ═══════════════════════════════════════════════════════════
//  SYNCHRO MAGASIN
// ═══════════════════════════════════════════════════════════
function renderMagasin(){
  document.getElementById('page-title').textContent=t('nav_magasin');
  const isAr = lang==='ar';
  document.getElementById('content').innerHTML=`
    <div class="table-card" style="padding:24px;max-width:560px">
      <h3 style="margin-bottom:10px">📤 ${isAr?'تصدير الكتالوج إلى المتجر':'Exporter le catalogue vers le magasin'}</h3>
      <p style="color:var(--muted);font-size:.88rem;margin-bottom:14px">
        ${isAr?'يقوم هذا بتصدير المنتجات وأسعارها وقائمة الزبائن لاستيرادها في تطبيق "متجر الحديد" عند الإعداد الأولي أو عند تحديث الكتالوج.':'Exporte les produits (avec leur prix), les clients et le cours du dollar, à importer dans "Fer Magasin" lors de la première configuration ou pour mettre à jour le catalogue.'}
      </p>
      <button class="btn btn-primary" onclick="exportCatalogueMagasin()">📥 ${isAr?'تحميل ملف الكتالوج':'Télécharger le catalogue'}</button>
    </div>

    <div class="table-card" style="padding:24px;max-width:560px;margin-top:18px">
      <h3 style="margin-bottom:10px">📥 ${isAr?'استيراد مبيعات المتجر':'Importer les ventes du magasin'}</h3>
      <p style="color:var(--muted);font-size:.88rem;margin-bottom:14px">
        ${isAr?'اختر ملف JSON الذي تم تصديره من "متجر الحديد". سيتم إنشاء الفواتير والعملاء الجدد تلقائياً، بدون تكرار.':'Sélectionnez le fichier JSON exporté depuis "Fer Magasin". Les factures et nouveaux clients seront créés automatiquement, sans doublons.'}
      </p>
      <input type="file" id="magasin-file" accept=".json" class="form-control" style="margin-bottom:12px" onchange="previewVentesMagasin()">
      <div id="magasin-preview" style="margin-bottom:12px"></div>
      <button class="btn btn-gold" onclick="importVentesMagasin()">📤 ${isAr?'استيراد':'Importer'}</button>
      <div id="magasin-result" style="margin-top:14px"></div>
    </div>`;
}

let _magasinFileData = null;

/** Apercu cote client des ventes contenues dans le fichier choisi, AVANT
 * import : on veut voir QUOI (client, heure, montant), pas seulement COMBIEN. */
async function previewVentesMagasin(){
  const f = document.getElementById('magasin-file').files[0];
  const previewDiv = document.getElementById('magasin-preview');
  document.getElementById('magasin-result').innerHTML = '';
  _magasinFileData = null;
  if(!f){ previewDiv.innerHTML = ''; return; }

  const isAr = lang==='ar';
  const text = await f.text();
  let data;
  try{ data = JSON.parse(text); } catch(e){
    previewDiv.innerHTML = `<div class="alert alert-danger">${isAr?'ملف غير صالح':'Fichier invalide'}</div>`;
    return;
  }
  _magasinFileData = data;
  const ventes = data.ventes || [];
  if(!ventes.length){
    previewDiv.innerHTML = `<div class="alert alert-warn">${isAr?'لا توجد عمليات بيع في هذا الملف':'Aucune vente dans ce fichier'}</div>`;
    return;
  }
  const rowsHTML = ventes.map(v=>`
    <div class="prix-row">
      <span>${v.client_nom||'—'} <span class="num" style="color:var(--muted);font-size:.76rem">${v.date_vente||''}${v.heure_vente?' · '+v.heure_vente:''}</span></span>
      <span class="prix-val">${fmt(v.total)} ${t(v.devise||'LS')}</span>
    </div>`).join('');
  previewDiv.innerHTML = `
    <div class="table-card">
      <div class="table-header"><h3>${isAr?`معاينة: ${ventes.length} عملية بيع`:`Aperçu : ${ventes.length} vente(s)`}</h3></div>
      <div style="max-height:280px;overflow-y:auto">${rowsHTML}</div>
    </div>`;
}

async function exportCatalogueMagasin(){
  const data = await api('/magasin/export-catalogue');
  const blob = new Blob([JSON.stringify(data,null,2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `catalogue-magasin-${data.date_export.slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast(t('save_ok'));
}

async function importVentesMagasin(){
  const resultDiv = document.getElementById('magasin-result');
  let data = _magasinFileData;
  if(!data){
    const f = document.getElementById('magasin-file').files[0];
    if(!f){ toast(lang==='ar'?'اختر ملفاً':'Sélectionnez un fichier', false); return; }
    const text = await f.text();
    try{ data = JSON.parse(text); } catch(e){
      toast(lang==='ar'?'ملف غير صالح':'Fichier invalide', false); return;
    }
  }

  const res = await api('/magasin/import-ventes', {method:'POST', body: JSON.stringify(data)});
  if(res.error){ toast(res.error, false); return; }

  const isAr = lang==='ar';
  const detailHTML = (res.detail||[]).length ? `
    <div class="table-card" style="margin-top:10px">
      <div style="max-height:240px;overflow-y:auto">
        ${res.detail.map(d=>`
          <div class="prix-row">
            <span>${d.numero} — ${d.client_nom||'—'} <span class="num" style="color:var(--muted);font-size:.76rem">${d.date_facture}${d.heure_vente?' · '+d.heure_vente:''}</span></span>
            <span class="prix-val">${fmt(d.total)} ${t(d.devise)}</span>
          </div>`).join('')}
      </div>
    </div>` : '';

  resultDiv.innerHTML = `
    <div class="alert alert-success">
      ✓ ${isAr?`تم استيراد ${res.importees} عملية بيع`:`${res.importees} vente(s) importée(s)`}<br>
      ${res.clients_crees>0 ? (isAr?`${res.clients_crees} عميل جديد تم إنشاؤه<br>`:`${res.clients_crees} nouveau(x) client(s) créé(s)<br>`) : ''}
      ${res.ignorees_doublon>0 ? (isAr?`${res.ignorees_doublon} تم تجاهلها (مستوردة مسبقاً)`:`${res.ignorees_doublon} ignorée(s) (déjà importée(s))`) : ''}
    </div>
    ${detailHTML}`;
  toast(t('save_ok'));
}

// ═══════════════════════════════════════════════════════════
//  PRESERVATION DU DEFILEMENT
//  A chaque fois qu'une page se recharge (suppression, sauvegarde, etc.),
//  on reste au meme endroit au lieu de remonter en haut - sauf lors d'une
//  vraie navigation (clic dans le menu), ou l'on revient logiquement en haut.
//  Un seul mecanisme central : s'applique automatiquement a TOUTES les pages,
//  sans avoir a modifier chaque fonction de rendu individuellement.
// ═══════════════════════════════════════════════════════════
(function setupScrollPreservation(){
  const content = document.getElementById('content');
  if(!content) return;
  let lastScrollTop = 0;
  let forceTop = false;

  const observer = new MutationObserver(()=>{
    content.scrollTop = forceTop ? 0 : lastScrollTop;
    forceTop = false;
  });
  observer.observe(content, {childList:true});

  content.addEventListener('scroll', ()=>{ lastScrollTop = content.scrollTop; });

  window.resetContentScroll = function(){ forceTop = true; };
})();

// ═══════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════
applyLangDom();
document.getElementById('nav-dashboard').classList.add('active');
Promise.all([loadAppSettings(), loadCategories()]).then(() => renderApp());
