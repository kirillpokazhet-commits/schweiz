const elements = Object.fromEntries(
  ["overview", "lesson-view", "lessons", "progress", "percent", "completed", "hero", "sections", "content", "storage-message", "audio-status"]
    .map(id => [id, document.getElementById(id)])
);
const labels = { theory: "Теория", words: "Слова", practice: "Тренировка", grammar: "Грамматика", test: "Тест A1.1" };
const day = 86_400_000;
const minute = 60_000;
const ratings = { again: "Снова", hard: "Трудно", good: "Хорошо", easy: "Легко" };
const storageKey = "deutsch-a11.v2";
let saved = { theory: {}, cards: {}, practice: {}, bestTest: null };
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
  speech.rate = 0.85;
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
  return lesson.words.map(([word, translation, legacyKey], index) => ({
    key: `${lesson.id}:${index}`, word, translation, legacyKey
  }));
}

function lessonProgress(lesson) {
  return Number(Boolean(saved.theory[lesson.id]))
    + Number(wordsFor(lesson).every(card => saved.cards[card.key]?.learned))
    + Number(saved.practice[lesson.id] === lesson.practice.length);
}

function renderNavigation() {
  const count = course.reduce((sum, lesson) => sum + lessonProgress(lesson), 0);
  const max = course.length * 3;
  const words = course.flatMap(wordsFor);
  const due = words.filter(card => saved.cards[card.key]?.due <= Date.now()).length;
  elements.progress.max = max;
  elements.progress.value = count;
  elements.percent.textContent = `${Math.round(count / max * 100)}%`;
  elements.completed.textContent = `${count} из ${max} разделов · К повторению ${due}`;
  if (!view.home) return;
  elements.lessons.innerHTML = course.map(lesson => {
    const learned = wordsFor(lesson).filter(card => saved.cards[card.key]?.learned).length;
    const score = saved.practice[lesson.id];
    const max = 1 + lesson.words.length + lesson.practice.length;
    const value = Number(Boolean(saved.theory[lesson.id])) + learned + (score ?? 0);
    return `<a class="lesson" href="#${lesson.id}">
      <span class="number">${lesson.id}</span>
      <span class="lesson-info"><strong>${lesson.title}</strong>
        <span class="lesson-bar" aria-hidden="true"><span style="width:${value / max * 100}%"></span></span>
        <small>Слова ${learned}/${lesson.words.length} · тренировка ${score ?? "—"}/${lesson.practice.length}</small>
      </span>
    </a>`;
  }).join("") + `<a class="lesson lesson-final" href="#final">
      <span class="number" aria-hidden="true">✓</span>
      <span class="lesson-info"><strong>Итоги A1.1</strong>
        <small>${saved.bestTest === null ? "Слова, тренировки, грамматика и тест" : `Лучший результат теста ${saved.bestTest}/${finalTest.length}`}</small>
      </span>
    </a>`;
}

function readRoute() {
  clearTimeout(reviewTimer);
  const [id, section] = location.hash.slice(1).split("/");
  const lesson = course.find(item => String(item.id) === id);
  const final = id === "final";
  const home = !final && !lesson;
  const tabs = final ? ["words", "practice", "grammar", "test"] : ["theory", "words", "practice"];
  view = {
    id: final ? "final" : lesson ? String(lesson.id) : "home",
    section: tabs.includes(section) ? section : tabs[0],
    lesson, final, home
  };
  elements.overview.hidden = !home;
  elements["lesson-view"].hidden = home;
  elements["audio-status"].textContent = "";
  study = null;
  renderNavigation();
  if (home) {
    elements.hero.innerHTML = `<h1>Deutsch A1.1</h1><p>${course.length} лекций и итоговый тест</p>`;
    return;
  }
  elements.hero.innerHTML = `
    <a class="home-link" href="#home">Главная</a>
    <h1>${final ? "Итоги A1.1" : `<span lang="de">Lektion ${lesson.id}</span>`}</h1>
    <p>${final ? "Повторение курса и итоговый тест" : lesson.title}</p>`;
  elements.sections.innerHTML = tabs.map(tab => `
    <a href="#${view.id}/${tab}" ${view.section === tab ? 'aria-current="page"' : ""}>${labels[tab]}</a>`).join("");
  if (view.section === "theory") renderTheory();
  if (view.section === "grammar") {
    show("Шпаргалка по грамматике", "Повтори перед тестом · Учебник, стр. 204–207", theoryCards(grammarReview));
  }
  if (view.section === "words") openWords();
  if (view.section === "practice" || view.section === "test") openPractice();
}

function show(title, subtitle, body) {
  elements.content.innerHTML = `
    <header class="section-head"><h2 id="section-title">${title}</h2><p>${subtitle}</p></header>${body}`;
}

function theoryCards(items) {
  return `<div class="stack">${items.map(([title, description, example, table, note]) => `
      <article class="panel"><h3>${title}</h3><p>${description}</p>
      ${table ? `<div class="grammar-wrap"><table class="grammar">
        <thead><tr>${table[0].map(cell => `<th scope="col">${cell}</th>`).join("")}</tr></thead>
        <tbody>${table.slice(1).map(([pronoun, ...forms]) => `
          <tr><th scope="row">${pronoun}</th>${forms.map(form => `<td>${form}</td>`).join("")}</tr>
        `).join("")}</tbody>
      </table></div>` : ""}
      <div class="example"><span lang="de-CH">${example}</span>${audioButton()}${note ? `<p>${note}</p>` : ""}</div></article>`).join("")}</div>`;
}

function renderTheory() {
  const { lesson } = view;
  elements.content.innerHTML = `<h2 id="section-title" class="sr-only">Теория</h2>
    <p class="theory-reference"><span lang="de-CH">${lesson.german}</span> · Учебник, стр. ${lesson.pages}</p>
    ${theoryCards(lesson.theory)}
    <div class="actions">
      <button class="primary" data-action="read">${saved.theory[lesson.id] ? "Прочитано ✓" : "Отметить прочитанным"}</button>
      <a class="button" href="#${view.id}/words">К словам</a>
    </div>`;
}

function openWords(freeReview = false) {
  clearTimeout(reviewTimer);
  const cards = (view.final ? course : [view.lesson]).flatMap(wordsFor);
  const now = Date.now();
  const due = cards.filter(card => saved.cards[card.key]?.due <= now)
    .sort((first, second) => saved.cards[first.key].due - saved.cards[second.key].due);
  const fresh = cards.filter(card => !saved.cards[card.key]);
  study = {
    cards, queue: freeReview ? [...cards] : [...due, ...fresh.slice(0, 12)],
    reviewed: 0, revealed: false, freeReview
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
  const panel = card ? `
    <div class="panel">
      <div class="spread"><strong>Карточка</strong><small>В очереди ${study.queue.length}</small></div>
      <div class="panel flashcard">
        <div><h3 lang="de-CH">${card.word}</h3>${audioButton()}</div>
        <p aria-live="polite">${study.revealed ? card.translation : "Вспомни перевод"}</p>
      </div>
      <div class="actions">${study.revealed ? study.freeReview
        ? '<button class="primary" data-action="next-card">Следующая карточка</button>'
        : `<div class="ratings">${Object.entries(ratings).map(([rating, label]) => `
          <button ${rating === "good" ? 'class="primary"' : ""} data-action="rate-card" data-rating="${rating}">
            <strong>${label}</strong><small>${formatReviewDelay(delays[rating])}</small>
          </button>`).join("")}</div>`
        : '<button class="primary" data-action="reveal">Показать перевод</button>'}</div>
    </div>` : `
    <div class="panel"><h3>${study.freeReview ? "Свободное повторение завершено" : newCount ? "Подход завершён" : "Сейчас очередь пуста"}</h3>
    ${study.reviewed ? `<p>Оценок за подход: ${study.reviewed}.</p>` : ""}
    ${!study.freeReview && newCount ? `<p>Новых карточек осталось: ${newCount}.</p>` : ""}
    ${Number.isFinite(nextDue) ? `<p>По расписанию: ${nextDue <= now ? "есть карточки к повторению" : formatReviewDelay(nextDue - now)}.</p>` : ""}
    <div class="actions">
      ${!study.freeReview && newCount ? '<button class="primary" data-action="scheduled-words">Следующая порция</button>' : ""}
      <button data-action="${study.freeReview ? "scheduled-words" : "all-words"}">${study.freeReview ? "К расписанию" : "Повторить все вне расписания"}</button>
    </div></div>`;
  show(view.final ? "Слова всех лекций" : "Слова", `${study.freeReview ? "Свободное повторение" : "Интервальное повторение"} · ${study.cards.length} слов и выражений`,
    `${panel}<details class="panel"><summary>Список слов</summary><dl>${list}</dl></details>`);
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
  study.revealed = false;
  persist();
  renderWords();
}

function openPractice() {
  const test = view.section === "test";
  const questions = test ? finalTest : (view.final ? course : [view.lesson]).flatMap(lesson => lesson.practice);
  study = { test, questions, answers: [], index: 0, feedback: null, order: [], streak: 0, bestStreak: 0 };
  if (view.final && !test) {
    show("Тренировки всех лекций", "Выбери тему или реши все задания подряд.", `
      <div class="panel stack">${course.map(lesson => `
        <a class="button" href="#${lesson.id}/practice">${lesson.id}. ${lesson.title}</a>`).join("")}
        <button class="primary" data-action="start">Все задания · ${questions.length}</button></div>`);
  } else if (test) {
    const best = saved.bestTest === null ? "" : ` Лучший результат — ${saved.bestTest} из ${questions.length}.`;
    show("Тест A1.1", `${questions.length} заданий. Ответы и разбор появятся в конце.${best}`, `
      <div class="panel"><button class="primary" data-action="start">Начать тест</button></div>`);
  } else {
    renderQuestion();
  }
}

function renderQuestion() {
  const { test, questions, index, feedback } = study;
  const [prompt, answer, explanation, type = "translate", options] = questions[index];
  const formats = { translate: "Перевод", choice: "Выбор ответа", gap: "Пропуск", order: "Порядок слов", fix: "Исправление ошибки", listen: "Диктант" };
  const submit = `<div class="actions"><button class="primary" type="submit">${test ? "Далее" : "Проверить"}</button></div>`;
  let fields = `<label for="answer">${type === "gap" ? "Пропущенное слово" : "Ответ по-немецки"}</label>
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
  show(test ? "Тест A1.1" : study.review ? "Работа над ошибками" : "Тренировка",
    `Задание ${index + 1} из ${questions.length} · ${formats[type]}`, `
    ${test ? "" : `<div class="practice-progress">
      <progress value="${study.answers.length}" max="${questions.length}" aria-label="Задания с ответом"></progress>
      <small aria-live="polite">Верных подряд: ${study.streak}</small>
    </div>`}
    <div class="panel">
      <h3>${prompt}</h3>
      ${feedback ? `
        <div class="feedback" role="status">
          <strong class="${feedback.correct ? "good" : "wrong"}">${feedback.correct ? "Верно" : "Проверь этот вариант"}</strong>
          <p><span lang="de-CH">${answer}</span>${audioButton()}</p><p>${explanation}</p>
        </div>
        <div class="actions"><button class="primary" data-action="next">${index + 1 === questions.length ? "Результат" : "Следующее задание"}</button></div>`
        : `<form id="answer-form">${fields}${type === "order" && study.order.length !== options.length ? "" : submit}</form>`}
    </div>`);
}

function normalize(value) {
  return value.normalize("NFC").trim().toLowerCase()
    .replace(/ß/g, "ss").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")
    .replace(/[.!?]+$/u, "").replace(/\s+/g, " ").trim();
}

function advance() {
  study.index++;
  study.feedback = null;
  study.order = [];
  if (study.index < study.questions.length) {
    renderQuestion();
    elements.content.querySelector("form input, form button").focus();
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
    const [prompt, answer, explanation] = study.questions[index];
    return `<article class="panel"><h3>${prompt}</h3>
      <p>Твой ответ: <span lang="de-CH">${escapeHTML(result.value)}</span></p>
      <p>Вариант ответа: <strong lang="de-CH">${answer}</strong>${audioButton()}</p><p>${explanation}</p></article>`;
  }).join("");
  const streak = study.test ? "" : ` · Лучшая серия: ${study.bestStreak}`;
  show("Результат", `Верных ответов: ${score} из ${study.questions.length}${streak}`, `
    <div class="stack">${mistakes || '<p class="panel good">Все ответы верны.</p>'}</div>
    <div class="actions">
      ${mistakes && !study.test ? '<button class="primary" data-action="retry-mistakes">Повторить ошибки</button>' : ""}
      <button data-action="retry">Пройти ещё раз</button>
    </div>`);
  elements.content.querySelector("button").focus();
}

elements.content.addEventListener("submit", event => {
  if (event.target.id !== "answer-form") return;
  event.preventDefault();
  const [, expected, , type, options] = study.questions[study.index];
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
  const result = { value, correct: normalize(value) === normalize(expected) };
  study.answers.push(result);
  if (study.test) advance();
  else {
    study.streak = result.correct ? study.streak + 1 : 0;
    study.bestStreak = Math.max(study.bestStreak, study.streak);
    study.feedback = result;
    renderQuestion();
    elements.content.querySelector("button").focus();
  }
});

elements.content.addEventListener("input", event => {
  if (event.target.id === "answer") event.target.setCustomValidity("");
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
      elements.content.querySelector(`[data-action="${action}"][data-position="${position}"]`).focus();
      break;
    }
    case "speak": speak(button); break;
    case "read":
      saved.theory[view.lesson.id] = true;
      persist();
      button.textContent = "Прочитано ✓";
      break;
    case "all-words": openWords(true); elements.content.querySelector('[data-action="reveal"]').focus(); break;
    case "scheduled-words": openWords(); elements.content.querySelector("[data-action='reveal'], [data-action='all-words']").focus(); break;
    case "reveal":
      study.revealed = true;
      renderWords();
      elements.content.querySelector(".ratings .primary, [data-action='next-card']").focus();
      break;
    case "rate-card": gradeCard(button.dataset.rating); elements.content.querySelector("[data-action='reveal'], [data-action='scheduled-words'], [data-action='all-words']").focus(); break;
    case "next-card":
      study.queue.shift();
      study.revealed = false;
      renderWords();
      elements.content.querySelector("[data-action='reveal'], [data-action='scheduled-words']").focus();
      break;
    case "start": renderQuestion(); elements.content.querySelector("form input, form button").focus(); break;
    case "next": advance(); break;
    case "retry": openPractice(); break;
    case "retry-mistakes": {
      const questions = study.questions.filter((_, index) => !study.answers[index].correct);
      study = { test: false, review: true, questions, answers: [], index: 0, feedback: null, order: [], streak: 0, bestStreak: 0 };
      renderQuestion();
      elements.content.querySelector("form input, form button").focus();
      break;
    }
  }
});

window.addEventListener("hashchange", () => {
  readRoute();
  window.scrollTo(0, 0);
  const heading = elements.hero.querySelector("h1");
  heading.tabIndex = -1;
  heading.focus({ preventScroll: true });
});
readRoute();
