const RANDOM_QUOTE_API_URL = [
  `hello`,
  `hey`,
  `hi`,
  `bye`,
  `html {\n\u00a0\u00a0\u00a0font-family: sans-serif;\n\u00a0\u00a0\u00a0-webkit-text-size-adjust: 100%;\n\u00a0\u00a0\u00a0-ms-text-size-adjust: 100%\n}\nbody {\n\u00a0\u00a0\u00a0margin: 0\n}\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n\u00a0\u00a0\u00a0display: block\n}\naudio,\ncanvas,\nprogress,\nvideo {\n\u00a0\u00a0\u00a0display: inline-block;\n\u00a0\u00a0\u00a0vertical-align: baseline\n}\naudio:not([controls]) {\n\u00a0\u00a0\u00a0display: none;\n\u00a0\u00a0\u00a0height: 0\n}\n[hidden],\ntemplate {\n\u00a0\u00a0\u00a0display: none\n}\na {\n\u00a0\u00a0\u00a0background-color: transparent\n}\na:active,\na:hover {\n\u00a0\u00a0\u00a0outline: 0\n}\n`,
];

const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");

quoteInputElement.addEventListener("input", startGame);

const levelElement = document.querySelector(".level");

let level = 0;

function startGame() {
  const arrayQuote = quoteDisplayElement.querySelectorAll("span");
  const arrayValue = quoteInputElement.value.split("");
  let correct = true;

  let arrayCurrent = quoteDisplayElement.querySelectorAll(
    ".correct, .incorrect"
  );

  let cursor_late = [...arrayCurrent].length - 1;

  [...arrayQuote]
    .filter((element) => element.innerText != "\u00a0")
    .forEach((characterSpan, i) => {
      const character = arrayValue[i];

      if (characterSpan.innerText == "\n") {
        characterSpan.classList.add("enterBox");
      }
      if (character == null) {
        characterSpan.classList.remove("correct");
        characterSpan.classList.remove("incorrect");
        characterSpan.classList.remove("cursor");
        correct = false;
      } else if (character === characterSpan.innerText) {
        characterSpan.classList.add("correct");
        characterSpan.classList.remove("incorrect");
      } else {
        characterSpan.classList.remove("correct");
        characterSpan.classList.add("incorrect");
        correct = false;
      }
    });

  if (correct) {
    level = level + 1;
    renderNewQuote();
  }

  arrayCurrent = quoteDisplayElement.querySelectorAll(".correct, .incorrect");

  let cursor_current = [...arrayCurrent].length - 1;

  console.log(cursor_current, [...arrayQuote].length - 1);

  if (cursor_late === [...arrayQuote].length - 1) {
    let a = document.querySelector("textarea");
    a.value = a.value.slice(0, 5);
  }

  if (cursor_late < cursor_current) {
    [...arrayCurrent].forEach((characterSpan, i) => {
      characterSpan.classList.remove("cursor");
      if (i === cursor_current) {
        characterSpan.classList.add("cursor");
      }
    });
  } else {
    [...arrayCurrent][cursor_current].classList.add("cursor");
  }
}

async function renderNewQuote() {
  // levelElement.innerText=level+1
  // 단계표시해주는 태그 추가 시 활성화하면 됩니다.
  const quote = RANDOM_QUOTE_API_URL[level];

  quoteDisplayElement.innerHTML = "";
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null;

  startTimer();
}

let startTime;
var timeLimit = 1;
function startTimer() {
  timerElement.innerText = 60;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = 60 - Math.floor((new Date() - startTime) / 1000);

    if (timer.innerText < timeLimit) {
      timer.innerText = "You lose 👎";
      quoteInputElement.removeEventListener("input", startGame);
    }
  }, 1000);
}

renderNewQuote();
