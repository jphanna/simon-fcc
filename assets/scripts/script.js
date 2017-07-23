(function() {
    "use strict";
    var sequence = []; // array to hold sequence
    var playerSequence = 0; // Count position in sequence player is testing
    var playerGo = false; // Player's turn?
    var computerGo = true; // Computer's turn?
    var round = 0; // counter on display
    var strict = false; // Strict game?
    var startButton = document.getElementById("startButton");
    var strictButton = document.getElementById("strictButton");
    var buttons = document.querySelector(".pad");
    var roundDisplay = document.getElementById("round");
    var youWin = document.getElementById("youWin");
    var yourTurn = document.getElementById("yourTurn");
    var tryAgain = document.getElementById("tryAgain");
    var strictError = document.getElementById("strictError");

    startButton.addEventListener("click", start);

    strictButton.addEventListener("click", () => {
        strict = !strict;
        if (strict) {
            strictButton.style.background = "#b71c1c";
        } else {
            strictButton.style.background = "#2c3e50";
        }
    });

    buttons.addEventListener("click", playersTurn);

    /* Simon chooses next number to add to sequence and runs the round*/
    function getSimon() {
        round++;
        roundDisplay.innerText = addZero(round);
        sequence.push(Math.floor(Math.random() * 4) + 1);
        activate(sequence);
    }

    function addZero(num) {
        return (num < 10) ? "0" + num : num;
    }

    /* Simon show sequence */
    function activate(sequence) {
        var i = 0;
        var timing = setInterval(() => {
            lightButton(sequence[i]);
            i++;
            if (i >= sequence.length) {
                clearInterval(timing);
                computerGo = false;
                playerGo = true;
                setTimeout(() => {yourTurn.style.display = "initial";}, 700);
            }
        }, 700);
    }
    /* Simon button activation */
    function lightButton(number) {
        var sound = document.getElementById("tone" + number);
        var button = document.getElementById("b" + number);
        sound.play();
        button.classList.remove("off");
        button.classList.add("on");
        setTimeout(() => {
            button.classList.remove("on");
            button.classList.add("off");
        }, 350);
    }

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

    /* Player button activation */
    function bleep(e) {
        if (playerGo) {
            var number = Number(e.target.dataset.number);
            var sound = document.getElementById("tone" + number);
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

    /* Test player sequence */
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
                tryAgain.style.display = "initial";
                playerGo = false;
                computerGo = true;
                playerSequence = 0;
                setTimeout(() => {tryAgain.style.display = "none"; activate(sequence);}, 2000);
            }
        }
    }

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
