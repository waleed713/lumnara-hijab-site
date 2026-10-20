/* All UI text in English / Arabic / Urdu. L(key, en, ar, ur). {x} = placeholder. */
const I18N = { en: {}, ar: {}, ur: {} };
const L = (k, e, a, u) => {
  I18N.en[k] = e;
  I18N.ar[k] = a;
  I18N.ur[k] = u;
};
const LL = (pre, rows) => rows.forEach((x) => L(pre + x[0], x[1], x[2], x[3]));
/* general */
L("skip", "Skip to content", "تخطي إلى المحتوى", "مواد پر جائیں");
L(
  "searchPh",
  "Search abayas, hijabs, fabrics",
  "ابحثي عن عبايات، حجابات، أقمشة",
  "عبایا، حجاب، کپڑے تلاش کریں",
);
L("home", "Home", "الرئيسية", "ہوم");
L("shop", "Shop", "تسوقي", "خریداری");
L("about", "About", "من نحن", "ہمارے بارے میں");
L("contact", "Contact", "اتصلي بنا", "رابطہ");
L("faq", "FAQ", "الأسئلة الشائعة", "عمومی سوالات");
L("catsH", "Categories", "الفئات", "زمرے");
L("fabric", "Fabric", "القماش", "کپڑا");
L("occasion", "Occasion", "المناسبة", "موقع");
L("eidEdit", "Eid edit", "مجموعة العيد", "عید کلیکشن");
L(
  "eidSoon",
  "Eid is coming — order early for guaranteed delivery",
  "العيد على الأبواب — اطلبي مبكراً لضمان التوصيل",
  "عید قریب ہے — یقینی ڈیلیوری کے لیے جلد آرڈر کریں",
);
L(
  "ship",
  "Free shipping over",
  "شحن مجاني للطلبات فوق",
  "مفت شپنگ اس رقم سے اوپر",
);
L("add", "Add to bag", "أضيفي إلى الحقيبة", "بیگ میں ڈالیں");
L("added", "Added to bag", "تمت الإضافة إلى الحقيبة", "بیگ میں شامل ہو گیا");
L("bag", "Bag", "الحقيبة", "بیگ");
L("empty", "Your bag is empty.", "حقيبتك فارغة.", "آپ کا بیگ خالی ہے۔");
L("total", "Total", "المجموع", "کل");
L("remove", "Remove", "إزالة", "ہٹائیں");
L("size", "Size", "المقاس", "سائز");
L("color", "Colour", "اللون", "رنگ");
L("oneSize", "One size", "مقاس واحد", "ایک سائز");
L("name", "Name", "الاسم", "نام");
L("email", "Email", "البريد الإلكتروني", "ای میل");
L("phone", "Phone", "الهاتف", "فون");
L("city", "City", "المدينة", "شہر");
L("addr", "Address", "العنوان", "پتہ");
L("msg", "Message", "الرسالة", "پیغام");
L("send", "Send", "إرسال", "بھیجیں");
L("order", "Place order", "تأكيد الطلب", "آرڈر کریں");
L(
  "cod",
  "Cash on delivery (Pakistan)",
  "الدفع عند الاستلام (باكستان)",
  "کیش آن ڈیلیوری (پاکستان)",
);
L("ask", "Ask a stylist", "اسألي مصممة أزياء", "اسٹائلسٹ سے پوچھیں");
L("stylist", "Book a stylist", "احجزي استشارة", "اسٹائلسٹ بُک کریں");
L(
  "sent",
  "Thank you — we will contact you shortly.",
  "شكراً لك — سنتواصل معك قريباً.",
  "شکریہ — ہم جلد آپ سے رابطہ کریں گے۔",
);
L(
  "fill",
  "Please fill all fields",
  "يرجى تعبئة جميع الحقول",
  "براہ کرم تمام خانے پُر کریں",
);
L("notFound", "Page not found", "الصفحة غير موجودة", "صفحہ نہیں ملا");
L("waHi", "Hello {b}", "مرحباً {b}", "السلام علیکم {b}");
L("piece", "piece", "قطعة", "پیس");
L("pieces", "pieces", "قطع", "پیس");
/* home */
L("newSeason", "New season edit", "إصدار الموسم الجديد", "نئے سیزن کی کلیکشن");
L("featured", "Featured", "مميز", "نمایاں");
L(
  "hero",
  "Modesty, <em>elegantly</em> drawn",
  "احتشام <em>بأناقة</em>",
  "حیا، <em>نفاست</em> کے ساتھ",
);
L(
  "heroP",
  "Abayas and hijabs in calm, flowing fabrics.",
  "عبايات وحجابات بأقمشة هادئة وانسيابية.",
  "نرم بہتے کپڑوں میں عبایا اور حجاب۔",
);
L("cta", "Shop the collection", "تسوقي المجموعة", "کلیکشن دیکھیں");
L("bar1", "Free exchange", "استبدال مجاني", "مفت ایکسچینج");
L("bar2", "Cash on delivery", "الدفع عند الاستلام", "کیش آن ڈیلیوری");
L("bar3", "Custom tailoring", "تفصيل حسب الطلب", "ناپ کے مطابق سلائی");
L(
  "bar4",
  "Worldwide shipping",
  "شحن إلى جميع أنحاء العالم",
  "دنیا بھر میں شپنگ",
);
L(
  "cats",
  "Shop by <em>category</em>",
  "تسوقي حسب <em>الفئة</em>",
  "زمرے کے <em>مطابق</em> خریداری",
);
L("all", "All pieces", "كل القطع", "تمام لباس");
L(
  "featH",
  "The quiet <em>silhouette</em>",
  "الإطلالة <em>الهادئة</em>",
  "سادہ <em>وقار</em>",
);
L(
  "featP",
  "Fluid nida, a clean open front and a drape that moves with you. Made to be worn every day.",
  "قماش نيدا انسيابي بواجهة مفتوحة نظيفة وانسدال يتحرك معك. صُمّمت لتُرتدى كل يوم.",
  "بہتا ہوا نیدا، صاف کھلا سامنا اور ایسا ڈریپ جو آپ کے ساتھ حرکت کرے۔ روزمرہ پہننے کے لیے بنایا گیا۔",
);
L(
  "best",
  "Best <em>sellers</em>",
  "الأكثر <em>مبيعاً</em>",
  "سب سے زیادہ <em>بکنے والے</em>",
);
L("eidH", "Eid <em>edit</em>", "مجموعة <em>العيد</em>", "عید <em>کلیکشن</em>");
L(
  "eidP",
  "Embroidered and satin pieces for celebration.",
  "قطع مطرزة وساتان للاحتفال.",
  "جشن کے لیے کڑھائی اور ساٹن کے لباس۔",
);
L(
  "fabH",
  "Fabric <em>first</em>",
  "القماش <em>أولاً</em>",
  "پہلے <em>کپڑا</em>",
);
L(
  "fabP",
  "Every piece starts with the cloth. Choose a fabric to see how it wears.",
  "كل قطعة تبدأ من القماش. اختاري قماشاً لتعرفي كيف يُرتدى.",
  "ہر لباس کپڑے سے شروع ہوتا ہے۔ کپڑا منتخب کریں اور دیکھیں یہ کیسا لگتا ہے۔",
);
L("shopF", "Shop {f}", "تسوقي {f}", "{f} خریدیں");
L("sn_all", "All season", "كل المواسم", "ہر موسم");
L("sn_sa", "Spring and autumn", "الربيع والخريف", "بہار اور خزاں");
L("sn_su", "Summer", "الصيف", "گرمیاں");
L(
  "ff_nida",
  "Matte, breathable, resists wrinkles",
  "مطفي، يسمح بالتهوية، مقاوم للتجعد",
  "میٹ، سانس لینے والا، شکنوں سے محفوظ",
);
L(
  "fc_nida",
  "Machine wash cold, hang dry",
  "غسيل آلي بماء بارد، تجفيف بالتعليق",
  "مشین میں ٹھنڈے پانی سے دھوئیں، لٹکا کر سُکھائیں",
);
L(
  "ff_crepe",
  "Soft structure with a clean fall",
  "قوام ناعم وانسدال أنيق",
  "نرم ساخت اور صاف گرتا ہوا ڈریپ",
);
L(
  "fc_crepe",
  "Gentle wash, low iron",
  "غسيل لطيف، كي بحرارة منخفضة",
  "ہلکی دھلائی، کم آنچ پر استری",
);
L(
  "ff_chiffon",
  "Light and airy, easy to drape",
  "خفيف وهوائي، سهل التنسيق",
  "ہلکا پھلکا، آسانی سے لپیٹا جا سکتا ہے",
);
L(
  "fc_chiffon",
  "Hand wash, steam only",
  "غسيل يدوي، بخار فقط",
  "ہاتھ سے دھوئیں، صرف سٹیم کریں",
);
L(
  "ff_linen",
  "Cool and relaxed, softens with wear",
  "منعش ومريح، يزداد نعومة مع الاستخدام",
  "ٹھنڈا اور آرام دہ، پہننے سے نرم ہوتا ہے",
);
L(
  "fc_linen",
  "Wash cool, iron damp",
  "غسيل بماء فاتر، كي وهو رطب",
  "ٹھنڈے پانی سے دھوئیں، نم حالت میں استری کریں",
);
/* categories, fabrics, colours, occasions, products */
LL("cat_", [
  ["abayas", "Abayas", "عبايات", "عبایا"],
  ["hijabs", "Hijabs", "حجابات", "حجاب"],
  ["coats", "Coats & Kimonos", "معاطف وكيمونو", "کوٹ اور کیمونو"],
  ["sets", "Sets", "أطقم", "سیٹس"],
  ["prayer", "Prayer wear", "ملابس الصلاة", "نماز کا لباس"],
  ["accessories", "Accessories", "إكسسوارات", "ایکسیسریز"],
]);
LL("cd_", [
  [
    "abayas",
    "Open fronts, butterfly cuts and occasion pieces.",
    "عبايات مفتوحة وقصّات فراشة وقطع للمناسبات.",
    "کھلے سامنے، بٹر فلائی کٹ اور خاص مواقع کے لباس۔",
  ],
  [
    "hijabs",
    "Chiffon, satin and jersey in quiet colours.",
    "شيفون وساتان وجيرسي بألوان هادئة.",
    "شیفون، ساٹن اور جرسی نرم رنگوں میں۔",
  ],
  [
    "coats",
    "Light layers to finish any look.",
    "طبقات خفيفة تكمل أي إطلالة.",
    "ہلکی تہیں جو ہر لک کو مکمل کریں۔",
  ],
  [
    "sets",
    "Coordinated pieces, ready to wear.",
    "قطع منسقة جاهزة للارتداء.",
    "ہم آہنگ لباس، پہننے کے لیے تیار۔",
  ],
  [
    "prayer",
    "Soft, easy sets for prayer.",
    "أطقم ناعمة ومريحة للصلاة.",
    "نماز کے لیے نرم اور آرام دہ سیٹ۔",
  ],
  [
    "accessories",
    "Small details that complete the look.",
    "تفاصيل صغيرة تكمل الإطلالة.",
    "چھوٹی تفصیلات جو لک مکمل کریں۔",
  ],
]);
LL("fab_", [
  ["nida", "Nida", "نيدا", "نیدا"],
  ["crepe", "Crepe", "كريب", "کریپ"],
  ["chiffon", "Chiffon", "شيفون", "شیفون"],
  ["linen", "Linen", "كتان", "لینن"],
  ["satin", "Satin", "ساتان", "ساٹن"],
  ["silk", "Silk", "حرير", "ریشم"],
  ["jersey", "Jersey", "جيرسي", "جرسی"],
  ["cotton", "Cotton", "قطن", "کاٹن"],
  ["pearl", "Pearl", "لؤلؤ", "موتی"],
]);
LL("col_", [
  ["black", "Black", "أسود", "کالا"],
  ["plum", "Plum", "برقوقي", "جامنی"],
  ["sand", "Sand", "رملي", "ریتیلا"],
  ["blush", "Blush", "وردي فاتح", "ہلکا گلابی"],
  ["navy", "Navy", "كحلي", "نیوی"],
  ["taupe", "Taupe", "رمادي دافئ", "خاکستری بھورا"],
  ["champagne", "Champagne", "شمبانيا", "شیمپین"],
  ["olive", "Olive", "زيتي", "زیتونی"],
  ["white", "White", "أبيض", "سفید"],
  ["charcoal", "Charcoal", "فحمي", "چارکول"],
  ["mocha", "Mocha", "موكا", "موکا"],
]);
LL("occ_", [
  ["everyday", "Everyday", "يومي", "روزمرہ"],
  ["work", "Work", "العمل", "دفتر"],
  ["eid", "Eid", "العيد", "عید"],
  ["prayer", "Prayer", "الصلاة", "نماز"],
]);
LL("p_", [
  [
    "black-nida-abaya",
    "Black Nida Abaya",
    "عباية نيدا سوداء",
    "کالی نیدا عبایا",
  ],
  [
    "taupe-open-abaya",
    "Taupe Open Abaya",
    "عباية مفتوحة رمادية دافئة",
    "خاکستری بھورا اوپن عبایا",
  ],
  [
    "embroidered-champagne-abaya",
    "Embroidered Champagne Abaya",
    "عباية مطرزة بلون شمبانيا",
    "کڑھائی والا شیمپین عبایا",
  ],
  [
    "olive-belted-abaya",
    "Olive Belted Abaya",
    "عباية زيتية بحزام",
    "زیتونی بیلٹ والا عبایا",
  ],
  [
    "navy-kimono-abaya",
    "Navy Kimono Abaya",
    "عباية كيمونو كحلية",
    "نیوی کیمونو عبایا",
  ],
  [
    "linen-white-abaya",
    "Linen White Abaya",
    "عباية كتان بيضاء",
    "سفید لینن عبایا",
  ],
  [
    "charcoal-hooded-abaya",
    "Charcoal Hooded Abaya",
    "عباية فحمية بقلنسوة",
    "چارکول ہُڈ والا عبایا",
  ],
  ["eid-abaya-detail", "Eid Abaya", "عباية العيد", "عید عبایا"],
  [
    "chiffon-hijab-sand",
    "Chiffon Hijab — Sand",
    "حجاب شيفون رملي",
    "ریتیلا شیفون حجاب",
  ],
  [
    "satin-hijab-dusty-rose",
    "Satin Hijab — Dusty Rose",
    "حجاب ساتان وردي مغبر",
    "ڈسٹی روز ساٹن حجاب",
  ],
  [
    "jersey-hijab-black",
    "Jersey Hijab — Black",
    "حجاب جيرسي أسود",
    "کالا جرسی حجاب",
  ],
  ["black-khimar-set", "Black Khimar Set", "طقم خمار أسود", "کالا خمار سیٹ"],
  [
    "mocha-modest-set",
    "Mocha Modest Set",
    "طقم محتشم بلون موكا",
    "موکا ماڈسٹ سیٹ",
  ],
  [
    "two-piece-prayer-set",
    "Two-Piece Prayer Set",
    "طقم صلاة من قطعتين",
    "دو پیس نماز سیٹ",
  ],
  [
    "under-cap-bundle",
    "Under Cap Bundle",
    "حزمة قبعات داخلية",
    "انڈر کیپ بنڈل",
  ],
]);
L(
  "descT",
  "{n} in {f}. A relaxed, modest cut with a flowing drape.",
  "{n} من قماش {f}. قصّة محتشمة مريحة بانسدال انسيابي.",
  "{n}، {f} میں۔ آرام دہ باحیا کٹ اور بہتا ہوا ڈریپ۔",
);
/* shop */
L(
  "allDesc",
  "Every piece in the collection, made with care.",
  "كل قطع المجموعة، صُنعت بعناية.",
  "کلیکشن کا ہر لباس، محبت اور توجہ سے تیار۔",
);
L(
  "fabDesc",
  "Pieces made in {f}.",
  "قطع مصنوعة من {f}.",
  "{f} میں تیار کردہ لباس۔",
);
L("occDesc", "Curated for: {o}.", "مختارة لمناسبة: {o}.", "منتخب برائے: {o}۔");
L("sortL", "Sort", "الترتيب", "ترتیب");
L("featuredO", "Featured", "المميزة", "نمایاں");
L(
  "lh",
  "Price: low to high",
  "السعر: من الأقل إلى الأعلى",
  "قیمت: کم سے زیادہ",
);
L(
  "hl",
  "Price: high to low",
  "السعر: من الأعلى إلى الأقل",
  "قیمت: زیادہ سے کم",
);
L("allO", "All", "الكل", "سب");
L("noRes", "No pieces found.", "لم يتم العثور على قطع.", "کوئی لباس نہیں ملا۔");
L(
  "promoH",
  "Not sure what suits you?",
  "لستِ متأكدة مما يناسبك؟",
  "یقین نہیں کہ آپ کو کیا سوٹ کرے گا؟",
);
L(
  "promoP",
  "Talk to a stylist on WhatsApp or book a free consultation.",
  "تحدثي مع مصممة أزياء عبر واتساب أو احجزي استشارة مجانية.",
  "واٹس ایپ پر اسٹائلسٹ سے بات کریں یا مفت مشورہ بُک کریں۔",
);
/* contact / about / help */
L(
  "contactH",
  "Get in <em>touch</em>",
  "تواصلي <em>معنا</em>",
  "ہم سے <em>رابطہ</em> کریں",
);
L(
  "contactP",
  "Questions about sizing, fabrics or an order? Our stylists reply within a day.",
  "أسئلة عن المقاس أو القماش أو الطلب؟ تردّ مصممتنا خلال يوم واحد.",
  "سائز، کپڑے یا آرڈر کے بارے میں سوال؟ ہماری اسٹائلسٹ ایک دن میں جواب دیتی ہیں۔",
);
L("chatWa", "Chat on WhatsApp", "تحدثي عبر واتساب", "واٹس ایپ پر بات کریں");
L("callUs", "Call us", "اتصلي بنا", "کال کریں");
L("hours", "Opening hours", "ساعات العمل", "اوقاتِ کار");
L(
  "hoursV",
  "Mon–Sat, 10am–8pm",
  "الاثنين–السبت، 10 ص – 8 م",
  "پیر تا ہفتہ، صبح 10 سے رات 8",
);
L("studio", "Studio", "الاستوديو", "اسٹوڈیو");
L(
  "studioV",
  "Pakistan — shipping worldwide",
  "باكستان — شحن عالمي",
  "پاکستان — دنیا بھر میں شپنگ",
);
L("writeUs", "Send us a message", "أرسلي لنا رسالة", "ہمیں پیغام بھیجیں");
L(
  "aboutH",
  "Modesty, <em>made with care</em>",
  "الاحتشام، <em>بصنعةٍ متقنة</em>",
  "حیا، <em>محبت سے تیار</em>",
);
L(
  "aboutP1",
  "Lumnara began with a simple idea: modest clothing should feel as considered as it looks. Every abaya, hijab and set is cut to move gracefully, from a quiet morning to a long evening.",
  "بدأت لومنارا بفكرة بسيطة: أن يكون اللباس المحتشم مدروساً في ملمسه كما في مظهره. كل عباية وحجاب وطقم مقصوص ليتحرك بأناقة من صباح هادئ إلى أمسية طويلة.",
  "لمنارا ایک سادہ سوچ سے شروع ہوئی: باحیا لباس جتنا خوبصورت دکھے اتنا ہی آرام دہ بھی ہو۔ ہر عبایا، حجاب اور سیٹ اس طرح کاٹا جاتا ہے کہ پُرسکون صبح سے لمبی شام تک وقار کے ساتھ حرکت کرے۔",
);
L(
  "aboutP2",
  "We choose fabrics first, then design around how they fall. Made in Pakistan and shipped to the Gulf and beyond.",
  "نختار الأقمشة أولاً ثم نصمّم حول انسدالها. صُنعت في باكستان وتُشحن إلى الخليج وما بعده.",
  "ہم پہلے کپڑا چنتے ہیں، پھر اس کے گرنے کے مطابق ڈیزائن کرتے ہیں۔ پاکستان میں تیار اور خلیج و دنیا بھر میں ترسیل۔",
);
L("v1h", "Fabric first", "القماش أولاً", "پہلے کپڑا");
L(
  "v1p",
  "Breathable, soft and built for daily wear.",
  "أقمشة منعشة وناعمة ومصممة للاستخدام اليومي.",
  "سانس لینے والا، نرم اور روزمرہ کے لیے بنا۔",
);
L("v2h", "Modest fit", "قصّة محتشمة", "باحیا فٹنگ");
L(
  "v2p",
  "Relaxed cuts with the right length. Custom tailoring on request.",
  "قصّات مريحة بالطول المناسب. تفصيل حسب الطلب.",
  "آرام دہ کٹ اور درست لمبائی۔ درخواست پر ناپ کے مطابق سلائی۔",
);
L("v3h", "Made to last", "صُنعت لتدوم", "دیرپا بنایا گیا");
L(
  "v3p",
  "Careful finishing and free exchange within 14 days.",
  "تشطيب دقيق واستبدال مجاني خلال 14 يوماً.",
  "باریک فنشنگ اور 14 دن میں مفت ایکسچینج۔",
);
L("aboutCta", "Explore the collection", "اكتشفي المجموعة", "کلیکشن دیکھیں");
[
  [
    "How long does delivery take?",
    "2-4 days within Pakistan, 5-8 days to the Gulf.",
    "كم تستغرق مدة التوصيل؟",
    "من 2 إلى 4 أيام داخل باكستان ومن 5 إلى 8 أيام إلى الخليج.",
    "ڈیلیوری میں کتنا وقت لگتا ہے؟",
    "پاکستان میں 2 سے 4 دن، خلیج میں 5 سے 8 دن۔",
  ],
  [
    "Can I exchange an item?",
    "Yes, free exchange within 14 days if unworn.",
    "هل يمكنني استبدال قطعة؟",
    "نعم، استبدال مجاني خلال 14 يوماً إن لم تُلبس.",
    "کیا میں چیز ایکسچینج کر سکتی ہوں؟",
    "جی ہاں، نہ پہنی ہو تو 14 دن میں مفت ایکسچینج۔",
  ],
  [
    "Do you offer tailoring?",
    "Yes. Send your measurements and we will make it to fit.",
    "هل تقدمون خدمة التفصيل؟",
    "نعم، أرسلي قياساتك وسنفصّلها لك.",
    "کیا آپ سلائی کی سہولت دیتے ہیں؟",
    "جی ہاں۔ اپنی ناپ بھیجیں، ہم آپ کے مطابق تیار کریں گے۔",
  ],
  [
    "Is cash on delivery available?",
    "In Pakistan, yes.",
    "هل الدفع عند الاستلام متاح؟",
    "نعم، في باكستان.",
    "کیا کیش آن ڈیلیوری دستیاب ہے؟",
    "پاکستان میں، جی ہاں۔",
  ],
].forEach((x, i) => {
  L("q" + i, x[0], x[2], x[4]);
  L("a" + i, x[1], x[3], x[5]);
});
L("shipH", "Shipping & returns", "الشحن والإرجاع", "شپنگ اور واپسی");
L(
  "shipP1",
  "Free shipping over {a}. Flat rate {b} otherwise. Pakistan 2-4 days, GCC 5-8 days.",
  "شحن مجاني للطلبات فوق {a}، وإلا فالسعر ثابت {b}. باكستان 2-4 أيام، دول الخليج 5-8 أيام.",
  "{a} سے اوپر مفت شپنگ، ورنہ فلیٹ ریٹ {b}۔ پاکستان 2 سے 4 دن، خلیج 5 سے 8 دن۔",
);
L(
  "shipP2",
  "Free exchange within 14 days. Items must be unworn with tags.",
  "استبدال مجاني خلال 14 يوماً. يجب أن تكون القطع غير ملبوسة مع البطاقات.",
  "14 دن میں مفت ایکسچینج۔ چیز نہ پہنی ہو اور ٹیگ لگے ہوں۔",
);
L("sizeH", "Size guide", "دليل المقاسات", "سائز گائیڈ");
L("thLen", "Length (in)", "الطول (إنش)", "لمبائی (انچ)");
L("thBust", "Bust (in)", "الصدر (إنش)", "چھاتی (انچ)");
L(
  "sizeNote",
  "Between sizes? Choose the larger, or ask a stylist about tailoring.",
  "بين مقاسين؟ اختاري الأكبر أو اسألي مصممة عن التفصيل.",
  "دو سائز کے درمیان؟ بڑا منتخب کریں یا اسٹائلسٹ سے سلائی کے بارے میں پوچھیں۔",
);
/* footer */
L(
  "newsH",
  "Join the {b} circle",
  "انضمي إلى عالم {b}",
  "{b} کمیونٹی میں شامل ہوں",
);
L(
  "newsP",
  "10% off your first order, plus new drops and styling notes.",
  "خصم 10% على طلبك الأول مع جديد الإصدارات ونصائح التنسيق.",
  "پہلے آرڈر پر 10٪ رعایت، نئی کلیکشنز اور اسٹائلنگ ٹپس۔",
);
L(
  "brandP",
  "Modest wear made with care, from Pakistan to the Gulf.",
  "أزياء محتشمة بعناية، من باكستان إلى الخليج.",
  "باحیا لباس، محبت سے تیار — پاکستان سے خلیج تک۔",
);
L("help", "Help", "المساعدة", "مدد");
L("company", "Company", "الشركة", "کمپنی");
L(
  "payLine",
  "Visa · Mastercard · Cash on delivery · Bank transfer",
  "فيزا · ماستركارد · الدفع عند الاستلام · تحويل بنكي",
  "ویزا · ماسٹر کارڈ · کیش آن ڈیلیوری · بینک ٹرانسفر",
);
/* ===== product, checkout, orders ===== */
L(
  "hoursV",
  "Mon–Sat, 11am–8pm",
  "الاثنين–السبت، 11 ص – 8 م",
  "پیر تا ہفتہ، صبح 11 سے رات 8",
);
L(
  "studioV",
  "Studio 14, Jinnah Super Market, F-7, Islamabad, Pakistan",
  "استوديو 14، جناح سوبر ماركت، F-7، إسلام آباد، باكستان",
  "اسٹوڈیو 14، جناح سپر مارکیٹ، ایف-7، اسلام آباد، پاکستان",
);
L("reviewsN", "{n} reviews", "{n} تقييم", "{n} جائزے");
L("verified", "Verified buyer", "مشترية موثّقة", "تصدیق شدہ خریدار");
L("reviewsH", "Reviews", "التقييمات", "جائزے");
L("fitTrue", "True to size", "المقاس مطابق", "سائز بالکل درست");
L("fitSmall", "Runs small", "المقاس أصغر قليلاً", "سائز چھوٹا ہے");
L("fitLarge", "Runs large", "المقاس أكبر قليلاً", "سائز بڑا ہے");
L(
  "r1",
  "Beautiful drape and very breathable. Exactly as pictured.",
  "انسدال جميل ومريح جداً للتهوية. تماماً كما في الصورة.",
  "ڈریپ بہت خوبصورت اور سانس لینے والا۔ بالکل تصویر جیسا۔",
);
L(
  "r2",
  "The fit is relaxed and modest. Fast delivery.",
  "القصّة مريحة ومحتشمة. توصيل سريع.",
  "فٹنگ آرام دہ اور باحیا ہے۔ ڈیلیوری تیز تھی۔",
);
L(
  "r3",
  "Lovely quality for the price. I sized up for extra room.",
  "جودة رائعة بهذا السعر. اخترت مقاساً أكبر لمزيد من الراحة.",
  "قیمت کے لحاظ سے بہترین کوالٹی۔ زیادہ کھلے پن کے لیے بڑا سائز لیا۔",
);
L("qty", "Quantity", "الكمية", "مقدار");
L("buyNow", "Buy now", "اشتري الآن", "ابھی خریدیں");
L("delEst", "Estimated delivery", "التوصيل المتوقع", "متوقع ڈیلیوری");
L("delTo", "Deliver to", "التوصيل إلى", "ڈیلیوری کی جگہ");
L(
  "trust1",
  "Free exchange within 14 days",
  "استبدال مجاني خلال 14 يوماً",
  "14 دن میں مفت ایکسچینج",
);
L("trust2", "Secure checkout", "دفع آمن", "محفوظ ادائیگی");
L(
  "trust3",
  "Modest-fit guarantee",
  "ضمان القصّة المحتشمة",
  "باحیا فٹنگ کی گارنٹی",
);
L("detH", "Details", "التفاصيل", "تفصیلات");
L(
  "detP",
  "Relaxed modest cut with a flowing drape. Length and sleeve fit are shown in the size guide. Soft lining where needed.",
  "قصّة محتشمة مريحة بانسدال انسيابي. الطول والكم موضحان في دليل المقاسات. بطانة ناعمة عند الحاجة.",
  "آرام دہ باحیا کٹ اور بہتا ہوا ڈریپ۔ لمبائی اور آستین کی ناپ سائز گائیڈ میں ہے۔ ضرورت کے مطابق نرم استر۔",
);
L("careH", "Fabric & care", "القماش والعناية", "کپڑا اور دیکھ بھال");
L(
  "likeH",
  "You may also like",
  "قد يعجبك أيضاً",
  "آپ کو یہ بھی پسند آ سکتا ہے",
);
L(
  "ff_satin",
  "Smooth with a soft sheen",
  "ناعم بلمعة هادئة",
  "ہموار، ہلکی چمک کے ساتھ",
);
L(
  "fc_satin",
  "Hand wash cool, do not wring",
  "غسيل يدوي بماء فاتر دون عصر",
  "ٹھنڈے پانی سے ہاتھ سے دھوئیں، نچوڑیں نہیں",
);
L(
  "ff_silk",
  "Luxurious, light and breathable",
  "فاخر وخفيف ويسمح بالتهوية",
  "پرتعیش، ہلکا اور سانس لینے والا",
);
L(
  "fc_silk",
  "Dry clean recommended",
  "يُنصح بالتنظيف الجاف",
  "ڈرائی کلین تجویز کیا جاتا ہے",
);
L(
  "ff_jersey",
  "Stretchy, soft and comfortable",
  "مرن وناعم ومريح",
  "لچکدار، نرم اور آرام دہ",
);
L(
  "fc_jersey",
  "Machine wash cold, low dry",
  "غسيل آلي بماء بارد وتجفيف منخفض",
  "مشین میں ٹھنڈے پانی سے دھوئیں، کم حرارت پر سُکھائیں",
);
L(
  "ff_cotton",
  "Soft, breathable and easy to wear",
  "ناعم ويسمح بالتهوية وسهل الارتداء",
  "نرم، سانس لینے والا اور پہننے میں آسان",
);
L(
  "fc_cotton",
  "Machine wash warm",
  "غسيل آلي بماء دافئ",
  "مشین میں نیم گرم پانی سے دھوئیں",
);
L(
  "ff_pearl",
  "Delicate finish for the final touch",
  "تشطيب رقيق للمسة الأخيرة",
  "آخری نفیس ٹچ کے لیے نازک فنشنگ",
);
L(
  "fc_pearl",
  "Wipe clean with a soft cloth",
  "امسحيها بقطعة قماش ناعمة",
  "نرم کپڑے سے صاف کریں",
);
L("checkoutH", "Checkout", "إتمام الشراء", "چیک آؤٹ");
L("ckContact", "Contact", "معلومات التواصل", "رابطے کی معلومات");
L("ckShip", "Shipping address", "عنوان الشحن", "شپنگ کا پتہ");
L("country", "Country", "الدولة", "ملک");
L("postal", "Postal code", "الرمز البريدي", "پوسٹل کوڈ");
L("payMethod", "Payment", "طريقة الدفع", "ادائیگی کا طریقہ");
L(
  "secureNote",
  "Your payment details are never stored on this site.",
  "لا نحتفظ ببيانات الدفع الخاصة بك على هذا الموقع.",
  "آپ کی ادائیگی کی معلومات اس سائٹ پر محفوظ نہیں کی جاتیں۔",
);
L("summary", "Order summary", "ملخص الطلب", "آرڈر کا خلاصہ");
L("promoCode", "Promo code", "رمز الخصم", "پرومو کوڈ");
L("apply", "Apply", "تطبيق", "لاگو کریں");
L("promoOk", "Promo applied", "تم تطبيق الخصم", "پرومو لگ گیا");
L("promoBad", "Invalid code", "رمز غير صالح", "کوڈ درست نہیں");
L("subtotal", "Subtotal", "المجموع الفرعي", "سب ٹوٹل");
L("discount", "Discount", "الخصم", "رعایت");
L("shipping", "Shipping", "الشحن", "شپنگ");
L("free", "Free", "مجاني", "مفت");
L(
  "approxNote",
  "Prices are shown in {c} for reference. Your final charge is calculated in PKR.",
  "الأسعار معروضة بعملة {c} للاسترشاد. يُحتسب المبلغ النهائي بالروبية الباكستانية.",
  "قیمتیں حوالے کے لیے {c} میں دکھائی گئی ہیں۔ آخری رقم پاکستانی روپے میں شمار ہوگی۔",
);
L("pm_cod", "Cash on delivery", "الدفع عند الاستلام", "کیش آن ڈیلیوری");
L(
  "pmd_cod",
  "Pay in cash when your order arrives.",
  "ادفعي نقداً عند وصول طلبك.",
  "آرڈر پہنچنے پر نقد ادائیگی کریں۔",
);
L("pm_card", "Credit / debit card", "بطاقة ائتمان / خصم", "کریڈٹ / ڈیبٹ کارڈ");
L(
  "pmd_card",
  "Visa and Mastercard.",
  "فيزا وماستركارد.",
  "ویزا اور ماسٹر کارڈ۔",
);
L(
  "cardNote",
  "You will enter your card details on our payment provider's secure page.",
  "ستُدخلين بيانات بطاقتك في صفحة الدفع الآمنة لدى مزوّد الدفع.",
  "آپ کارڈ کی تفصیلات ہمارے ادائیگی فراہم کنندہ کے محفوظ صفحے پر درج کریں گی۔",
);
L("pm_jazzcash", "JazzCash", "JazzCash", "JazzCash");
L(
  "pmd_jazzcash",
  "Pay from your JazzCash mobile account.",
  "ادفعي من حسابك على JazzCash.",
  "اپنے JazzCash اکاؤنٹ سے ادائیگی کریں۔",
);
L("pm_easypaisa", "Easypaisa", "Easypaisa", "Easypaisa");
L(
  "pmd_easypaisa",
  "Pay from your Easypaisa mobile account.",
  "ادفعي من حسابك على Easypaisa.",
  "اپنے Easypaisa اکاؤنٹ سے ادائیگی کریں۔",
);
L("pm_bank", "Bank transfer", "تحويل بنكي", "بینک ٹرانسفر");
L(
  "pmd_bank",
  "Transfer to our account and upload your receipt.",
  "حوّلي إلى حسابنا وارفعي الإيصال.",
  "ہمارے اکاؤنٹ میں رقم بھیجیں اور رسید اپ لوڈ کریں۔",
);
L("pm_applepay", "Apple Pay", "Apple Pay", "Apple Pay");
L(
  "pmd_applepay",
  "Fast and secure payment with Apple Pay.",
  "دفع سريع وآمن عبر Apple Pay.",
  "Apple Pay کے ساتھ تیز اور محفوظ ادائیگی۔",
);
L("pm_mada", "mada", "mada", "mada");
L(
  "pmd_mada",
  "Saudi debit cards.",
  "بطاقات الخصم السعودية.",
  "سعودی ڈیبٹ کارڈز۔",
);
L("pm_tabby", "Tabby", "Tabby", "Tabby");
L(
  "pmd_tabby",
  "Split into 4 interest-free payments.",
  "قسّمي المبلغ على 4 دفعات بلا فوائد.",
  "4 بغیر سود کی قسطوں میں ادائیگی کریں۔",
);
L("pm_tamara", "Tamara", "Tamara", "Tamara");
L(
  "pmd_tamara",
  "Pay later or in instalments.",
  "ادفعي لاحقاً أو بالتقسيط.",
  "بعد میں یا اقساط میں ادائیگی کریں۔",
);
L(
  "mobAcc",
  "Mobile account number",
  "رقم الحساب المحمول",
  "موبائل اکاؤنٹ نمبر",
);
L("bankName", "Bank", "البنك", "بینک");
L("bankTitle", "Account title", "اسم الحساب", "اکاؤنٹ ٹائٹل");
L("receipt", "Upload receipt", "ارفعي الإيصال", "رسید اپ لوڈ کریں");
L(
  "payFail",
  "Payment could not start. Please try again.",
  "تعذّر بدء الدفع. حاولي مرة أخرى.",
  "ادائیگی شروع نہیں ہو سکی۔ دوبارہ کوشش کریں۔",
);
L(
  "thanksH",
  "Thank you, your order is placed",
  "شكراً لك، تم استلام طلبك",
  "شکریہ، آپ کا آرڈر مل گیا",
);
L("orderNo", "Order number", "رقم الطلب", "آرڈر نمبر");
L(
  "sendWa",
  "Send receipt on WhatsApp",
  "أرسلي الإيصال عبر واتساب",
  "واٹس ایپ پر رسید بھیجیں",
);
L("continue", "Continue shopping", "متابعة التسوق", "خریداری جاری رکھیں");
L(
  "st_cod",
  "You will pay in cash when the order arrives. We will confirm it on WhatsApp shortly.",
  "ستدفعين نقداً عند وصول الطلب. سنؤكده لك عبر واتساب قريباً.",
  "آرڈر پہنچنے پر آپ نقد ادائیگی کریں گی۔ ہم جلد واٹس ایپ پر تصدیق کریں گے۔",
);
L(
  "st_pending",
  "Your order is received. We will confirm payment and update you shortly.",
  "تم استلام طلبك. سنؤكد الدفع ونوافيك قريباً.",
  "آپ کا آرڈر مل گیا ہے۔ ہم ادائیگی کی تصدیق کر کے جلد آپ کو اطلاع دیں گے۔",
);
L(
  "st_awaiting_receipt",
  "Please transfer the amount to our account and send the receipt on WhatsApp with your order number.",
  "يرجى تحويل المبلغ إلى حسابنا وإرسال الإيصال عبر واتساب مع رقم الطلب.",
  "براہ کرم رقم ہمارے اکاؤنٹ میں بھیجیں اور آرڈر نمبر کے ساتھ رسید واٹس ایپ کریں۔",
);
L("ordersH", "My orders", "طلباتي", "میرے آرڈرز");
L("noOrders", "No orders yet.", "لا توجد طلبات بعد.", "ابھی کوئی آرڈر نہیں۔");
L("fitL", "Fit", "القصّة", "فٹنگ");
