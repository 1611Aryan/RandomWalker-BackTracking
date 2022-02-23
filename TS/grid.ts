class Grid {
  constructor(
    private rows: number,
    private columns: number,
    private spacingX: number,
    private spacingY: number
  ) {}

  draw() {
    for (let i = 0; i < this.columns; i++)
      for (let j = 0; j < this.rows; j++) {
        if (ctx) {
          ctx.beginPath()

          ctx.lineWidth = 2
          ctx.strokeStyle = "white"

          ctx.moveTo(i * this.spacingX, j * this.spacingY)
          ctx.lineTo((i + 1) * this.spacingX, j * this.spacingY)
          ctx.lineTo((i + 1) * this.spacingX, (j + 1) * this.spacingY)
          ctx.lineTo(i * this.spacingX, (j + 1) * this.spacingY)

          ctx.stroke()
          ctx.closePath()
        }
      }
  }
}
