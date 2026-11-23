// Lesson topics follow the photographed contents and grammar summaries.
// A third field on a word links it to the same card in the prototype.
const course = [
  {
    id: 1, title: "Знакомство", german: "Guten Tag. Mein Name ist …", pages: "18–19",
    theory: [
      ["Глагол любит второе место", "Когда ты рассказываешь что-то, обычно сначала идёт «кто», а потом действие. В вопросе с вопросительным словом сначала идёт «как», «откуда» или «что», а потом действие. У глагола второй стул в обоих случаях.", "Ich komme aus Italien. Woher kommst du?"],
      ["Ich, du и Sie", "Про себя говори ich, с другом — du, а с незнакомым взрослым можно начать с вежливого Sie. Пиши Sie с большой буквы. У sprechen в форме du меняется ещё и гласная.", "Ich spreche Deutsch. Sprichst du Italienisch?", [
        ["Кто?", "heissen", "kommen", "sprechen", "sein"],
        ["ich", "heisse", "komme", "spreche", "bin"],
        ["du", "heisst", "kommst", "sprichst", "bist"],
        ["Sie", "heissen", "kommen", "sprechen", "sind"]
      ]],
      ["Откуда ты? Что ты говоришь?", "Aus значит «из»: aus Italien. У некоторых стран есть артикль. Запомни целиком aus der Schweiz. Язык можно назвать без артикля: Ich spreche Deutsch. Если имя не расслышали, попроси произнести его по буквам.", "Können Sie das bitte buchstabieren?"],
      ["Встреча, прощание и анкета", "В Уцнахе можно поздороваться словом Grüezi. В анкете Vorname — имя, Nachname — фамилия. А Auf Wiedersehen пригодится, когда пора уходить.", "Grüezi! Mein Name ist Nina Keller."]
    ],
    words: [["Grüezi", "здравствуйте (в Швейцарии)", "1:0"], ["Guten Morgen", "доброе утро", "1:1"], ["Auf Wiedersehen", "до свидания"], ["heissen", "зваться", "1:2"], ["kommen", "приходить, быть родом", "1:4"], ["sprechen", "говорить"], ["aus", "из", "1:5"], ["buchstabieren", "произносить по буквам"], ["der Vorname · die Vornamen", "имя"], ["der Nachname · die Nachnamen", "фамилия"], ["die Sprache · die Sprachen", "язык"], ["die Adresse · die Adressen", "адрес", "2:5"]],
    practice: [
      ["Как вежливо спросить имя?", "Wie heissen Sie?", "После Wie идёт heissen, затем вежливое Sie.", "choice", ["Wie heisst du?", "Wie heissen Sie?", "Wie ich heisse?"]],
      ["Ich ___ aus Spanien. (Я из Испании.)", "komme", "С ich у kommen окончание -e.", "gap"],
      ["Собери вопрос «Откуда ты?»", "Woher kommst du", "Woher ставим первым, kommst — вторым.", "order", ["du", "Woher", "kommst"]],
      ["Исправь глагол: Du sprechst Deutsch.", "Du sprichst Deutsch", "В форме du: sprichst, с i.", "fix"],
      ["Я из Швейцарии. (используй kommen)", "Ich komme aus der Schweiz", "Запомни сочетание aus der Schweiz."],
      ["Запиши, что услышишь.", "Mein Name ist Nina", "Mein Name — «моё имя», ist — форма sein.", "listen"],
      ["Какое слово в анкете означает «фамилия»?", "Nachname", "Vorname — имя, Nachname — фамилия.", "choice", ["Vorname", "Sprache", "Nachname"]],
      ["___ bist du? (Кто ты?)", "Wer", "Wer значит «кто», а woher — «откуда».", "gap"]
    ]
  },
  {
    id: 2, title: "Моя семья", german: "Meine Familie", pages: "30–31",
    theory: [
      ["Mein или meine?", "Mein — «мой», dein — «твой», Ihr — «ваш», когда обращаешься на Sie. Посмотри на слово после них. Если у него die в единственном числе или это несколько человек, добавь -e. У der и das здесь окончания нет.", "Das ist mein Vater. Das sind meine Eltern.", [
        ["Чей?", "der Vater", "das Kind", "die Mutter", "die Eltern"],
        ["мой", "mein", "mein", "meine", "meine"],
        ["твой", "dein", "dein", "deine", "deine"],
        ["ваш (Sie)", "Ihr", "Ihr", "Ihre", "Ihre"]
      ]],
      ["Кто что делает", "Er — он, sie — она, wir — мы, ihr — вы для группы друзей, sie — они. С er и sie обычно ставим -t: er lebt. С wir и sie во множественном числе — -en. У ihr обычно -t: ihr lebt.", "Meine Eltern leben in Bern."],
      ["Sein, haben и sprechen", "У этих глаголов есть формы, которые проще выучить целиком. Du bist — «ты есть», du hast — «у тебя есть», du sprichst — «ты говоришь». Для нескольких людей вспомни wir sind и wir haben.", "Wir sind Geschwister. Er spricht Französisch.", [
        ["Кто?", "sein", "haben", "sprechen"],
        ["ich", "bin", "habe", "spreche"], ["du", "bist", "hast", "sprichst"], ["er / sie", "ist", "hat", "spricht"],
        ["wir", "sind", "haben", "sprechen"], ["ihr", "seid", "habt", "sprecht"], ["sie / Sie", "sind", "haben", "sprechen"]
      ]],
      ["Где живёшь и сколько тебе лет", "Для города ставим in: in Uznach. Возраст по-немецки говорят с sein: Ich bin zehn Jahre alt. Числа 11 и 12 — elf и zwölf. Дальше пригодится -zehn, например vierzehn. 16 и 17 сокращаются: sechzehn, siebzehn.", "Meine Schwester ist zwölf Jahre alt."],
      ["Поговорим о себе", "Другу скажи Wie geht es dir?, а вежливо — Wie geht es Ihnen? Можно ответить Gut, danke. В анкете Wohnort — город, в котором ты сейчас живёшь, а Geburtsort — место, где родился.", "Wie geht es dir? Gut, danke!"]
    ],
    words: [["die Familie · die Familien", "семья", "3:0"], ["der Bruder · die Brüder", "брат", "3:1"], ["die Schwester · die Schwestern", "сестра", "3:2"], ["das Kind · die Kinder", "ребёнок", "3:3"], ["die Eltern", "родители", "3:4"], ["der Vater · die Väter", "отец"], ["die Mutter · die Mütter", "мама"], ["der Wohnort · die Wohnorte", "место жительства"], ["die Telefonnummer · die Telefonnummern", "номер телефона", "2:4"], ["wohnen", "жить, проживать", "1:3"], ["haben", "иметь", "3:5"], ["zwölf", "двенадцать", "2:2"]],
    practice: [
      ["Как сказать «моя мама»?", "meine Mutter", "Mutter — женский род, нужен хвостик -e.", "choice", ["meine Mutter", "mein Mutter", "Ihr Mutter"]],
      ["Das ___ meine Eltern.", "sind", "Eltern — во множественном числе, поэтому sind.", "gap"],
      ["Собери фразу «Мой брат живёт в Берне».", "Mein Bruder lebt in Bern", "Bruder — мужской род, поэтому mein. С er форма lebt.", "order", ["Bern", "lebt", "Mein", "in", "Bruder"]],
      ["Исправь глагол: Du habt zwei Kinder.", "Du hast zwei Kinder", "С du говорим hast.", "fix"],
      ["Моя сестра говорит по-немецки.", "Meine Schwester spricht Deutsch", "С sie в единственном числе — spricht."],
      ["Запиши, что услышишь.", "Ich bin elf Jahre alt", "Elf — одиннадцать. Возраст говорим с bin.", "listen"],
      ["Выбери подходящий вопрос для анкеты о месте жительства.", "Wo wohnen Sie?", "Wo — «где». Woher спрашивает, откуда человек.", "choice", ["Wo wohnen Sie?", "Woher kommen Sie?", "Wie heissen Sie?"]],
      ["Wie geht es ___? (Как у тебя дела?)", "dir", "С другом используем dir, вежливая форма — Ihnen.", "gap"]
    ]
  },
  {
    id: 3, title: "Покупки", german: "Einkaufen", pages: "42–43",
    theory: [
      ["Вопрос, на который ответят «да» или «нет»", "Чтобы спросить «Есть ли у нас…?», поставь глагол первым. Если добавляешь вопросительное слово, оно занимает первое место, а глагол отступает на второе.", "Haben wir Milch? Was brauchen wir?"],
      ["Ein, eine и слово «нет»", "Когда показываешь один предмет, говори ein Apfel, ein Ei или eine Tomate. Для «это не…» добавь k: kein Apfel, kein Ei, keine Tomate. Для нескольких предметов без точного количества: Das sind Tomaten. Для отрицания: Das sind keine Tomaten.", "Das ist keine Zitrone. Das ist eine Birne."],
      ["Сколько и чего?", "Множественное число лучше запоминать вместе со словом: Apfel → Äpfel, Ei → Eier, Tomate → Tomaten. Молоко и сахар часто идут без артикля: Wir haben Milch. Количество можно добавить спереди: ein Liter Milch. В магазине пригодятся Franken и Rappen: 1.50 — ein Franken fünfzig.", "Zwei Kilo Kartoffeln kosten fünf Franken."],
      ["Просим вежливо: möchte", "Ich möchte — «я хотел бы». Полезная фраза у прилавка. С du — möchtest, с er или sie — möchte, с wir и Sie — möchten, с ihr — möchtet.", "Ich möchte zwei Brötchen, bitte."]
    ],
    words: [["der Apfel · die Äpfel", "яблоко"], ["das Ei · die Eier", "яйцо"], ["die Tomate · die Tomaten", "помидор"], ["die Birne · die Birnen", "груша"], ["das Brötchen · die Brötchen", "булочка"], ["die Milch", "молоко"], ["der Zucker", "сахар"], ["ein Kilo", "один килограмм"], ["die Flasche · die Flaschen", "бутылка"], ["der Franken · die Franken", "франк", "4:5"], ["kosten", "стоить", "4:4"], ["Ich möchte …", "Я хотел(а) бы…"]],
    practice: [
      ["Выбери вопрос «У вас есть яйца?» (вежливо)", "Haben Sie Eier?", "В вопросе да/нет глагол стоит первым.", "choice", ["Sie haben Eier.", "Was haben Sie?", "Haben Sie Eier?"]],
      ["Das ist ___ Tomate. (Это не помидор.)", "keine", "С Tomate употребляем женскую форму keine.", "gap"],
      ["Собери фразу «Я хотел бы две булочки».", "Ich möchte zwei Brötchen", "Местоимение, möchte, затем покупка.", "order", ["Brötchen", "möchte", "Ich", "zwei"]],
      ["Исправь артикль: Das ist eine Ei.", "Das ist ein Ei", "Ei среднего рода, поэтому ein.", "fix"],
      ["У нас есть молоко. (используй haben, без артикля)", "Wir haben Milch", "Когда речь о молоке вообще, артикль не нужен."],
      ["Запиши, что услышишь.", "Die Äpfel kosten drei Franken", "Äpfel — яблоки, kosten — стоят.", "listen"],
      ["Как сказать «три яйца»?", "drei Eier", "Множественное число от Ei — Eier.", "choice", ["drei Ei", "drei Eie", "drei Eier"]],
      ["Was ___ Sie? (Что бы вы хотели?)", "möchten", "С вежливым Sie нужна форма möchten.", "gap"]
    ]
  },
  {
    id: 4, title: "Моя квартира", german: "Meine Wohnung", pages: "54–55",
    theory: [
      ["Der, das, die", "Когда понятно, о каком предмете речь, используй его обычный артикль: der Tisch, das Bad, die Küche. Во множественном числе у всех die. Учи слово вместе с артиклем: пусть der и Tisch ходят парой.", "Hier ist die Küche. Dort sind die Stühle."],
      ["Укажи, где предмет, и замени его коротким словом", "Hier — здесь, dort — там. Чтобы не повторять название, замени der на er, das на es, die в единственном числе на sie. Для нескольких предметов тоже sie, но глагол будет во множественном числе.", "Wo ist das Sofa? Es ist hier."],
      ["Описываем и говорим «не»", "После ist и sind слово для описания идёт без окончания: Das Sofa ist blau. Die Stühle sind blau. Если диван не синий, скажи nicht blau. Если дивана совсем нет, используй kein: Wir haben kein Sofa.", "Das Bad ist klein. Es ist nicht dunkel."],
      ["Два слова склеились", "Из Küche и Tisch получается Küchentisch. Последняя часть главная: это стол, значит der Küchentisch. В объявлении ищи Zimmer, Miete и Franken, а по телефону спроси Ist die Wohnung noch frei? Числа для цены: hundert — сто, tausend — тысяча, eine Million — миллион.", "Die Miete kostet tausend Franken."]
    ],
    words: [["die Wohnung · die Wohnungen", "квартира"], ["das Zimmer · die Zimmer", "комната"], ["die Küche · die Küchen", "кухня"], ["das Bad · die Bäder", "ванная"], ["der Tisch · die Tische", "стол"], ["der Stuhl · die Stühle", "стул"], ["das Sofa · die Sofas", "диван"], ["der Kühlschrank · die Kühlschränke", "холодильник"], ["die Miete · die Mieten", "арендная плата"], ["hier", "здесь"], ["dort", "там"], ["teuer", "дорогой"]],
    practice: [
      ["Какой артикль у слова Bad?", "das", "Запоминай вместе: das Bad.", "choice", ["der", "die", "das"]],
      ["Wo ist das Sofa? ___ ist dort.", "Es", "Das Sofa заменяем словом es.", "gap"],
      ["Собери фразу «Кухня не маленькая».", "Die Küche ist nicht klein", "Nicht ставим перед klein.", "order", ["klein", "Küche", "nicht", "Die", "ist"]],
      ["Исправь согласование: Die Stühle ist blau.", "Die Stühle sind blau", "Стульев несколько, значит sind.", "fix"],
      ["Стол здесь. (начни с Der Tisch)", "Der Tisch ist hier", "Tisch — мужского рода, hier значит «здесь»."],
      ["Запиши, что услышишь.", "Das Zimmer ist hell", "Hell значит «светлый».", "listen"],
      ["Что означает Miete в объявлении о квартире?", "арендная плата", "Miete — плата за аренду квартиры.", "choice", ["площадь", "арендная плата", "номер этажа"]],
      ["Der Kühlschrank ist ___ teuer. (Холодильник недорогой.)", "nicht", "Перед прилагательным teuer ставим nicht.", "gap"]
    ]
  },
  {
    id: 5, title: "Распорядок дня", german: "Tagesabläufe", pages: "66–67",
    theory: [
      ["Глагол раскладывается на две части", "В словаре видишь aufstehen, а в предложении — Ich stehe … auf. Часть stehe занимает второе место, а приставка auf ждёт в конце. Так же ведут себя einkaufen, aufräumen, anfangen и fernsehen.", "Ich räume mein Zimmer am Samstag auf."],
      ["Am, um и von … bis", "С днями и большей частью суток ставь am: am Dienstag, am Morgen. Ночью говорят in der Nacht. Точные часы идут с um. Чтобы сказать «с … до …», бери von … bis: von Montag bis Freitag.", "Der Laden ist von acht bis sechs Uhr geöffnet."],
      ["Сколько времени?", "Wie spät ist es? — «Который час?». Можно сказать acht Uhr dreissig. А halb neun — это тоже 8:30: прошла половина пути к девяти. Viertel nach acht — 8:15, Viertel vor neun — 8:45.", "Es ist halb neun."],
      ["Если начинаешь с времени", "Am Abend — это один кусочек предложения, даже если в нём два слова. После него сразу ставь глагол, а потом того, кто действует. Правило второго места работает и здесь.", "Am Abend sehe ich fern."],
      ["Формы, которые легко перепутать", "С du и er меняется гласная: du isst, er schläft, du fängst an, er sieht fern. У arbeiten появляется лишнее e, чтобы проще было произнести: du arbeitest, er arbeitet.", "Wann fängst du an?"]
    ],
    words: [["aufstehen", "вставать", "5:0"], ["aufräumen", "убирать, наводить порядок"], ["anfangen", "начинать"], ["fernsehen", "смотреть телевизор"], ["arbeiten", "работать", "5:5"], ["schlafen", "спать"], ["der Morgen · die Morgen", "утро"], ["der Abend · die Abende", "вечер"], ["der Montag · die Montage", "понедельник", "5:4"], ["die Uhr · die Uhren", "часы", "5:3"], ["halb neun", "половина девятого (8:30)"], ["geöffnet", "открыто"]],
    practice: [
      ["Который час, если говорят halb neun?", "8:30", "Половина девятого — это 8:30.", "choice", ["9:30", "8:30", "8:45"]],
      ["Der Kurs fängt ___ neun Uhr an.", "um", "Перед точным временем ставим um.", "gap"],
      ["Собери фразу «Утром я встаю в семь». Начни с Am Morgen.", "Am Morgen stehe ich um sieben Uhr auf", "Глагол stehe идёт после Am Morgen, приставка auf — в конец.", "order", ["auf", "ich", "Am Morgen", "sieben Uhr", "stehe", "um"]],
      ["Исправь порядок: Am Montag ich arbeite.", "Am Montag arbeite ich", "После Am Montag сразу ставим arbeite.", "fix"],
      ["Вечером я смотрю телевизор. (начни с Am Abend)", "Am Abend sehe ich fern", "Fernsehen разделяется: sehe идёт после Am Abend, fern — в конец."],
      ["Запиши, что услышишь.", "Du stehst früh auf", "Früh — рано, auf — отделяемая приставка.", "listen"],
      ["Как сказать «с понедельника по пятницу»?", "von Montag bis Freitag", "Von — «с», bis — «до».", "choice", ["am Montag um Freitag", "von Montag bis Freitag", "um Montag bis Freitag"]],
      ["Du ___ heute lange. (Ты сегодня долго спишь.)", "schläfst", "У schlafen с du появляется ä: du schläfst.", "gap"]
    ]
  },
  {
    id: 6, title: "Свободное время", german: "Freizeit", pages: "78–79",
    theory: [
      ["Akkusativ: когда «кого?» или «что?»", "Сравни: Der Saft ist kalt — сок сам про себя. Ich trinke den Saft — сок уже то, что я пью. В примерах этой лекции меняется мужской артикль: der → den, ein → einen, kein → keinen. У das, die и у множественного числа формы те же.", "Ich nehme einen Tee und eine Suppe.", [
        ["Род", "Кто? / Что?", "Кого? / Что?"],
        ["мужской", "der / ein / kein", "den / einen / keinen"], ["средний", "das / ein / kein", "das / ein / kein"],
        ["женский", "die / eine / keine", "die / eine / keine"], ["множественное число", "die / keine", "die / keine"]
      ]],
      ["Ja, nein и doch", "На обычное «Ты читаешь?» ответь ja или nein. Когда в вопросе уже есть «не», doch отменяет это «не»: «Ты не читаешь?» — «Нет-нет, читаю!» По-немецки одного doch уже хватает.", "Liest du nicht gern? Doch, ich lese gern."],
      ["Четыре глагола с сюрпризом", "С ich всё спокойно, а с du и er меняется гласная. Например: ich fahre, du fährst, er fährt. Во множественном числе снова берём обычную основу: wir fahren.", "Am Sonntag trifft sie eine Freundin.", [
        ["Кто?", "nehmen", "lesen", "treffen", "fahren"],
        ["ich", "nehme", "lese", "treffe", "fahre"], ["du", "nimmst", "liest", "triffst", "fährst"], ["er / sie", "nimmt", "liest", "trifft", "fährt"]
      ]],
      ["Хобби и погода", "Gern говорит, что тебе нравится действие: Ich lese gern. О погоде можно начать с Es: Es regnet, Es ist windig. В прогнозе пригодятся im Norden и im Süden. Если снаружи дождь, книга — тоже план на выходные.", "Im Süden ist es warm. Hier regnet es."]
    ],
    words: [["die Freizeit", "свободное время"], ["das Hobby · die Hobbys", "увлечение"], ["das Wetter", "погода"], ["der Regen", "дождь"], ["die Sonne", "солнце"], ["windig", "ветрено"], ["gern", "охотно, с удовольствием", "7:0"], ["lesen", "читать"], ["treffen", "встречать"], ["fahren", "ехать"], ["nehmen", "брать"], ["doch", "как раз да (возражение на отрицание)"]],
    practice: [
      ["Как сказать «Я беру чай»? (неопределённый артикль)", "Ich nehme einen Tee.", "Tee мужского рода, в Akkusativ ein становится einen.", "choice", ["Ich nehme eine Tee.", "Ich nehme einen Tee.", "Ich nehme ein Tee."]],
      ["Hast du keinen Hunger? — ___, ich habe Hunger.", "Doch", "Ты возражаешь на keinen: на самом деле есть хочется.", "gap"],
      ["Собери фразу «Сегодня идёт дождь». Начни с Heute.", "Heute regnet es", "После Heute ставим regnet, потом es.", "order", ["es", "Heute", "regnet"]],
      ["Исправь глагол: Du nehmst einen Salat.", "Du nimmst einen Salat", "У nehmen с du форма nimmst.", "fix"],
      ["Я люблю читать. (используй gern)", "Ich lese gern", "Gern после глагола передаёт «люблю делать»."],
      ["Запиши, что услышишь.", "Sie fährt gern Velo", "Fährt — форма для er или sie. В Швейцарии Velo — велосипед.", "listen"],
      ["Подставь правильный артикль: Wir haben ___ Saft. (У нас нет сока.)", "keinen", "Saft мужского рода и здесь стоит в Akkusativ.", "choice", ["kein", "keine", "keinen"]],
      ["Er ___ ein Buch. (Он читает книгу.)", "liest", "Lesen с er меняется на liest.", "gap"]
    ]
  },
  {
    id: 7, title: "Дети и школа", german: "Kinder und Schule", pages: "90–91",
    theory: [
      ["Kann — могу, will — хочу", "Для «могу» бери kann, для «хочу» — will. Меняется только первый глагол, а второй уходит в конец в форме из словаря. В вопросе без вопросительного слова kann или willst встанет первым.", "Kannst du heute kommen? Ich will Tennis spielen.", [
        ["Кто?", "können", "wollen"],
        ["ich / er / sie", "kann", "will"], ["du", "kannst", "willst"], ["wir / sie / Sie", "können", "wollen"], ["ihr", "könnt", "wollt"]
      ]],
      ["Что уже случилось: Perfekt с haben", "В разговоре о вчерашнем обычно нужны две части. Ставь habe, hast или hat на обычное место глагола, а форму прошедшего — в конец. У многих обычных глаголов она выглядит как ge-…-t: lernen → gelernt. Некоторые формы нужно запомнить: schreiben → geschrieben, trinken → getrunken.", "Gestern habe ich ein Lied gesungen."],
      ["Когда в прошлом нужно sein", "С gehen, fahren и kommen, когда речь о перемещении, обычно берём sein: bin gegangen, bin gefahren, bin gekommen. Для вопроса ставим bist или sind вперёд, а вторую часть оставляем в конце.", "Bist du mit dem Bus gekommen?"],
      ["Договориться или предупредить школу", "Wollen wir …? — это предложение сделать что-то вместе. Если заболел, Ich bin krank подойдёт для начала разговора. Потом можно добавить, что сегодня не придёшь: Ich kann heute nicht kommen.", "Mein Sohn ist krank. Er kann heute nicht kommen."]
    ],
    words: [["die Schule · die Schulen", "школа"], ["der Unterricht", "занятия, урок"], ["die Lehrerin · die Lehrerinnen", "учительница"], ["die Prüfung · die Prüfungen", "экзамен"], ["der Ausflug · die Ausflüge", "поездка, экскурсия"], ["können", "мочь, уметь", "7:5"], ["wollen", "хотеть"], ["lernen", "учиться, изучать"], ["krank", "больной"], ["pünktlich", "вовремя, пунктуально"], ["gestern", "вчера"], ["Gute Besserung!", "Выздоравливай!"]],
    practice: [
      ["Как сказать «Я умею плавать»?", "Ich kann schwimmen.", "После kann оставь schwimmen в начальной форме.", "choice", ["Ich kann schwimmen.", "Ich schwimme kann.", "Ich kannst schwimmen."]],
      ["___ du morgen mitkommen? (Ты хочешь пойти с нами завтра?)", "Willst", "С du форма willst; в вопросе ставим её первой.", "gap"],
      ["Собери фразу «Вчера я учил немецкий». Начни с Gestern.", "Gestern habe ich Deutsch gelernt", "Habe занимает второе место, gelernt — в конце.", "order", ["gelernt", "ich", "Gestern", "Deutsch", "habe"]],
      ["Замени только вспомогательный глагол: Ich habe nach Hause gegangen.", "Ich bin nach Hause gegangen", "В Perfekt с gehen берём sein: ich bin gegangen.", "fix"],
      ["Я сегодня не могу прийти. (начни с Ich kann)", "Ich kann heute nicht kommen", "Главный глагол kommen ставим в конец."],
      ["Запиши, что услышишь.", "Wir sind mit dem Bus gefahren", "Для поездки с fahren используется sein. С wir — sind.", "listen"],
      ["Какая форма от schreiben подходит для Perfekt?", "geschrieben", "Schreiben → geschrieben. Эту форму удобно запомнить целиком.", "choice", ["geschreibt", "geschrieben", "geschreiben"]],
      ["Bist du pünktlich ___? (Ты пришёл вовремя?)", "gekommen", "У kommen форма gekommen, её ставим в конец.", "gap"]
    ]
  }
];

// Append items so the first twelve card IDs and review dates stay intact.
course[0].words.push(
  // Classroom instructions
  ["anschauen", "смотреть, рассматривать"],
  ["das Bild · die Bilder", "картинка, изображение"],
  ["hören", "слушать, слышать"],
  ["noch einmal", "ещё раз"],
  ["ankreuzen", "отмечать крестиком"],
  ["zuordnen", "сопоставлять"],
  ["ergänzen", "дополнять, заполнять пропуски"],
  ["machen", "делать"],
  ["der Kurs · die Kurse", "курс"],
  ["lesen", "читать"],
  ["das Gespräch · die Gespräche", "разговор, беседа"],
  ["spielen", "играть, разыгрывать"],
  ["suchen", "искать"],
  ["zeigen", "показывать"],
  ["fragen", "спрашивать"],
  ["markieren", "отмечать, выделять"],
  ["die Frage · die Fragen", "вопрос"],
  ["nachsprechen", "повторять вслух за кем-то"],
  ["raten", "угадывать"],
  ["das Wort · die Wörter", "слово"],
  ["die Lektion · die Lektionen", "урок, раздел учебника"],
  ["meinen", "иметь в виду, считать"],
  ["sagen", "сказать, говорить"],
  ["notieren", "записывать, делать заметку"],
  ["vergleichen", "сравнивать"],
  ["schreiben", "писать"],
  ["variieren", "менять, использовать разные варианты"],
  ["erzählen", "рассказывать"],
  ["arbeiten", "работать"],
  ["zeichnen", "рисовать"],
  ["verbinden", "соединять"],
  ["die Antwort · die Antworten", "ответ"],
  ["richtig", "правильно, верно"],
  // Introductions and greetings
  ["ich", "я"],
  ["sein", "быть"],
  ["der Name · die Namen", "имя, название"],
  ["und", "и"],
  ["ein bisschen", "немного, чуть-чуть"],
  ["Guten Tag", "добрый день"],
  ["Hallo", "привет"],
  ["Tschüss", "пока"],
  ["der Herr · die Herren", "господин"],
  ["Guten Abend", "добрый вечер"],
  ["die Dame · die Damen", "дама"],
  ["willkommen", "добро пожаловать"],
  ["bei", "у, при; также «на» в приветствии на мероприятии"],
  ["die Musik", "музыка"],
  ["international", "международный"],
  ["die Frau · die Frauen", "женщина; госпожа перед фамилией"],
  ["danke", "спасибо"],
  ["Gute Nacht", "спокойной ночи"],
  ["der Papa · die Papas", "папа"],
  ["die Entschuldigung · die Entschuldigungen", "извинение; Entschuldigung! — «Извините!»"],
  ["wie", "как"],
  ["Sie", "Вы (вежливое обращение)"],
  ["wer", "кто"],
  ["ja", "да"],
  ["stimmen", "быть верным, совпадать"],
  ["nein", "нет"],
  ["nicht", "не"],
  ["woher", "откуда"],
  ["du", "ты"],
  ["aha", "ага, понятно"],
  ["toll", "здорово, отличный"],
  ["interessant", "интересный, интересно"],
  ["nur", "только"],
  ["was", "что"],
  ["auch", "тоже, также"],
  // Spelling, phone calls and forms
  ["der Buchstabe · die Buchstaben", "буква"],
  ["das Alphabet", "алфавит"],
  ["Wie bitte?", "Простите, что вы сказали?"],
  ["bitte", "пожалуйста"],
  ["die Firma · die Firmen", "фирма, компания"],
  ["da sein", "быть на месте, присутствовать"],
  ["der Moment · die Momente", "момент; Einen Moment, bitte. — «Одну минуту, пожалуйста»"],
  ["gut", "хорошо, хороший"],
  ["Vielen Dank", "большое спасибо"],
  ["Auf Wiederhören", "до свидания (по телефону)"],
  ["die Visitenkarte · die Visitenkarten", "визитная карточка"],
  ["der Familienname · die Familiennamen", "фамилия"],
  ["die Strasse · die Strassen", "улица"],
  ["die Stadt · die Städte", "город"],
  ["das Land · die Länder", "страна"],
  ["das E-Mail · die E-Mails", "электронное письмо; в анкете — электронная почта"],
  ["das Telefon · die Telefone", "телефон; в анкете — номер телефона"],
  ["das Formular · die Formulare", "бланк, анкета"],
  ["der Ort · die Orte", "место, населённый пункт"],
  ["die Anmeldung · die Anmeldungen", "регистрация, запись"],
  ["die Postleitzahl · die Postleitzahlen", "почтовый индекс"],
  // Countries and languages
  ["die Schweiz", "Швейцария"],
  ["Deutschland", "Германия"],
  ["Österreich", "Австрия"],
  ["Polen", "Польша"],
  ["die Türkei", "Турция"],
  ["Spanien", "Испания"],
  ["Ungarn", "Венгрия"],
  ["Rumänien", "Румыния"],
  ["Syrien", "Сирия"],
  ["Frankreich", "Франция"],
  ["Italien", "Италия"],
  ["Griechenland", "Греция"],
  ["Deutsch", "немецкий язык; по-немецки"],
  ["Polnisch", "польский язык; по-польски"],
  ["Türkisch", "турецкий язык; по-турецки"],
  ["Spanisch", "испанский язык; по-испански"],
  ["Ungarisch", "венгерский язык; по-венгерски"],
  ["Rumänisch", "румынский язык; по-румынски"],
  ["Arabisch", "арабский язык; по-арабски"],
  ["Französisch", "французский язык; по-французски"],
  ["Italienisch", "итальянский язык; по-итальянски"],
  ["Griechisch", "греческий язык; по-гречески"]
);

course[1].words.push(
  // Pages 182–184: family, personal information, and places.
  ["der Lehrer · die Lehrer", "учитель"],
  ["die Lehrerin · die Lehrerinnen", "учительница"],
  ["lernen", "учиться, изучать"],
  ["die Pause · die Pausen", "перерыв, перемена"],
  ["der Park · die Parks", "парк"],
  ["die Grosseltern", "бабушка и дедушка"],
  ["das Jahr · die Jahre", "год"],
  ["alt", "старый; в выражении zehn Jahre alt — «десять лет»"],
  ["die Geschwister", "братья и сёстры"],
  ["leben", "жить"],
  ["in", "в"],
  ["super", "отлично, здорово"],
  ["sehr", "очень"],
  ["gut", "хорошо, хороший"],
  ["ach", "ах, ой"],
  ["nicht", "не"],
  ["so", "так; nicht so gut — «не очень хорошо»"],
  ["der Enkel · die Enkel", "внук"],
  ["die Enkelin · die Enkelinnen", "внучка"],
  ["die Tochter · die Töchter", "дочь"],
  ["der Sohn · die Söhne", "сын"],
  ["die Grossmutter · die Grossmütter", "бабушка"],
  ["der Mann · die Männer", "мужчина; муж"],
  ["der Grossvater · die Grossväter", "дедушка"],
  ["mein / meine", "мой, моя, мои"],
  ["dein / deine", "твой, твоя, твои"],
  ["Ihr / Ihre", "ваш, ваша, ваши (при вежливом обращении)"],
  ["der Ehemann · die Ehemänner", "муж, супруг"],
  ["die Ehefrau · die Ehefrauen", "жена, супруга"],
  ["falsch", "неверно, неправильный"],
  ["genau", "точно; именно так"],
  ["sie", "она; они (смысл подсказывает форма глагола)"],
  ["zusammen", "вместе"],
  ["geschieden", "в разводе"],
  ["er", "он"],
  ["jetzt", "сейчас"],
  ["ihr", "вы (несколько людей, с которыми ты на «ты»)"],
  ["wir", "мы"],
  ["die Zahl · die Zahlen", "число"],
  ["wo", "где"],
  ["geboren", "рождённый; ich bin in Bern geboren — «я родился в Берне»"],
  ["die Nummer · die Nummern", "номер"],
  ["verheiratet", "женат, замужем"],
  ["das Heimatland · die Heimatländer", "родная страна"],
  ["der Geburtsort · die Geburtsorte", "место рождения"],
  ["der Familienstand", "семейное положение"],
  ["ledig", "не женат, не замужем"],
  ["verwitwet", "вдовец, вдова (о семейном положении)"],
  ["das Alter", "возраст"],
  ["die Hauptstadt · die Hauptstädte", "столица"],
  ["der Fluss · die Flüsse", "река"],
  ["der Norden", "север"],
  ["der Berg · die Berge", "гора"],
  ["der Süden", "юг"],
  ["der See · die Seen", "озеро"],
  ["der Westen", "запад"],
  ["der Schweizer · die Schweizer", "швейцарец"],
  ["die Schweizerin · die Schweizerinnen", "швейцарка"],
  ["lange", "долго"],
  ["Nord-", "северо-, например Norddeutschland — север Германии"],
  ["der Deutsche / die Deutsche", "немец / немка"],
  ["Süd-", "южно-, например Süddeutschland — юг Германии"]
);

// Vocabulary from pages 184–203. Keep these lists append-only for saved cards.
course[2].words.push(
  ["die Banane · die Bananen", "банан"],
  ["die Butter", "сливочное масло"],
  ["das Mehl", "мука"],
  ["die Crêpe · die Crêpes", "тонкий блинчик"],
  ["die Schokolade", "шоколад"],
  ["brauchen", "нуждаться; ich brauche … — мне нужно…"],
  ["kaufen", "покупать"],
  ["der Hunger", "голод"],
  ["machen", "делать; о цене — «выходит, получается»"],
  ["helfen", "помогать"],
  ["das Fleisch", "мясо"],
  ["das Bier", "пиво"],
  ["der Käse", "сыр"],
  ["das Salz", "соль"],
  ["der Tee · die Tees", "чай"],
  ["das Brot · die Brote", "хлеб"],
  ["der Wein · die Weine", "вино"],
  ["das Mineralwasser", "минеральная вода"],
  ["der Reis", "рис"],
  ["der Fisch · die Fische", "рыба"],
  ["natürlich", "конечно"],
  ["hier", "здесь; «вот», когда что-то дают"],
  ["ein / eine", "один, одна; артикль для одного предмета"],
  ["kein / keine", "никакой; артикль со значением «нет»"],
  ["die Orange · die Orangen", "апельсин"],
  ["der Kuchen · die Kuchen", "пирог, торт"],
  ["der Kaffee · die Kaffees", "кофе"],
  ["der Saft · die Säfte", "сок"],
  ["das Würstchen · die Würstchen", "сосиска"],
  ["die Kartoffel · die Kartoffeln", "картофель"],
  ["das Joghurt · die Joghurts", "йогурт (швейцарский вариант артикля)"],
  ["die Zwiebel · die Zwiebeln", "лук, луковица"],
  ["das Regal · die Regale", "полка, стеллаж"],
  ["der Preis · die Preise", "цена"],
  ["der Rappen · die Rappen", "раппен, сотая часть швейцарского франка"],
  ["der Prospekt · die Prospekte", "буклет, рекламный проспект"],
  ["die Aktion · die Aktionen", "акция, спецпредложение"],
  ["das Lebensmittel · die Lebensmittel", "продукт питания"],
  ["das Hackfleisch", "мясной фарш"],
  ["wie viel", "сколько"],
  ["das Gramm", "грамм"],
  ["das Kilogramm", "килограмм"],
  ["das Pfund", "фунт; в таком магазине — 500 граммов"],
  ["der Liter · die Liter", "литр"],
  ["die Dose · die Dosen", "банка, консервная банка"],
  ["der Rahm", "сливки (в Швейцарии)"],
  ["der Verkäufer · die Verkäufer", "продавец"],
  ["die Verkäuferin · die Verkäuferinnen", "продавщица"],
  ["der Kunde · die Kunden", "покупатель, клиент"],
  ["die Kundin · die Kundinnen", "покупательница, клиентка"],
  ["noch", "ещё"],
  ["alles", "всё; Das ist alles. — «Это всё»"],
  ["finden", "находить"],
  ["gern", "с удовольствием; «охотно» в ответ на просьбу"],
  ["der Laden · die Läden", "магазин"],
  ["die Frucht · die Früchte", "фрукт, плод"],
  ["das Gemüse", "овощи"],
  ["die Bäckerei · die Bäckereien", "пекарня, булочная"],
  ["das Rezept · die Rezepte", "рецепт"],
  ["für", "для"],
  ["das Wasser", "вода"],
  ["der Pfeffer", "перец"],
  ["die Kiwi · die Kiwis", "киви"]
);

course[3].words.push(
  ["die Lampe · die Lampen", "лампа"],
  ["das Badezimmer · die Badezimmer", "ванная комната"],
  ["alt", "старый"],
  ["neu", "новый"],
  ["gross", "большой"],
  ["klein", "маленький"],
  ["hell", "светлый"],
  ["dunkel", "тёмный"],
  ["billig", "дешёвый"],
  ["schön", "красивый"],
  ["hässlich", "некрасивый"],
  ["kennen", "знать, быть знакомым с кем-то"],
  ["das Schlafzimmer · die Schlafzimmer", "спальня"],
  ["der Gang · die Gänge", "коридор"],
  ["die Toilette · die Toiletten", "туалет"],
  ["der Balkon · die Balkone", "балкон"],
  ["das Wohnzimmer · die Wohnzimmer", "гостиная"],
  ["der / das / die", "определённые артикли; запоминай их вместе со словом"],
  ["das Haus · die Häuser", "дом"],
  ["aber", "но"],
  ["der Monat · die Monate", "месяц"],
  ["schmal", "узкий"],
  ["breit", "широкий"],
  ["der Schrank · die Schränke", "шкаф"],
  ["das Bett · die Betten", "кровать"],
  ["der Fernseher · die Fernseher", "телевизор"],
  ["die Dusche · die Duschen", "душ"],
  ["der Herd · die Herde", "кухонная плита"],
  ["die Badewanne · die Badewannen", "ванна"],
  ["der Teppich · die Teppiche", "ковёр"],
  ["der Sessel · die Sessel", "кресло"],
  ["die Möbel", "мебель"],
  ["das Gerät · die Geräte", "прибор, устройство"],
  ["gefallen", "нравиться"],
  ["die Farbe · die Farben", "цвет"],
  ["finden", "находить; Ich finde es schön. — «По-моему, это красиво»"],
  ["schlecht", "плохой; плохо"],
  ["modern", "современный"],
  ["schwarz", "чёрный"],
  ["grau", "серый"],
  ["weiss", "белый"],
  ["grün", "зелёный"],
  ["braun", "коричневый"],
  ["blau", "синий, голубой"],
  ["rot", "красный"],
  ["gelb", "жёлтый"],
  ["hellrot", "светло-красный"],
  ["dunkelbraun", "тёмно-коричневый"],
  ["der Zentimeter · die Zentimeter", "сантиметр"],
  ["mal", "на, умножить на (в размерах)"],
  ["das Handy · die Handys", "мобильный телефон"],
  ["das Büro · die Büros", "офис"],
  ["das Inserat · die Inserate", "объявление"],
  ["nett", "милый, приятный"],
  ["das Ehepaar · die Ehepaare", "супружеская пара"],
  ["suchen", "искать"],
  ["der Garten · die Gärten", "сад"],
  ["vermieten", "сдавать в аренду"],
  ["das Appartement · die Appartements", "квартира, апартаменты"],
  ["der Raum · die Räume", "помещение, комната"],
  ["der Stock", "этаж"],
  ["circa", "около, примерно (сокращение ca.)"],
  ["privat", "частный; von privat — от частного лица"],
  ["ab", "с, начиная с"],
  ["sofort", "сразу, немедленно"],
  ["maximal", "максимум, не больше"],
  ["der Anruf · die Anrufe", "телефонный звонок"],
  ["möbliert", "с мебелью"],
  ["der TV · die TVs", "телевизор"],
  ["die Garage · die Garagen", "гараж"],
  ["der Quadratmeter · die Quadratmeter", "квадратный метр"],
  ["bezahlen", "платить, оплачивать"],
  ["verkaufen", "продавать"],
  ["etwas", "что-то, что-нибудь"],
  ["der Computer · die Computer", "компьютер"],
  ["der Schreibtisch · die Schreibtische", "письменный стол"],
  ["heute", "сегодня"],
  ["welche", "какая; какие"],
  ["also", "итак; ну, значит"],
  ["ungefähr", "приблизительно"],
  ["der Meter · die Meter", "метр"],
  ["lang", "длинный; длиной"],
  ["genau", "точно"],
  ["hoch", "высокий; высотой"],
  ["morgen", "завтра"],
  ["das Regal · die Regale", "полка, стеллаж"]
);

course[4].words.push(
  ["machen", "делать"],
  ["die Präsentation · die Präsentationen", "презентация"],
  ["frühstücken", "завтракать"],
  ["einkaufen", "ходить за покупками"],
  ["hören", "слушать, слышать"],
  ["kochen", "готовить, варить"],
  ["spazieren gehen", "ходить гулять"],
  ["gehen", "идти"],
  ["oder", "или"],
  ["müde", "уставший"],
  ["anrufen", "звонить по телефону"],
  ["früh", "рано"],
  ["der Supermarkt · die Supermärkte", "супермаркет"],
  ["mit", "с, вместе с"],
  ["die Arbeit · die Arbeiten", "работа"],
  ["lange", "долго"],
  ["spielen", "играть"],
  ["essen", "есть, кушать"],
  ["spät", "поздно"],
  ["schon", "уже"],
  ["erst", "только, лишь (о времени)"],
  ["das Viertel · die Viertel", "четверть; о времени — 15 минут"],
  ["vor", "до, перед; Viertel vor zwölf — 11:45"],
  ["nach", "после; Viertel nach eins — 1:15"],
  ["halb", "половина"],
  ["kurz", "короткий; kurz vor zwölf — незадолго до двенадцати"],
  ["gleich", "сейчас, вот-вот"],
  ["der Intensivkurs · die Intensivkurse", "интенсивный курс"],
  ["der Dienstag · die Dienstage", "вторник"],
  ["der Mittwoch · die Mittwoche", "среда"],
  ["der Donnerstag · die Donnerstage", "четверг"],
  ["der Freitag · die Freitage", "пятница"],
  ["wann", "когда"],
  ["um", "в (перед точным временем)"],
  ["enden", "заканчиваться"],
  ["von … bis …", "с … до …"],
  ["am", "в, по (с днём недели или частью дня)"],
  ["die Party · die Partys", "вечеринка"],
  ["die Zeit", "время"],
  ["der Fussball", "футбол; футбольный мяч"],
  ["der Samstag · die Samstage", "суббота"],
  ["der Sonntag · die Sonntage", "воскресенье"],
  ["das Wochenende · die Wochenenden", "выходные"],
  ["die Woche · die Wochen", "неделя"],
  ["die Hausaufgabe · die Hausaufgaben", "домашнее задание"],
  ["die Mama · die Mamas", "мама"],
  ["der Mittag", "полдень; am Mittag — в полдень"],
  ["der Nachmittag · die Nachmittage", "вторая половина дня"],
  ["der Vormittag · die Vormittage", "первая половина дня"],
  ["die Nacht · die Nächte", "ночь"],
  ["das Kino · die Kinos", "кинотеатр"],
  ["der Sport", "спорт"],
  ["trinken", "пить"],
  ["die Pizza · die Pizzen", "пицца"],
  ["chatten", "переписываться в чате"],
  ["glauben", "верить; ich glaube — я думаю"],
  ["der Termin · die Termine", "назначенная встреча, запись на приём"],
  ["das Geschäft · die Geschäfte", "магазин; дело"],
  ["die Bibliothek · die Bibliotheken", "библиотека"],
  ["geschlossen", "закрыто"],
  ["öffnen", "открывать"],
  ["schliessen", "закрывать"],
  ["die Praxis · die Praxen", "кабинет врача, врачебная практика"],
  ["der Tag · die Tage", "день"],
  ["jeder / jede / jedes", "каждый, каждая, каждое"],
  ["die Kita · die Kitas", "детский сад, учреждение дневного ухода за детьми"],
  ["bringen", "приносить, приводить, отвозить"],
  ["abholen", "забирать, забирать кого-то откуда-то"],
  ["mehr", "больше"],
  ["das Beispiel · die Beispiele", "пример"],
  ["zum Beispiel", "например (сокращение z. B.)"],
  ["wieder", "снова"],
  ["der Freund · die Freunde", "друг"],
  ["die Freundin · die Freundinnen", "подруга"],
  ["fragen", "спрашивать"],
  ["antworten", "отвечать"],
  ["total", "совсем, совершенно"]
);

course[5].words.push(
  ["der Ausflug · die Ausflüge", "поездка, вылазка, экскурсия"],
  ["das Auto · die Autos", "машина"],
  ["wandern", "ходить в пешие походы"],
  ["das Picknick · die Picknicks", "пикник"],
  ["die Gitarre · die Gitarren", "гитара"],
  ["telefonieren", "говорить по телефону"],
  ["scheinen", "светить (о солнце)"],
  ["regnen", "идти (о дожде)"],
  ["viel / viele", "много"],
  ["die Wolke · die Wolken", "облако"],
  ["losgehen", "отправляться, трогаться с места"],
  ["vergessen", "забывать"],
  ["der Durst", "жажда"],
  ["das Wienerli · die Wienerli", "венская сосиска (в Швейцарии)"],
  ["die Nachricht · die Nachrichten", "сообщение, новость"],
  ["das Grad", "градус; 25 Grad — 25 градусов"],
  ["warm", "тепло, тёплый"],
  ["kalt", "холодно, холодный"],
  ["schneien", "идти (о снеге)"],
  ["bewölkt", "облачно, пасмурно"],
  ["der Wetterbericht · die Wetterberichte", "прогноз погоды"],
  ["vor allem", "прежде всего, особенно"],
  ["Ost-", "восточно-, например Ostschweiz — Восточная Швейцария"],
  ["fallen", "падать; в прогнозе — выпадать"],
  ["bleiben", "оставаться"],
  ["der Osten", "восток"],
  ["stark", "сильный, сильно"],
  ["sonnig", "солнечно, солнечный"],
  ["die Temperatur · die Temperaturen", "температура"],
  ["steigen", "подниматься, расти"],
  ["sinken", "снижаться, падать"],
  ["plus", "плюс, выше нуля"],
  ["minus", "минус, ниже нуля"],
  ["der Schnee", "снег"],
  ["das Radio · die Radios", "радио"],
  ["das Internet", "интернет"],
  ["der Sommer · die Sommer", "лето"],
  ["heiss", "жаркий, горячий"],
  ["der Frühling · die Frühlinge", "весна"],
  ["der Herbst · die Herbste", "осень"],
  ["schlecht", "плохой, плохо"],
  ["der Winter · die Winter", "зима"],
  ["der Wind · die Winde", "ветер"],
  ["angenehm", "приятный, приятно"],
  ["sehen", "видеть"],
  ["die Speisekarte · die Speisekarten", "меню в кафе или ресторане"],
  ["der Hamburger · die Hamburger", "гамбургер"],
  ["die Speise · die Speisen", "блюдо"],
  ["die Bratwurst · die Bratwürste", "колбаска для жарки"],
  ["die Pommes frites", "картофель фри"],
  ["die Portion · die Portionen", "порция"],
  ["der Ketchup", "кетчуп"],
  ["das Sandwich · die Sandwiches", "сэндвич"],
  ["der Schinken · die Schinken", "ветчина"],
  ["der Salat · die Salate", "салат"],
  ["das Getränk · die Getränke", "напиток"],
  ["das Cola · die Colas", "кола (швейцарский вариант артикля)"],
  ["die Glace · die Glacen", "мороженое (в Швейцарии)"],
  ["lieber", "охотнее, предпочитаю"],
  ["warum", "почему"],
  ["der Hund · die Hunde", "собака"],
  ["tanzen", "танцевать"],
  ["schwimmen", "плавать"],
  ["das Fahrrad · die Fahrräder", "велосипед"],
  ["das Velo · die Velos", "велосипед (в Швейцарии)"],
  ["grillieren", "готовить на гриле (в Швейцарии)"],
  ["der Krimi · die Krimis", "детектив, детективный фильм"],
  ["Lieblings-", "любимый-, например Lieblingsfilm — любимый фильм"],
  ["der Film · die Filme", "фильм"],
  ["wichtig", "важный, важно"],
  ["sammeln", "собирать, коллекционировать"],
  ["der Beruf · die Berufe", "профессия"],
  ["das Foto · die Fotos", "фотография"],
  ["gefallen", "нравиться"],
  ["fotografieren", "фотографировать"],
  ["der Spass", "веселье, удовольствие"],
  ["das Smartphone · die Smartphones", "смартфон"],
  ["dumm", "глупый; Wie dumm! — «Вот досада!»"],
  ["oft", "часто"],
  ["meinen", "считать, иметь в виду"],
  ["der Würfel · die Würfel", "игральный кубик"],
  ["das Spiel · die Spiele", "игра"],
  ["leider", "к сожалению"],
  ["das Problem · die Probleme", "проблема"],
  ["immer", "всегда"],
  ["dabei", "при себе, с собой"],
  ["vielleicht", "может быть"],
  ["einfach", "простой; просто"],
  ["schnell", "быстрый; быстро"]
);

course[6].words.push(
  ["das Team · die Teams", "команда"],
  ["wecken", "будить; hat geweckt — разбудил"],
  ["das Frühstück · die Frühstücke", "завтрак"],
  ["fertig sein", "быть готовым"],
  ["Was ist los?", "Что случилось? Что происходит?"],
  ["die Mathematik", "математика"],
  ["auf keinen Fall", "ни в коем случае"],
  ["auf jeden Fall", "в любом случае, обязательно"],
  ["nach Hause", "домой"],
  ["der Arzt · die Ärzte", "врач"],
  ["die Ärztin · die Ärztinnen", "врач (женщина)"],
  ["der Ski · die Skis", "лыжа; Ski fahren — кататься на лыжах"],
  ["backen", "печь; hat gebacken — испёк"],
  ["singen", "петь; hat gesungen — спел"],
  ["reiten", "ездить верхом; ist geritten — ехал верхом"],
  ["das Klavier · die Klaviere", "пианино"],
  ["malen", "рисовать красками; hat gemalt — нарисовал"],
  ["Tennis spielen", "играть в теннис"],
  ["endlich", "наконец"],
  ["das Lied · die Lieder", "песня"],
  ["üben", "упражняться; hat geübt — потренировался"],
  ["der Text · die Texte", "текст"],
  ["die Übung · die Übungen", "упражнение"],
  ["der Brief · die Briefe", "письмо"],
  ["das Diktat · die Diktate", "диктант"],
  ["schreiben", "писать; hat geschrieben — написал"],
  ["das Buch · die Bücher", "книга"],
  ["schade", "жаль"],
  ["der Kilometer · die Kilometer", "километр"],
  ["die Kommunikation", "общение"],
  ["lieb", "дорогой, милый; Liebe Eltern — «Дорогие родители»"],
  ["die Klasse · die Klassen", "класс"],
  ["der Schüler · die Schüler", "ученик"],
  ["die Schülerin · die Schülerinnen", "ученица"],
  ["die Schulreise · die Schulreisen", "школьная поездка"],
  ["das Billett · die Billette", "билет (в Швейцарии)"],
  ["abfahren", "отправляться (о транспорте); ist abgefahren — отправился"],
  ["zurückkommen", "возвращаться; ist zurückgekommen — вернулся"],
  ["mitnehmen", "брать с собой; hat mitgenommen — взял с собой"],
  ["das Znüni", "утренний перекус (в Швейцарии)"],
  ["die Primarschule · die Primarschulen", "начальная школа (в Швейцарии)"],
  ["mitkommen", "пойти или поехать вместе; ist mitgekommen — пошёл вместе"],
  ["leidtun", "вызывать сожаление; Das tut mir leid. — «Мне жаль»"],
  ["Gitarre spielen", "играть на гитаре"],
  ["Velo fahren", "ездить на велосипеде"],
  ["Freunde treffen", "встречаться с друзьями"],
  ["Ski fahren", "кататься на лыжах"]
);

// A short reference based on the grammar overview on pages 204–207.
const grammarReview = [
  ["Поставь глагол на нужное место", "В утверждении и в вопросе с Wie, Wo или Was глагол занимает второе место. В вопросе на «да» или «нет» он переходит на первое. Am Freitag — один кусочек предложения, поэтому после него сразу идёт глагол.", "Am Freitag kaufe ich Brot. Was kaufst du? Kaufst du Brot?", [
    ["Что делаем?", "Первый кусочек", "Дальше"],
    ["Рассказываем", "Am Freitag", "kaufe ich Brot."],
    ["Спрашиваем «что?»", "Was", "kaufst du?"],
    ["Ждём «да» или «нет»", "Kaufst", "du Brot?"]
  ]],
  ["Не учи существительное в одиночку", "Запоминай три вещи вместе: артикль, слово и его множественное число. Для «мой» или «твой» смотри на то, чем владеют: mein Sohn, meine Tochter, meine Kinder. Чтобы не повторять предмет, можно сказать er вместо der Tisch, es вместо das Sofa, sie вместо die Lampe.", "Das ist meine Lampe. Sie ist neu.", [
    ["Один", "Несколько"],
    ["der Sohn", "die Söhne"], ["das Brot", "die Brote"], ["die Banane", "die Bananen"], ["das Zimmer", "die Zimmer"]
  ]],
  ["Вижу предмет, и артикль меняется", "В Akkusativ особенно следи за мужским родом: der → den, ein → einen, kein → keinen. После haben или nehmen сначала спроси себя: «Что у меня есть? Что я беру?»", "Der Tee ist heiss. Ich nehme den Tee.", [
    ["Род", "Когда предмет главный", "Когда беру или вижу"],
    ["мужской", "der / ein / kein", "den / einen / keinen"],
    ["средний", "das / ein / kein", "das / ein / kein"],
    ["женский", "die / eine / keine", "die / eine / keine"],
    ["множественное число", "die / — / keine", "die / — / keine"]
  ]],
  ["Как сказать «не» или возразить", "Kein заменяет ein и отрицает сам предмет: kein Brot, keine Möbel. Nicht отрицает, например, качество или место: nicht teuer, nicht hier. На вопрос с «не» отвечай doch, если на самом деле ответ положительный.", "Hast du keinen Hunger? Doch, ich habe Hunger."],
  ["Глаголы: найди форму для du", "Часто помогают окончания: ich -e, du -st, er -t, wir -en, ihr -t, sie -en. У arbeiten нужно дополнительное e: du arbeitest. С du и er некоторые глаголы меняют гласную: du sprichst, er schläft. А sein и haben полезно повторять маленькими тройками.", "Ich bin hier. Du bist dort. Er ist zu Hause.", [
    ["Кто?", "sein", "haben", "lesen", "nehmen"],
    ["ich", "bin", "habe", "lese", "nehme"], ["du", "bist", "hast", "liest", "nimmst"],
    ["er / sie / es", "ist", "hat", "liest", "nimmt"], ["wir", "sind", "haben", "lesen", "nehmen"],
    ["ihr", "seid", "habt", "lest", "nehmt"], ["sie / Sie", "sind", "haben", "lesen", "nehmen"]
  ]],
  ["Две части предложения держатся за края", "У отделяемого глагола в конце ждёт приставка. После kann, will или möchte там же может ждать второй глагол в начальной форме. В вопросе двигается первая часть, а вторая остаётся в конце.", "Rufst du heute an? Kannst du später anrufen? Ich möchte heute einkaufen."],
  ["Perfekt: расскажи, что уже было", "У большинства глаголов берём haben. Для перемещения с gehen, fahren и kommen в примерах курса берём sein. Вторая часть прошедшего времени стоит в конце. Чтобы запомнить её, учи сразу парой: hat gelesen или ist gegangen.", "Gestern habe ich gelesen. Heute bin ich nach Hause gegangen.", [
    ["Глагол", "Perfekt с er"],
    ["lernen", "hat gelernt"], ["machen", "hat gemacht"], ["treffen", "hat getroffen"], ["trinken", "hat getrunken"],
    ["sprechen", "hat gesprochen"], ["schreiben", "hat geschrieben"], ["gehen", "ist gegangen"], ["fahren", "ist gefahren"], ["kommen", "ist gekommen"]
  ]],
  ["Am, um, von … bis …", "С днём недели и частью дня обычно берём am. Для ночи запомни in der Nacht. Для точного времени берём um, а для промежутка — von … bis ….", "Am Dienstag beginnt der Kurs um neun Uhr. Er dauert von neun bis elf Uhr."]
];

const finalTest = [
  ["Wie ___ du? (Как тебя зовут?)", "heisst", "С du — heisst.", "gap"],
  ["Я из Австрии. (используй kommen)", "Ich komme aus Österreich", "Aus отвечает на вопрос «откуда».", "translate"],
  ["Выбери «мои дети».", "meine Kinder", "Множественное число требует meine.", "choice", ["mein Kinder", "meine Kinder", "deine Kinder"]],
  ["Собери фразу «Её зовут Миа».", "Sie heisst Mia", "Sie — она, heisst — форма для третьего лица.", "order", ["Mia", "Sie", "heisst"]],
  ["Исправь артикль: Das ist kein Birne.", "Das ist keine Birne", "Birne женского рода: keine Birne.", "fix"],
  ["Запиши, что услышишь.", "Ich möchte drei Tomaten", "Tomaten — множественное число от Tomate.", "listen"],
  ["Wo ist die Küche? — ___ ist hier.", "Sie", "Die Küche заменяем словом sie.", "gap"],
  ["Как сказать «Диван не дорогой»?", "Das Sofa ist nicht teuer.", "Nicht ставим перед teuer.", "choice", ["Das Sofa ist kein teuer.", "Das Sofa nicht ist teuer.", "Das Sofa ist nicht teuer."]],
  ["Собери фразу «В восемь часов я встаю». Начни с Um acht Uhr.", "Um acht Uhr stehe ich auf", "Глагол после времени, приставка в конце.", "order", ["ich", "auf", "Um acht Uhr", "stehe"]],
  ["Выбери часы работы для таблички «von neun bis siebzehn Uhr».", "09:00–17:00", "Von … bis обозначает промежуток: с девяти до семнадцати.", "choice", ["07:00–09:00", "09:00–17:00", "05:00–09:00"]],
  ["Ich nehme ___ Salat. (Вставь неопределённый артикль.)", "einen", "Salat мужского рода и стоит в Akkusativ.", "gap"],
  ["Hast du keine Zeit? — ___, ich habe Zeit.", "Doch", "Doch возражает на отрицание в вопросе.", "gap"],
  ["Я хочу учить немецкий. (используй wollen)", "Ich will Deutsch lernen", "Will спрягается, lernen остаётся в конце.", "translate"],
  ["Исправь вспомогательный глагол: Wir haben zu Fuss gekommen.", "Wir sind zu Fuss gekommen", "Kommen образует Perfekt с sein. С wir — sind.", "fix"]
];

course[2].theory.push([
  "Как заказать и уточнить количество",
  "Начни с Ich möchte …, bitte. Если продавец спрашивает Wie viele?, он хочет знать, сколько штук. Wie viel? подходит для цены или количества того, что измеряют, например молока.",
  "Ich möchte zwei Brötchen, bitte. Wie viel kostet das?"
]);
course[4].theory.push([
  "Читаем табло на вокзале",
  "Wann? спрашивает «когда?», а Von welchem Gleis? — «с какого пути?». Запомни ответ von Gleis zwei целиком. У abfahren приставка ab уходит в конец: Der Zug fährt um zehn Uhr ab.",
  "Wann fährt der Zug ab? Um zehn Uhr, von Gleis zwei."
]);
course[6].theory.push([
  "Как предупредить школу",
  "В начале звонка можно назвать своё имя: Hier ist … Затем скажи, кто заболел, и что сегодня он не придёт. Готовые кусочки можно менять: mein Sohn, meine Tochter, in die Schule, in den Deutschkurs.",
  "Guten Morgen. Hier ist Anna Keller. Meine Tochter ist krank. Sie kann heute nicht kommen."
]);

// Map each exercise to the explanation that helps with its likely mistake.
const practiceRules = [
  [1, 1, 0, 1, 2, 0, 3, 0],
  [0, 2, 1, 2, 2, 3, 3, 4],
  [0, 1, 3, 1, 2, 2, 2, 3],
  [0, 1, 2, 2, 1, 2, 3, 2],
  [2, 1, 0, 3, 0, 0, 1, 4],
  [0, 1, 3, 2, 3, 2, 0, 2],
  [0, 0, 1, 2, 0, 2, 1, 2]
];
const testRules = [4, 0, 1, 4, 3, 1, 1, 3, 5, 7, 2, 3, 5, 6];
const questionRules = new Map([
  ...course.flatMap((lesson, index) => lesson.practice.map((question, position) => [question, lesson.theory[practiceRules[index][position]]])),
  ...finalTest.map((question, index) => [question, grammarReview[testRules[index]]])
]);

const uznachScenes = [
  {
    id: "bakery", title: "В пекарне", goal: "Закажи булочки или кофе и узнай цену.",
    speaker: "Продавец",
    steps: {
      start: {
        line: "Grüezi! Was möchten Sie?",
        task: ["Выбери, что закажешь.", "Ich möchte Brötchen, bitte.", "Ich möchte — вежливая просьба. После möchte скажи, что хочешь, а в конце можно добавить bitte.", "choice", [
          "Ich möchten Kaffee, bitte.", "Ich möchte Brötchen, bitte.", "Ich möchte Kaffee, bitte."
        ]],
        branches: { "Ich möchte Brötchen, bitte.": "rolls", "Ich möchte Kaffee, bitte.": "coffee" },
        rule: course[2].theory[3]
      },
      rolls: {
        line: "Wie viele Brötchen möchten Sie?",
        task: ["Закажи две булочки. Вставь число словами: Ich möchte ___ Brötchen.", "zwei", "Wie viele? спрашивает о количестве штук. Zwei Brötchen — две булочки.", "gap"],
        next: "rollPrice", rule: course[2].theory[4]
      },
      coffee: {
        line: "Möchten Sie Milch zum Kaffee?",
        task: ["Собери фразу «Да, с молоком, пожалуйста».", "Ja mit Milch bitte", "Mit значит «с». В живой речи здесь достаточно короткого ответа: Ja, mit Milch, bitte.", "order", ["Milch", "bitte", "Ja", "mit"]],
        next: "coffeePrice", rule: course[2].theory[3]
      },
      rollPrice: {
        line: "Gern. Sonst noch etwas?",
        task: ["Спроси «Сколько это стоит?».", "Wie viel kostet das?", "Wie viel спрашивает о цене. После него идёт kostet, а затем das.", "choice", ["Wie viele kostet das?", "Wie viel kostet das?", "Wo kostet das?"]],
        next: "rollEnd", rule: course[2].theory[4]
      },
      coffeePrice: {
        line: "Der Kaffee kostet vier Franken.",
        task: ["Запиши цену словами: Der Kaffee kostet ___ Franken.", "vier", "Vier — четыре. После kostet можно назвать число и валюту.", "gap"],
        next: "coffeeEnd", rule: course[2].theory[2]
      },
      rollEnd: { line: "Zwei Franken, bitte. En Guete!", result: "Ты заказал две булочки и узнал цену. En Guete! — швейцарское пожелание приятного аппетита." },
      coffeeEnd: { line: "Bitte schön, Ihr Kaffee!", result: "Ты заказал кофе, ответил на вопрос о молоке и разобрал цену." }
    }
  },
  {
    id: "station", title: "На вокзале", goal: "Уточни время отправления или найди путь к поезду.",
    speaker: "Сотрудник вокзала",
    steps: {
      start: {
        line: "Guten Tag! Wie kann ich Ihnen helfen?",
        task: ["Выбери, что хочешь узнать о поезде до Рапперсвиля.", "Wann fährt der Zug nach Rapperswil ab?", "Wann спрашивает «когда?», а Von welchem Gleis? — «с какого пути?». В вопросе с abfahren приставка ab остаётся в конце.", "choice", [
          "Von welchem Gleis fährt der Zug nach Rapperswil?", "Wann der Zug nach Rapperswil abfährt?", "Wann fährt der Zug nach Rapperswil ab?"
        ]],
        branches: { "Wann fährt der Zug nach Rapperswil ab?": "time", "Von welchem Gleis fährt der Zug nach Rapperswil?": "platform" },
        rule: course[4].theory[5]
      },
      time: {
        line: "Der Zug fährt um halb zehn ab.",
        task: ["Какое время назвал сотрудник?", "09:30", "Halb zehn — половина десятого, то есть 09:30.", "choice", ["10:30", "09:30", "09:45"]],
        next: "askPlatform", rule: course[4].theory[2]
      },
      platform: {
        line: "Ihr Zug fährt von Gleis zwei.",
        task: ["Подтверди номер пути. Собери «С пути два?».", "Von Gleis zwei", "В ответах на вокзале пригодится готовый кусочек von Gleis … — с пути номер…", "order", ["zwei", "Von", "Gleis"]],
        next: "askTime", rule: course[4].theory[5]
      },
      askPlatform: {
        line: "Möchten Sie noch etwas wissen?",
        task: ["Вставь «путь»: Von welchem ___ fährt der Zug?", "Gleis", "Gleis — путь у платформы. Von welchem Gleis? — с какого пути?", "gap"],
        next: "platformEnd", rule: course[4].theory[5]
      },
      askTime: {
        line: "Möchten Sie noch etwas wissen?",
        task: ["Собери вопрос «Когда отправляется поезд?».", "Wann fährt der Zug ab", "Wann идёт первым, fährt — вторым, а приставка ab — в конце.", "order", ["der Zug", "ab", "Wann", "fährt"]],
        next: "timeEnd", rule: course[4].theory[0]
      },
      platformEnd: { line: "Von Gleis zwei. Gute Fahrt!", result: "Ты уточнил время отправления и номер пути." },
      timeEnd: { line: "Um halb zehn. Gute Fahrt!", result: "Ты нашёл нужный путь и уточнил время отправления." }
    }
  },
  {
    id: "school", title: "Звонок в школу", goal: "Сообщи, что ребёнок заболел и сегодня не придёт.",
    speaker: "Секретарь школы",
    steps: {
      start: {
        line: "Sekretariat, guten Morgen. Wie kann ich Ihnen helfen?",
        task: ["Выбери, что скажешь про ребёнка.", "Meine Tochter ist krank.", "Tochter — женский род, поэтому meine. Sohn — мужской, поэтому mein.", "choice", [
          "Meine Tochter ist krank.", "Meine Sohn ist krank.", "Mein Sohn ist krank."
        ]],
        branches: { "Meine Tochter ist krank.": "daughter", "Mein Sohn ist krank.": "son" },
        rule: course[1].theory[0]
      },
      daughter: {
        line: "Kann Ihre Tochter heute in die Schule kommen?",
        task: ["Собери «Она сегодня не может прийти».", "Sie kann heute nicht kommen", "Kann стоит после Sie, kommen уходит в конец. Nicht отрицает, что она может прийти сегодня.", "order", ["kommen", "heute", "Sie", "nicht", "kann"]],
        next: "surname", rule: course[6].theory[0]
      },
      son: {
        line: "Kann Ihr Sohn heute in die Schule kommen?",
        task: ["Вставь форму «мочь»: Er ___ heute nicht kommen.", "kann", "С er, как и с ich, используем kann. Второй глагол остаётся в начальной форме: kommen.", "gap"],
        next: "surname", rule: course[6].theory[0]
      },
      surname: {
        line: "Wie ist der Nachname, bitte?",
        task: ["Как ответить «Фамилия — Келлер»?", "Der Nachname ist Keller.", "Nachname — фамилия, Vorname — имя. Когда просят только фамилию, достаточно её назвать.", "choice", [
          "Der Vorname ist Keller.", "Der Nachname ist Keller.", "Woher kommen Sie?"
        ]],
        next: "end", rule: course[6].theory[4]
      },
      end: { line: "Danke für den Anruf. Gute Besserung!", result: "Ты предупредил школу. Gute Besserung! значит «Выздоравливай!»." }
    }
  }
];
