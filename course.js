// Keep lesson IDs stable so saved progress follows the same lesson.
const course = [
  {
    id: 1, title: "Знакомство", german: "Grüezi!",
    summary: "Представься, скажи, откуда ты и где живёшь.",
    theory: [
      ["heissen и sein", "Чтобы назвать имя, скажи Ich heisse Ivan. Чтобы описать состояние, скажи Ich bin müde.", "Ich bin müde.", [
        ["Pronomen", "heissen", "sein"],
        ["ich", "heisse", "bin"],
        ["du", "heisst", "bist"],
        ["er / sie / es", "heisst", "ist"],
        ["wir", "heissen", "sind"],
        ["ihr", "heisst", "seid"],
        ["sie / Sie", "heissen", "sind"]
      ], "Универсальная фраза для понедельника."],
      ["Глагол обычно на втором месте", "Во фразе Ich wohne in Uznach первым идёт ich, вторым — wohne. Если начать с места, получится In Uznach wohne ich. У глагола своё кресло у окна.", "Ich wohne in Uznach."],
      ["Окончания для ich, du и Sie", "У wohnen формы ich wohne, du wohnst и Sie wohnen. Вежливое Sie пишется с большой буквы. У sein формы особые: ich bin, du bist, Sie sind.", "Wo wohnen Sie?"]
    ],
    words: [["Grüezi", "здравствуйте (швейцарское приветствие)"], ["Guten Morgen", "доброе утро"], ["heissen", "зваться"], ["wohnen", "жить, проживать"], ["kommen", "приходить, быть родом"], ["aus", "из"]],
    practice: [["Я живу в Уцнахе.", "Ich wohne in Uznach", "После ich у wohnen окончание -e."], ["Как тебя зовут?", "Wie heisst du", "В вопросе с wie глагол стоит сразу после вопросительного слова."], ["Откуда вы родом? (вежливо)", "Woher kommen Sie", "С вежливым Sie глагол принимает форму kommen."]]
  },
  {
    id: 2, title: "Числа и контакты", german: "Zahlen und Kontakte",
    summary: "Назови свой номер телефона и спроси собеседника о его контактах.",
    theory: [
      ["Единицы идут первыми", "21 — einundzwanzig, буквально «один и двадцать». Десятки терпеливо стоят в очереди. Обрати внимание: ein, без -s.", "Meine Hausnummer ist einundzwanzig."],
      ["Mein или meine", "Перед существительным среднего или мужского рода ставь mein, перед женским — meine. Поэтому meine Nummer, но mein Handy.", "Wie ist deine Telefonnummer?"]
    ],
    words: [["null", "ноль"], ["elf", "одиннадцать"], ["zwölf", "двенадцать"], ["zwanzig", "двадцать"], ["die Telefonnummer · die Telefonnummern", "номер телефона"], ["die Adresse · die Adressen", "адрес"]],
    practice: [["Напиши 21 словами.", "einundzwanzig", "Сначала единица, затем und и десяток."], ["Мой номер телефона — 12. (число словами)", "Meine Telefonnummer ist zwölf", "Telefonnummer женского рода, поэтому meine."], ["Какой у тебя номер телефона?", "Wie ist deine Telefonnummer", "Вопрос начинается с Wie ist, перед Telefonnummer ставим deine."]]
  },
  {
    id: 3, title: "Семья и люди", german: "Familie und Personen",
    summary: "Расскажи о семье и опиши, кто перед тобой.",
    theory: [
      ["Ein, eine, ein", "Для der Bruder — ein Bruder, для die Schwester — eine Schwester, для das Kind — ein Kind. У немецких артиклей семейный совет на троих.", "Das ist eine Schwester."],
      ["Haben и винительный падеж", "После haben неопределённый артикль мужского рода меняется: ein Bruder → einen Bruder. Eine Schwester и ein Kind сохраняют форму.", "Ich habe einen Bruder."]
    ],
    words: [["die Familie · die Familien", "семья"], ["der Bruder · die Brüder", "брат"], ["die Schwester · die Schwestern", "сестра"], ["das Kind · die Kinder", "ребёнок"], ["die Eltern (Plural)", "родители"], ["haben", "иметь"]],
    practice: [["У меня есть брат.", "Ich habe einen Bruder", "После habe мужское ein становится einen."], ["У меня есть сестра.", "Ich habe eine Schwester", "В винительном падеже женское eine сохраняет форму."], ["Это ребёнок.", "Das ist ein Kind", "Kind среднего рода: ein Kind."]]
  },
  {
    id: 4, title: "Еда и покупки", german: "Essen und Einkaufen",
    summary: "Закажи напиток, спроси цену и скажи, чего у тебя нет.",
    theory: [
      ["Ich möchte …", "Фраза Ich möchte … помогает вежливо заказать еду. После неё: einen Kaffee, eine Suppe, ein Brot. Даже у кофе есть падеж.", "Ich möchte einen Kaffee, bitte."],
      ["Kein отрицает существительное", "Если хлеба нет, скажи kein Brot. Для мужского рода после haben используй keinen, для женского — keine.", "Ich habe kein Brot."]
    ],
    words: [["der Kaffee · die Kaffees", "кофе"], ["die Suppe · die Suppen", "суп"], ["das Brot · die Brote", "хлеб"], ["das Wasser", "вода"], ["kosten", "стоить"], ["der Franken · die Franken", "франк"]],
    practice: [["Я хотел бы кофе.", "Ich möchte einen Kaffee", "Kaffee мужского рода: einen Kaffee."], ["У меня нет хлеба.", "Ich habe kein Brot", "У Brot средний род, поэтому kein."], ["Сколько стоит суп?", "Wie viel kostet die Suppe", "Wie viel — «сколько», Suppe — женского рода."]]
  },
  {
    id: 5, title: "День и время", german: "Tagesablauf und Uhrzeit",
    summary: "Скажи, во сколько встаёшь и когда начинается курс.",
    theory: [
      ["Время с um и am", "С часами употребляй um: um sieben Uhr. С днями недели — am: am Montag. Будильнику всё равно, артиклям — нет.", "Der Kurs beginnt um neun Uhr."],
      ["Отделяемые приставки", "В обычном предложении aufstehen распадается: глагол занимает второе место, auf уходит в конец. Если начинаешь с времени, подлежащее идёт после глагола.", "Um sieben Uhr stehe ich auf."]
    ],
    words: [["aufstehen", "вставать"], ["beginnen", "начинаться"], ["der Kurs · die Kurse", "курс"], ["die Uhr · die Uhren", "часы"], ["der Montag · die Montage", "понедельник"], ["arbeiten", "работать"]],
    practice: [["В семь часов я встаю. (начни со времени)", "Um sieben Uhr stehe ich auf", "Stehe занимает второе место, auf стоит в конце."], ["Курс начинается в девять часов.", "Der Kurs beginnt um neun Uhr", "Перед точным временем нужно um."], ["Я работаю в понедельник.", "Ich arbeite am Montag", "С днём недели употребляем am."]]
  },
  {
    id: 6, title: "Город и дорога", german: "Unterwegs in der Stadt",
    summary: "Спроси, где вокзал, и объясни, куда идти.",
    theory: [
      ["Где что находится", "Вопрос Wo ist …? подходит, если ищешь место. В ответе пригодятся links, rechts и geradeaus. Телефон можно пока оставить в кармане.", "Wo ist der Bahnhof?"],
      ["Куда идём: zum или zur", "В сочетании с zu артикли dem и der часто сливаются: zu dem Bahnhof → zum Bahnhof, zu der Post → zur Post.", "Ich gehe zur Post."]
    ],
    words: [["der Bahnhof · die Bahnhöfe", "вокзал"], ["die Post", "почта"], ["die Strasse · die Strassen", "улица"], ["links", "налево / слева"], ["rechts", "направо / справа"], ["geradeaus", "прямо"]],
    practice: [["Где вокзал?", "Wo ist der Bahnhof", "Для вопроса о месте используй wo."], ["Я иду на почту.", "Ich gehe zur Post", "Post женского рода: zu der → zur."], ["Я иду к вокзалу.", "Ich gehe zum Bahnhof", "Bahnhof мужского рода: zu dem → zum."]]
  },
  {
    id: 7, title: "Досуг и планы", german: "Freizeit und Pläne",
    summary: "Расскажи, чем любишь заниматься, и договорись о встрече.",
    theory: [
      ["Gern показывает, что тебе нравится", "Ich schwimme gern — «я люблю плавать». Gern ставим после глагола или чуть дальше по фразе. Для плавания абонемент нужен, для gern — нет.", "Ich spiele gern Fussball."],
      ["Модальный глагол и инфинитив", "С können спрягай только сам модальный глагол: ich kann, du kannst. Основной глагол отправляется в конец в начальной форме.", "Kannst du morgen kommen?"]
    ],
    words: [["gern", "охотно, с удовольствием"], ["schwimmen", "плавать"], ["spielen", "играть"], ["der Fussball", "футбол"], ["morgen", "завтра"], ["können", "мочь, уметь"]],
    practice: [["Я люблю плавать.", "Ich schwimme gern", "Добавь gern после schwimme."], ["Ты можешь прийти завтра?", "Kannst du morgen kommen", "В вопросе без вопросительного слова kannst идёт первым."], ["Я умею плавать.", "Ich kann schwimmen", "После kann основной глагол остаётся в инфинитиве."]]
  }
];

// Each group adds a choice, a gap, a word-order task and an error correction.
const mixedPractice = [
  [
    ["Как вежливо спросить, где человек живёт?", "Wo wohnen Sie?", "С вежливым Sie используется wohnen.", "choice", ["Wo wohnst Sie?", "Wo wohnen Sie?", "Wo wohne Sie?"]],
    ["Ich ___ Ivan. (Меня зовут Иван.)", "heisse", "Форма heissen для ich — heisse.", "gap"],
    ["Собери фразу «Я живу в Уцнахе».", "Ich wohne in Uznach", "В обычном предложении глагол стоит на втором месте.", "order", ["Uznach", "wohne", "Ich", "in"]],
    ["Исправь ошибку: Du bin müde.", "Du bist müde", "С du у глагола sein форма bist.", "fix"]
  ],
  [
    ["Как пишется 22?", "zweiundzwanzig", "Сначала zwei, затем und и zwanzig.", "choice", ["zwanzigundzwei", "zweizwanzig", "zweiundzwanzig"]],
    ["___ Adresse ist hier. (Мой адрес здесь.)", "Meine", "Adresse женского рода: meine Adresse.", "gap"],
    ["Собери вопрос «Какой у тебя номер телефона?»", "Wie ist deine Telefonnummer", "После Wie идёт глагол ist.", "order", ["deine", "Wie", "Telefonnummer", "ist"]],
    ["Исправь ошибку: Mein Nummer ist elf.", "Meine Nummer ist elf", "Nummer женского рода.", "fix"]
  ],
  [
    ["Как сказать «У меня есть ребёнок»?", "Ich habe ein Kind.", "У Kind средний род: ein Kind.", "choice", ["Ich habe ein Kind.", "Ich habe einen Kind.", "Ich habe eine Kind."]],
    ["Ich habe ___ Bruder. (Вставь неопределённый артикль.)", "einen", "После habe у мужского рода используется einen.", "gap"],
    ["Собери фразу «Это моя сестра».", "Das ist meine Schwester", "Schwester женского рода: meine.", "order", ["meine", "Schwester", "Das", "ist"]],
    ["Исправь ошибку: Das ist eine Kind.", "Das ist ein Kind", "Kind среднего рода, поэтому ein.", "fix"]
  ],
  [
    ["Как вежливо заказать кофе?", "Ich möchte einen Kaffee.", "После möchte употребляем einen Kaffee.", "choice", ["Ich möchte eine Kaffee.", "Ich möchte einen Kaffee.", "Ich möchte ein Kaffee."]],
    ["Ich habe ___ Brot. (У меня нет хлеба.)", "kein", "Brot среднего рода: kein Brot.", "gap"],
    ["Собери вопрос «Сколько стоит суп?»", "Wie viel kostet die Suppe", "Wie viel открывает вопрос, затем идёт kostet.", "order", ["die", "viel", "Suppe", "Wie", "kostet"]],
    ["Исправь ошибку: Ich möchte einen Suppe.", "Ich möchte eine Suppe", "Suppe женского рода, поэтому eine.", "fix"]
  ],
  [
    ["Как сказать «в семь часов»?", "um sieben Uhr", "С точным временем используется um.", "choice", ["am sieben Uhr", "in sieben Uhr", "um sieben Uhr"]],
    ["Ich arbeite ___ Montag. (Я работаю в понедельник.)", "am", "С днями недели употребляется am.", "gap"],
    ["Собери фразу «В семь часов я встаю». Начни со времени.", "Um sieben Uhr stehe ich auf", "После Um sieben Uhr идёт stehe, в конце — auf.", "order", ["auf", "sieben", "ich", "Um", "stehe", "Uhr"]],
    ["Исправь ошибку: Der Kurs beginnt am neun Uhr.", "Der Kurs beginnt um neun Uhr", "Время начала выражается через um.", "fix"]
  ],
  [
    ["Как сказать «на почту» после ich gehe?", "zur Post", "Для женского рода zu der сокращается до zur.", "choice", ["zum Post", "zur Post", "zu dem Post"]],
    ["Ich gehe ___ Bahnhof. (Я иду к вокзалу.)", "zum", "Zu dem сокращается до zum.", "gap"],
    ["Собери вопрос «Где вокзал?»", "Wo ist der Bahnhof", "После Wo идёт ist.", "order", ["Bahnhof", "der", "Wo", "ist"]],
    ["Исправь ошибку: Ich gehe zur Bahnhof.", "Ich gehe zum Bahnhof", "Bahnhof мужского рода: zum.", "fix"]
  ],
  [
    ["Как сказать «Я умею плавать»?", "Ich kann schwimmen.", "С ich используется kann, а schwimmen остаётся в инфинитиве.", "choice", ["Ich kannst schwimmen.", "Ich kann schwimme.", "Ich kann schwimmen."]],
    ["Ich schwimme ___. (Я люблю плавать.)", "gern", "Gern показывает, что действие тебе нравится.", "gap"],
    ["Собери вопрос «Ты можешь прийти завтра?»", "Kannst du morgen kommen", "Kannst стоит первым, kommen — в конце.", "order", ["morgen", "Kannst", "kommen", "du"]],
    ["Исправь ошибку: Ich kannst Fussball spielen.", "Ich kann Fussball spielen", "С ich используется kann.", "fix"]
  ]
];

course.forEach((lesson, index) => {
  lesson.practice = mixedPractice[index].flatMap((question, position) => (
    position < lesson.practice.length ? [question, lesson.practice[position]] : [question]
  ));
});

const finalTest = [
  ["Я из Германии. (используй kommen)", "Ich komme aus Deutschland", "Чтобы назвать страну, используй kommen aus. После ich получается komme."],
  ["Напиши 32 словами.", "zweiunddreissig", "Сначала zwei, затем und и dreissig."],
  ["Это моя сестра.", "Das ist meine Schwester", "Schwester женского рода: meine."],
  ["Я хотел бы суп.", "Ich möchte eine Suppe", "Suppe женского рода: eine."],
  ["В восемь часов я встаю. (начни со времени)", "Um acht Uhr stehe ich auf", "Stehe идёт после обстоятельства времени, auf — в конце."],
  ["Я иду к вокзалу в понедельник. (начни с ich)", "Ich gehe am Montag zum Bahnhof", "Обычный порядок: глагол, время, направление."],
  ["Вы можете прийти завтра? (вежливо)", "Können Sie morgen kommen", "С Sie используем können, инфинитив kommen ставим в конец."]
];
