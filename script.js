/* ==============================
   TASKMASTER
   ============================== */


/*
 * Elements
 */

const envelope = document.getElementById("envelope");

const envelopeContainer =
    document.getElementById("envelope-container");

const taskContainer =
    document.getElementById("task-container");

const startButton =
    document.getElementById("start-button");

const resetButton =
    document.getElementById("reset-button");

const timer =
    document.getElementById("timer");


/*
 * Timer settings
 */

const START_TIME = 15 * 60; // 15 minutes

let timeRemaining = START_TIME;

let timerInterval = null;

let timerRunning = false;


/*
 * Open envelope
 */

envelope.addEventListener("click", () => {

    // Don't allow the envelope to be opened twice
    if (envelope.classList.contains("open")) {
        return;
    }

    envelope.classList.add("open");

    /*
     * Wait for the envelope animation
     * before showing the letter.
     */

    setTimeout(() => {

        envelopeContainer.classList.add("hidden");

        taskContainer.classList.remove("hidden");

    }, 1800);

});


/*
 * Start timer
 */

startButton.addEventListener("click", () => {

    if (timerRunning) {
        return;
    }

    timerRunning = true;

    startButton.textContent = "THE TASK HAS BEGUN";

    startButton.disabled = true;

    timerInterval = setInterval(() => {

        timeRemaining--;

        updateTimer();

        /*
         * Last minute warning
         */

        if (timeRemaining <= 60) {
            timer.classList.add("warning");
        }


        /*
         * Time's up
         */

        if (timeRemaining <= 0) {

            clearInterval(timerInterval);

            timerRunning = false;

            timer.textContent = "TIME'S UP";

            startButton.textContent = "THE TASKMASTER JUDGES YOU";

        }

    }, 1000);

});


/*
 * Update timer display
 */

function updateTimer() {

    const minutes =
        Math.floor(timeRemaining / 60);

    const seconds =
        timeRemaining % 60;

    timer.textContent =
        `${minutes.toString().padStart(2, "0")}:` +
        `${seconds.toString().padStart(2, "0")}`;

}


/*
 * Reset the task
 */

resetButton.addEventListener("click", () => {

    clearInterval(timerInterval);

    timerRunning = false;

    timeRemaining = START_TIME;

    timer.classList.remove("warning");

    updateTimer();

    startButton.disabled = false;

    startButton.textContent = "START THE CLOCK";

});


/*
 * Initial timer display
 */

updateTimer();