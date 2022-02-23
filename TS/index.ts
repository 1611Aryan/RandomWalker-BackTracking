const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d")

let fps = 10
let finished = false
let running = true
let showGrid = true

canvas.width = 670
canvas.height = 600

let rows = 5,
  columns = 5

let spacingX = canvas.width / columns,
  spacingY = canvas.height / rows

let points: Point[]
let grid: Grid
let path: Path

const init = () => {
  spacingX = canvas.width / columns
  spacingY = canvas.height / rows
  running = true
  points = []
  grid = new Grid(rows, columns, spacingX, spacingY)
  path = new Path(spacingX, spacingY, points)
}

const setup = () => {
  if (ctx) {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
  showGrid && grid.draw()
}

const update = () => {
  if (ctx) {
    points.map((pt, index) => {
      ctx.beginPath()
      ctx.lineWidth = Math.min(8, spacingX / 6, spacingY / 6)

      ctx.moveTo((pt.x + 1 / 2) * spacingX, (pt.y + 1 / 2) * spacingY)
      if (index !== points.length - 1)
        ctx.lineTo(
          (points[index + 1].x + 1 / 2) * spacingX,
          (points[index + 1].y + 1 / 2) * spacingY
        )
      ctx.strokeStyle = "yellow"
      ctx.stroke()
      ctx.closePath()
      pt.draw().nextMove(index, points.length, path)
    })
  }
}

const animate = () => {
  if (!finished) {
    setTimeout(() => {
      if (running) {
        setup()
        update()
      }
      requestAnimationFrame(animate)
    }, 1000 / fps)
    if (points.length === rows * columns) finished = true
  }
}
init()
animate()
