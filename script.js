let taps = 1000;
let cracked = false;
let holdTimer = null;
let crackedByHold = false;

const egg = document.getElementById("egg");
const counter = document.getElementById("counter");
const message = document.getElementById("message");

const tapMessages = [
  "Patience cracks even the hardest shell.",
  "Love rewards the ones who keep tapping.",
  "Old-school effort always pays.",
  "One tap closer to destiny."
];

const holdMessages = [
  "Some hearts open instantly.",
  "True love needs no effort.",
  "Destiny pressed back.",
  "No struggle, only fate."
];

// Update counter text
counter.innerText = taps + " taps left";

// Random quote on tap
function randomTapQuote() {
  message.innerText = tapMessages[Math.floor(Math.random() * tapMessages.length)];
}

// Crack egg
function crackEgg() {
  if (cracked) return;
  cracked = true;

  egg.classList.add("cracked");
  counter.style.display = "none";

  if (crackedByHold) {
    message.innerText = "💖 Congrats! Your crush will text you back (fate edition)";
  } else {
    message.innerText = "🎉 Congrats! Your crush will text you back (effort edition)";
  }

  spawnHearts();
}

// Tap logic
egg.addEventListener("click", () => {
  if (cracked) return;
  taps--;
  counter.innerText = taps + " taps left";
  randomTapQuote();

  if (taps <= 0) crackEgg();
});

// Hold for 5 seconds logic
egg.addEventListener("touchstart", () => {
  if (cracked) return;

  holdTimer = setTimeout(() => {
    crackedByHold = true;
    crackEgg();
  }, 5000);
});

egg.addEventListener("touchend", () => {
  clearTimeout(holdTimer);
});

// Heart VFX
function spawnHearts() {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 2 + Math.random() * 2 + "s";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
  }
}
