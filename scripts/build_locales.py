"""Generate static French and Arabic pages from the English master and reviewed copy.
Run: python3 scripts/build_locales.py (requires lxml locally; deployed site needs no build).
"""
import sys
# DISABLED 2026-09-27. This generator maps translations by the position of each text node
# in an older English page (226 nodes, including a Projects section that no longer exists).
# The current pages have diverged, so running it would fail, or, if forced, put translations
# in the wrong places, rewrite index.html, and set frame-src 'none' (which blocks the Google map).
# The French and Arabic pages are now maintained directly in fr/index.html and ar/index.html.
if __name__ == '__main__' and '--i-understand-this-is-outdated' not in sys.argv:
    sys.exit('build_locales.py is outdated and disabled. Edit fr/index.html and ar/index.html directly. See README.md.')
from pathlib import Path
from lxml import html, etree
import hashlib
import base64
import re
from urllib.parse import urlparse
ROOT = Path(__file__).resolve().parents[1]
source = (ROOT / 'index.html').read_text()
# Indices refer to distinct visible text nodes in document order. Symbolic nodes remain unchanged.
FR = {
0:'HR Géant Emballage | Fabricant d’emballages en carton ondulé',1:'Aller au contenu',4:'Accueil',5:'Entreprise',6:'Produits',7:'Fabrication',8:'Qualité',9:'Développement durable',10:'Secteurs',11:'Projets',12:'Contact',16:'DEMANDER UN DEVIS',18:'HR GÉANT EMBALLAGE / ALGÉRIE',19:'CONÇU POUR',20:'PROTÉGER.',21:'PENSÉ POUR',22:'PERFORMER.',23:'Des emballages en carton ondulé performants, conçus autour de votre produit, de votre chaîne logistique et de votre marque.',24:'DÉCOUVRIR NOS SOLUTIONS',25:'LANCER VOTRE PROJET',26:'DÉFILER POUR DÉCOUVRIR',28:'EMBALLAGE / INGÉNIERIE / PRODUCTION',30:'✦ CONCEPTION SUR MESURE',31:'✦ CARTON ONDULÉ',32:'✦ IMPRESSION DE QUALITÉ',33:'✦ DÉCOUPE DE PRÉCISION',34:'✦ CONTRÔLE QUALITÉ',35:'✦ PRODUCTION INDUSTRIELLE',36:'✦ LIVRAISON FIABLE',37:'01 / L’ENTREPRISE',38:'NOUS NE FABRIQUONS PAS',39:'SEULEMENT DES CAISSES.',40:'NOUS CONCEVONS',41:'DES EMBALLAGES.',42:'Pensé pour le produit. Étudié pour chaque étape du parcours.',43:'HR Géant Emballage développe des concepts d’emballages en carton ondulé adaptés aux produits, aux exigences de manutention et aux besoins des marques. Des dimensions à la structure du carton, de l’impression à la finition, chaque décision part de l’usage prévu.',44:'PARLONS DE VOS BESOINS',45:'02 / DU CONCEPT À LA FORME',46:'UNE IDÉE PREND',47:'FORME.',48:'Du premier tracé technique à un emballage prêt à être étudié pour la production.',51:'IDÉE',53:'INGÉNIERIE',55:'PRODUCTION',57:'EMBALLAGE',58:'03 / SOLUTIONS D’EMBALLAGE',59:'LA FORME SUIT',60:'LA FONCTION.',61:'Six points de départ pour créer un emballage adapté au produit et à son parcours.',62:'04 / CONCEPT INTERACTIF',63:'CONCEVEZ VOTRE',64:'Explorez une représentation indicative. Les dimensions finales, les matériaux et les détails de fabrication sont définis lors du devis.',65:'01 — DIMENSIONS',66:'Dimensions extérieures indicatives en millimètres',67:'Longueur',68:'Largeur',69:'Hauteur',70:'02 — CARTON',71:'Kraft naturel',72:'Surface blanche',73:'03 — CANNELURE',74:'Discuter du profil recommandé',75:'Simple cannelure — aperçu',76:'Double cannelure — aperçu',77:'Les profils de cannelure disponibles doivent être confirmés par HR Géant Emballage.',78:'04 — IMPRESSION',79:'Sans impression',80:'Marque conceptuelle',81:'Motif conceptuel',82:'05 — FINITION',83:'Naturelle',84:'Aspect mat',85:'Aspect lisse',86:'LANCER MON PROJET',87:'APERÇU DU CONCEPT',88:'FAITES GLISSER POUR PIVOTER',89:'Simulation visuelle uniquement · Ne constitue pas une fiche de production',90:'05 / PARCOURS DE FABRICATION',91:'DU PAPIER',92:'À LA',93:'PERFORMANCE.',94:'Un aperçu des étapes habituelles de fabrication du carton ondulé. Confirmez les procédés propres à l’usine avec notre équipe.',95:'PAPIER BRUT',96:'ONDULATION',97:'IMPRESSION',98:'DÉCOUPE',100:'PLIAGE ET COLLAGE',102:'CONTRÔLE QUALITÉ',104:'EMBALLAGE FINI',105:'06 / CRITÈRES DE QUALITÉ',106:'LA PRÉCISION',107:'À CHAQUE',108:'ÉTAPE.',109:'Parlons des essais et critères d’acceptation adaptés à votre produit et à votre chaîne logistique.',110:'RÉSISTANCE À LA COMPRESSION',111:'QUALITÉ DU CARTON',112:'PRÉCISION D’IMPRESSION',113:'PRÉCISION DIMENSIONNELLE',114:'RÉGULARITÉ DE PRODUCTION',115:'INSPECTION FINALE',116:'07 / TECHNOLOGIE DU CARTON ONDULÉ',117:'LA RÉSISTANCE',118:'SE TROUVE DANS',119:'LES COUCHES.',120:'Le carton ondulé associe des couvertures planes à une couche de cannelure. Sa spécification dépend de la charge, de la manutention et des exigences d’impression.',121:'Profils donnés à titre indicatif : E · B · C · EB · BC. [AJOUTER DES DONNÉES RÉELLES : confirmer les profils proposés par HR Géant Emballage.]',122:'COUVERTURE',123:'CANNELURE',124:'08 / IMPRESSION ET MARQUE',125:'VOTRE MARQUE.',126:'IMPRIMÉE AVEC',127:'PRÉCISION.',128:'L’emballage peut devenir une expression concrète de votre marque. Partagez vos fichiers et votre application pour étudier la solution d’impression appropriée.',129:'TECHNIQUE D’IMPRESSION 01 · [DONNÉES À AJOUTER]',130:'TECHNIQUE D’IMPRESSION 02 · [DONNÉES À AJOUTER]',131:'TECHNIQUE D’IMPRESSION 03 · [DONNÉES À AJOUTER]',132:'09 / CONCEPTION RESPONSABLE',133:'DE MEILLEURS EMBALLAGES.',134:'POUR UN AVENIR',135:'PLUS RESPONSABLE',136:'.',137:'Une conception réfléchie peut optimiser l’utilisation de matière et prendre en compte tout le parcours de l’emballage. Demandez à notre équipe quelles options et recommandations de fin de vie conviennent à votre application.',138:'RECYCLABILITÉ',139:'Tenir compte de la collecte et de la fin de vie lors de la conception.',140:'OPTIMISATION DES MATIÈRES',141:'Adapter la structure du carton au produit et à sa manutention.',142:'RÉDUCTION DES DÉCHETS',143:'Étudier l’ajustement et la protection pour éviter la matière superflue.',144:'CONCEPTION EFFICACE',145:'Anticiper le conditionnement, le stockage et le transport.',146:'10 / APPLICATIONS',147:'PENSÉ POUR',148:'VOTRE SECTEUR.',149:'Agroalimentaire et boissons',150:'Agriculture',151:'Automobile',152:'Commerce en ligne',153:'Électronique',154:'Commerce de détail',155:'Industrie manufacturière',156:'EXEMPLE D’APPLICATION / CONCEPT',157:'Emballages secondaires et formats de transport protecteurs pour l’agroalimentaire et les boissons.',158:'11 / PROJETS',159:'EN',160:'ACTION.',161:'Des projets seront présentés ici lorsque des études de cas, des photos et des résultats approuvés seront disponibles.',162:'PROJET 01 / [DONNÉES À AJOUTER]',163:'Protection du produit',164:'Secteur · Défi · Solution · Résultat : [DONNÉES À AJOUTER]',165:'PROJET 02 / [DONNÉES À AJOUTER]',166:'Application industrielle',167:'12 / NOTRE IMPLANTATION',168:'ANCRÉS EN',169:'ALGÉRIE.',170:'Parlons de vos besoins d’emballage et de livraison.',171:'● ALGÉRIE',172:'CARTE DES MARCHÉS À VENIR / [DONNÉES À AJOUTER]',173:'13 / DEMANDE DE DEVIS',174:'CONSTRUISONS',175:'VOTRE',176:'Décrivez votre besoin. Ce formulaire attend un service d’envoi vérifié avant de pouvoir accepter des demandes.',177:'Nom complet',178:'Pays',179:'Adresse e-mail',180:'Téléphone',182:'Type d’emballage',183:'Choisissez un type',184:'Caisses en carton ondulé',185:'Emballage sur mesure',186:'Emballage imprimé',187:'Emballage industriel',188:'Emballage e-commerce',189:'Solutions de protection',190:'Quantité',191:'Dimensions de la caisse',192:'Exigences d’impression',193:'Description du projet',194:'Fichier graphique / plan technique',195:'PDF ou image ; les formats acceptés dépendent du futur service de formulaire.',196:'DEMANDER MON DEVIS',197:'L’envoi sera activé après la configuration d’un service vérifié. Cet aperçu n’envoie aucune donnée.',198:'À VOUS DE JOUER',199:'VOTRE PRODUIT MÉRITE',200:'Concevons-le ensemble.',201:'CONTACTER HR GÉANT EMBALLAGE',202:'Fabricant d’emballages en carton ondulé',203:'Algérie',204:'ENTREPRISE',205:'À propos',206:'PRODUITS',207:'Solutions',208:'Configurateur',209:'Technologie',210:'Impression',211:'SECTEURS',212:'Applications',213:'Implantation',214:'RESSOURCES',215:'Demander un devis',216:'[DONNÉES RÉELLES À AJOUTER : ressources]',217:'CONTACT',218:'Formulaire de contact',219:'Adresse : [DONNÉES À AJOUTER]',220:'Téléphone : [DONNÉES À AJOUTER]',221:'E-mail : [DONNÉES À AJOUTER]',222:'WhatsApp : [DONNÉES À AJOUTER]',223:'LinkedIn · Facebook · Instagram : [DONNÉES À AJOUTER]',224:'© 2026 HR Géant Emballage. Tous droits réservés.',225:'RETOUR EN HAUT ↑'
}
AR = {
0:'HR Géant Emballage | تصنيع عبوات الكرتون المموج',1:'الانتقال إلى المحتوى',4:'الرئيسية',5:'الشركة',6:'المنتجات',7:'التصنيع',8:'الجودة',9:'الاستدامة',10:'القطاعات',11:'المشاريع',12:'اتصل بنا',16:'اطلب عرض سعر',18:'HR GÉANT EMBALLAGE / الجزائر',19:'صُمِّم',20:'للحماية.',21:'وطُوِّر',22:'للأداء.',23:'عبوات كرتون مموج عالية الأداء، مصممة وفق منتجك وسلسلة إمدادك وهوية علامتك التجارية.',24:'اكتشف حلولنا',25:'ابدأ مشروعك',26:'مرّر للاستكشاف',28:'التغليف / الهندسة / الإنتاج',30:'✦ تصميم مخصص',31:'✦ كرتون مموج',32:'✦ طباعة عالية الجودة',33:'✦ قص دقيق بالقوالب',34:'✦ مراقبة الجودة',35:'✦ إنتاج صناعي',36:'✦ تسليم موثوق',37:'01 / الشركة',38:'لا نصنع',39:'الصناديق فحسب.',40:'بل نصمّم',41:'حلول التغليف.',42:'نبدأ بالمنتج، ونفكر في رحلته كاملة.',43:'تطوّر HR Géant Emballage تصورات لعبوات الكرتون المموج وفق طبيعة المنتجات ومتطلبات المناولة واحتياجات العلامات التجارية. من الأبعاد وبنية الكرتون إلى الطباعة والتشطيب، ينطلق كل قرار من الاستخدام المقصود.',44:'ناقش متطلباتك معنا',45:'02 / من الفكرة إلى الشكل',46:'الفكرة تتخذ',47:'شكلاً.',48:'من مخطط القص الأولي إلى عبوة جاهزة لدراسة إنتاجها.',51:'فكرة',53:'هندسة',55:'إنتاج',57:'تغليف',58:'03 / حلول التغليف',59:'الشكل يخدم',60:'الوظيفة.',61:'ستة مسارات أولية لتطوير عبوة تناسب المنتج ورحلته.',62:'04 / تصور تفاعلي',63:'صمّم',64:'استكشف تصوراً بصرياً أولياً. تُحدَّد الأبعاد والمواد وتفاصيل التصنيع النهائية عند إعداد عرض السعر.',65:'01 — الأبعاد',66:'أبعاد خارجية تقريبية بالمليمتر',67:'الطول',68:'العرض',69:'الارتفاع',70:'02 — نوع الكرتون',71:'كرافت طبيعي',72:'سطح أبيض',73:'03 — التموج',74:'ناقش النوع المناسب',75:'طبقة مموجة واحدة — تصور بصري',76:'طبقتان مموجتان — تصور بصري',77:'يجب تأكيد أنواع التموج المتاحة مع HR Géant Emballage.',78:'04 — الطباعة',79:'من دون طباعة',80:'علامة تجريبية',81:'رسم تجريبي',82:'05 — التشطيب',83:'طبيعي',84:'مظهر مطفي',85:'مظهر ناعم',86:'ابدأ مشروعي',87:'معاينة التصور',88:'اسحب للتدوير',89:'عرض بصري فقط · ليس مواصفة إنتاج',90:'05 / رحلة التصنيع',91:'من الورق',92:'إلى',93:'الأداء.',94:'نظرة على المراحل المعتادة لإنتاج الكرتون المموج. يرجى تأكيد العمليات الخاصة بالمصنع مع فريقنا.',95:'الورق الخام',96:'التمويج',97:'الطباعة',98:'القص بالقوالب',100:'الطي واللصق',102:'مراقبة الجودة',104:'العبوة النهائية',105:'06 / اعتبارات الجودة',106:'الدقة',107:'في كل',108:'مرحلة.',109:'لنناقش الاختبارات ومعايير القبول المناسبة لمنتجك وسلسلة إمدادك.',110:'مقاومة الضغط',111:'جودة الكرتون',112:'دقة الطباعة',113:'دقة الأبعاد',114:'ثبات الإنتاج',115:'الفحص النهائي',116:'07 / تقنية الكرتون المموج',117:'القوة',118:'في',119:'الطبقات.',120:'يتكون الكرتون المموج من طبقتين مستويتين تتوسطهما طبقة مموجة. ويُختار تركيبه وفق الحمولة والمناولة ومتطلبات الطباعة.',121:'أمثلة إرشادية فقط: E · B · C · EB · BC. [أضف بيانات مؤكدة: تحقق من الأنواع المتاحة لدى HR Géant Emballage.]',122:'طبقة خارجية',123:'طبقة مموجة',124:'08 / الطباعة والعلامة التجارية',125:'علامتك التجارية.',126:'تُطبع',127:'بدقة.',128:'يمكن للعبوة أن تكون تعبيراً ملموساً عن علامتك التجارية. شارك ملفات التصميم والاستخدام المقصود لتقييم طريقة الطباعة المناسبة.',129:'تقنية الطباعة 01 · [أضف بيانات مؤكدة]',130:'تقنية الطباعة 02 · [أضف بيانات مؤكدة]',131:'تقنية الطباعة 03 · [أضف بيانات مؤكدة]',132:'09 / تصميم مسؤول',133:'تغليف أفضل.',134:'من أجل مستقبل',135:'أكثر مسؤولية',136:'.',137:'يساعد التصميم المدروس على استخدام المواد بكفاءة والنظر في رحلة العبوة كاملة. اسأل فريقنا عن خيارات المواد وإرشادات نهاية الاستخدام المناسبة لتطبيقك.',138:'قابلية إعادة التدوير',139:'مراعاة الجمع والتخلص من العبوة عند تحديد مواصفاتها.',140:'ترشيد استخدام المواد',141:'مطابقة بنية الكرتون مع المنتج ومتطلبات مناولته.',142:'تقليل الهدر',143:'دراسة الملاءمة والحماية لتجنب المواد الزائدة.',144:'تصميم فعّال',145:'مراعاة التعبئة والتخزين والنقل منذ البداية.',146:'10 / التطبيقات',147:'صُمِّم',148:'لقطاعك.',149:'الأغذية والمشروبات',150:'الزراعة',151:'السيارات',152:'التجارة الإلكترونية',153:'الإلكترونيات',154:'البيع بالتجزئة',155:'التصنيع الصناعي',156:'مثال تطبيقي / تصور',157:'عبوات ثانوية وحلول نقل واقية لمنتجات الأغذية والمشروبات.',158:'11 / المشاريع',159:'على أرض',160:'الواقع.',161:'ستُعرض قصص المشاريع هنا عند توفير دراسات حالة وصور ونتائج معتمدة.',162:'المشروع 01 / [أضف بيانات مؤكدة]',163:'حماية المنتج',164:'القطاع · التحدي · الحل · النتيجة: [أضف بيانات مؤكدة]',165:'المشروع 02 / [أضف بيانات مؤكدة]',166:'تطبيق صناعي',167:'12 / موقعنا',168:'جذورنا في',169:'الجزائر.',170:'تواصل معنا بشأن احتياجات التغليف والتسليم.',171:'● الجزائر',172:'خريطة الأسواق المستقبلية / [أضف بيانات مؤكدة]',173:'13 / طلب عرض سعر',174:'لنصمّم',175:'عبوتك',176:'أخبرنا بما تحتاجه. يتطلب إرسال الطلبات ربط النموذج بخدمة موثوقة أولاً.',177:'الاسم الكامل',178:'البلد',179:'البريد الإلكتروني',180:'الهاتف',182:'نوع العبوة',183:'اختر النوع',184:'صناديق كرتون مموج',185:'تغليف مخصص',186:'تغليف مطبوع',187:'تغليف صناعي',188:'تغليف للتجارة الإلكترونية',189:'حلول حماية',190:'الكمية',191:'أبعاد الصندوق',192:'متطلبات الطباعة',193:'وصف المشروع',194:'ملف التصميم / الرسم التقني',195:'ملف PDF أو صورة؛ تعتمد الصيغ المقبولة على خدمة النماذج التي ستُربط لاحقاً.',196:'اطلب عرض السعر',197:'سيتاح الإرسال بعد إعداد خدمة موثوقة. هذه المعاينة لا ترسل أي بيانات.',198:'الخطوة التالية لك',199:'منتجك يستحق',200:'لنصمّمه معاً.',201:'تواصل مع HR GÉANT EMBALLAGE',202:'مصنّع عبوات الكرتون المموج',203:'الجزائر',204:'الشركة',205:'من نحن',206:'المنتجات',207:'الحلول',208:'أداة التصميم',209:'التقنية',210:'الطباعة',211:'القطاعات',212:'التطبيقات',213:'الموقع',214:'موارد',215:'طلب عرض سعر',216:'[أضف بيانات مؤكدة: موارد]',217:'التواصل',218:'نموذج الاتصال',219:'العنوان: [أضف بيانات مؤكدة]',220:'الهاتف: [أضف بيانات مؤكدة]',221:'البريد الإلكتروني: [أضف بيانات مؤكدة]',222:'واتساب: [أضف بيانات مؤكدة]',223:'لينكدإن · فيسبوك · إنستغرام: [أضف بيانات مؤكدة]',224:'© 2026 HR Géant Emballage. جميع الحقوق محفوظة.',225:'العودة إلى الأعلى ↑'
}

def convert_text(value, translation):
    if value is None or not value.strip(): return value
    core = value.strip()
    return value.replace(core, translation)

def create_page(code, translations):
    doc = html.fromstring(source)
    for old in doc.xpath('//link[@rel="alternate"] | //meta[@http-equiv="Content-Security-Policy"] | //meta[@name="referrer"]'):
        old.getparent().remove(old)
    unique = []
    for element in doc.iter():
        if element.tag in ('script','style'): continue
        for value in (element.text, element.tail):
            if value and value.strip() and value.strip() not in unique: unique.append(value.strip())
    assert len(unique) == 226, f'Master changed: {len(unique)} unique text nodes'
    words = {unique[index]: translated for index, translated in translations.items()}
    for element in doc.iter():
        if element.tag in ('script','style'): continue
        if element.text and element.text.strip() in words: element.text = convert_text(element.text, words[element.text.strip()])
        if element.tail and element.tail.strip() in words: element.tail = convert_text(element.tail, words[element.tail.strip()])
    doc.set('lang',code); doc.set('dir','rtl' if code == 'ar' else 'ltr')
    prefix = '../' if code in ('fr','ar') else ''
    for element in doc.xpath('//*[@src or @href]'):
        for attr in ('src','href'):
            val = element.get(attr)
            if val and val.startswith('assets/'): element.set(attr,prefix+val)
    # Language links are real static pages, including when JS is unavailable.
    destinations = {'en':prefix+'index.html','fr':prefix+'fr/','ar':prefix+'ar/'}
    for button in doc.xpath('//*[@data-lang]'):
        lang = button.get('data-lang'); button.tag = 'a'; button.set('href', destinations[lang]); button.set('aria-current','page' if code == lang else 'false')
        button.set('class','lang active' if code == lang else 'lang')
        button.attrib.pop('aria-pressed',None); button.attrib.pop('type',None)
    canonical = 'https://www.hrgeantemballage.com/' + (code+'/' if code in ('fr','ar') else '')
    doc.xpath('//link[@rel="canonical"]')[0].set('href',canonical)
    doc.xpath('//meta[@property="og:url"]')[0].set('content',canonical)
    head = doc.xpath('//html/head')[0]
    for lang in ('en','fr','ar'):
        link = etree.Element('link',rel='alternate',hreflang=lang)
        link.set('href','https://www.hrgeantemballage.com/'+('' if lang=='en' else lang+'/'))
        head.append(link)
    descriptions = {'en':'Explore corrugated boxes, custom industrial packaging and packaging engineering with HR Géant Emballage in Algeria. Plan your next packaging project.', 'fr':'Découvrez les caisses en carton ondulé et les solutions d’emballage industriel sur mesure de HR Géant Emballage en Algérie.', 'ar':'اكتشف صناديق الكرتون المموج وحلول التغليف الصناعي المخصصة من HR Géant Emballage في الجزائر.'}
    doc.xpath('//meta[@name="description"]')[0].set('content',descriptions[code])
    doc.xpath('//meta[@property="og:description"]')[0].set('content',descriptions[code])
    doc.xpath('//meta[@name="twitter:description"]')[0].set('content',descriptions[code])
    doc.xpath('//meta[@property="og:title"]')[0].set('content',doc.xpath('//title')[0].text)
    doc.xpath('//meta[@name="twitter:title"]')[0].set('content',doc.xpath('//title')[0].text)
    # Descriptive alternative text and examples are human-authored for each language.
    attrs = {
      'fr': {'alts':['Emblème de HR Géant Emballage','Machines de production traitant du carton ondulé','Emblème de HR Géant Emballage','Illustration des couches du carton ondulé : couverture, cannelure et couverture','Emballages kraft et carton ondulé photographiés en studio','Emballages en carton ondulé pour différentes applications','Concept photographique d’emballage en carton ondulé','Concept photographique de fabrication d’emballages'], 'placeholders':['Votre nom','Nom de l’entreprise','Pays','nom@entreprise.com','Avec indicatif pays','Avec indicatif pays','Unités estimées','L × l × H en mm','Zone imprimée, couleurs, fichiers','Produit, manutention, calendrier et autres exigences']},
      'ar': {'alts':['شعار HR Géant Emballage','آلات تعالج الكرتون المموج في خط الإنتاج','شعار HR Géant Emballage','رسم يوضح طبقات الكرتون المموج: سطح خارجي وطبقة مموجة وسطح خارجي','عبوات من الكرتون المموج في استوديو تصوير','تطبيقات مختلفة لعبوات الكرتون المموج','صورة توضيحية لمفهوم تغليف مخصص','صورة توضيحية لتصنيع العبوات'], 'placeholders':['اسمك','اسم الشركة','البلد','name@company.com','مع رمز البلد','مع رمز البلد','عدد الوحدات المتوقع','الطول × العرض × الارتفاع بالملم','مساحة الطباعة والألوان والملفات','المنتج والمناولة والجدول الزمني والمتطلبات الأخرى']}
    }
    if code in attrs:
        alt_nodes = doc.xpath('//img[@alt]')
        # Header / factory / board role / printing / industries / two projects / footer.
        alt_by_english = {
        'HR Géant Emballage emblem':attrs[code]['alts'][0],
        'Corrugated cardboard moving through packaging production machinery':attrs[code]['alts'][1],
        'Industrial packaging machinery processing corrugated cardboard':attrs[code]['alts'][1],
        'Kraft packaging and corrugated board in a dark product studio':attrs[code]['alts'][4],
        'Various corrugated packaging applications':attrs[code]['alts'][5],
        'Concept photograph of custom corrugated packaging':attrs[code]['alts'][6],
        'Concept photograph of packaging manufacturing':attrs[code]['alts'][7]
        }
        for node in alt_nodes: node.set('alt',alt_by_english.get(node.get('alt'),node.get('alt')))
        for node, translation in zip(doc.xpath('//*[@placeholder]'),attrs[code]['placeholders']): node.set('placeholder',translation)
        for node in doc.xpath('//*[@data-detail]'):
            detail = node.get('data-detail')
            node.set('data-detail', {
            'Secondary packs and protective transit formats for food and beverage products.': {'fr':'Emballages secondaires et solutions protectrices pour les aliments et boissons.','ar':'عبوات ثانوية وحلول نقل واقية للأغذية والمشروبات.'},
            'Packaging concepts for agricultural produce and handling needs.': {'fr':'Solutions d’emballage pour les produits agricoles et leur manutention.','ar':'تصورات تغليف للمحاصيل الزراعية ومتطلبات مناولتها.'},
            'Component protection and organized transport formats.': {'fr':'Protection des composants et formats de transport organisés.','ar':'حماية المكونات وحلول نقلها بطريقة منظمة.'},
            'Right-sized shipping boxes and unboxing experiences.': {'fr':'Caisses d’expédition adaptées et expérience d’ouverture soignée.','ar':'صناديق شحن ملائمة وتجربة فتح مدروسة.'},
            'Protective packaging for sensitive electronic products.': {'fr':'Emballages protecteurs pour les produits électroniques sensibles.','ar':'عبوات واقية للأجهزة الإلكترونية الحساسة.'},
            'Shelf-ready displays and branded shipping formats.': {'fr':'Présentoirs et emballages d’expédition à l’image de la marque.','ar':'عبوات عرض وشحن تحمل هوية العلامة التجارية.'},
            'Industrial transit packs built around product dimensions.': {'fr':'Emballages de transport industriel adaptés aux dimensions du produit.','ar':'عبوات نقل صناعية مصممة حسب أبعاد المنتج.'}
            }[detail][code])
        role_labels = {
          'fr': {'Modern corrugated cardboard production environment':'Environnement de production de carton ondulé','Illustration of corrugated board with top liner, fluting and bottom liner':'Schéma du carton ondulé : couverture, cannelure, couverture','Stylized world grid with Algeria labeled; no export markets indicated':'Grille du monde avec l’Algérie indiquée ; aucun marché d’exportation n’est représenté','Interactive conceptual box preview':'Aperçu interactif d’une caisse conceptuelle','Primary navigation':'Navigation principale','Language':'Langue','Open menu':'Ouvrir le menu'},
          'ar': {'Modern corrugated cardboard production environment':'بيئة إنتاج الكرتون المموج','Illustration of corrugated board with top liner, fluting and bottom liner':'رسم لطبقات الكرتون المموج: طبقة خارجية وتموج وطبقة خارجية','Stylized world grid with Algeria labeled; no export markets indicated':'شبكة عالمية تُظهر الجزائر من دون تحديد أسواق تصدير','Interactive conceptual box preview':'معاينة تفاعلية لتصور صندوق','Primary navigation':'التنقل الرئيسي','Language':'اللغة','Open menu':'فتح القائمة'}
        }[code]
        for node in doc.xpath('//*[@aria-label]'):
            node.set('aria-label',role_labels.get(node.get('aria-label'),node.get('aria-label')))
        if code == 'fr':
            doc.xpath('//*[@id="configurator"]//h2/i')[0].text = 'EMBALLAGE.'
            doc.xpath('//*[@id="contact"]//h2/i')[0].text = 'EMBALLAGE.'
        else:
            doc.xpath('//*[@id="configurator"]//h2/i')[0].text = 'عبوتك.'
            doc.xpath('//*[@id="contact"]//h2/i')[0].text = 'معاً.'
            doc.xpath('//*[@id="hero-title"]//em')[1].text = 'للتميّز.'
    schema = doc.xpath('//script[@type="application/ld+json"]')[0].text.encode('utf-8')
    schema_hash = base64.b64encode(hashlib.sha256(schema).digest()).decode('ascii')
    # Keep CSP in sync with the one endpoint configured in the deployed JavaScript.
    js = (ROOT / 'assets/js/main.js').read_text()
    match = re.search(r"const FORM_ENDPOINT = '([^']*)';", js)
    if not match: raise ValueError('Expected exactly one FORM_ENDPOINT assignment in main.js')
    endpoint = match.group(1)
    connect = "'self'"
    if endpoint:
        parsed = urlparse(endpoint)
        if parsed.scheme != 'https' or not parsed.hostname or parsed.username or parsed.password:
            raise ValueError('FORM_ENDPOINT must be a verified HTTPS URL without embedded credentials')
        connect += ' ' + parsed.scheme + '://' + parsed.netloc
    policy = ("default-src 'self'; base-uri 'self'; object-src 'none'; "
              "script-src 'self' 'sha256-"+schema_hash+"'; style-src 'self'; "
              "img-src 'self' data:; font-src 'self'; connect-src "+connect+"; "
              "form-action 'self'; frame-src https://www.google.com; upgrade-insecure-requests")
    csp = etree.Element('meta'); csp.set('http-equiv','Content-Security-Policy'); csp.set('content',policy)
    referrer = etree.Element('meta',name='referrer',content='strict-origin-when-cross-origin')
    head.insert(2,csp); head.insert(3,referrer)
    out = ROOT / (code if code != 'en' else '') / 'index.html'
    out.parent.mkdir(exist_ok=True)
    out.write_bytes(b'<!doctype html>\n'+html.tostring(doc,encoding='utf-8',method='html',pretty_print=False))

if __name__ == '__main__':
    for code, data in [('en',{}),('fr',FR),('ar',AR)]: create_page(code,data)
