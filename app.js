const elements = Object.fromEntries(
  ["overview", "lesson-view", "lessons", "percent", "due-count", "hero", "sections", "content", "storage-message", "audio-status"]
    .map(id => [id, document.getElementById(id)])
);
const labels = { theory: "Теория", words: "Слова", practice: "Тренировка", grammar: "Грамматика", test: "Тест A1.1" };
const day = 86_400_000;
const minute = 60_000;
const ratings = { again: "Снова", hard: "Трудно", good: "Хорошо", easy: "Легко" };
const storageKey = "deutsch-a11.v2";
const cardKeys = new Map();
const mainDeck = buildMainDeck();
let saved = { theory: {}, cards: {}, practice: {}, bestTest: null, scenes: {} };
let view;
let study;
let reviewTimer;

try {
  const previous = localStorage.getItem(storageKey);
  if (previous) saved = { ...saved, ...JSON.parse(previous) };
  else {
    const oldProgress = JSON.parse(localStorage.getItem("deutsch-a11.v1") || "null");
    if (oldProgress?.cards) {
      for (const lesson of course) {
        for (const card of wordsFor(lesson)) {
          const oldCard = oldProgress.cards[card.legacyKey];
          if (oldCard) saved.cards[card.key] = oldCard;
        }
      }
    }
  }
  saved.cards = mergeCardSchedules(saved.cards);
} catch {
  elements["storage-message"].textContent = "Не удалось загрузить сохранённый прогресс.";
}

function persist() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(saved));
  } catch {
    elements["storage-message"].textContent = "Браузер не смог сохранить прогресс. Он доступен до закрытия страницы.";
  }
  renderNavigation();
}

const backupFormat = "deutsch-a11-progress";
const backupFile = document.getElementById("backup-file");
const backupStatus = document.getElementById("backup-status");
const backupConfirm = document.getElementById("backup-confirm");
let pendingBackup;

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function parseBackup(contents) {
  const backup = JSON.parse(contents);
  if (backup?.format !== backupFormat || backup.version !== 1 || backup.course !== storageKey) {
    throw new Error("Несовместимый файл");
  }
  const progress = backup.progress;
  if (!isRecord(progress?.theory) || !isRecord(progress.cards) || !isRecord(progress.practice)) {
    throw new Error("Повреждённый прогресс");
  }
  const lessons = new Map(course.map(lesson => [String(lesson.id), lesson]));
  const isScore = (value, max) => Number.isInteger(value) && value >= 0 && value <= max;
  if (
    Object.entries(progress.theory).some(([id, read]) => !lessons.has(id) || typeof read !== "boolean") ||
    Object.entries(progress.practice).some(([id, score]) => !isScore(score, lessons.get(id)?.practice.length)) ||
    (progress.bestTest !== null && !isScore(progress.bestTest, finalTest.length))
  ) throw new Error("Неверные результаты");
  const cards = {};
  for (const [key, card] of Object.entries(progress.cards)) {
    if (!cardKeys.has(key) || !isRecord(card) ||
      !Number.isSafeInteger(card.due) || card.due < 0 || typeof card.learned !== "boolean" ||
      !(Number.isSafeInteger(card.interval) && card.interval > 0 || isScore(card.level, 5))
    ) throw new Error("Неверное расписание");
    cards[key] = { due: card.due, learned: card.learned };
    if (Number.isSafeInteger(card.interval) && card.interval > 0) cards[key].interval = card.interval;
    else cards[key].level = card.level;
  }
  const scenes = progress.scenes ?? {};
  if (!isRecord(scenes) || Object.entries(scenes).some(([id, done]) =>
    !uznachScenes.some(scene => scene.id === id) || done !== true
  )) throw new Error("Неверный прогресс прогулки");
  return { theory: progress.theory, practice: progress.practice, cards: mergeCardSchedules(cards), bestTest: progress.bestTest, scenes };
}

document.getElementById("export-progress").addEventListener("click", () => {
  const exportedAt = new Date().toISOString();
  const copy = { format: backupFormat, version: 1, course: storageKey, exportedAt, progress: saved };
  const url = URL.createObjectURL(new Blob([JSON.stringify(copy, null, 2)], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `deutsch-a11-progress-${exportedAt.slice(0, 10)}.json`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

backupFile.addEventListener("change", async () => {
  pendingBackup = null;
  backupConfirm.hidden = true;
  backupStatus.textContent = "";
  const file = backupFile.files[0];
  if (!file) return;
  try {
    if (file.size > 2_000_000) throw new Error("Файл слишком большой");
    const progress = parseBackup(await file.text());
    if (backupFile.files[0] !== file) return;
    pendingBackup = progress;
    backupConfirm.hidden = false;
    backupStatus.textContent = `В копии есть данные по ${Object.keys(progress.cards).length} карточкам. Восстановление заменит прогресс в этом браузере.`;
  } catch {
    if (backupFile.files[0] !== file) return;
    backupStatus.textContent = "Не удалось прочитать копию. Выбери файл JSON, скачанный из этого курса.";
    backupFile.value = "";
  }
});

document.getElementById("restore-progress").addEventListener("click", () => {
  if (!pendingBackup) return;
  try {
    localStorage.setItem(storageKey, JSON.stringify(pendingBackup));
  } catch {
    backupStatus.textContent = "Браузер не смог сохранить копию. Текущий прогресс остался прежним.";
    return;
  }
  saved = pendingBackup;
  pendingBackup = null;
  backupFile.value = "";
  backupConfirm.hidden = true;
  elements["storage-message"].textContent = "";
  backupStatus.textContent = "Прогресс восстановлен.";
  renderNavigation();
});

function escapeHTML(value) {
  const span = document.createElement("span");
  span.textContent = value;
  return span.innerHTML;
}

function audioButton() {
  return '<button class="audio" type="button" data-action="speak">Слушать</button>';
}

function speak(button) {
  const status = document.getElementById("audio-status");
  const synthesis = window.speechSynthesis;
  if (!synthesis || !window.SpeechSynthesisUtterance) {
    status.textContent = "Озвучка недоступна в этом браузере.";
    return;
  }
  const text = button.previousElementSibling.textContent.replace(/\s*·\s*/g, ". ").replace(/\s*\(Plural\)/g, "");
  const speech = new SpeechSynthesisUtterance(text);
  const voices = synthesis.getVoices();
  const voice = voices.find(item => item.lang.toLowerCase() === "de-ch")
    || voices.find(item => /^de(?:-|$)/i.test(item.lang));
  if (voice) speech.voice = voice;
  speech.lang = voice?.lang || "de-DE";
  speech.onerror = event => {
    if (event.error !== "canceled" && event.error !== "interrupted") {
      status.textContent = "Не удалось воспроизвести запись. Проверь, доступен ли немецкий голос в настройках устройства.";
    }
  };
  status.textContent = "";
  synthesis.cancel();
  synthesis.speak(speech);
}

function wordsFor(lesson) {
  return lesson.words.map(([word, translation, legacyKey], index) => {
    const [front, plural] = word.split(" · ");
    return { key: `${lesson.id}:${index}`, word, front, plural, translation, legacyKey, lessonId: lesson.id };
  });
}

function buildMainDeck() {
  const separateMeanings = new Set(["3:20", "4:47"]); // machen (price), finden (opinion)
  const byWord = new Map();
  for (const card of course.flatMap(wordsFor)) {
    const identity = separateMeanings.has(card.key) ? card.key : card.word;
    if (!byWord.has(identity)) byWord.set(identity, card);
    cardKeys.set(card.key, byWord.get(identity).key);
  }
  return [...byWord.values()];
}

function mergeCardSchedules(cards) {
  const merged = {};
  const lastReview = card => card.due - (card.interval ?? ([0, 1, 3, 7, 14, 30][card.level] || 0) * day);
  for (const [source, card] of Object.entries(cards)) {
    const key = cardKeys.get(source);
    if (!key) continue;
    const previous = merged[key];
    const latest = !previous || lastReview(card) > lastReview(previous) ? card : previous;
    merged[key] = { ...latest, learned: Boolean(card.learned || previous?.learned) };
  }
  return merged;
}

function lessonProgress(lesson) {
  const learned = wordsFor(lesson).filter(card => saved.cards[cardKeys.get(card.key)]?.learned).length;
  const score = saved.practice[lesson.id] ?? 0;
  const total = 1 + lesson.words.length + lesson.practice.length;
  return { done: Number(Boolean(saved.theory[lesson.id])) + learned + score, total };
}

function renderNavigation() {
  const progress = course.map(lessonProgress);
  const count = progress.reduce((sum, item) => sum + item.done, 0);
  const max = progress.reduce((sum, item) => sum + item.total, 0);
  const due = mainDeck.filter(card => saved.cards[card.key]?.due <= Date.now()).length;
  elements.percent.textContent = new Intl.NumberFormat("ru", { style: "percent", maximumFractionDigits: 1 }).format(count / max);
  elements["due-count"].textContent = due ? `К повторению: ${due}` : "Колода всех лекций";
  if (!view.home) return;
  const completedScenes = uznachScenes.filter(scene => saved.scenes[scene.id]).length;
  document.getElementById("uznach-count").textContent =
    completedScenes ? `Сцены пройдены: ${completedScenes} из ${uznachScenes.length}` : "Три разговора на немецком";
  document.getElementById("final-summary").textContent =
    saved.bestTest === null ? "Тест, грамматика и повторение" : `Лучший результат теста: ${saved.bestTest} из ${finalTest.length}`;
  elements.lessons.innerHTML = course.map((lesson, index) => {
    const { done, total } = progress[index];
    return `<a class="lesson" href="#${lesson.id}">
      <span class="number">${String(lesson.id).padStart(2, "0")}</span>
      <span class="lesson-info"><strong>${lesson.title}</strong></span>
      <small class="lesson-percent">${Math.round(done / total * 100)}%</small>
      <span class="menu-arrow" aria-hidden="true"></span>
    </a>`;
  }).join("");
}

function readRoute() {
  clearTimeout(reviewTimer);
  const [id, section, topic] = location.hash.slice(1).split("/");
  const lesson = course.find(item => String(item.id) === id);
  const globalWords = id === "words" || (id === "final" && section === "words");
  const final = id === "final" && !globalWords;
  const finalHub = final && !["practice", "grammar", "test"].includes(section);
  const uznach = id === "uznach";
  const home = !final && !lesson && !uznach && !globalWords;
  const tabs = final ? ["practice", "grammar", "test"] : ["theory", "words", "practice"];
  view = {
    id: globalWords ? "words" : final ? "final" : lesson ? String(lesson.id) : "home",
    section: tabs.includes(section) ? section : tabs[0],
    lesson, final, home, globalWords, topic
  };
  elements.overview.hidden = !home;
  elements.hero.classList.toggle("home-hero", home);
  elements["lesson-view"].hidden = home;
  elements.sections.hidden = uznach || globalWords || finalHub;
  elements["audio-status"].textContent = "";
  study = null;
  renderNavigation();
  if (home) {
    elements.hero.innerHTML = `<h1>Deutsch <span>A1.1</span></h1><p>${course.length} лекций и итоговый тест</p>`;
    return;
  }
  if (globalWords) {
    elements.hero.innerHTML = '<a class="home-link" href="#home">Главная</a><h1 id="section-title">Учить слова</h1>';
    openWords();
    return;
  }
  if (finalHub) {
    const activities = [
      ["test", "Итоговый тест", `${finalTest.length} заданий · разбор в конце`],
      ["grammar", "Шпаргалка по грамматике", "Правила всех семи лекций"],
      ["practice", "Повторить упражнения", "По одной теме или все задания подряд"]
    ];
    elements.hero.innerHTML = '<a class="home-link" href="#home">Главная</a><h1 id="section-title">Итоги A1.1</h1>';
    elements.content.innerHTML = `<nav class="hub-list" aria-label="Итоги курса">${activities.map(([id, title, description], index) => `
      <a class="destination${index === 0 ? " destination-main" : ""}" href="#final/${id}">
        <span><strong>${title}</strong><small>${description}</small></span>
        <span class="menu-arrow" aria-hidden="true"></span>
      </a>`).join("")}</nav>`;
    return;
  }
  if (uznach) {
    const scene = uznachScenes.find(item => item.id === section);
    elements.hero.innerHTML = `<a class="home-link" href="${scene ? "#uznach" : "#home"}">${scene ? "День в Уцнахе" : "Главная"}</a><h1>${scene ? scene.title : "День в Уцнахе"}</h1>`;
    if (scene) {
      study = { scene, answers: [], order: [], index: 0, streak: 0, bestStreak: 0 };
      openSceneStep("start");
    } else {
      show("Маршрут", "", `
        <ol class="scene-list" role="list">${uznachScenes.map((scene, index) => `
          <li><a href="#uznach/${scene.id}">
            <span class="number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
            <div><strong>${scene.title}</strong><p>${scene.goal}</p>
            ${saved.scenes[scene.id] ? "<small>Пройдено</small>" : ""}</div>
            <span class="menu-arrow" aria-hidden="true"></span>
          </a></li>`).join("")}</ol>`);
    }
    return;
  }
  elements.hero.innerHTML = `
    <a class="home-link" href="${final ? "#final" : "#home"}">${final ? "Итоги A1.1" : "Главная"}</a>
    ${final ? "" : `<p class="page-context" lang="de">Lektion ${lesson.id}</p>`}
    <h1>${final ? { practice: "Повторить упражнения", grammar: "Шпаргалка по грамматике", test: "Итоговый тест" }[view.section] : lesson.title}</h1>`;
  elements.sections.innerHTML = tabs.map(tab => `
    <a href="#${view.id}/${tab}" ${view.section === tab ? 'aria-current="page"' : ""}>${labels[tab]}</a>`).join("");
  if (view.section === "theory") renderTheory();
  if (view.section === "grammar") {
    show("Шпаргалка по грамматике", "Повтори перед тестом · Учебник, стр. 204–207",
      theoryIndex(grammarReview, "#final/grammar") + theoryCards(grammarReview), true);
  }
  if (view.section === "words") openWords();
  if (view.section === "practice" || view.section === "test") openPractice();
}

function show(title, subtitle, body, quietHeading = false) {
  elements.content.innerHTML = `
    <header class="section-head${quietHeading && !subtitle ? " sr-only" : ""}">
      <h2 id="section-title"${quietHeading ? ' class="sr-only"' : ""}>${title}</h2>${subtitle ? `<p>${subtitle}</p>` : ""}
    </header>${body}`;
}

function sceneLine(scene, line) {
  return `<div class="scene-line"><small>${scene.speaker}</small>
    <div><strong lang="de-CH">${line}</strong>${audioButton()}</div></div>`;
}

function openSceneStep(id) {
  const scene = study.scene;
  const step = scene.steps[id];
  study.step = step;
  study.feedback = null;
  study.order = [];
  if (step.result) {
    saved.scenes[scene.id] = true;
    persist();
    show("Разговор завершён", step.result, `
      ${sceneLine(scene, step.line)}
      <div class="actions"><a class="button primary" href="#uznach">К маршруту</a>
        <button data-action="scene-restart">Сыграть ещё раз</button></div>`);
    focusContentControl("a");
    return;
  }
  study.questions = [step.task];
  renderQuestion();
}

function errorRule(question, rule = questionRules.get(question)) {
  const lesson = rule && course.find(item => item.theory.includes(rule));
  const reviewIndex = grammarReview.indexOf(rule);
  const ruleHref = lesson ? `#${lesson.id}/theory/${lesson.theory.indexOf(rule) + 1}`
    : reviewIndex >= 0 ? `#final/grammar/${reviewIndex + 1}` : "";
  return `<div class="error-rule">
    <strong>Правило</strong><p>${question[2]}</p>
    ${rule ? `<details><summary>${rule[0]}</summary>${theoryParagraphs(rule[1])}
      <div class="example"><span lang="de-CH">${rule[2]}</span>${audioButton()}</div>
      ${ruleHref ? `<a class="theory-link" href="${ruleHref}" target="_blank" rel="noopener">Открыть в теории (новая вкладка)</a>` : ""}</details>` : ""}
  </div>`;
}

function theoryIndex(items, href) {
  return `<details class="theory-index">
    <summary>Темы <small>${items.length}</small></summary>
    <nav aria-label="Темы">
      <ul>${items.map(([title], index) => `<li><a href="${href}/${index + 1}">${title}</a></li>`).join("")}</ul>
    </nav>
  </details>`;
}

function theoryParagraphs(description) {
  return description.split("\n\n").map(paragraph => `<p>${escapeHTML(paragraph)}</p>`).join("");
}

function theoryCards(items) {
  return `<div class="stack">${items.map(([title, description, example, table, note, extra], index) => `
      <article class="panel theory-topic" id="topic-${index + 1}" aria-labelledby="topic-title-${index + 1}">
      <h3 id="topic-title-${index + 1}" tabindex="-1">${title}</h3>${theoryParagraphs(description)}
      <div class="example"><span lang="de-CH">${example}</span>${audioButton()}
      ${extra?.translation ? `<p class="muted">${extra.translation}</p>` : ""}
      ${note ? `<p>${note}</p>` : ""}</div>
      ${table ? `<div class="grammar-wrap"><table class="grammar">
        <thead><tr>${table[0].map(cell => `<th scope="col">${cell}</th>`).join("")}</tr></thead>
        <tbody>${table.slice(1).map(([pronoun, ...forms]) => `
          <tr><th scope="row">${pronoun}</th>${forms.map(form => `<td>${form}</td>`).join("")}</tr>
        `).join("")}</tbody>
      </table></div>` : ""}
      ${extra?.check ? `<details class="theory-check"><summary>Проверь себя</summary>
        <p>${extra.check[0]}</p><details><summary>Показать ответ</summary><p>${extra.check[1]}</p></details>
      </details>` : ""}</article>`).join("")}</div>`;
}

function renderTheory() {
  const { lesson } = view;
  elements.content.innerHTML = `<h2 id="section-title" class="sr-only">Теория</h2>
    <p class="theory-reference"><span lang="de-CH">${lesson.german}</span> · Учебник, стр. ${lesson.pages}</p>
    ${theoryIndex(lesson.theory, `#${view.id}/theory`)}
    ${theoryCards(lesson.theory)}
    <div class="actions">
      <button class="primary" data-action="read">${saved.theory[lesson.id] ? "Прочитано ✓" : "Отметить прочитанным"}</button>
      <a class="button" href="#${view.id}/words">К словам</a>
    </div>`;
}

function shuffleCards(cards) {
  const shuffled = [...cards];
  for (let index = shuffled.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]];
  }
  return shuffled;
}

function openWords(freeReview = !view.globalWords) {
  clearTimeout(reviewTimer);
  const cards = view.globalWords ? mainDeck : wordsFor(view.lesson);
  const now = Date.now();
  const due = cards.filter(card => saved.cards[card.key]?.due <= now)
    .sort((first, second) => saved.cards[first.key].due - saved.cards[second.key].due);
  const fresh = cards.filter(card => !saved.cards[card.key]);
  study = {
    cards, queue: freeReview ? shuffleCards(cards) : [...due, ...fresh.slice(0, 12)],
    reviewed: 0, flipped: false, freeReview
  };
  renderWords();
}

function reviewDelays(card) {
  const previous = saved.cards[card.key];
  const days = (previous?.interval ?? ([0, 1, 3, 7, 14, 30][previous?.level] || 0) * day) / day;
  if (days < 1) return { again: minute, hard: 10 * minute, good: day, easy: 4 * day };
  return {
    again: minute,
    hard: Math.ceil(days * 1.2) * day,
    good: Math.max(Math.ceil(days * 1.2) + 1, Math.round(days * 2)) * day,
    easy: Math.max(Math.ceil(days * 1.2) + 2, Math.round(days * 3)) * day
  };
}

const relativeTime = new Intl.RelativeTimeFormat("ru", { style: "short" });

function formatReviewDelay(delay) {
  const [unit, size] = delay >= day ? ["day", day] : delay >= 60 * minute ? ["hour", 60 * minute] : ["minute", minute];
  return relativeTime.format(Math.max(1, Math.ceil(delay / size)), unit);
}

function renderWords() {
  clearTimeout(reviewTimer);
  const card = study.queue[0];
  const now = Date.now();
  const newCount = study.cards.filter(item => !saved.cards[item.key]).length;
  const nextDue = Math.min(...study.cards.map(item => saved.cards[item.key]?.due ?? Infinity));
  if (!card && !study.freeReview && Number.isFinite(nextDue)) {
    reviewTimer = setTimeout(() => openWords(), Math.min(Math.max(nextDue - now, 0), 2_147_483_647));
  }
  const delays = card && reviewDelays(card);
  const list = study.cards.map(item => `
    <dt><span lang="de-CH">${item.word}</span>${audioButton()}</dt><dd>${item.translation}</dd>`).join("");
  const viewed = study.cards.length - study.queue.length;
  const counter = study.freeReview ? `${viewed + 1} из ${study.cards.length}` : `В очереди ${study.queue.length}`;
  const example = card && cardExample(card.front, card.lessonId);
  const panel = card ? `
    <div class="panel card-study">
      <div class="spread card-toolbar"><small>${counter}</small>
        <div><span hidden id="card-audio-text" lang="de-CH">${card.front}</span>${audioButton()}</div></div>
      <button class="flashcard" type="button" data-action="reveal" aria-expanded="false" aria-controls="card-back">
        <span class="card-rotator">
          <span class="card-face card-front">
            <strong lang="de-CH">${card.front}</strong><small>Нажми, чтобы перевернуть</small>
          </span>
          <span class="card-face card-back" id="card-back" aria-hidden="true">
            <small lang="de-CH">${card.front}</small>
            <strong class="translation">${card.translation}</strong>
            <span class="card-example" lang="de-CH">${example}</span>
            ${card.plural ? `<small lang="de-CH">${card.plural}</small>` : ""}
          </span>
        </span>
      </button>
      <div class="actions card-actions" hidden>${study.freeReview
        ? '<button class="primary" data-action="next-card">Следующая карточка</button>'
        : `<div class="ratings" role="group" aria-label="Оценка карточки">${Object.entries(ratings).map(([rating, label]) => `
          <button data-action="rate-card" data-rating="${rating}">
            <strong>${label}</strong><small>${formatReviewDelay(delays[rating])}</small>
          </button>`).join("")}</div>`}</div>
    </div>` : `
    <div class="panel"><h3>${study.freeReview ? "Свободное повторение завершено" : newCount ? "Подход завершён" : "Сейчас очередь пуста"}</h3>
    ${study.reviewed ? `<p>Оценок за подход: ${study.reviewed}.</p>` : ""}
    ${!study.freeReview && newCount ? `<p>Новых карточек осталось: ${newCount}.</p>` : ""}
    ${view.globalWords && Number.isFinite(nextDue) ? `<p>По расписанию: ${nextDue <= now ? "есть карточки к повторению" : formatReviewDelay(nextDue - now)}.</p>` : ""}
    <div class="actions">
      ${!study.freeReview && newCount ? '<button class="primary" data-action="scheduled-words">Следующая порция</button>' : ""}
      ${view.globalWords
        ? `<button data-action="${study.freeReview ? "scheduled-words" : "all-words"}">${study.freeReview ? "К расписанию" : "Повторить все вне расписания"}</button>`
        : '<button class="primary" data-action="all-words">Перемешать и повторить</button><a class="button" href="#words">Учить по расписанию</a>'}
    </div></div>`;
  const description = view.globalWords
    ? `${study.freeReview ? "Свободное повторение" : "Интервальное повторение"} · ${study.cards.length} слов и выражений`
    : `${study.cards.length} карточек этой лекции в случайном порядке. Даты повторений не меняются.`;
  const dictionary = `<details class="panel"><summary>Список слов</summary><dl>${list}</dl></details>`;
  if (view.globalWords) elements.content.innerHTML = `<p class="words-intro muted">${description}</p>${panel}${dictionary}`;
  else show("Слова лекции", description, `${panel}${dictionary}`, true);
}

function showCardSide(button) {
  study.flipped = !study.flipped;
  button.classList.toggle("is-flipped", study.flipped);
  button.setAttribute("aria-expanded", String(study.flipped));
  button.querySelector(".card-front").setAttribute("aria-hidden", String(study.flipped));
  button.querySelector(".card-back").setAttribute("aria-hidden", String(!study.flipped));
  const card = study.queue[0];
  document.getElementById("card-audio-text").textContent = study.flipped ? cardExample(card.front, card.lessonId) : card.front;
}

async function flipCard(button) {
  if (button.hasAttribute("aria-busy")) return;
  const rotator = button.querySelector(".card-rotator");
  if (!rotator.animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    showCardSide(button);
    elements.content.querySelector(".card-actions").hidden = false;
    return;
  }

  button.setAttribute("aria-busy", "true");
  const direction = study.flipped ? -1 : 1;
  const turn = angle => ({ transform: `perspective(720px) rotateY(${angle}deg)` });
  let closing;
  let changedSide = false;
  try {
    closing = rotator.animate([turn(0), turn(89 * direction)], {
      duration: 410, easing: "cubic-bezier(.42, 0, .7, .85)", fill: "forwards"
    });
    await closing.finished;
    if (!button.isConnected) return;
    showCardSide(button);
    changedSide = true;
    const opening = rotator.animate([turn(-89 * direction), turn(0)], {
      duration: 450, easing: "cubic-bezier(.2, .1, .4, 1)"
    });
    closing.cancel();
    await opening.finished;
  } catch {
    if (button.isConnected && !changedSide) showCardSide(button);
  } finally {
    closing?.cancel();
    button.removeAttribute("aria-busy");
    if (button.isConnected) elements.content.querySelector(".card-actions").hidden = false;
  }
}

function gradeCard(rating) {
  const card = study.queue.shift();
  const interval = reviewDelays(card)[rating];
  saved.cards[card.key] = {
    interval, due: Date.now() + interval, learned: rating !== "again" || Boolean(saved.cards[card.key]?.learned)
  };
  study.reviewed++;
  const pending = new Set(study.queue.map(item => item.key));
  const ready = study.cards.filter(item => !pending.has(item.key) && saved.cards[item.key]?.due <= Date.now());
  study.queue.push(...ready);
  study.flipped = false;
  persist();
  renderWords();
}

function openPractice() {
  const test = view.section === "test";
  const questions = test ? finalTest : (view.final ? course : [view.lesson]).flatMap(lesson => lesson.practice);
  study = { test, questions, answers: [], index: 0, feedback: null, order: [], streak: 0, bestStreak: 0 };
  if (view.final && !test) {
    show("Тренировки всех лекций", "Выбери тему или реши все задания подряд.", `
      <div class="actions"><button class="primary" data-action="start">Все задания · ${questions.length}</button></div>
      <nav class="review-menu" aria-label="Тренировки по темам">${course.map(lesson => `
        <a class="lesson" href="#${lesson.id}/practice"><span class="number">${String(lesson.id).padStart(2, "0")}</span>
        <span class="lesson-info"><strong>${lesson.title}</strong></span><span class="menu-arrow" aria-hidden="true"></span></a>`).join("")}</nav>`, true);
  } else if (test) {
    const best = saved.bestTest === null ? "" : ` Лучший результат — ${saved.bestTest} из ${questions.length}.`;
    show("Тест A1.1", `${questions.length} заданий. Ответы и разбор появятся в конце.${best}`, `
      <div class="actions"><button class="primary" data-action="start">Начать тест</button></div>`, true);
  } else {
    renderQuestion();
  }
}

function renderQuestion() {
  const { test, questions, index, feedback } = study;
  const question = questions[index];
  const [prompt, answer, , type = "translate", options] = question;
  const scene = study.scene;
  const displayedAnswer = feedback?.answer && feedback.correct ? feedback.answer : answer;
  const ready = type === "order" && study.order.length === options.length;
  const submit = `<div class="actions"><button class="exercise-button" type="submit" ${ready ? "" : "disabled"}>${test ? "Далее" : "Проверить"}</button></div>`;
  let fields = `<label class="sr-only" for="answer">${type === "gap" ? "Пропущенное слово" : "Ответ по-немецки"}</label>
    <input id="answer" name="answer" lang="de-CH" required autocomplete="off" autocapitalize="off" spellcheck="false">`;
  if (type === "listen") {
    fields = `<div class="actions"><span hidden lang="de-CH">${answer}</span>${audioButton()}</div>
      <details class="dictation-help"><summary>Показать текст, если звук недоступен</summary>
        <p lang="de-CH">${answer}</p></details>${fields}`;
  }
  if (type === "choice") {
    fields = `<div class="choices">${options.map((option, position) => `
      <label class="choice"><input type="radio" name="answer" value="${position}" required>
        <span lang="de-CH">${option}</span></label>`).join("")}</div>`;
  }
  if (type === "order") {
    fields = `<p class="muted">Нажимай на слова по порядку. Повторное нажатие убирает слово из фразы.</p>
      <div class="word-tray" aria-label="Собранная фраза">${study.order.map(position => `
        <button type="button" lang="de-CH" data-action="remove-word" data-position="${position}">${options[position]}</button>
      `).join("") || '<span class="muted">Здесь появится фраза</span>'}</div>
      <div class="word-bank" aria-label="Доступные слова">${options.map((option, position) => `
        <button type="button" lang="de-CH" data-action="add-word" data-position="${position}"
          ${study.order.includes(position) ? "disabled" : ""}>${option}</button>`).join("")}</div>`;
  }
  show(scene?.title || (test ? "Тест A1.1" : study.review ? "Работа над ошибками" : "Тренировка"),
    "", `
    ${scene ? "" : `<div class="practice-progress">
      <span>${study.review ? "Работа над ошибками · " : ""}Задание ${index + 1} из ${questions.length}</span>
      ${!test && study.streak > 1 ? `<small aria-live="polite">Верных подряд: ${study.streak}</small>` : ""}
    </div>`}
    ${scene ? sceneLine(scene, study.step.line) : ""}
    <div class="panel exercise-panel">
      <h3>${prompt}</h3>
      ${feedback ? `
        <div class="feedback${feedback.correct ? " feedback-correct" : ""}" role="status">
          <strong class="${feedback.correct ? "good" : "wrong"}">${feedback.correct ? "Верно" : "Проверь этот вариант"}</strong>
          ${!feedback.correct ? `<p>Твой ответ: <span>${escapeHTML(feedback.value)}</span></p>` : ""}
          <p><span lang="de-CH">${displayedAnswer}</span>${audioButton()}</p>
          ${feedback.spelling ? '<p class="muted">Обрати внимание на написание в примере.</p>' : ""}
        </div>
        <div class="actions"><button class="${feedback.correct ? "success-button" : "exercise-button"}" data-action="next">${scene ? feedback.correct ? "Продолжить разговор" : "Попробовать ещё раз" : index + 1 === questions.length ? "Результат" : "Следующее задание"}</button></div>
        ${feedback.correct ? "" : errorRule(question, scene ? study.step.rule : undefined)}`
        : `<form id="answer-form">${fields}${submit}</form>`}
    </div>`, true);
}

function tidyAnswer(value) {
  return value.normalize("NFC").trim().replace(/[.!?]+$/u, "").replace(/\s+/g, " ").trim();
}

function normalize(value) {
  return tidyAnswer(value).toLowerCase()
    .replace(/ß/g, "ss").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue");
}

function checkAnswer(question, value, branches) {
  const [, expected, , type = "translate"] = question;
  if (branches) return { value, correct: Object.hasOwn(branches, value), answer: value };
  const variants = [expected, ...(acceptedTranslations.get(question) ?? [])];
  const matched = variants.find(variant => normalize(variant) === normalize(value));
  let spelling;
  if (matched && type !== "choice" && type !== "order") {
    const fragment = type === "gap" && !/^[A-ZÄÖÜ]/.test(matched);
    if (tidyAnswer(value) !== tidyAnswer(matched) && (!fragment || tidyAnswer(value) !== tidyAnswer(matched[0].toUpperCase() + matched.slice(1)))) {
      spelling = matched;
    }
  }
  return { value, correct: Boolean(matched), answer: matched, spelling };
}

function focusContentControl(selector) {
  const control = elements.content.querySelector(selector);
  if (!control) return;
  control.classList.add("auto-focus");
  control.addEventListener("blur", () => control.classList.remove("auto-focus"), { once: true });
  control.focus();
}

function advance() {
  study.index++;
  study.feedback = null;
  study.order = [];
  if (study.index < study.questions.length) {
    renderQuestion();
    focusContentControl("form input, form button");
    return;
  }
  const score = study.answers.filter(result => result.correct).length;
  if (study.test) saved.bestTest = Math.max(saved.bestTest ?? 0, score);
  else if (!study.review && view.final) {
    let offset = 0;
    for (const lesson of course) {
      const end = offset + lesson.practice.length;
      const correct = study.answers.slice(offset, end).filter(result => result.correct).length;
      saved.practice[lesson.id] = Math.max(saved.practice[lesson.id] ?? 0, correct);
      offset = end;
    }
  } else if (!study.review) {
    saved.practice[view.lesson.id] = Math.max(saved.practice[view.lesson.id] ?? 0, score);
  }
  persist();
  const mistakes = study.answers.map((result, index) => {
    if (result.correct) return "";
    const question = study.questions[index];
    const [prompt, answer] = question;
    return `<article class="panel"><h3>${prompt}</h3>
      <p>Твой ответ: <span lang="de-CH">${escapeHTML(result.value)}</span></p>
      <p>Вариант ответа: <strong lang="de-CH">${answer}</strong>${audioButton()}</p>${errorRule(question)}</article>`;
  }).join("");
  const streak = study.test ? "" : ` · Лучшая серия: ${study.bestStreak}`;
  const spelling = study.answers.filter(result => result.spelling);
  show("Результат", "", `
    <div class="result-summary">
      <p><strong>${score} <span>из ${study.questions.length}</span></strong></p>
      <p class="muted">Верные ответы${streak}</p>
      <div class="actions">
        ${mistakes && !study.test ? '<button class="primary" data-action="retry-mistakes">Повторить ошибки</button>' : ""}
        <button class="${mistakes && !study.test ? "" : "primary"}" data-action="retry">Пройти ещё раз</button>
      </div>
    </div>
    <div class="stack">${mistakes || '<p class="panel good">Все ответы верны.</p>'}</div>
    ${spelling.length ? `<details class="panel"><summary>Проверить написание (${spelling.length})</summary>
      <ul>${spelling.map(result => `<li><span lang="de-CH">${escapeHTML(result.value)}</span> → <strong lang="de-CH">${result.spelling}</strong></li>`).join("")}</ul></details>` : ""}
    `);
  focusContentControl("button");
}

elements.content.addEventListener("submit", event => {
  if (event.target.id !== "answer-form") return;
  event.preventDefault();
  const question = study.questions[study.index];
  const [, , , type, options] = question;
  const input = event.target.elements.namedItem("answer");
  let value;
  if (type === "order") {
    if (study.order.length !== options.length) return;
    value = study.order.map(position => options[position]).join(" ");
  } else if (type === "choice") {
    if (!input?.value) return;
    value = options[Number(input.value)];
  } else {
    value = input.value.trim();
  }
  if (!normalize(value)) {
    input.setCustomValidity("Введи ответ.");
    input.reportValidity();
    return;
  }
  const branches = study.scene && study.step.branches;
  const result = checkAnswer(question, value, branches);
  study.answers.push(result);
  if (study.test) advance();
  else {
    study.streak = result.correct ? study.streak + 1 : 0;
    study.bestStreak = Math.max(study.bestStreak, study.streak);
    study.feedback = result;
    renderQuestion();
    focusContentControl("[data-action='next']");
  }
});

elements.content.addEventListener("input", event => {
  const input = event.target;
  if (input.form?.id !== "answer-form" || input.name !== "answer") return;
  input.setCustomValidity("");
  input.form.querySelector('[type="submit"]').disabled =
    input.type === "radio" ? !input.checked : !normalize(input.value);
});

elements.content.addEventListener("click", event => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  switch (button.dataset.action) {
    case "add-word":
    case "remove-word": {
      const position = Number(button.dataset.position);
      if (button.dataset.action === "add-word") study.order.push(position);
      else study.order = study.order.filter(item => item !== position);
      renderQuestion();
      const action = button.dataset.action === "add-word" ? "remove-word" : "add-word";
      focusContentControl(`[data-action="${action}"][data-position="${position}"]`);
      break;
    }
    case "speak": speak(button); break;
    case "read":
      saved.theory[view.lesson.id] = true;
      persist();
      button.textContent = "Прочитано ✓";
      break;
    case "all-words": openWords(true); focusContentControl('[data-action="reveal"]'); break;
    case "scheduled-words": openWords(); focusContentControl("[data-action='reveal'], [data-action='all-words']"); break;
    case "reveal": void flipCard(button); break;
    case "rate-card": gradeCard(button.dataset.rating); focusContentControl("[data-action='reveal'], [data-action='scheduled-words'], [data-action='all-words']"); break;
    case "next-card":
      study.queue.shift();
      study.flipped = false;
      renderWords();
      focusContentControl("[data-action='reveal'], [data-action='scheduled-words'], [data-action='all-words']");
      break;
    case "start": renderQuestion(); focusContentControl("form input, form button"); break;
    case "next":
      if (study.scene) {
        if (study.feedback.correct) {
          openSceneStep(study.step.branches?.[study.feedback.value] ?? study.step.next);
        } else {
          study.feedback = null;
          study.order = [];
          renderQuestion();
        }
        focusContentControl("#answer-form input, #answer-form button");
      } else advance();
      break;
    case "scene-restart":
      study.answers = [];
      openSceneStep("start");
      focusContentControl("#answer-form input");
      break;
    case "retry": openPractice(); break;
    case "retry-mistakes": {
      const questions = study.questions.filter((_, index) => !study.answers[index].correct);
      study = { test: false, review: true, questions, answers: [], index: 0, feedback: null, order: [], streak: 0, bestStreak: 0 };
      renderQuestion();
      focusContentControl("form input, form button");
      break;
    }
  }
});

function focusTheoryTopic() {
  if (!["theory", "grammar"].includes(view.section) || !/^\d+$/.test(view.topic || "")) return false;
  const heading = document.getElementById(`topic-title-${view.topic}`);
  if (!heading) return false;
  heading.closest("article").scrollIntoView({ block: "start" });
  heading.focus({ preventScroll: true, focusVisible: false });
  return true;
}

function navigate() {
  readRoute();
  if (focusTheoryTopic()) return;
  window.scrollTo(0, 0);
  const heading = elements.hero.querySelector("h1");
  heading.tabIndex = -1;
  heading.focus({ preventScroll: true, focusVisible: false });
}
window.addEventListener("hashchange", () => {
  if (document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.startViewTransition(navigate);
  } else {
    navigate();
  }
});
readRoute();
focusTheoryTopic();
