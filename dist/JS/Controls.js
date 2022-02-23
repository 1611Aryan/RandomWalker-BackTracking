"use strict";
const pauseButton = document.getElementById("pause");
if (pauseButton)
    pauseButton.onclick = () => {
        running = !running;
        pauseButton.innerHTML = running ? "Pause" : "Resume";
    };
const gridButton = document.getElementById("grid");
if (gridButton)
    gridButton.onclick = () => {
        showGrid = !showGrid;
        gridButton.innerHTML = showGrid ? "Hide Grid" : "Show Grid";
    };
const incSpeedButton = document.getElementById("inc");
const decSpeedButton = document.getElementById("dec");
const speedInfo = document.getElementById("speed");
if (incSpeedButton && speedInfo)
    incSpeedButton.onclick = () => {
        fps++;
        speedInfo.innerHTML = fps.toString();
    };
if (decSpeedButton && speedInfo)
    decSpeedButton.onclick = () => {
        fps > 1 && fps--;
        speedInfo.innerHTML = fps.toString();
    };
const resetButton = document.getElementById("reset");
if (resetButton)
    resetButton.onclick = () => {
        init();
    };
const colsInput = document.getElementById("cols");
const rowsInput = document.getElementById("rows");
const applyButton = document.getElementById("apply");
if (applyButton && rowsInput && colsInput)
    applyButton.onclick = () => {
        rows = Number(rowsInput.value);
        columns = Number(colsInput.value);
        init();
    };
