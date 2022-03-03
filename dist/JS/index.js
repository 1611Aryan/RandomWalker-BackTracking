"use strict";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let fps = 10;
let finished = false;
let running = true;
let showGrid = true;
canvas.width =
    window.innerWidth > window.innerHeight
        ? (window.innerHeight / 100) * 80
        : (window.innerWidth / 100) * 80;
canvas.height = canvas.width;
window.addEventListener("resize", () => {
    canvas.width =
        window.innerWidth > window.innerHeight
            ? (window.innerHeight / 100) * 80
            : (window.innerWidth / 100) * 80;
    canvas.height = canvas.width;
    init();
});
let rows = 5, columns = 5;
let spacingX = canvas.width / columns, spacingY = canvas.height / rows;
let points;
let grid;
let path;
const init = () => {
    spacingX = canvas.width / columns;
    spacingY = canvas.height / rows;
    points = [];
    grid = new Grid(rows, columns, spacingX, spacingY);
    path = new Path(spacingX, spacingY, points);
    finished = false;
    running = true;
    animate();
};
const setup = () => {
    if (ctx) {
        ctx.fillStyle = "#252A34";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    showGrid && grid.draw();
};
const update = () => {
    if (ctx) {
        points.map((pt, index) => {
            ctx.beginPath();
            ctx.lineWidth = Math.min(8, spacingX / 6, spacingY / 6);
            ctx.moveTo((pt.x + 1 / 2) * spacingX, (pt.y + 1 / 2) * spacingY);
            if (index !== points.length - 1)
                ctx.lineTo((points[index + 1].x + 1 / 2) * spacingX, (points[index + 1].y + 1 / 2) * spacingY);
            ctx.strokeStyle = "#FF2E63";
            ctx.stroke();
            ctx.closePath();
            pt.draw().nextMove(index, points.length, path);
        });
    }
};
const animate = () => {
    if (!finished) {
        setTimeout(() => {
            if (running) {
                setup();
                update();
            }
            requestAnimationFrame(animate);
        }, 1000 / fps);
        if (points.length === rows * columns)
            finished = true;
    }
};
init();
