let startTime = 0;
let elapsedTime = 0;
let timer = null;
let running = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");


// Start Stopwatch

function startStopwatch() {

    if (running) {
        return;
    }

    running = true;

    startTime = Date.now() - elapsedTime;

    timer = setInterval(updateDisplay, 10);
}


// Update Display

function updateDisplay() {

    elapsedTime = Date.now() - startTime;

    display.textContent = formatTime(elapsedTime);
}


// Format Time

function formatTime(time) {

    let milliseconds = Math.floor((time % 1000) / 10);

    let seconds = Math.floor((time / 1000) % 60);

    let minutes = Math.floor((time / (1000 * 60)) % 60);

    let hours = Math.floor(time / (1000 * 60 * 60));


    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(2, "0")
    );
}


// Pause Stopwatch

function pauseStopwatch() {

    if (!running) {
        return;
    }

    running = false;

    clearInterval(timer);
}


// Reset Stopwatch

function resetStopwatch() {

    running = false;

    clearInterval(timer);

    startTime = 0;

    elapsedTime = 0;

    display.textContent = "00:00:00.00";

    laps.innerHTML =
        '<p class="empty">No laps recorded yet</p>';
}


// Record Lap

function recordLap() {

    if (!running) {
        return;
    }

    const emptyMessage = document.querySelector(".empty");

    if (emptyMessage) {
        emptyMessage.remove();
    }


    const lapItem = document.createElement("div");

    lapItem.className = "lap-item";


    const lapNumber =
        document.querySelectorAll(".lap-item").length + 1;


    lapItem.innerHTML = `
        <span class="lap-number">
            Lap ${lapNumber}
        </span>

        <span>
            ${formatTime(elapsedTime)}
        </span>
    `;


    laps.prepend(lapItem);
}