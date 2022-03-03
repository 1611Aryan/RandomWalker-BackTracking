"use strict";
class Grid {
    constructor(rows, columns, spacingX, spacingY) {
        this.rows = rows;
        this.columns = columns;
        this.spacingX = spacingX;
        this.spacingY = spacingY;
    }
    draw() {
        for (let i = 0; i < this.columns; i++)
            for (let j = 0; j < this.rows; j++) {
                if (ctx) {
                    ctx.beginPath();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = "#EAEAEA";
                    ctx.moveTo(i * this.spacingX, j * this.spacingY);
                    ctx.lineTo((i + 1) * this.spacingX, j * this.spacingY);
                    ctx.lineTo((i + 1) * this.spacingX, (j + 1) * this.spacingY);
                    ctx.lineTo(i * this.spacingX, (j + 1) * this.spacingY);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
    }
}
