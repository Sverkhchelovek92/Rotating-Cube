const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

ctx.fillStyle = '#1f1f21'
ctx.fillRect(0, 0, canvas.width, canvas.height)

// Some constants

const cubeColor = '#d11f31'
const velocityX = 0.12
const velocityY = 0.13
const velocityZ = 0.9

const w = canvas.width
const h = canvas.height

//

ctx.strokeStyle = cubeColor
ctx.lineWidth = w / 100
ctx.lineCap = 'round'

// cube

const cx = w / 2
const cy = h / 2
const cz = 0
const size = h / 4

// vertices and edges

class POINT3D {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }
}

let vertices = [
  new POINT3D(cx - size, cy - size, cz - size),
  new POINT3D(cx + size, cy - size, cz - size),
  new POINT3D(cx + size, cy + size, cz - size),
  new POINT3D(cx - size, cy + size, cz - size),
  new POINT3D(cx - size, cy - size, cz + size),
  new POINT3D(cx + size, cy - size, cz + size),
  new POINT3D(cx + size, cy + size, cz + size),
  new POINT3D(cx - size, cy + size, cz + size),
]

let edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
]

// animation

var timeDelta,
  timeLast = 0

requestAnimationFrame(loop)

function loop(timeNow) {
  timeDelta = timeNow - timeLast
  timeLast = timeNow

  ctx.fillRect(0, 0, w, h)

  for (let edge of edges) {
    ctx.beginPath()
    ctx.moveTo(vertices[edge[0]].x, vertices[edge[0]].y)
    ctx.lineTo(vertices[edge[1]].x, vertices[edge[1]].y)
    ctx.stroke()
  }

  requestAnimationFrame(loop)
}
