(function(){
  if(window.__ajwaaInvitationLanguageSwitch) return;
  window.__ajwaaInvitationLanguageSwitch = true;

  const STORAGE_KEY = "ajwaa-invitation-language";
  const EASTERN_DIGITS = {"0":"٠","1":"١","2":"٢","3":"٣","4":"٤","5":"٥","6":"٦","7":"٧","8":"٨","9":"٩"};
  const MONTHS = {
    January:"يناير", February:"فبراير", March:"مارس", April:"أبريل", May:"مايو", June:"يونيو",
    July:"يوليو", August:"أغسطس", September:"سبتمبر", October:"أكتوبر", November:"نوفمبر", December:"ديسمبر",
    Jan:"يناير", Feb:"فبراير", Mar:"مارس", Apr:"أبريل", Aug:"أغسطس", Sep:"سبتمبر", Oct:"أكتوبر", Nov:"نوفمبر", Dec:"ديسمبر"
  };
  const DAYS = {
    Sunday:"الأحد", Monday:"الاثنين", Tuesday:"الثلاثاء", Wednesday:"الأربعاء", Thursday:"الخميس", Friday:"الجمعة", Saturday:"السبت"
  };

  const AR = {
    "Wedding Invitation":"دعوة زفاف",
    "◆ Wedding Invitation ◆":"◆ دعوة زفاف ◆",
    "A Wedding Invitation":"دعوة زفاف",
    "Birthday Invitation":"دعوة عيد ميلاد",
    "Birthday Wish Invitation":"دعوة أمنية عيد ميلاد",
    "Birthday Arcade Invitation":"دعوة عيد ميلاد أركيد",
    "Birthday Serenade Invitation":"دعوة عيد ميلاد رومانسية",
    "Birthday Time Capsule":"كبسولة زمن عيد ميلاد",
    "Cosmic Birthday Gift":"هدية عيد ميلاد كونية",
    "Romantic Birthday Gift":"هدية عيد ميلاد رومانسية",
    "Birthday constellation":"كوكبة عيد الميلاد",
    "For Nour":"إلى نور",
    "Save the Date":"احفظ التاريخ",
    "save the date":"احفظ التاريخ",
    "Save the date":"احفظ التاريخ",
    "SAVE THE DATE":"احفظ التاريخ",
    "You are invited":"أنت مدعو",
    "You are invited to the wedding of":"أنت مدعو لحضور زفاف",
    "You have received an invitation":"لقد وصلت لك دعوة",
    "YOU HAVE RECEIVED AN INVITATION":"لقد وصلت لك دعوة",
    "You have received an invitation from":"لقد وصلت لك دعوة من",
    "you have received an invitation":"لقد وصلت لك دعوة",
    "you have received an":"لقد وصلت لك",
    "Invitation from":"دعوة من",
    "You're invited to celebrate":"أنت مدعو للاحتفال",
    "Be with us":"كن معنا",
    "Be With Us":"كن معنا",
    "be with us":"كن معنا",
    "Join Now":"انضم الآن",
    "Join Our Group":"انضم إلى مجموعتنا",
    "Open":"افتح",
    "Open Your Gift":"افتح هديتك",
    "Open Your Gift ✦":"افتح هديتك ✦",
    "Open today. Keep forever.":"افتحها اليوم واحتفظ بها للأبد.",
    "Open this when the year gets loud":"افتح هذا عندما يصبح العام صاخبًا",
    "Tap to open":"اضغط للفتح",
    "Tap to reveal":"اضغط للكشف",
    "Tap each card to reveal":"اضغط على كل بطاقة للكشف",
    "Tap each card to reveal ✦":"اضغط على كل بطاقة للكشف ✦",
    "Click to open your gift":"اضغط لفتح هديتك",
    "Read Again":"اقرأ مرة أخرى",
    "Read the letter":"اقرأ الرسالة",
    "Back":"رجوع",
    "Next":"التالي",
    "Next →":"التالي ←",
    "Back to top":"العودة للأعلى",
    "Scroll":"مرّر",
    "Start exploring":"ابدأ الاستكشاف",
    "Check Details":"شاهد التفاصيل",
    "Letter":"رسالة",
    "Surprise":"مفاجأة",
    "Hidden message":"رسالة مخفية",
    "Small things to find":"أشياء صغيرة لتجدها",
    "Mini surprises":"مفاجآت صغيرة",

    "We are getting married":"سنتزوج",
    "we are getting married":"سنتزوج",
    "are getting married":"سيتزوجان",
    "~ We are getting married ~":"~ سنتزوج ~",
    "We're Getting Married":"سنتزوج",
    "Time flies, and we are now ready to say":"مرّ الوقت بسرعة، ونحن الآن جاهزان لنقول",
    "MARRIED":"متزوجان",
    "LET'S GET":"هيا نبدأ",
    "FOREVER — OUR PROMISE":"إلى الأبد - وعدنا",
    "Forever begins":"تبدأ حكاية الأبد",
    "forever begins":"تبدأ حكاية الأبد",
    "Forever sealed":"خُتم للأبد",
    "our forever.":"أبدنا.",
    "One journey, forever together":"رحلة واحدة، معًا للأبد",
    "One journey":"رحلة واحدة",
    "one journey":"رحلة واحدة",
    "Two hearts":"قلبان",
    "Two souls":"روحان",
    "Two tides, one shore":"مدّان وشاطئ واحد",
    "Written in the stars":"مكتوب في النجوم",
    "Written in sand":"مكتوب على الرمل",
    "A Journey of Love":"رحلة حب",
    "Our story":"قصتنا",
    "Our Story":"قصتنا",
    "how it all began":"كيف بدأت الحكاية",
    "how it began":"كيف بدأت",
    "Our":"قصتنا",
    "Began":"بدأت",
    "First":"الأولى",
    "First glance":"النظرة الأولى",
    "Spring encounter":"لقاء الربيع",
    "Starlit encounter":"لقاء تحت النجوم",
    "A chance encounter":"لقاء بالصدفة",
    "The question":"السؤال",
    "The golden question":"السؤال الذهبي",
    "The emerald ring":"الخاتم الزمردي",
    "Tides of fate":"مدّ القدر",
    "A celestial promise":"وعد سماوي",
    "A love story written in constellations":"قصة حب مكتوبة بين الكوكبات",
    "A love that blooms in every season":"حب يزهر في كل فصل",

    "Details":"التفاصيل",
    "The Details":"التفاصيل",
    "Everything you need to know":"كل ما تحتاج معرفته",
    "When?":"متى؟",
    "Where?":"أين؟",
    "When & Where":"الموعد والمكان",
    "When &amp; Where":"الموعد والمكان",
    "Date":"التاريخ",
    "Time":"الوقت",
    "Place":"المكان",
    "Venue":"المكان",
    "Location":"الموقع",
    "Together Forever":"معًا للأبد",
    "Counting Down To":"العد التنازلي إلى",
    "Event Details":"تفاصيل المناسبة",
    "You Are Warmly Invited":"ندعوكم بكل محبة",
    "View on Map":"عرض الخريطة",
    "Your Presence":"حضوركم يسعدنا",
    "Kindly Confirm Attendance":"يرجى تأكيد الحضور",
    "Please respond by June 5, 2026":"يرجى الرد قبل ٥ يونيو ٢٠٢٦",
    "Your Full Name *":"الاسم الكامل *",
    "Phone Number":"رقم الهاتف",
    "Number of Guests *":"عدد الضيوف *",
    "Will You Attend? *":"هل ستحضر؟ *",
    "A Message for the Couple":"رسالة للعروسين",
    "Send Confirmation":"إرسال التأكيد",
    "Select...":"اختر...",
    "1 Person":"شخص واحد",
    "2 Persons":"شخصان",
    "3 Persons":"٣ أشخاص",
    "4 Persons":"٤ أشخاص",
    "5 Persons":"٥ أشخاص",
    "6 or more":"٦ أو أكثر",
    "Joyfully Attending":"سأحضر بكل سرور",
    "Regretfully Declining":"أعتذر عن الحضور",
    "Still Deciding":"لم أقرر بعد",
    "Thank you! Your confirmation has been received.":"شكرًا لك! تم استلام تأكيد الحضور.",
    "Qasr Al-Ma'moura Hall":"قصر المعمورة",
    "Al-Maryoteyya, Giza":"المريوطية، الجيزة",
    "Al-Maryoteyya, Giza, Egypt":"المريوطية، الجيزة، مصر",
    "Doors open at 6:30 PM":"تفتح الأبواب الساعة ٦:٣٠ مساءً",
    "LOCATION":"الموقع",
    "Where it happens":"أين يحدث الاحتفال",
    "where it happens":"أين يحدث الاحتفال",
    "Where we'll meet":"أين سنلتقي",
    "How to get there":"كيفية الوصول",
    "Google Maps":"خرائط Google",
    "Open Map":"افتح الخريطة",
    "Open in Maps →":"افتح في الخرائط ←",
    "open in maps →":"افتح في الخرائط ←",
    "Open in Google Maps":"افتح في خرائط Google",
    "Open Location ♥":"افتح الموقع ♥",
    "VIEW LOCATION":"عرض الموقع",
    "Calendar":"التقويم",

    "Countdown":"العد التنازلي",
    "Counting Down":"العد التنازلي",
    "counting every moment":"نعدّ كل لحظة",
    "Counting every moment":"نعدّ كل لحظة",
    "Time left until we meet!":"الوقت المتبقي حتى نلتقي!",
    "Until":"حتى",
    "Until our wedding":"حتى زفافنا",
    "Until our wedding day":"حتى يوم زفافنا",
    "Happily ever begins after":"تبدأ السعادة بعد",
    "Wedding Starts":"يبدأ الزفاف",
    "The Big Day":"اليوم الكبير",
    "The Day":"اليوم",
    "The day":"اليوم",
    "the day":"اليوم",
    "The day we say yes":"اليوم الذي نقول فيه نعم",
    "days":"أيام",
    "Days":"أيام",
    "hours":"ساعات",
    "Hours":"ساعات",
    "minutes":"دقائق",
    "Minutes":"دقائق",
    "seconds":"ثوانٍ",
    "Seconds":"ثوانٍ",
    "Secs":"ثوانٍ",
    "Sec":"ثانية",
    "Mins":"دقائق",
    "Min":"دقيقة",
    "months":"أشهر",

    "Plan of the day":"برنامج اليوم",
    "Order of the Day":"ترتيب اليوم",
    "PROGRAM":"البرنامج",
    "Timeline":"الجدول",
    "A Timeline of":"جدول",
    "A timeline of joy":"جدول مليء بالفرح",
    "What we have planned for you":"ما خططناه لكم",
    "Guest Arrival":"وصول الضيوف",
    "Guests arrival":"وصول الضيوف",
    "Arrival & Welcome Drinks":"الوصول ومشروبات الترحيب",
    "Reception and welcome cocktails at the villa":"استقبال وكوكتيلات ترحيبية في الفيلا",
    "Champagne Reception":"استقبال الشمبانيا",
    "Red Carpet Arrival":"وصول على السجادة الحمراء",
    "Welcome cocktails in the rose courtyard":"كوكتيلات ترحيبية في فناء الورود",
    "Welcome drinks at the oasis courtyard":"مشروبات ترحيبية في فناء الواحة",
    "Welcome drinks in the crystal gallery":"مشروبات ترحيبية في المعرض الكريستالي",
    "Welcome cocktails on the shore":"كوكتيلات ترحيبية على الشاطئ",
    "Ceremony":"المراسم",
    "The Ceremony":"المراسم",
    "The ceremony":"المراسم",
    "Ceremony at 5:30 PM":"المراسم الساعة ٥:٣٠ مساءً",
    "The moment we say I do — under string lights and stars.":"لحظة نقول فيها نعم تحت الأضواء والنجوم.",
    "The most special moment of the day":"أجمل لحظة في اليوم",
    "Exchange of vows under the grand oak":"تبادل العهود تحت شجرة البلوط الكبيرة",
    "Vows beneath the olive grove":"عهود تحت بستان الزيتون",
    "Vows beneath the cherry trees":"عهود تحت أشجار الكرز",
    "Vows beneath the crystal dome":"عهود تحت القبة الكريستالية",
    "Vows beneath the golden canopy":"عهود تحت المظلة الذهبية",
    "Vows beneath the silver dome":"عهود تحت القبة الفضية",
    "Vows by moonlight":"عهود على ضوء القمر",
    "Vows at golden hour":"عهود في الساعة الذهبية",
    "Vows on the main stage":"عهود على المسرح الرئيسي",
    "Dinner":"العشاء",
    "Dinner Buffet":"بوفيه العشاء",
    "Dinner time":"وقت العشاء",
    "Grand Dinner":"العشاء الكبير",
    "Cocktail Hour & Dinner":"ساعة الكوكتيل والعشاء",
    "A five-course feast":"وليمة من خمسة أطباق",
    "A five-course theatrical feast":"وليمة مسرحية من خمسة أطباق",
    "A lavish feast under the stars":"وليمة فاخرة تحت النجوم",
    "A curated feast beneath the stars":"وليمة مختارة تحت النجوم",
    "A Tuscan feast under the stars":"وليمة توسكانية تحت النجوم",
    "A palace feast for our dearest":"وليمة قصر لأحبائنا",
    "A kaiseki feast in the garden hall":"وليمة كايسيكي في قاعة الحديقة",
    "A seafood feast under the stars":"وليمة بحرية تحت النجوم",
    "A celestial feast in the conservatory":"وليمة سماوية في الحديقة الزجاجية",
    "Al fresco dining under the stars":"عشاء في الهواء الطلق تحت النجوم",
    "Matcha and wagashi in the tea pavilion":"ماتشا وحلوى واغاشي في جناح الشاي",
    "Prosecco in the lemon garden":"بروسيكو في حديقة الليمون",
    "Cocktails in the emerald lounge":"كوكتيلات في صالة الزمرد",
    "Cocktails in the grand foyer":"كوكتيلات في البهو الكبير",
    "Dancing":"رقص",
    "Dancing & Celebration":"رقص واحتفال",
    "Dancing & Stargazing":"رقص ومشاهدة النجوم",
    "DJ & Dance Floor":"دي جي وساحة رقص",
    "First Dance & Party":"الرقصة الأولى والحفل",
    "Zaffa & First Dance":"زفة والرقصة الأولى",
    "Party":"الحفل",
    "Beach Bonfire Party":"حفلة نار على الشاطئ",
    "Dance the night away":"نرقص طوال الليل",
    "Dance until the stars fade":"رقص حتى تختفي النجوم",
    "Dance until the curtain falls":"رقص حتى يسدل الستار",
    "Music and celebration until dawn":"موسيقى واحتفال حتى الفجر",
    "Music, laughter, and amore":"موسيقى وضحك وحب",
    "Last Dance":"الرقصة الأخيرة",
    "Farewell and beautiful memories":"وداع وذكريات جميلة",
    "The final act":"الفصل الأخير",
    "The Encore":"الختام",
    "Midnight Countdown":"عدّ منتصف الليل",

    "Dress Code":"اللباس المطلوب",
    "Dress code":"اللباس المطلوب",
    "DRESS CODE":"اللباس المطلوب",
    "Dress":"اللباس",
    "Good to Know":"ملاحظات مهمة",
    "A few gentle reminders":"تذكيرات لطيفة",
    "Formal":"رسمي",
    "FORMAL ATTIRE":"لباس رسمي",
    "ADULTS ONLY EVENT":"مناسبة للكبار فقط",
    "GENTLEMEN":"للرجال",
    "LADIES":"للسيدات",
    "Please wear elegant attire that fits the festive mood.":"يرجى ارتداء ملابس أنيقة تناسب أجواء الاحتفال.",
    "We kindly ask you to dress formally to join us on this very special day.":"نرجو منكم ارتداء ملابس رسمية لمشاركتنا هذا اليوم المميز.",
    "Please avoid wearing white - it is reserved for the bride.":"يرجى تجنب اللون الأبيض، فهو مخصص للعروس.",
    "Dark suit and tie — elegant, classic, refined.":"بدلة داكنة وربطة عنق - أنيقة وكلاسيكية وراقية.",
    "Long evening gown in soft, neutral tones — beige, cream, sage or blush.":"فستان سهرة طويل بألوان ناعمة ومحايدة مثل البيج أو الكريمي أو المريمي أو الوردي الخفيف.",
    "An evening made truly special by your refined presence, Black tie for gentlemen, and elegant evening Dresses for ladies.":"أمسية تزداد تميزًا بحضوركم الراقي: ربطة سوداء للرجال وفساتين سهرة أنيقة للسيدات.",
    "We would be delighted if you joined our color palette.":"يسعدنا أن تنضموا إلى لوحة ألواننا.",
    "We'd love it if you matched our soft, romantic palette — anything in these warm, earthy tones will look beautiful in our garden setting.":"نحب أن تتناسقوا مع ألواننا الناعمة والرومانسية، فكل درجات الدفء والتراب ستبدو جميلة في أجواء الحديقة.",

    "Gift":"هدية",
    "Gifts":"الهدايا",
    "GIFT SUGGESTIONS":"اقتراحات الهدايا",
    "Gift Suggestions":"اقتراحات الهدايا",
    "A thoughtful gesture":"لفتة لطيفة",
    "Your gift":"هديتك",
    "Your presence is the greatest gift of all. For those who wish to give a little something, you can do so in the following ways:":"حضوركم هو أجمل هدية. ومن يرغب في تقديم شيء بسيط يمكنه ذلك بالطرق التالية:",
    "Your presence is our greatest gift. If you wish to honor us further, a contribution toward our new beginning would be deeply appreciated.":"حضوركم هو أعظم هدية لنا. وإن رغبتم في إكرامنا أكثر، فستكون مساهمتكم في بدايتنا الجديدة محل تقدير كبير.",
    "We deeply value your care and attention, and would be delighted with any gift. If it's easy, an envelope is the perfect choice — we will use it for the things we love most.":"نقدّر اهتمامكم ومحبتكم كثيرًا، وسنسعد بأي هدية. وإن كان مناسبًا، فالظرف سيكون اختيارًا مثاليًا لما نحب أن نبدأ به حياتنا.",
    "Instead of bouquets, we would be happy to receive your favorite book for our future family library.":"بدلًا من باقات الزهور، سنسعد بتلقي كتابكم المفضل لمكتبة عائلتنا القادمة.",
    "Card":"بطاقة",
    "preferred":"مفضل",
    "Bank Transfer":"تحويل بنكي",
    "Bring a card on the day, or send your warm wishes - your love means the world to us.":"أحضر بطاقة في اليوم نفسه، أو أرسل أمنياتك الدافئة؛ محبتك تعني لنا الكثير.",
    "Envelope":"ظرف",

    "RSVP":"تأكيد الحضور",
    "Kindly reply":"نرجو الرد",
    "Kindly Reply":"نرجو الرد",
    "Reply":"الرد",
    "Send Reply":"إرسال الرد",
    "Send RSVP":"إرسال تأكيد الحضور",
    "send rsvp":"إرسال تأكيد الحضور",
    "CONFIRM ATTENDANCE":"تأكيد الحضور",
    "Fill the Form":"املأ النموذج",
    "Submit":"إرسال",
    "Send":"إرسال",
    "Send with love":"إرسال بمحبة",
    "Send our love":"أرسل محبتنا",
    "Joyfully accept":"أقبل بسعادة",
    "Joyfully Accept":"أقبل بسعادة",
    "Yes, with joy":"نعم، بكل فرح",
    "Yes, I'll be there":"نعم، سأكون هناك",
    "Sadly, no":"للأسف لا",
    "Regretfully decline":"أعتذر عن الحضور",
    "Respectfully Decline":"أعتذر باحترام",
    "Sorry, I can't make it":"آسف، لا أستطيع الحضور",
    "Will you attend?":"هل ستحضر؟",
    "Will you attend? *":"هل ستحضر؟ *",
    "Full Name":"الاسم الكامل",
    "Full name *":"الاسم الكامل *",
    "Your name":"اسمك",
    "Email":"البريد الإلكتروني",
    "Number of guests":"عدد الضيوف",
    "Contact phone *":"رقم الهاتف *",
    "Companions":"المرافقون",
    "Adult":"بالغ",
    "Child":"طفل",
    "I need transport to the venue":"أحتاج وسيلة نقل إلى المكان",
    "Hotel / Accommodation / Area":"الفندق / الإقامة / المنطقة",
    "Allergies or dietary requirements":"حساسية أو متطلبات غذائية",
    "A note for us (optional)":"ملاحظة لنا (اختياري)",
    "Message for the couple (optional)":"رسالة للعروسين (اختياري)",
    "Leave us a message":"اترك لنا رسالة",
    "Song":"أغنية",
    "Song you'd love to hear":"أغنية تحب سماعها",
    "Help us make the perfect party! Suggest songs you'd love to hear at our wedding.":"ساعدنا في صنع حفلة مثالية! اقترح أغاني تحب سماعها في زفافنا.",
    "Please let us know if you'll be there!":"نرجو أن تخبرنا هل ستكون معنا!",
    "Please confirm your attendance by April 1, 2026.":"يرجى تأكيد الحضور قبل ١ أبريل ٢٠٢٦.",
    "We would be honored by your presence. Please confirm your attendance before October 1st, 2026.":"يشرفنا حضوركم. يرجى تأكيد الحضور قبل ١ أكتوبر ٢٠٢٦.",
    "Thank you!":"شكرًا لك!",
    "Thank you, see you soon!":"شكرًا لك، نراك قريبًا!",
    "Thank you, beautifully received.":"شكرًا، تم استلام ردك بكل لطف.",
    "Thank you! Your presence has been confirmed":"شكرًا! تم تأكيد حضورك",
    "Thank you for being part of our story.":"شكرًا لأنك جزء من قصتنا.",

    "Gallery":"المعرض",
    "Memory gallery":"معرض الذكريات",
    "Photo memories":"ذكريات مصورة",
    "Our little gallery":"معرضنا الصغير",
    "A few favorites":"بعض اللحظات المفضلة",
    "A few new memories to keep from this year.":"بعض الذكريات الجديدة التي سنحتفظ بها من هذا العام.",
    "Memory 1":"ذكرى ١",
    "Memory 2":"ذكرى ٢",
    "Memory 3":"ذكرى ٣",
    "Memory 4":"ذكرى ٤",
    "Moments":"لحظات",
    "moments":"لحظات",
    "Photos from our little":"صور من",
    "One photo is still missing... the one that completes our journey - and it will be with you at our wedding.":"لا تزال هناك صورة ناقصة... الصورة التي تكمل رحلتنا، وستكون معكم في زفافنا.",

    "Music":"الموسيقى",
    "music":"موسيقى",
    "Playlist":"قائمة التشغيل",
    "Song page":"صفحة الأغنية",
    "OUR MELODY":"لحننا",
    "Play our song":"شغّل أغنيتنا",
    "A romantic song from us":"أغنية رومانسية منا",
    "A romantic Arabic song chosen by Adam & Farah":"أغنية عربية رومانسية اختارها آدم وفرح",
    "Press play for a soft birthday ambience and let the page feel a little more alive.":"اضغط تشغيل لأجواء عيد ميلاد ناعمة واجعل الصفحة أكثر حياة.",
    "Your browser does not support audio.":"متصفحك لا يدعم تشغيل الصوت.",

    "Happy Birthday":"عيد ميلاد سعيد",
    "Happy Birthday Maya":"عيد ميلاد سعيد يا مايا",
    "Happy birthday, my love":"عيد ميلاد سعيد يا حبيبتي",
    "Birthday Wish":"أمنية عيد ميلاد",
    "Birthday archive":"أرشيف عيد الميلاد",
    "Birthday details":"تفاصيل عيد الميلاد",
    "Birthday constellation":"كوكبة عيد الميلاد",
    "Birthday song":"أغنية عيد الميلاد",
    "Birthday spark":"شرارة عيد الميلاد",
    "Player one birthday mode":"وضع عيد ميلاد اللاعب الأول",
    "A private birthday invitation":"دعوة عيد ميلاد خاصة",
    "A romantic birthday celebration":"احتفال عيد ميلاد رومانسي",
    "A candlelit birthday invitation for dinner, memories, music, and one wish under the moon.":"دعوة عيد ميلاد على ضوء الشموع للعشاء والذكريات والموسيقى وأمنية تحت القمر.",
    "A digital birthday time capsule full of tiny notes, old memories, and one message for the year ahead.":"كبسولة زمن رقمية لعيد الميلاد مليئة بملاحظات صغيرة وذكريات قديمة ورسالة للعام القادم.",
    "A tiny digital gift made of soft lights, favorite memories, and words I hope stay with you.":"هدية رقمية صغيرة من أضواء ناعمة وذكريات مفضلة وكلمات أتمنى أن تبقى معك.",
    "A gift made just for you":"هدية صُنعت خصيصًا لك",
    "A letter before the cake":"رسالة قبل الكعكة",
    "A letter for you":"رسالة لك",
    "A little birthday message is waiting.":"رسالة عيد ميلاد صغيرة تنتظرك.",
    "A note for you":"ملاحظة لك",
    "A tiny secret":"سر صغير",
    "Before the candles":"قبل الشموع",
    "Before the big day, we wanted to share a small message with you…":"قبل اليوم الكبير، أردنا أن نشاركك رسالة صغيرة...",
    "This is for you":"هذا لك",
    "For your new year":"لعامك الجديد",
    "From our hearts":"من قلوبنا",
    "From the bottom of our hearts":"من أعماق قلوبنا",
    "With love":"بكل حب",
    "With love,":"بكل حب،",
    "with all our love":"بكل حبنا",
    "With all our love":"بكل حبنا",
    "Made with love for Maya.":"صُنع بحب من أجل مايا.",
    "Made for Lina, with all my love.":"صُنع للينا، بكل حبي.",
    "Made with love":"صُنع بحب",
    "":"صُنع بحب بواسطة",
    "Made with love · Cairo, Egypt":"صُنع بحب · القاهرة، مصر",
    "Hey you know who, this one is all yours.":"يا من تعرفين نفسك، هذه لك وحدك.",
    "Tonight belongs to Lina":"هذه الليلة للينا",
    "Tonight, the stars arranged themselves just to spell your name.":"الليلة رتبت النجوم نفسها فقط لتكتب اسمك.",
    "Today, the universe celebrates":"اليوم يحتفل الكون",
    "the day you arrived in it.":"بيوم وصولك إليه.",
    "the day you arrived in it. 🌠":"بيوم وصولك إليه. 🌠",
    "because you're in it.":"لأنك فيه.",
    "because you're in it. 🌠":"لأنك فيه. 🌠",
    "May every single one of your wishes come true.":"ليت كل أمنياتك تتحقق.",
    "May this year love you back in every language you understand.":"ليحبك هذا العام بكل لغة تفهمها.",
    "On this birthday, I hope you feel even a fraction of the love you give to everyone around you.":"في عيد ميلادك، أتمنى أن تشعر ولو بجزء بسيط من الحب الذي تمنحه لكل من حولك.",
    "You make ordinary days feel like celebrations.":"أنت تجعل الأيام العادية تبدو كاحتفالات.",
    "You make ordinary moments feel like they're worth saving forever.":"أنت تجعل اللحظات العادية تستحق أن تُحفظ للأبد.",
    "Your laugh makes every room feel warmer than it was before you walked in.":"ضحكتك تجعل كل مكان أكثر دفئًا منذ لحظة دخولك.",
    "Your strength is quiet but it has held up more than you know.":"قوتك هادئة، لكنها حملت أكثر مما تتخيل.",
    "You carry kindness the way others carry keys — quietly, always with you.":"تحمل اللطف كما يحمل الآخرون مفاتيحهم؛ بهدوء ودائمًا معك.",
    "Simply knowing you is one of the best things that has ever happened to me.":"مجرد معرفتك واحد من أجمل ما حدث لي.",
    "The way you care for the people you love is nothing short of extraordinary.":"طريقة اهتمامك بمن تحب لا تقل عن كونها استثنائية.",
    "The world is":"العالم",
    "There are some people who make the world feel less heavy just by existing in it. You are one of those people,":"هناك أشخاص يجعلون العالم أخف لمجرد وجودهم فيه. أنت واحد من هؤلاء،",
    "You have already handled things you once thought would be too much. Keep choosing joy loudly.":"لقد تجاوزت أشياء ظننت يومًا أنها أكبر من قدرتك. استمر في اختيار الفرح بصوت عالٍ.",
    "Things that make you":"أشياء تجعلك",
    "favorite smile":"صاحبة الابتسامة المفضلة",
    "always smiling":"دائم الابتسام",
    "genuinely better":"أفضل بصدق",
    "radiant":"مشرق",
    "extraordinary":"استثنائي",
    "tiny magic":"سحر صغير",
    "my favourite":"المفضل لدي",
    "favourite":"المفضل",
    "Your light":"نورك",
    "Your laugh":"ضحكتك",
    "Your kindness":"لطفك",
    "Your courage":"شجاعتك",
    "Your heart":"قلبك",
    "Your magic":"سحرك",
    "You make ordinary rooms feel like they have windows to the sky.":"تجعل الأماكن العادية تبدو وكأن لها نوافذ على السماء.",
    "It is the sound I would recognize in any universe, even through static.":"إنها النغمة التي سأعرفها في أي كون، حتى وسط التشويش.",
    "You notice the small things, and somehow that makes everything feel less heavy.":"تنتبه للتفاصيل الصغيرة، وبطريقة ما تجعل كل شيء أخف.",
    "You keep becoming yourself with a grace that feels quietly cosmic.":"تستمر في أن تصبح نفسك بنعمة هادئة تبدو كونية.",
    "It is tender, brilliant, stubborn in the best way, and so easy to love.":"قلبك رقيق ولامع وعنيد بأجمل طريقة، وسهل جدًا أن يُحب.",
    "You turn simple days into stories I want to keep forever.":"تحوّل الأيام البسيطة إلى قصص أريد الاحتفاظ بها للأبد.",
    "Your favorite person":"شخصك المفضل",
    "Wish unlocked: may this year love you loudly, softly, and in every language your heart understands.":"تم فتح الأمنية: لعل هذا العام يحبك بصوت عالٍ وبلطف وبكل لغة يفهمها قلبك.",
    "First little universe":"أول كون صغير",
    "A laugh in orbit":"ضحكة في المدار",
    "Favorite starlight":"ضوء النجوم المفضل",
    "That perfect day":"ذلك اليوم المثالي",
    "Always this memory":"دائمًا هذه الذكرى",
    "If I could gather every bright thing in the sky, I would still choose this small, impossible miracle: getting to know you, celebrate you, and watch another year find its way to your beautiful heart.":"لو استطعت جمع كل شيء مضيء في السماء، سأظل أختار هذه المعجزة الصغيرة المستحيلة: أن أعرفك، وأحتفل بك، وأرى عامًا آخر يجد طريقه إلى قلبك الجميل.",

    "Make a wish":"تمنَّ أمنية",
    "Make a":"تمنَّ",
    "wish":"أمنية",
    "Wish":"أمنية",
    "My wish":"أمنيتي",
    "Wish wall":"حائط الأمنيات",
    "Wishes":"أمنيات",
    "of wishes":"من الأمنيات",
    "Golden Hour Wish":"أمنية الساعة الذهبية",
    "Blow out the candles":"أطفئ الشموع",
    "Blow out the":"أطفئ",
    "Blow Out Candles":"أطفئ الشموع",
    "Light candle":"أشعل شمعة",
    "Light the candles":"أشعل الشموع",
    "Light the first candle":"أشعل الشمعة الأولى",
    "Cake and a wish":"كعكة وأمنية",
    "Cake, dancing and celebrating until the night feels endless.":"كعكة ورقص واحتفال حتى تبدو الليلة بلا نهاية.",
    "The sweetest part, obviously supervised by love.":"أحلى جزء، وبالطبع تحت إشراف الحب.",
    "One small flame, one private wish, one evening made for love.":"لهب صغير، أمنية خاصة، وأمسية صُنعت للحب.",
    "Click every flame. When the last one disappears, the wish unlocks.":"اضغط على كل لهب. عندما يختفي الأخير، تنفتح الأمنية.",
    "Tap the cake or blow out the candles ✦":"اضغط على الكعكة أو أطفئ الشموع ✦",
    "Unlock cake mode":"افتح وضع الكعكة",
    "Release one wish into the night":"أطلق أمنية واحدة في الليل",
    "Release wishes into the evening sky":"أطلق الأمنيات في سماء المساء",
    "Release lantern":"أطلق الفانوس",
    "Lantern wish":"أمنية الفانوس",

    "Capsules":"كبسولات",
    "Memory capsules":"كبسولات الذكريات",
    "Tap each capsule to reveal a note":"اضغط على كل كبسولة لكشف ملاحظة",
    "Unlock capsule":"افتح الكبسولة",
    "Capsule sealed with love.":"كبسولة مختومة بالحب.",
    "Future":"المستقبل",
    "Future message":"رسالة مستقبلية",
    "Final transmission":"الرسالة الأخيرة",
    "Final note":"الملاحظة الأخيرة",
    "Final unlock":"الفتح الأخير",
    "Frozen in time":"مجمّد في الزمن",
    "Date sealed":"تاريخ مختوم",
    "Open me":"افتحني",
    "open me":"افتحني",
    "Opened for":"فُتح من أجل",
    "Unlock a small collection of memories, wishes, and future promises.":"افتح مجموعة صغيرة من الذكريات والأمنيات والوعود المستقبلية.",

    "Birthday Arcade":"أركيد عيد الميلاد",
    "Main mission":"المهمة الرئيسية",
    "Mission":"مهمة",
    "Bonus":"مكافأة",
    "Bonus round":"جولة المكافأة",
    "Start bonus round":"ابدأ جولة المكافأة",
    "Player":"اللاعب",
    "Score":"النقاط",
    "Tokens":"الرموز",
    "Prize wall":"حائط الجوائز",
    "Prizes":"جوائز",
    "Level 25 unlocked":"تم فتح المستوى ٢٥",
    "Press start":"اضغط للبدء",
    "Press start to unlock the party level.":"اضغط للبدء وفتح مستوى الحفلة.",
    "Enter level":"ادخل المستوى",
    "Clear the birthday level":"أنهِ مستوى عيد الميلاد",
    "Catch ten birthday tokens":"اجمع عشرة رموز عيد ميلاد",
    "Tap the glowing tokens before the timer runs out.":"اضغط على الرموز المتوهجة قبل انتهاء الوقت.",
    "Take photos, leave notes, and help fill the prize wall.":"التقط صورًا، اترك ملاحظات، وساعد في ملء حائط الجوائز.",
    "Finish the level with one more tap to unlock a secret birthday clue.":"أنه المستوى بلمسة أخيرة لفتح تلميح عيد ميلاد سري.",
    "Reveal code":"اكشف الرمز",
    "Reveal the birthday code":"اكشف رمز عيد الميلاد",
    "Thanks for playing birthday mode.":"شكرًا للعب وضع عيد الميلاد.",
    "Join Sami for a neon birthday quest, collect bonus points, and unlock the final gift code.":"انضم إلى سامي في مغامرة عيد ميلاد نيون، اجمع نقاط المكافأة، وافتح رمز الهدية الأخير.",
    "Bring your best party energy and one dramatic cheer.":"أحضر أفضل طاقة للحفلة وهتافًا حماسيًا.",
    "Stay until the candles, because that is where the bonus points live.":"ابق حتى الشموع، فهناك تعيش نقاط المكافأة.",
    "Arrive powered up":"احضر بطاقة كاملة",

    "Cosmic":"كوني",
    "galaxy":"مجرة",
    "Galaxy":"مجرة",
    "Memory orbit":"مدار الذكريات",
    "star candles":"شموع النجوم",
    "Six little stars":"ست نجوم صغيرة",
    "Five glowing memory frames, each waiting to hold a favorite moment from your galaxy.":"خمسة إطارات ذكريات متوهجة، كل واحد ينتظر لحظة مفضلة من مجرتك.",
    "Tap each card to reveal a tiny constellation of why you matter so much.":"اضغط على كل بطاقة لتكشف كوكبة صغيرة من أسباب أهميتك.",
    "Chasing auroras":"مطاردة الشفق",
    "Moonlight photos":"صور ضوء القمر",
    "Soft confetti glow":"توهج قصاصات ناعم",
    "One last surprise":"مفاجأة أخيرة",
    "Reveal one more line":"اكشف سطرًا آخر",

    "Bouquet builder":"صانع الباقة",
    "Collect memories":"اجمع الذكريات",
    "Collect six petals":"اجمع ست بتلات",
    "Tap the petals to finish the bouquet and unlock a small birthday promise.":"اضغط على البتلات لإكمال الباقة وفتح وعد عيد ميلاد صغير.",
    "Memory film":"فيلم الذكريات",
    "Our little birthday itinerary":"برنامج عيد ميلادنا الصغير",
    "Candlelit dinner":"عشاء على ضوء الشموع",
    "Golden hour":"الساعة الذهبية",
    "golden hour":"الساعة الذهبية",
    "Moonlit Gardens":"حدائق مضاءة بالقمر",
    "Soft romance":"رومانسية ناعمة",
    "Something warm, slow, and just for us.":"شيء دافئ وهادئ ولنا فقط.",
    "A letter from my":"رسالة من",
    "the troublemakers ♥":"المشاكسين ♥",

    "Dear Guests!":"ضيوفنا الأعزاء!",
    "Dear Friends":"أصدقاؤنا الأعزاء",
    "A Message From Us":"رسالة منا",
    "A MESSAGE FROM US":"رسالة منا",
    "From our hearts":"من قلوبنا",
    "We can't wait":"لا نطيق الانتظار",
    "We can't wait to celebrate":"لا نطيق انتظار الاحتفال",
    "We can't wait to celebrate with you":"لا نطيق انتظار الاحتفال معكم",
    "We can't wait to celebrate with you!":"لا نطيق انتظار الاحتفال معكم!",
    "We can't wait to celebrate with you.":"لا نطيق انتظار الاحتفال معكم.",
    "We can't wait to see you":"لا نطيق انتظار رؤيتكم",
    "We can't wait to see you in April.":"لا نطيق انتظار رؤيتكم في أبريل.",
    "We can't wait to see you in August.":"لا نطيق انتظار رؤيتكم في أغسطس.",
    "We can't wait to see you in December.":"لا نطيق انتظار رؤيتكم في ديسمبر.",
    "We can't wait to see you in November.":"لا نطيق انتظار رؤيتكم في نوفمبر.",
    "We can't wait to see you in October.":"لا نطيق انتظار رؤيتكم في أكتوبر.",
    "We can't wait to see you in September.":"لا نطيق انتظار رؤيتكم في سبتمبر.",
    "We can't wait to see you on New Year's Eve.":"لا نطيق انتظار رؤيتكم ليلة رأس السنة.",
    "We are excited to celebrate this special moment with you and create beautiful memories together.":"نحن متحمسون للاحتفال بهذه اللحظة المميزة معكم وصنع ذكريات جميلة معًا.",
    "We are grateful for the love and support of our family and friends. Your presence will make our day more special.":"نحن ممتنون لمحبة ودعم العائلة والأصدقاء. حضوركم سيجعل يومنا أكثر تميزًا.",
    "We are waiting for you":"نحن بانتظاركم",
    "we await you":"ننتظركم",
    "We hope you can make it":"نتمنى أن تكونوا معنا",
    "We invite you to be part of this long-awaited day.":"ندعوكم لتكونوا جزءًا من هذا اليوم المنتظر.",
    "We would love for you to be part of":"يسعدنا أن تكونوا جزءًا من",
    "With great joy, we invite you to share this special moment of our lives — the day we promise forever to one another.":"بكل فرح، ندعوكم لمشاركتنا هذه اللحظة الخاصة من حياتنا؛ اليوم الذي نعد فيه بعضنا بالأبد.",
    "Something wonderful is about to happen in our lives. We would be so happy to share this special day with the people who matter most to us — our family and dearest friends. Please join us as we celebrate the beginning of our forever.":"هناك شيء جميل على وشك أن يحدث في حياتنا. سنكون سعداء جدًا بمشاركة هذا اليوم الخاص مع أحب الناس إلينا؛ عائلتنا وأصدقائنا الأعزاء. انضموا إلينا لنحتفل ببداية أبدنا.",
    "We adore your little ones, but to allow all guests — including parents — an evening of relaxation, our celebration will be adults only.":"نحب أطفالكم الصغار، ولكن لنمنح جميع الضيوف - ومنهم الآباء - أمسية هادئة، سيكون احتفالنا للكبار فقط.",
    "Please note that the format of the celebration does not include a children's area or animators. We kindly ask you to spend this evening without children.":"يرجى العلم أن شكل الاحتفال لا يتضمن منطقة للأطفال أو فقرات ترفيهية لهم. نرجو منكم قضاء هذه الأمسية بدون أطفال.",
    "From the bottom of our hearts we ask you to refrain from shouts of “Bitter!” and to preserve the warm atmosphere of an intimate family celebration.":"من أعماق قلوبنا نرجو تجنب الصيحات العالية والحفاظ على دفء أجواء الاحتفال العائلي الحميم.",
    "Just in case — soft handkerchiefs prepared for the touching moment.":"للاحتياط، مناديل ناعمة جاهزة للحظة المؤثرة.",
    "Don't miss a moment! Tag our wedding using our hashtag so we can relive every memory.":"لا تفوّتوا لحظة! استخدموا وسم زفافنا حتى نعيش الذكريات من جديد.",
    "We've created a Telegram group for our celebration where you can find extra information and share photos and videos from our wedding and after.":"أنشأنا مجموعة تيليغرام للاحتفال، ستجدون فيها معلومات إضافية ويمكنكم مشاركة الصور والفيديوهات من الزفاف وما بعده.",
    "Pull up your comfiest shoes — we're throwing the party of our lives":"ارتدوا أحذيتكم الأكثر راحة؛ سنقيم حفلة العمر",
    "Time will fly while you mingle and meet the other guests.":"سيمر الوقت سريعًا وأنتم تتعارفون وتلتقون بالضيوف الآخرين.",
    "Delicious dishes and a joyful program from our host.":"أطباق شهية وبرنامج مبهج من مضيفنا.",
    "On this beautiful day, we want to share with you the bright moments and sincere smiles of our love story.":"في هذا اليوم الجميل، نريد أن نشارككم لحظاتنا المضيئة وابتسامات قصة حبنا الصادقة.",
    "Before the big day, we wanted to share a small message with you…":"قبل اليوم الكبير، أردنا أن نشارككم رسالة صغيرة...",
    "Time flew by so fast — and these two cuties are about to get married! Yep, we still can't believe it ourselves. From scraped knees and silly games to vows and forever… here we go!":"مرّ الوقت بسرعة، وهذان اللطيفان على وشك الزواج! نعم، لا نصدق ذلك حتى الآن. من ألعاب الطفولة والضحك إلى العهود والأبد... ها نحن نبدأ!",

    "A chance encounter at a coastal café, where the sound of waves blended with laughter. Two strangers sharing the same sunset, not knowing they'd share a lifetime.":"لقاء صدفة في مقهى على الساحل، حيث امتزج صوت الأمواج بالضحك. غريبان يتشاركان الغروب نفسه، دون أن يعرفا أنهما سيتشاركان العمر.",
    "Across a crowded ballroom, through the crystal and candlelight, their eyes met. He asked her to dance. She never wanted the music to stop.":"وسط قاعة مزدحمة، بين الكريستال وضوء الشموع، التقت عيناهما. طلب منها الرقص، ولم ترغب أبدًا في أن تتوقف الموسيقى.",
    "At an observatory lecture on a winter night, their hands reached for the same telescope. The universe conspired in that single, electric moment.":"في محاضرة داخل مرصد في ليلة شتوية، امتدت يداهما إلى التلسكوب نفسه. تآمر الكون كله في تلك اللحظة الخاطفة.",
    "At the Alexandria Library, reaching for the same ancient book of poetry - their fingers met before their eyes did.":"في مكتبة الإسكندرية، وبينما امتدا إلى كتاب شعر قديم واحد، التقت أصابعهما قبل أن تلتقي العيون.",
    "At the Cairo Opera on a winter evening, their seats were side by side. By intermission, the real performance had already begun.":"في أوبرا القاهرة في مساء شتوي، كانت مقاعدهما متجاورة. ومع الاستراحة، كان العرض الحقيقي قد بدأ بالفعل.",
    "Between golden vineyards and old stone walls, two paths crossed at a small market. The scent of fresh herbs and the warmth of a shared smile began it all.":"بين كروم ذهبية وجدران حجرية قديمة، تقاطع طريقان في سوق صغير. رائحة الأعشاب الطازجة ودفء ابتسامة مشتركة كانا بداية كل شيء.",
    "On a felucca drifting down the Nile at sunset, he opened a box that held a ring and a lifetime promise.":"على فلوكة تنساب في النيل وقت الغروب، فتح صندوقًا يحمل خاتمًا ووعد عمر.",
    "On a moonlit terrace overlooking the sea, with the lighthouse standing witness, he asked the question that changed everything.":"على شرفة مضاءة بالقمر تطل على البحر، وكان الفنار شاهدًا، سأل السؤال الذي غيّر كل شيء.",
    "On the same beach where they first met, with the horizon blazing orange and pink, he wrote \"forever?\" in the sand. The ocean answered yes.":"على الشاطئ نفسه الذي التقيا فيه أول مرة، والأفق يشتعل بالبرتقالي والوردي، كتب على الرمل: \"إلى الأبد؟\" فأجاب البحر نعم.",
    "On the same opera stage where they first met, with a single spotlight and a ring, he turned fiction into forever.":"على مسرح الأوبرا نفسه حيث التقيا أول مرة، وتحت ضوء واحد وخاتم، حوّل الخيال إلى أبد.",
    "Under a canopy of cherry blossoms in Maruyama Park, their umbrellas tangled in a sudden spring rain. Apologies turned to laughter, laughter turned to tea.":"تحت مظلة من أزهار الكرز في حديقة ماروياما، تشابكت مظلاتهما تحت مطر ربيعي مفاجئ. تحولت الاعتذارات إلى ضحك، والضحك إلى شاي.",
    "Under a sky of fairy lights in a garden they both loved, he knelt. She said yes before the words left his lips.":"تحت سماء من أضواء الحديقة التي أحباها، جثا على ركبته. قالت نعم قبل أن تخرج الكلمات من شفتيه.",
    "Under a sky that has watched centuries of love, he asked. She said yes before he finished.":"تحت سماء شهدت قرونًا من الحب، سألها. قالت نعم قبل أن يكمل.",
    "Under the amber glow of old Cairo, two paths crossed at a friend's gathering. A shared laugh became the first chapter of forever.":"تحت وهج القاهرة القديمة الكهرماني، تقاطع طريقان في تجمع عند صديق. ضحكة مشتركة أصبحت الفصل الأول من الأبد.",
    "Under the ancient cherry tree where they first met, with petals falling like confetti, he whispered the question that blossomed into forever.":"تحت شجرة الكرز العتيقة حيث التقيا أول مرة، والبتلات تتساقط كقصاصات فرح، همس بالسؤال الذي أزهر إلى الأبد.",
    "Under the oldest tree":"تحت أقدم شجرة",
    "Under the olive tree":"تحت شجرة الزيتون",
    "Beneath the oldest tree":"تحت أقدم شجرة",
    "Beneath the pyramids":"تحت الأهرامات",
    "Beneath a meteor shower on their anniversary, he opened a box that held a ring and a forever. She whispered yes to the falling stars.":"تحت زخات شهب في ذكرى لقائهما، فتح صندوقًا يحمل خاتمًا وأبدًا. همست نعم للنجوم المتساقطة.",
    "In a private room at their favorite restaurant, surrounded by candlelight and roses, he opened a velvet box holding an emerald that matched her eyes.":"في غرفة خاصة في مطعمهما المفضل، وسط الشموع والورود، فتح صندوقًا مخمليًا يحمل زمردة تشبه عينيها.",
    "In the garden where her grandmother once danced, beneath an ancient olive tree, he asked the only question that ever mattered.":"في الحديقة التي رقصت فيها جدتها يومًا، تحت شجرة زيتون عتيقة، سأل السؤال الوحيد الذي كان يهم.",
    "It was a quiet night, a cozy café, and two strangers reaching for the same book. Eyes met before words did, and the world paused for just a moment.":"كانت ليلة هادئة، ومقهى دافئًا، وغريبان يمدان أيديهما إلى الكتاب نفسه. التقت العيون قبل الكلمات، وتوقف العالم لحظة.",
    "It was a quiet night, a small cinema, a shared bucket of popcorn. Hands found each other before words did.":"كانت ليلة هادئة، وسينما صغيرة، وعلبة فشار مشتركة. وجدت الأيدي بعضها قبل الكلمات.",
    "We first met and little did we know it was the beginning of something beautiful.":"التقينا أول مرة ولم نكن نعلم أنها بداية شيء جميل.",
    "We started our journey together, sharing laughter, dreams, and countless memories.":"بدأنا رحلتنا معًا، نتشارك الضحكات والأحلام وذكريات لا تُحصى.",
    "Sailing the Mediterranean, watching sunsets from the Corniche, and finding magic in the simplest moments together.":"إبحار في المتوسط، غروب على الكورنيش، وسحر في أبسط اللحظات معًا.",
    "From coral reefs to mountain peaks, they explored the world hand in hand, collecting sunsets like postcards from paradise.":"من الشعاب المرجانية إلى قمم الجبال، استكشفا العالم يدًا بيد، وجمعا الغروب كبطاقات بريدية من الجنة.",
    "From snow-covered temples in winter to summer festivals lit by paper lanterns, they wove their story through every season of the heart.":"من معابد مغطاة بالثلج في الشتاء إلى مهرجانات صيفية مضاءة بالفوانيس، نسجا قصتهما عبر كل فصول القلب.",
    "From sunlit beaches to midnight road trips, they discovered the world together — and in each adventure, found a deeper shade of love.":"من شواطئ مضاءة بالشمس إلى رحلات منتصف الليل، اكتشفا العالم معًا، وفي كل مغامرة وجدا لونًا أعمق من الحب.",
    "From the northern lights in Iceland to moonlit walks through Parisian streets, every journey brought them closer to the infinite.":"من أضواء الشمال في آيسلندا إلى نزهات باريس تحت القمر، قربتهما كل رحلة من اللانهاية.",
    "From the white sands of the Sahara to the Red Sea's coral reefs, they painted their love across Egypt's timeless landscapes.":"من رمال الصحراء البيضاء إلى شعاب البحر الأحمر، رسما حبهما على مناظر مصر الخالدة.",
    "They chased sunsets along the Amalfi coast, collected seashells, and made promises that tasted like salt and honey on summer evenings.":"طاردا الغروب على ساحل أمالفي، جمعا الأصداف، وقطعا وعودًا بطعم الملح والعسل في أمسيات الصيف.",
    "They collected memories like rare jewels — opera in Vienna, midnight strolls through Montmartre, champagne on balconies overlooking the Thames.":"جمعا الذكريات كجواهر نادرة: أوبرا في فيينا، نزهات منتصف الليل في مونمارتر، وشمبانيا على شرفات تطل على التايمز.",
    "Through candlelit dinners, spontaneous road trips, and quiet mornings with Turkish coffee, they composed a love story that only grew richer.":"من عشاء على ضوء الشموع، ورحلات عفوية، وصباحات هادئة مع قهوة تركية، ألّفا قصة حب ازدادت ثراءً.",

    "A candlelit garden beneath ancient oaks, where every petal and every star conspires to celebrate love.":"حديقة مضاءة بالشموع تحت أشجار بلوط عتيقة، حيث تتآمر كل بتلة وكل نجمة للاحتفال بالحب.",
    "A centuries-old garden where cherry trees arch over stone paths and koi swim beneath moss-covered bridges.":"حديقة عمرها قرون، تنحني فيها أشجار الكرز فوق ممرات حجرية وتسبح أسماك الكوي تحت جسور مغطاة بالطحالب.",
    "A grand art deco hall with emerald marble columns, crystal chandeliers, and gold-leaf ceilings that whisper of a more glamorous age.":"قاعة آرت ديكو فخمة بأعمدة رخامية زمردية وثريات كريستالية وأسقف مذهبة تهمس بزمن أكثر بريقًا.",
    "A private rose-lit garden under the Cairo sky.":"حديقة خاصة مضاءة بالورود تحت سماء القاهرة.",
    "A private walled garden where ancient wisteria drapes over marble, and the night sky becomes the only ceiling you need.":"حديقة خاصة مسوّرة تتدلّى فيها الوستيريا العتيقة فوق الرخام، وتصبح السماء الليلية السقف الوحيد الذي تحتاجه.",
    "A private white-sand beach where turquoise waters kiss the shore, and the sunset paints the sky in coral and gold.":"شاطئ رملي أبيض خاص، تلامس فيه المياه الفيروزية الشاطئ، ويرسم الغروب السماء بالمرجاني والذهبي.",
    "A sun-drenched estate among olive groves, where stone archways frame rolling hills and every breeze carries the scent of rosemary.":"ضيعة مشمسة بين بساتين الزيتون، تؤطر فيها الأقواس الحجرية التلال، ويحمل كل نسيم رائحة إكليل الجبل.",
    "An open-air wedding venue tucked among olive trees and warm string lights, just outside the heart of Cairo, Egypt.":"مكان زفاف مفتوح بين أشجار الزيتون وأضواء دافئة، خارج قلب القاهرة بقليل.",
    "Golden desert oasis with warm rose and sand tones, wax-seal envelope opening, and card-based layout.":"واحة صحراوية ذهبية بدرجات وردية ورملية دافئة، وافتتاحية ظرف بختم شمعي، وتنسيق على شكل بطاقات.",
    "Where love meets the Mediterranean sun":"حيث يلتقي الحب بشمس المتوسط",
    "Where the sun meets the sea, love begins":"حيث تلتقي الشمس بالبحر يبدأ الحب",
    "Where elegance meets eternity":"حيث تلتقي الأناقة بالأبد",
    "The stage is set for your arrival.":"المسرح جاهز لوصولكم.",

    "Beige":"بيج",
    "Soft Pink":"وردي ناعم",
    "Warm Brown":"بني دافئ",
    "Theme":"الثيم",
    "Soft day":"يوم ناعم",
    "soft day":"يوم ناعم",
    "White Garden":"الحديقة البيضاء",
    "WHITE GARDEN":"الحديقة البيضاء",
    "The Emerald":"الزمردة",
    "The Emerald Ballroom":"قاعة الزمرد",
    "The Crystal Palace":"القصر الكريستالي",
    "The Golden Oasis":"الواحة الذهبية",
    "The Grand Estate":"الضيعة الكبرى",
    "The Lotus Ballrooms":"قاعات اللوتس",
    "The Neon Room":"غرفة النيون",
    "The Royal Opera":"الأوبرا الملكية",
    "The curtain rises on":"يرتفع الستار على",
    "Opening night":"ليلة الافتتاح",
    "The gala":"الحفل الكبير",
    "The evening":"الأمسية",
    "The Evening":"الأمسية",
    "A grand affair":"احتفال فخم",
    "A Cairo evening":"أمسية قاهرية",
    "A Tuscan afternoon":"ظهيرة توسكانية",
    "Mediterranean dreams":"أحلام المتوسط",
    "Island horizons":"آفاق الجزيرة",
    "Desert adventures":"مغامرات صحراوية",
    "Coastal wanderings":"تجوال ساحلي",
    "Painting the world":"نرسم العالم",
    "Like petals on water":"كبتلات على الماء",
    "Four seasons of love":"أربعة فصول من الحب",
    "Sakura Garden":"حديقة الساكورا",
    "Lantern Festival":"مهرجان الفوانيس",
    "Midnight in Paris":"منتصف الليل في باريس",
    "Moonlit Gardens":"حدائق القمر",

    "Sunday":"الأحد",
    "Monday":"الاثنين",
    "Tuesday":"الثلاثاء",
    "Wednesday":"الأربعاء",
    "Thursday":"الخميس",
    "Friday":"الجمعة",
    "Saturday":"السبت",
    "Su":"الأحد",
    "Mo":"الاثنين",
    "Tu":"الثلاثاء",
    "Th":"الخميس",
    "Fr":"الجمعة",
    "Sa":"السبت",
    "In the afternoon":"بعد الظهر",
    "in the evening":"مساءً",
    "In the evening":"مساءً",
    "Beginning at 16:00":"يبدأ الساعة ١٦:٠٠",
    "From 17:00 to 02:00":"من ١٧:٠٠ إلى ٠٢:٠٠",
    "at Nile Plaza, Cairo":"في نايل بلازا، القاهرة",

    "Your full name":"اسمك الكامل",
    "e.g. gluten-free, lactose intolerant...":"مثال: خالٍ من الجلوتين، حساسية لاكتوز...",
    "e.g. Hotel Borgo Antico, Montalcino area...":"مثال: فندق بورجو أنتيكو، منطقة مونتالشينو...",
    "e.g. Viva la Vida - Coldplay":"مثال: Viva la Vida - Coldplay",
    "Write us a few words...":"اكتب لنا بضع كلمات...",
    "Message":"رسالة",
    "Name":"الاسم",
    "Phone":"الهاتف"
  };

  const ATTRIBUTE_TRANSLATIONS = {
    "Open menu":"افتح القائمة",
    "Close menu":"أغلق القائمة",
    "Switch to Arabic":"التبديل إلى العربية",
    "Switch to English":"التبديل إلى الإنجليزية",
    "Crystal chandelier with beaded curtains":"ثريا كريستالية بستائر خرزية",
    "Elegant round dining table with palm trees":"طاولة طعام دائرية أنيقة مع أشجار نخيل",
    "Hanging fairy lights":"أضواء معلقة",
    "Antique gramophone":"غرامافون عتيق",
    "Couples dancing in formal attire":"أزواج يرقصون بملابس رسمية",
    "Embossed floral envelope":"ظرف مزخرف بالزهور",
    "Stained glass window":"نافذة زجاج ملون"
  };
  const LOWER_DICTIONARIES = new WeakMap();

  function lowerDictionary(dictionary){
    if(!LOWER_DICTIONARIES.has(dictionary)){
      const lowered = {};
      Object.keys(dictionary).forEach(key => {
        lowered[key.toLowerCase()] = dictionary[key];
      });
      LOWER_DICTIONARIES.set(dictionary, lowered);
    }
    return LOWER_DICTIONARIES.get(dictionary);
  }

  function normalize(value){
    return (value || "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
  }

  function localizeNumbers(value){
    return value
      .replace(/\bAM\b/g, "صباحًا")
      .replace(/\bPM\b/g, "مساءً")
      .replace(/\d/g, digit => EASTERN_DIGITS[digit] || digit);
  }

  function localizeMonths(value){
    return value
      .replace(/\b(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)\b/gi, day => DAYS[day[0].toUpperCase() + day.slice(1).toLowerCase()] || day)
      .replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Aug|Sep|Oct|Nov|Dec)\b/g, month => MONTHS[month] || month)
      .replace(/([٠-٩0-9])(?:st|nd|rd|th)\b/gi, "$1");
  }

  function composedTranslation(key){
    let match = key.match(/^(.+?)\s+(?:—|-)\s+Wedding Invitation(?:\s+·\s+(.+))?$/);
    if(match) return `دعوة زفاف ${match[1]}${match[2] ? " · " + match[2] : ""}`;

    match = key.match(/^(.+?)\s+(?:—|-)\s+A Wedding Invitation(?:\s+·\s+(.+))?$/);
    if(match) return `دعوة زفاف ${match[1]}${match[2] ? " · " + match[2] : ""}`;

    match = key.match(/^(.+?)\s+(?:—|-)\s+(?:We're|We Are) Getting Married!?(?:\s+·?\s*(.+))?$/);
    if(match) return `${match[1]} - سنتزوج${match[2] ? " · " + match[2] : ""}`;

    match = key.match(/^forever, beginning (.+)$/i);
    if(match) return `الأبد يبدأ ${match[1]}`;

    match = key.match(/^forever begins (.+)$/i);
    if(match) return `الأبد يبدأ ${match[1]}`;

    match = key.match(/^(.+?)\s*&\s*(.+)$/);
    if(match && /^[A-Za-z\s.'-]+$/.test(match[1] + match[2])) return `${match[1]} و ${match[2]}`;

    match = key.match(/^from\s+(.+)$/i);
    if(match) return `من ${match[1].replace(/\s*&\s*/g, " و ")}`;

    if(/^[\d\s:./·,\-–—]+$/.test(key)) return key;
    return null;
  }

  function translateValue(value, dictionary){
    if(!value || !normalize(value)) return value;
    const leading = value.match(/^\s*/)[0];
    const trailing = value.match(/\s*$/)[0];
    const key = normalize(value);
    let translated = dictionary[key];
    if(translated == null && key.length > 2) translated = lowerDictionary(dictionary)[key.toLowerCase()];
    if(translated == null) translated = composedTranslation(key);
    if(translated == null) translated = key;
    translated = localizeNumbers(localizeMonths(translated));
    return leading + translated + trailing;
  }

  function collectTextNodes(root, list){
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node){
        const parent = node.parentElement;
        if(!parent || parent.closest("script,style,noscript,svg,canvas,audio,video,.ajwaa-lang-switch")) return NodeFilter.FILTER_REJECT;
        return normalize(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    while(walker.nextNode()){
      list.push({ node: walker.currentNode, english: walker.currentNode.nodeValue });
    }
  }

  function collectAttributes(){
    const attrs = [];
    document.querySelectorAll("[placeholder],[aria-label],[title],[alt]").forEach(el => {
      ["placeholder","aria-label","title","alt"].forEach(attr => {
        if(el.hasAttribute(attr) && normalize(el.getAttribute(attr))){
          attrs.push({ el, attr, english: el.getAttribute(attr) });
        }
      });
    });
    return attrs;
  }

  const style = document.createElement("style");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;500;600;700&display=swap');
    .ajwaa-lang-switch{
      position:fixed;
      top:16px;
      inset-inline-end:16px;
      z-index:2147483647;
      display:inline-flex;
      align-items:center;
      justify-content:center;
      min-width:76px;
      min-height:42px;
      padding:10px 14px;
      border:1px solid rgba(255,255,255,.24);
      border-radius:999px;
      background:rgba(15,13,18,.76);
      color:#fff;
      font:700 12px/1.1 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
      letter-spacing:.02em;
      box-shadow:0 12px 36px rgba(0,0,0,.24);
      -webkit-backdrop-filter:blur(14px);
      backdrop-filter:blur(14px);
      cursor:pointer;
      transition:transform .2s ease,background .2s ease,border-color .2s ease;
    }
    .ajwaa-lang-switch:hover{transform:translateY(-2px);background:rgba(15,13,18,.88);border-color:rgba(255,255,255,.42)}
    html[dir="rtl"] body{direction:rtl}
    html[dir="rtl"] body,
    html[dir="rtl"] input,
    html[dir="rtl"] textarea,
    html[dir="rtl"] button,
    html[dir="rtl"] select{font-family:"Noto Kufi Arabic",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
    html[dir="rtl"] input,
    html[dir="rtl"] textarea{text-align:right}
    html[dir="rtl"] .ajwaa-lang-switch{font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;letter-spacing:0}
    @media (max-width:560px){
      .ajwaa-lang-switch{top:12px;inset-inline-end:12px;min-width:68px;min-height:38px;padding:9px 12px;font-size:11px}
    }
  `;
  document.head.appendChild(style);

  const button = document.createElement("button");
  button.className = "ajwaa-lang-switch";
  button.type = "button";
  button.textContent = "العربية";
  button.setAttribute("aria-label", "Switch to Arabic");
  button.setAttribute("aria-pressed", "false");
  document.body.appendChild(button);

  const textItems = [];
  collectTextNodes(document.body, textItems);
  const attrItems = collectAttributes();
  const originalTitle = document.title;
  const originalLang = document.documentElement.lang || "en";
  const originalDir = document.documentElement.dir || "ltr";
  let currentLanguage = "en";

  function setLanguage(language){
    currentLanguage = language === "ar" ? "ar" : "en";
    const isArabic = currentLanguage === "ar";
    document.documentElement.lang = isArabic ? "ar" : originalLang;
    document.documentElement.dir = isArabic ? "rtl" : originalDir;
    document.title = isArabic ? translateValue(originalTitle, AR) : originalTitle;
    textItems.forEach(item => {
      item.node.nodeValue = isArabic ? translateValue(item.english, AR) : item.english;
    });
    attrItems.forEach(item => {
      item.el.setAttribute(item.attr, isArabic ? translateValue(item.english, ATTRIBUTE_TRANSLATIONS) : item.english);
    });
    button.textContent = isArabic ? "English" : "العربية";
    button.setAttribute("aria-label", isArabic ? "Switch to English" : "Switch to Arabic");
    button.setAttribute("aria-pressed", String(isArabic));
    try{ localStorage.setItem(STORAGE_KEY, currentLanguage); }catch{}
  }

  function translateLiveText(node){
    if(currentLanguage !== "ar" || !node || node.nodeType !== Node.TEXT_NODE || !normalize(node.nodeValue)) return;
    const parent = node.parentElement;
    if(!parent || parent.closest("script,style,noscript,svg,canvas,audio,video,.ajwaa-lang-switch")) return;
    const translated = translateValue(node.nodeValue, AR);
    if(translated !== node.nodeValue) node.nodeValue = translated;
  }

  const liveObserver = new MutationObserver(mutations => {
    if(currentLanguage !== "ar") return;
    mutations.forEach(mutation => {
      if(mutation.type === "characterData") translateLiveText(mutation.target);
      mutation.addedNodes.forEach(node => {
        if(node.nodeType === Node.TEXT_NODE) translateLiveText(node);
        if(node.nodeType === Node.ELEMENT_NODE){
          const liveText = [];
          collectTextNodes(node, liveText);
          liveText.forEach(item => translateLiveText(item.node));
        }
      });
    });
  });
  liveObserver.observe(document.body, { childList:true, subtree:true, characterData:true });

  button.addEventListener("click", () => {
    setLanguage(currentLanguage === "ar" ? "en" : "ar");
  });

  let savedLanguage = null;
  try{ savedLanguage = localStorage.getItem(STORAGE_KEY); }catch{}
  setLanguage(savedLanguage === "ar" ? "ar" : "en");
})();
