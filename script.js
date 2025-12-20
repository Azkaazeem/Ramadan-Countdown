const canvas = document.getElementById('glitterCanvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
window.addEventListener('resize', resize);
resize();

const particles = [];
const MAX = 300;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function createParticle() {
  return {
    x: rand(0, canvas.width),
    y: rand(-canvas.height * 0.2, -5),
    vx: rand(-0.2, 0.2),
    vy: rand(0.6, 3.2),
    size: rand(0.8, 3.6),
    life: rand(180, 520),
    hue: rand(40, 55),
    opacity: rand(0.35, 0.95),
    twinkleTimer: 0
  };
}

for (let i = 0; i < 120; i++) particles.push(createParticle());

function drawParticle(p) {
  ctx.save();
  ctx.translate(p.x, p.y);

  const g = ctx.createRadialGradient(0, 0, p.size * 0.1, 0, 0, p.size * 3.5);
  g.addColorStop(0, `rgba(255, 245, 200, ${p.opacity})`);
  g.addColorStop(0.2, `rgba(255, 220, 100, ${p.opacity * 0.6})`);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(-p.size * 3.5, -p.size * 3.5, p.size * 7, p.size * 7);

  ctx.beginPath();
  ctx.fillStyle = `rgba(255, 230, 120, ${Math.min(1, p.opacity + 0.2)})`;
  ctx.arc(0, 0, p.size, 0, Math.PI * 2);
  ctx.fill();

  if (p.size > 2.4) {
    ctx.strokeStyle = `rgba(255, 235, 160, ${p.opacity * 0.9})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-p.size * 2, 0); ctx.lineTo(p.size * 2, 0);
    ctx.moveTo(0, -p.size * 2); ctx.lineTo(0, p.size * 2);
    ctx.stroke();
  }

  ctx.restore();
}

function updateParticle(p) {
  p.x += p.vx;
  p.y += p.vy;
  p.vx += Math.sin((p.y + p.x) * 0.001) * 0.02;

  p.twinkleTimer++;
  if (p.twinkleTimer > rand(30, 180)) {
    p.twinkleTimer = 0;
    p.opacity = Math.min(1, p.opacity + rand(0.1, 0.4));
  } else {
    p.opacity *= 0.9996;
  }

  p.life--;
  if (p.y > canvas.height + 30 || p.life <= 0) {
    const seed = createParticle();
    p.x = seed.x; p.y = seed.y;
    p.vx = seed.vx; p.vy = seed.vy;
    p.size = seed.size;
    p.opacity = seed.opacity;
    p.life = seed.life;
    p.twinkleTimer = 0;
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (particles.length < MAX && Math.random() < 0.7) {
    particles.push(createParticle());
  }

  ctx.save();
  ctx.globalAlpha = 0.03;
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x + (Math.sin(Date.now() * 0.0002 + x) * 6), -10);
    ctx.lineTo(x + (Math.sin(Date.now() * 0.0002 + x) * 6) + 2, canvas.height + 10);
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
  }
  ctx.restore();

  for (let i = 0; i < particles.length; i++) {
    drawParticle(particles[i]);
    updateParticle(particles[i]);
  }

  requestAnimationFrame(animate);
}

animate();

function countdownToRamzan() {
  // Step 1: Set the target Ramzan date
  let ramzanDate = new Date("February 20, 2026 00:00:00");

  setInterval(function () {

    let now = new Date().getTime();

    let diff = ramzanDate - now;

    let msInSecond = 1000;
    let msInMinute = msInSecond * 60;
    let msInHour = msInMinute * 60;
    let msInDay = msInHour * 24;
    let msInMonth = msInDay * 30.44;
    let msInYear = msInDay * 365.25;

    let years = Math.floor(diff / msInYear);
    let months = Math.floor((diff % msInYear) / msInMonth);
    let days = Math.floor((diff % msInMonth) / msInDay);
    let hours = Math.floor((diff % msInDay) / msInHour);
    let minutes = Math.floor((diff % msInHour) / msInMinute);
    let seconds = Math.floor((diff % msInMinute) / msInSecond);
    let milliseconds = diff % 1000;

    document.getElementById("countdown").innerHTML = `
      <div class="time-box"><div class="label">Years</div><div class="value">${years}</div></div>
      <div class="time-box"><div class="label">Months</div><div class="value">${months}</div></div>
      <div class="time-box"><div class="label">Days</div><div class="value">${days}</div></div>
      <div class="time-box"><div class="label">Hours</div><div class="value">${hours}</div></div>
      <div class="time-box"><div class="label">Minutes</div><div class="value">${minutes}</div></div>
      <div class="time-box"><div class="label">Seconds</div><div class="value">${seconds}</div></div>
    `;
  }, 1);
}

countdownToRamzan();


const audio = document.getElementById("bgAudio");

document.addEventListener("click", () => {
  audio.muted = false;
  audio.play();
});