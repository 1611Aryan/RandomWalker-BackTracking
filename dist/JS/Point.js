"use strict";
class Point {
    constructor(x, y, radius, spacingX, spacingY, cells) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.spacingX = spacingX;
        this.spacingY = spacingY;
        this.cells = cells;
        this.failedMoves = [];
    }
    draw() {
        if (ctx) {
            ctx.beginPath();
            ctx.arc((this.x + 1 / 2) * this.spacingX, (this.y + 1 / 2) * this.spacingY, this.radius, 0, 2 * Math.PI);
            ctx.fillStyle = "blue";
            ctx.fill();
            ctx.closePath();
        }
        return this;
    }
    possibleMoves() {
        let moves = [];
        if (this.x < columns - 1 && !this.cells[this.x + 1][this.y])
            moves.push({ dx: 1, dy: 0 });
        if (this.x > 0 && !this.cells[this.x - 1][this.y])
            moves.push({ dx: -1, dy: 0 });
        if (this.y < rows - 1 && !this.cells[this.x][this.y + 1])
            moves.push({ dx: 0, dy: 1 });
        if (this.y > 0 && !this.cells[this.x][this.y - 1])
            moves.push({ dx: 0, dy: -1 });
        moves = this.filterFailedMoves(moves);
        return moves;
    }
    filterFailedMoves(moves) {
        return moves.filter(move => !this.failedMoves.some(fmove => fmove.dx === move.dx && fmove.dy === move.dy));
    }
    randomMove(moves) {
        return moves[Math.floor(Math.random() * moves.length)];
    }
    nextMove(index, length, path) {
        if (index !== length - 1)
            return;
        const move = this.randomMove(this.possibleMoves());
        if (move) {
            this.failedMoves.push(move);
            path.addMove(this.x + move.dx, this.y + move.dy, this.spacingX, this.spacingY);
        }
        else
            path.removeMove();
    }
}
