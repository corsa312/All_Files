const cv = document.getElementById('game');
const cx = cv.getContext('2d');
const uiScore = document.getElementById('score');
const uiSpeed = document.getElementById('speed');
const uiBest = document.getElementById('best');
const tutorial = document.getElementById('tutorial');
const gameover = document.getElementById('gameover');
const btnStart = document.getElementById('btnStart');
const btnPause = document.getElementById('btnPause');

const W = cv.width, H = cv.height;

const state = {
    running: false,
    paused: false,
    t0: 0,
    score: 0,
    speed: 0,
    best: Number(localStorage.getItem('bestTopDownScore') || 0),
    roadSpeed: 240,
    maxSpeed: 780,
    accel: 22,
    lanes: 3,
    roadWidth: Math.floor(W * 0.68),
    margin: Math.floor((W - Math.floor(W * 0.68)) / 2),
    car: null,
    enemies: [],
    lines: [],
    input: { left: false, right: false },
};

uiBest.textContent = `⭐ ${state.best}`;

const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function laneX(laneIndex) {
    const laneW = state.roadWidth / state.lanes;
    return state.margin + laneW * laneIndex + laneW / 2;
}

function aabbHit(a, b) {
    return !(a.x + a.w / 2 < b.x - b.w / 2 || a.x - a.w / 2 > b.x + b.w / 2 || a.y + a.h / 2 < b.y - b.h / 2 || a.y - a.h / 2 > b.y + b.h / 2);
}

function createCar() {
    const w = 46, h = 84;
    return { x: laneX(1), y: H - h * 1.4, w, h, lane: 1, sx: 0 };
}

function createEnemy(yOff = -rand(200, 600)) {
    const lane = Math.floor(rand(0, state.lanes));
    const w = 44, h = 82;
    return { x: laneX(lane), y: yOff, w, h, lane, color: Math.random() > .5 ? '#ff5a60' : '#ffb84d' };
}

function createLines() {
    state.lines.length = 0;
    const gap = 38, h = 28;
    for (let y = -H; y < H; y += h + gap) { state.lines.push({ y }); }
}

function drawRoad() {
    cx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--road');
    cx.fillRect(state.margin, 0, state.roadWidth, H);
    cx.fillStyle = 'rgba(255,255,255,.12)';
    cx.fillRect(state.margin - 6, 0, 6, H);
    cx.fillRect(state.margin + state.roadWidth, 0, 6, H);
    cx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--lane');
    const laneW = state.roadWidth / state.lanes;
    for (let i = 1; i < state.lanes; i++) {
        const x = Math.floor(state.margin + laneW * i);
        cx.fillRect(x - 2, 0, 4, H);
    }
    cx.fillStyle = 'rgba(255,255,255,.85)';
    const stripeW = 6, stripeH = 22;
    const center = Math.floor(state.margin + state.roadWidth / 2 - stripeW / 2);
    for (const s of state.lines) { cx.fillRect(center, s.y, stripeW, stripeH); }
}

function drawCar(c, color) {
    cx.save();
    cx.translate(c.x, c.y);
    cx.fillStyle = color;
    roundRect(cx, -c.w / 2, -c.h / 2, c.w, c.h, 8, true, false);
    cx.fillStyle = 'rgba(255,255,255,.18)';
    roundRect(cx, -c.w * 0.36, -c.h * 0.18, c.w * 0.72, c.h * 0.22, 6, true, false);
    cx.fillStyle = 'rgba(0,0,0,.75)';
    cx.fillRect(-c.w / 2 - 6, -c.h * 0.36, 8, c.h * 0.24);
    cx.fillRect(c.w / 2 - 2, -c.h * 0.36, 8, c.h * 0.24);
    cx.fillRect(-c.w / 2 - 6, c.h * 0.12, 8, c.h * 0.24);
    cx.fillRect(c.w / 2 - 2, c.h * 0.12, 8, c.h * 0.24);
    cx.restore();
}

function roundRect(ctx, x, y, w, h, r, fill, stroke) {
    if (w < 2 * r) r = w / 2; if (h < 2 * r) r = h / 2; ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
    if (fill) ctx.fill(); if (stroke) ctx.stroke();
}

const keyMap = { ArrowLeft: 'left', ArrowRight: 'right', a: 'left', d: 'right', ' ': 'space' };

window.addEventListener('keydown', (e) => {
    const k = keyMap[e.key];
    if (!k) return;
    if (k === 'space') { start(); return; }
    if (['left', 'right'].includes(k)) { state.input[k] = true; e.preventDefault(); }
}, { passive: false });

window.addEventListener('keyup', (e) => {
    const k = keyMap[e.key];
    if (['left', 'right'].includes(k)) state.input[k] = false;
});

const leftPad = document.getElementById('left');
const rightPad = document.getElementById('right');
const setHold = (el, prop) => {
    const on = () => { state.input[prop] = true; };
    const off = () => { state.input[prop] = false; };
    el.addEventListener('pointerdown', on);
    el.addEventListener('pointerleave', off);
    el.addEventListener('pointerup', off);
    el.addEventListener('pointercancel', off);
};
setHold(leftPad, 'left');
setHold(rightPad, 'right');

btnStart.addEventListener('click', start);
btnPause.addEventListener('click', () => { state.paused = !state.paused });

function reset(){
    state.score = 0;
    state.roadSpeed = 240;
    state.enemies = [];
    state.car = createCar();
    createLines();
    for(let i=0;i<5;i++) state.enemies.push(createEnemy(-i*220 - 200));
  
    tutorial.hidden = true;   // sempre some
    gameover.hidden = true;   // sempre some
  }

function start(){
    reset();
    if(!state.running){
      state.running = true;
      state.paused = false;
      state.t0 = performance.now();
      requestAnimationFrame(loop);
    }
}

function gameOver(){
    state.running = false;
    tutorial.hidden = true;   // garante que o tutorial não aparece junto
    gameover.hidden = false;  // só mostra o game over
    state.best = Math.max(state.best, Math.floor(state.score));
    localStorage.setItem('bestTopDownScore', String(state.best));
    uiBest.textContent = `⭐ ${state.best}`;
  }

function spawnIfNeeded() {
    const last = state.enemies[state.enemies.length - 1];
    if (last && last.y > -120) {
        const gap = clamp(180 + (state.roadSpeed * 0.18), 180, 420);
        state.enemies.push(createEnemy(last.y - gap));
    }
    while (state.enemies.length && state.enemies[0].y - state.enemies[0].h / 2 > H + 40) {
        state.enemies.shift();
        state.score += 25;
    }
}

function update(dt) {
    if (state.paused) return;
    state.roadSpeed = clamp(state.roadSpeed + state.accel * dt, 0, state.maxSpeed);
    for (const s of state.lines) { s.y += state.roadSpeed * dt; if (s.y > H) s.y -= H + 60; }
    for (const e of state.enemies) { e.y += state.roadSpeed * dt * 0.98; }
    spawnIfNeeded();
    const laneW = state.roadWidth / state.lanes;
    const targetSx = (state.input.left ? -1 : 0) + (state.input.right ? 1 : 0);
    state.car.sx += (targetSx - state.car.sx) * 12 * dt;
    state.car.x += state.car.sx * 320 * dt;
    state.car.x = clamp(state.car.x, state.margin + laneW * 0.5, state.margin + state.roadWidth - laneW * 0.5);
    for (const e of state.enemies) { if (aabbHit(state.car, e)) { gameOver(); break; } }
    state.score += (state.roadSpeed * 0.016) * dt;
    state.speed = Math.round(state.roadSpeed * 3.6 / 100);
}

function render() {
    cx.clearRect(0, 0, W, H);
    drawRoad();
    for (const e of state.enemies) { drawCar(e, e.color); }
    drawCar(state.car, getComputedStyle(document.documentElement).getPropertyValue('--car'));
    uiScore.textContent = `🏁 ${Math.floor(state.score)}`;
    uiSpeed.textContent = `🚗 ${Math.max(0, state.speed)} km/h`;
    uiBest.textContent = `⭐ ${state.best}`;
}

function loop(t) {
    if (!state.running) return;
    const dt = Math.min(0.05, (t - state.t0) / 1000);
    state.t0 = t;
    update(dt);
    render();
    requestAnimationFrame(loop);
}
