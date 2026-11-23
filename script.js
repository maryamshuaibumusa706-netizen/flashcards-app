let currentCards = [
  { questionText: "What is the capital of Nigeria?", questionAnswer: "Abuja" },
  { questionText: "What does HTML stand for?", questionAnswer: "HyperText Markup Language" },
  { questionText: "What is 7 x 8?", questionAnswer: "56" },
];
let currentIndex = 0;

const flashcardEl = document.getElementById("flashcard");
const frontEl = flashcardEl.querySelector(".front");
const backEl = flashcardEl.querySelector(".back");

function displayCard() {
  flashcardEl.classList.remove("flipped");
  if (currentCards.length === 0) {
    frontEl.textContent = "No cards left. Add one below!";
    backEl.textContent = "No cards left.";
    return;
  }
  frontEl.textContent = currentCards[currentIndex].questionText;
  backEl.textContent = currentCards[currentIndex].questionAnswer;
  document.getElementById("counter").textContent = `${currentIndex + 1} / ${currentCards.length}`;
}

flashcardEl.addEventListener("click", () => flashcardEl.classList.add("flipped"));

document.getElementById("delete-btn").addEventListener("click", () => {
  if (!currentCards.length) return;
  currentCards.splice(currentIndex, 1);
  if (currentIndex > 0) currentIndex--;
  if (currentIndex >= currentCards.length) currentIndex = currentCards.length - 1;
  displayCard();
});

document.getElementById("prev-btn").addEventListener("click", () => {
  if (!currentCards.length) return;
  currentIndex = (currentIndex - 1 + currentCards.length) % currentCards.length;
  displayCard();
});

document.getElementById("next-btn").addEventListener("click", () => {
  if (!currentCards.length) return;
  currentIndex = (currentIndex + 1) % currentCards.length;
  displayCard();
});

document.getElementById("entry-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const q = document.getElementById("front-text").value.trim();
  const a = document.getElementById("back-text").value.trim();
  const err = document.getElementById("error-msg");
  if (!q || !a) {
    err.textContent = "Both question and answer are required.";
    return;
  }
  err.textContent = "";
  currentCards.push({ questionText: q, questionAnswer: a });
  currentIndex = currentCards.length - 1;
  document.getElementById("front-text").value = "";
  document.getElementById("back-text").value = "";
  displayCard();
});

displayCard();
