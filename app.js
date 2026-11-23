const elements = Object.fromEntries(
  ["lessons", "progress", "percent", "completed", "hero", "sections", "content", "storage-message"]
    .map(id => [id, document.getElementById(id)])
);
const labels = { theory: "Теория", words: "Слова", practice: "Тренировка", test: "Тест A1.1" };
const day = 86_400_000;
const storageKey = "deutsch-a11.v1";
let saved = { theory: {}, cards: {}, practice: {}, bestTest: null };
let view;
let study;

try {
  const previous = localStorage.getItem(storageKey);
  if (previous) saved = { ...saved, ...JSON.parse(previous) };
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
  return lesson.words.map(([word, translation], index) => ({
    key: `${lesson.id}:${index}`, word, translation
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
  elements.lessons.innerHTML = course.map(lesson => `
    <a class="lesson" href="#${lesson.id}" ${view.id === String(lesson.id) ? 'aria-current="page"' : ""}>
      <span class="number">${String(lesson.id).padStart(2, "0")}</span>
      <span>${lesson.title}</span><small>${lessonProgress(lesson)}/3</small>
    </a>`).join("") + `
    <a class="lesson" href="#final" ${view.id === "final" ? 'aria-current="page"' : ""}>
      <span class="number" aria-hidden="true">✓</span><span>Итоги A1.1</span>
      ${saved.bestTest === null ? "" : `<small>${saved.bestTest}/${finalTest.length}</small>`}
    </a>`;
}

function readRoute() {
  const [id, section] = location.hash.slice(1).split("/");
  const lesson = course.find(item => String(item.id) === id) || course[0];
  const final = id === "final";
  const tabs = final ? ["words", "practice", "test"] : ["theory", "words", "practice"];
  view = {
    id: final ? "final" : String(lesson.id),
    section: tabs.includes(section) ? section : tabs[0],
    lesson, final
  };
  const heading = final ? "Итоги A1.1" : lesson.title;
  elements.hero.innerHTML = `
    <small>${final ? "Deutsch A1.1" : `Deutsch A1.1 / Лекция ${lesson.id} из ${course.length}`}</small>
    <h1>${heading}</h1>
    <p>${final ? "Повтори материал семи лекций и проверь себя на итоговом тесте." : lesson.summary}</p>`;
  elements.sections.innerHTML = tabs.map(tab => `
    <a href="#${view.id}/${tab}" ${view.section === tab ? 'aria-current="page"' : ""}>${labels[tab]}</a>`).join("");
  renderNavigation();
  study = null;
  if (view.section === "theory") renderTheory();
  if (view.section === "words") openWords();
  if (view.section === "practice" || view.section === "test") openPractice();
}

function show(title, subtitle, body) {
  elements.content.innerHTML = `
    <header class="section-head"><h2 id="section-title">${title}</h2><p>${subtitle}</p></header>${body}`;
}

function renderTheory() {
  const { lesson } = view;
  show("Теория", `<span lang="de-CH">${lesson.german}</span>`, `
    <div class="stack">${lesson.theory.map(([title, description, example]) => `
      <article class="panel"><h3>${title}</h3><p>${description}</p>
      <div class="example"><span lang="de-CH">${example}</span>${audioButton()}</div></article>`).join("")}</div>
    <div class="actions">
      <button class="primary" data-action="read">${saved.theory[lesson.id] ? "Прочитано ✓" : "Отметить прочитанным"}</button>
      <a class="button" href="#${view.id}/words">К словам</a>
    </div>`);
}

function openWords(all = false) {
  const cards = (view.final ? course : [view.lesson]).flatMap(wordsFor);
  const now = Date.now();
  const due = cards.filter(card => saved.cards[card.key]?.due <= now);
  const fresh = cards.filter(card => !saved.cards[card.key]);
  study = { cards, queue: all ? [...cards] : [...due, ...fresh], reviewed: 0, revealed: false };
  renderWords();
}

function renderWords() {
  const card = study.queue[0];
  const list = study.cards.map(item => `
    <dt><span lang="de-CH">${item.word}</span>${audioButton()}</dt><dd>${item.translation}</dd>`).join("");
  const panel = card ? `
    <div class="panel">
      <div class="spread"><strong>Карточка</strong><small>В очереди ${study.queue.length}</small></div>
      <div class="panel flashcard">
        <div><h3 lang="de-CH">${card.word}</h3>${audioButton()}</div>
        <p aria-live="polite">${study.revealed ? card.translation : "Вспомни перевод"}</p>
      </div>
      <div class="actions">${study.revealed ? `
        <button data-action="forgot">Забыл</button><button class="primary" data-action="remembered">Помню</button>`
        : '<button class="primary" data-action="reveal">Показать перевод</button>'}</div>
    </div>` : `
    <div class="panel"><h3>На сегодня всё</h3>
    <p>${study.reviewed ? `Карточек с ответом «Помню» за подход: ${study.reviewed}.` : "Новые и запланированные карточки появятся здесь."}</p>
    <div class="actions"><button data-action="all-words">Повторить все слова</button></div></div>`;
  show(view.final ? "Слова всех лекций" : "Слова", `Карточки · ${study.cards.length} слов и выражений`,
    `${panel}<details class="panel"><summary>Список слов</summary><dl>${list}</dl></details>`);
}

function gradeCard(remembered) {
  const card = study.queue.shift();
  const previous = saved.cards[card.key]?.level || 0;
  const level = remembered ? Math.min(previous + 1, 5) : 0;
  const delay = remembered ? [0, 1, 3, 7, 14, 30][level] * day : 0;
  saved.cards[card.key] = {
    level, due: Date.now() + delay, learned: remembered || Boolean(saved.cards[card.key]?.learned)
  };
  if (remembered) study.reviewed++;
  else study.queue.push(card);
  study.revealed = false;
  persist();
  renderWords();
}

function openPractice() {
  const test = view.section === "test";
  const questions = test ? finalTest : (view.final ? course : [view.lesson]).flatMap(lesson => lesson.practice);
  study = { test, questions, answers: [], index: 0, feedback: null };
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
  const [prompt, answer, explanation] = questions[index];
  show(test ? "Тест A1.1" : "Тренировка", `Задание ${index + 1} из ${questions.length}`, `
    <div class="panel">
      <h3>${prompt}</h3>
      ${feedback ? `
        <div class="feedback" role="status">
          <strong class="${feedback.correct ? "good" : "wrong"}">${feedback.correct ? "Верно" : "Проверь этот вариант"}</strong>
          <p><span lang="de-CH">${answer}</span>${audioButton()}</p><p>${explanation}</p>
        </div>
        <div class="actions"><button class="primary" data-action="next">${index + 1 === questions.length ? "Результат" : "Следующее задание"}</button></div>`
        : `<form id="answer-form">
          <label for="answer">Ответ по-немецки</label>
          <input id="answer" lang="de-CH" required autocomplete="off" autocapitalize="off" spellcheck="false">
          <div class="actions"><button class="primary" type="submit">${test ? "Далее" : "Проверить"}</button></div>
        </form>`}
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
  if (study.index < study.questions.length) {
    renderQuestion();
    document.getElementById("answer").focus();
    return;
  }
  const score = study.answers.filter(result => result.correct).length;
  if (study.test) saved.bestTest = Math.max(saved.bestTest ?? 0, score);
  else if (view.final) {
    let offset = 0;
    for (const lesson of course) {
      const end = offset + lesson.practice.length;
      const correct = study.answers.slice(offset, end).filter(result => result.correct).length;
      saved.practice[lesson.id] = Math.max(saved.practice[lesson.id] ?? 0, correct);
      offset = end;
    }
  } else {
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
  show("Результат", `Верных ответов: ${score} из ${study.questions.length}`, `
    <div class="stack">${mistakes || '<p class="panel good">Все ответы верны.</p>'}</div>
    <div class="actions"><button class="primary" data-action="retry">Пройти ещё раз</button></div>`);
  elements.content.querySelector("button").focus();
}

elements.content.addEventListener("submit", event => {
  if (event.target.id !== "answer-form") return;
  event.preventDefault();
  const input = document.getElementById("answer");
  const value = input.value.trim();
  if (!normalize(value)) {
    input.setCustomValidity("Введи ответ.");
    input.reportValidity();
    return;
  }
  const expected = study.questions[study.index][1];
  const result = { value, correct: normalize(value) === normalize(expected) };
  study.answers.push(result);
  if (study.test) advance();
  else {
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
    case "speak": speak(button); break;
    case "read":
      saved.theory[view.lesson.id] = true;
      persist();
      button.textContent = "Прочитано ✓";
      break;
    case "all-words": openWords(true); elements.content.querySelector("button").focus(); break;
    case "reveal": study.revealed = true; renderWords(); elements.content.querySelector("button").focus(); break;
    case "remembered": gradeCard(true); elements.content.querySelector("button").focus(); break;
    case "forgot": gradeCard(false); elements.content.querySelector("button").focus(); break;
    case "start": renderQuestion(); document.getElementById("answer").focus(); break;
    case "next": advance(); break;
    case "retry": openPractice(); break;
  }
});

window.addEventListener("hashchange", readRoute);
readRoute();
