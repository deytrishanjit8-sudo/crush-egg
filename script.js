let taps = 1000;
let cracked = false;
let holdTimer = null;
let crackedBy = ""; // "tap" or "hold"

const egg = document.getElementById("egg");
const counter = document.getElementById("counter");
const message = document.getElementById("message");

/* Quotes */
const tapQuotes = [
  "Love notices effort.",
  "Every tap is a small hope.",
  "Someone is thinking of you.",
  "Love likes persistence.",
  "Small actions matter.",
  "Hope taps softly."
];

const holdQuotes = [
  "Waiting is love’s hardest test.",
  "Some feelings grow in silence.",
  "Patience reveals truth.",
  "Stillness has meaning.",
  "Destiny moves quietly."
];

/* Tap logic */
egg.addEventListener("click", () => {
  if (cracked) return;

  taps--;
  crackedBy = "tap";

  counter.innerText = "Taps left: " + taps;
  message.innerText =
    tapQuotes[Math.floor(Math.random() * tapQuotes.length)];

  egg.classList.add("shake");
  setTimeout(() => egg.classList.remove("shake"), 200);

  if (taps <= 0) {
    crackEgg();
  }
});

/* Hold logic */
egg.addEventListener("touchstart", () => {
  if (cracked) return;

  crackedBy = "hold";
  egg.classList.add("glow");

  message.innerText =
    holdQuotes[Math.floor(Math.random() * holdQuotes.length)];

  holdTimer = setTimeout(() => {
    crackEgg();
  }, 5000);
});

egg.addEventListener("touchend", stopHold);
egg.addEventListener("touchcancel", stopHold);

function stopHold() {
  egg.classList.remove("glow");
  clearTimeout(holdTimer);
}

/* Crack egg */
function crackEgg() {
  if (cracked) return;

  cracked = true;
  egg.classList.remove("glow");
  egg.classList.add("pop");
  egg.src = "egg_cracked.png";
  counter.innerText = "";

  if (crackedBy === "hold") {
    message.innerText =
      "✨ Patience wins. Your crush will text you back.";
  } else {
    message.innerText =
      "🔥 Effort pays off. Your crush will text you back.";
  }

  spawnHearts();
}

/* 💖 Heart VFX */
function spawnHearts() {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.innerText = "💖";
    heart.className = "heart";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 2 + Math.random() * 2 + "s";
    heart.style.fontSize = 20 + Math.random() * 20 + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 4000);
  }
}
