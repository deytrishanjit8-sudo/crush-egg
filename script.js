// ---------- SPLASH SCREEN ----------
window.addEventListener("load", () => {
  setTimeout(() => {
    const splash = document.getElementById("splash");
    if (splash) splash.style.display = "none";
  }, 2000);
});

// ---------- GAME LOGIC ----------
let tapsLeft = 1000;
let cracked = false;
let holdTimer = null;
let holdUsed = false;

const egg = document.getElementById("egg");
const countEl = document.getElementById("count");
const quoteEl = document.getElementById("quote");

// Love quotes
const quotes = [
  "Destiny is warming up…",
  "Love is closer than you think 💫",
  "Patience cracks even the hardest shell",
  "Someone is thinking about you 👀",
  "Fate doesn’t rush, but it arrives",
  "Your story is still loading…",
  "Hearts don’t lie ❤️"
];

// ---------- TAP FUNCTION ----------
egg.addEventListener("click", () => {
  if (cracked) return;

  tapsLeft--;
  if (tapsLeft < 0) tapsLeft = 0;

  countEl.textContent = tapsLeft;

  // shake effect
  egg.classList.add("shake");
  setTimeout(() => egg.classList.remove("shake"), 150);

  // random quote
  quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];

  if (tapsLeft === 0) {
    crackEgg("tap");
  }
});

// ---------- HOLD TO CRACK ----------
egg.addEventListener("touchstart", () => {
  if (cracked) return;

  holdTimer = setTimeout(() => {
    holdUsed = true;
    crackEgg("hold");
  }, 5000);
});

egg.addEventListener("touchend", () => {
  clearTimeout(holdTimer);
});

egg.addEventListener("touchmove", () => {
  clearTimeout(holdTimer);
});

// ---------- CRACK FUNCTION ----------
function crackEgg(method) {
  if (cracked) return;
  cracked = true;

  egg.src = "egg_cracked.png";
  countEl.textContent = "0";

  // hearts VFX
  createHearts();

  if (method === "tap") {
    quoteEl.textContent = "Congrats 🎉 Your crush will text you back 💌";
  } else {
    quoteEl.textContent =
      "Fast track unlocked 😏 Your crush couldn’t resist texting you 💖";
  }
}

// ---------- HEART VFX ----------
function createHearts() {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 2 + Math.random() * 2 + "s";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 4000);
  }
}
