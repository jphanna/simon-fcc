(function() {
  let sequence = []; // array to hold sequence
  let playerSequence = 0; // Count position in sequence player is testing
  let playerGo = false; // Player's turn?
  let computerGo = true; // Computer's turn?
  let round = 0; // counter on display
  let strict = false; // Strict game?
  const startButton = document.getElementById("startButton");
  const strictButton = document.getElementById("strictButton");
  const buttons = document.querySelector(".pad");
  const roundDisplay = document.getElementById("round");
  const youWin = document.getElementById("youWin");
  const yourTurn = document.getElementById("yourTurn");
  const tryAgain = document.getElementById("tryAgain");
  const strictError = document.getElementById("strictError");

  startButton.addEventListener("click", start);

  strictButton.addEventListener("click", () => {
    strict = !strict;
    (strict) ? strictButton.style.background = "#b71c1c" : strictButton.style.background = "#2c3e50";
  });

  /**
   * Simon chooses next number, add to sequence, runs the round
   *
   */
  function getSimon() {
    /**
     * If needed, add a zero to the game round display
     *
     * @param {number} num
     * @returns {string | number}
     */
    function addZero(num) {
      return (num < 10) ? "0" + num : num;
    }
    buttons.removeEventListener("click", playersTurn);
    round++;
    roundDisplay.innerText = addZero(round);
    sequence.push(Math.floor(Math.random() * 4) + 1);
    activate(sequence);
  }

  /**
   * Simon play sequence
   *
   * @param {array} sequence
   *
   */
  function activate(sequence) {
    let i = 0;
    let timing = setInterval(() => {
      lightButton(sequence[i]);
      i++;
      if (i === sequence.length) {
        clearInterval(timing);
        computerGo = false;
        playerGo = true;
        setTimeout(() => {yourTurn.style.display = "initial"; buttons.addEventListener("click", playersTurn);}, 700);
      }
    }, 700);
  }
  /**
   * Simon button activation
   *
   * @param {number} number
   *
   */
  function lightButton(number) {
    const sound = document.getElementById("tone" + number);
    const button = document.getElementById("b" + number);
    sound.play();
    button.classList.remove("off");
    button.classList.add("on");
    setTimeout(() => {
      button.classList.remove("on");
      button.classList.add("off");
    }, 350);
  }

  /**
   * Grab event during players turn
   *
   * @param {event} event
   *
   */
  function playersTurn(event) {
    if (playerGo) {
      if (event.target.id === "b1" ||
        event.target.id === "b2" ||
        event.target.id === "b3" ||
        event.target.id === "b4") {
          bleep(event);
      }
    }
  }

  /**
   * Activate button player clicked
   *
   * @param {event} e
   *
   */
  function bleep(e) {
    if (playerGo) {
      const number = Number(e.target.dataset.number);
      const sound = document.getElementById("tone" + number);
      sound.currentTime = 0;
      sound.play();
      buttons.removeEventListener("click", playersTurn);
      e.target.classList.remove("off");
      e.target.classList.add("on");
      testSeq(number);
      setTimeout(() => {
        e.target.classList.remove("on");
        e.target.classList.add("off");
        buttons.addEventListener("click", playersTurn);
      }, 350);
    }
  }

  /**
   * Test player sequence
   *
   * @param {number} number
   *
   */
  function testSeq(number) {
    if (number === sequence[playerSequence]) {
      playerSequence++;
      if (playerSequence === sequence.length) {
        if (playerSequence === 20) {
          yourTurn.style.display = "none";
          youWin.style.display = "initial";
          playerGo = false;
          computerGo = true;
          setTimeout(() => {youWin.style.display = "none"; start();}, 2000);
        } else {
          playerSequence = 0;
          playerGo = false;
          computerGo = true;
          yourTurn.style.display = "none";
          setTimeout(getSimon, 1000);
        }
      }
    } else {
      if (strict) {
        strictError.style.display = "initial";
        yourTurn.style.display = "none";
      } else {
        yourTurn.style.display = "none";
        playerGo = false;
        computerGo = true;
        playerSequence = 0;
        tryAgain.style.display = "initial";
        setTimeout(() => {tryAgain.style.display = "none"; yourTurn.style.display = "none"; activate(sequence);}, 2000);
      }
    }
  }

  /**
   * Initialize game
   *
   */
  function start() {
    sequence = [];
    round = 0;
    playerSequence = 0;
    strictError.style.display = "none";
    yourTurn.style.display = "none";
    tryAgain.style.display = "none";
    youWin.style.display = "none";
    roundDisplay.innerText = "00";
    setTimeout(getSimon, 1000);
  }
}());
