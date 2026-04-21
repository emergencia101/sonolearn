// ── State ──────────────────────────────────────────────────────
const state = {
  currentQuiz: null,
  currentQuestionIndex: 0,
  score: 0,
  clickX: null,      // fraction 0-1
  clickY: null,
  answered: false,
  correct: false,
};

// ── DOM refs ────────────────────────────────────────────────────
const homeScreen   = document.getElementById("home-screen");
const quizScreen   = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const headerTitle  = document.getElementById("header-title");
const btnBack      = document.getElementById("btn-back");

// quiz elements
const progressFill    = document.getElementById("progress-fill");
const questionCounter = document.getElementById("question-counter");
const usImage         = document.getElementById("us-image");
const overlayImg      = document.getElementById("overlay-img");
const labelCanvas     = document.getElementById("label-canvas");
const imageWrap       = document.getElementById("image-wrap");
const crosshair       = document.getElementById("crosshair");
const crosshairDot    = document.getElementById("crosshair-dot");
const targetHint      = document.getElementById("target-hint");
const questionText    = document.getElementById("question-text");
const answerPanel     = document.getElementById("answer-panel");
const answerStatus    = document.getElementById("answer-status");
const answerExp       = document.getElementById("answer-explanation");
const confirmBtn      = document.getElementById("confirm-btn");
const nextBtn         = document.getElementById("next-btn");

// result elements
const resultScore = document.getElementById("result-score");
const resultTitle = document.getElementById("result-title");
const resultSub   = document.getElementById("result-sub");

// ── Screens ─────────────────────────────────────────────────────
function showScreen(name) {
  homeScreen.style.display   = name === "home"   ? "" : "none";
  quizScreen.style.display   = name === "quiz"   ? "" : "none";
  resultScreen.style.display = name === "result" ? "" : "none";
  btnBack.style.display = name !== "home" ? "" : "none";
}

// ── Home ─────────────────────────────────────────────────────────
function renderHome() {
  headerTitle.textContent = "SonoLearn";
  showScreen("home");

  const list = document.getElementById("quiz-list");
  list.innerHTML = "";
  QUIZZES.forEach(quiz => {
    const card = document.createElement("div");
    card.className = "quiz-card";
    card.innerHTML = `
      <div class="quiz-card-icon">🫀</div>
      <div class="quiz-card-info">
        <h3>${quiz.title}</h3>
        <p>${quiz.questions.length} questões</p>
      </div>
    `;
    card.addEventListener("click", () => startQuiz(quiz));
    list.appendChild(card);
  });
}

// ── Start quiz ───────────────────────────────────────────────────
function startQuiz(quiz) {
  state.currentQuiz = quiz;
  state.currentQuestionIndex = 0;
  state.score = 0;
  headerTitle.textContent = quiz.title;
  showScreen("quiz");
  loadQuestion();
}

// ── Load question ─────────────────────────────────────────────────
function loadQuestion() {
  const quiz = state.currentQuiz;
  const q    = quiz.questions[state.currentQuestionIndex];
  const total = quiz.questions.length;

  state.clickX  = null;
  state.clickY  = null;
  state.answered = false;
  state.correct  = false;

  // progress
  progressFill.style.width = `${(state.currentQuestionIndex / total) * 100}%`;
  questionCounter.textContent = `QUESTÃO ${state.currentQuestionIndex + 1} DE ${total}`;

  // image
  usImage.src = q.image;
  usImage.onerror = () => { usImage.style.display = "none"; showPlaceholder(); };
  usImage.onload  = () => { usImage.style.display = ""; hidePlaceholder(); };

  overlayImg.src = q.overlay || "";
  overlayImg.classList.remove("visible");

  // clear canvas labels
  labelCanvas.style.opacity = "0";
  const ctx = labelCanvas.getContext("2d");
  ctx.clearRect(0, 0, labelCanvas.width, labelCanvas.height);

  // crosshair & hint
  crosshair.classList.remove("visible");
  targetHint.classList.remove("visible");

  // question
  questionText.textContent = q.question;

  // panel
  answerPanel.classList.remove("visible");
  confirmBtn.style.display = "";
  nextBtn.style.display    = "none";
  confirmBtn.disabled = true;
  confirmBtn.classList.remove("active");
}

function showPlaceholder() {
  let ph = document.getElementById("img-placeholder");
  if (!ph) {
    ph = document.createElement("div");
    ph.id = "img-placeholder";
    ph.className = "img-placeholder";
    ph.innerHTML = `<span>🖼️</span><p>Adicione sua imagem de ultrassom à pasta <strong>images/</strong></p>`;
    imageWrap.insertBefore(ph, usImage);
  }
  ph.style.display = "";
}
function hidePlaceholder() {
  const ph = document.getElementById("img-placeholder");
  if (ph) ph.style.display = "none";
}

// ── Click on image ────────────────────────────────────────────────
imageWrap.addEventListener("click", (e) => {
  if (state.answered) return;

  const rect = imageWrap.getBoundingClientRect();
  const px = e.clientX - rect.left;
  const py = e.clientY - rect.top;
  const fx = px / rect.width;
  const fy = py / rect.height;

  state.clickX = fx;
  state.clickY = fy;

  // position crosshair
  crosshair.style.left = `${fx * 100}%`;
  crosshair.style.top  = `${fy * 100}%`;
  crosshair.classList.add("visible");

  confirmBtn.disabled = false;
  confirmBtn.classList.add("active");
});

// touch support
imageWrap.addEventListener("touchend", (e) => {
  if (state.answered) return;
  e.preventDefault();
  const t = e.changedTouches[0];
  const rect = imageWrap.getBoundingClientRect();
  const fx = (t.clientX - rect.left) / rect.width;
  const fy = (t.clientY - rect.top)  / rect.height;

  state.clickX = fx;
  state.clickY = fy;

  crosshair.style.left = `${fx * 100}%`;
  crosshair.style.top  = `${fy * 100}%`;
  crosshair.classList.add("visible");

  confirmBtn.disabled = false;
  confirmBtn.classList.add("active");
}, { passive: false });

// ── Confirm answer ────────────────────────────────────────────────
confirmBtn.addEventListener("click", () => {
  if (state.answered || state.clickX === null) return;

  const q = state.currentQuiz.questions[state.currentQuestionIndex];
  const dx = state.clickX  - q.target.x;
  const dy = state.clickY  - q.target.y;
  // account for image aspect: compare dy as if image were square-ish
  const imgEl = usImage;
  const aspect = imgEl.naturalWidth && imgEl.naturalHeight
    ? imgEl.naturalWidth / imgEl.naturalHeight
    : 1.33;
  const dist = Math.sqrt(dx * dx + (dy * aspect) * (dy * aspect));

  state.answered = true;
  state.correct  = dist <= q.target.radius;
  if (state.correct) state.score++;

  // show overlay image (if provided)
  if (q.overlay) overlayImg.classList.add("visible");

  // always draw anatomy labels on canvas
  drawLabels(q);

  // show target hint if wrong
  if (!state.correct) {
    const rect = imageWrap.getBoundingClientRect();
    const hintPx = q.target.radius * 2 * rect.width;
    targetHint.style.left   = `${q.target.x * 100}%`;
    targetHint.style.top    = `${q.target.y * 100}%`;
    targetHint.style.width  = `${hintPx}px`;
    targetHint.style.height = `${hintPx}px`;
    targetHint.classList.add("visible");
  }

  // answer panel
  answerStatus.textContent = state.correct ? "Resposta correta!" : "Incorreto — veja a localização correta acima.";
  answerStatus.className   = "answer-status " + (state.correct ? "correct" : "wrong");
  answerExp.textContent    = q.explanation || "";
  answerPanel.classList.add("visible");

  confirmBtn.style.display = "none";
  nextBtn.style.display    = "";
  progressFill.style.width = `${((state.currentQuestionIndex + 1) / state.currentQuiz.questions.length) * 100}%`;
});

// ── Next question ─────────────────────────────────────────────────
nextBtn.addEventListener("click", () => {
  state.currentQuestionIndex++;
  if (state.currentQuestionIndex >= state.currentQuiz.questions.length) {
    showResults();
  } else {
    loadQuestion();
  }
});

// ── Anatomy labels per image ──────────────────────────────────
// Each key matches an image path. Add more images here as needed.
const ANATOMY_LABELS = {
  "images/echo_ps4c.png": [
    { x: 0.63, y: 0.32, text: "LV",   color: "#ffffff", highlight: false },
    { x: 0.35, y: 0.32, text: "RV",   color: "#ffffff", highlight: false },
    { x: 0.50, y: 0.26, text: "IS",   color: "#ffffff", highlight: false },
    { x: 0.64, y: 0.67, text: "LA",   color: "#ffffff", highlight: false },
    { x: 0.33, y: 0.67, text: "RA",   color: "#ffffff", highlight: false },
    { x: 0.59, y: 0.51, text: "MV",   color: "#f97316", highlight: false },
    { x: 0.40, y: 0.51, text: "TV",   color: "#f97316", highlight: false },
    { x: 0.19, y: 0.37, text: "RVFW", color: "#4fc3f7", highlight: false },
    { x: 0.76, y: 0.40, text: "LW",   color: "#4fc3f7", highlight: false },
  ],
};

function drawLabels(q) {
  const labels = ANATOMY_LABELS[q.image];
  if (!labels) return;

  // sync canvas size to rendered image
  const rect = usImage.getBoundingClientRect();
  const dpr  = window.devicePixelRatio || 1;
  labelCanvas.width  = rect.width  * dpr;
  labelCanvas.height = rect.height * dpr;

  const ctx = labelCanvas.getContext("2d");
  ctx.scale(dpr, dpr);

  const W = rect.width;
  const H = rect.height;

  labels.forEach(lb => {
    const px = lb.x * W;
    const py = lb.y * H;
    const fs = Math.max(11, W * 0.038);

    // pill background
    ctx.font = `bold ${fs}px -apple-system, sans-serif`;
    const tw = ctx.measureText(lb.text).width;
    const pad = fs * 0.4;
    const bw = tw + pad * 2;
    const bh = fs + pad * 1.2;

    ctx.fillStyle = "rgba(0,0,0,0.55)";
    roundRect(ctx, px - bw / 2, py - bh / 2, bw, bh, 4);
    ctx.fill();

    // text
    ctx.fillStyle = lb.color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(lb.text, px, py);

    // highlight the target structure with a glow ring
    if (lb.text === q.question.match(/\((\w+)\)/)?.[1]) {
      ctx.beginPath();
      ctx.arc(px, py, fs * 1.5, 0, Math.PI * 2);
      ctx.strokeStyle = "#facc15";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  });

  labelCanvas.style.opacity = "1";
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ── Results ───────────────────────────────────────────────────────
function showResults() {
  const total = state.currentQuiz.questions.length;
  const pct   = Math.round((state.score / total) * 100);
  resultScore.textContent = `${pct}%`;
  resultTitle.textContent = pct === 100 ? "Pontuação perfeita!" : pct >= 70 ? "Bom trabalho!" : "Continue praticando!";
  resultSub.textContent   = `Você acertou ${state.score} de ${total} questões.`;
  showScreen("result");
  progressFill.style.width = "100%";
  headerTitle.textContent  = state.currentQuiz.title;
}

document.getElementById("btn-retry").addEventListener("click", () => {
  startQuiz(state.currentQuiz);
});
document.getElementById("btn-home").addEventListener("click", () => {
  renderHome();
});

// ── Back button ───────────────────────────────────────────────────
btnBack.addEventListener("click", () => {
  renderHome();
});

// ── Init ──────────────────────────────────────────────────────────
renderHome();
