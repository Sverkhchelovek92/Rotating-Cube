const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

ctx.fillStyle = '#1f1f21'
ctx.fillRect(0, 0, canvas.width, canvas.height)

const colorBtn = document.querySelector('.color-btn')
const gradientBtn = document.querySelector('.gradient-btn')

// Some constants

let cubeColor = '#d11f31'
let gradientMode = false

let speedRangeX = document.getElementById('speedRangeX')
let speedRangeY = document.getElementById('speedRangeY')
let speedRangeZ = document.getElementById('speedRangeZ')

let velocityX = parseFloat(speedRangeX.value)
let velocityY = parseFloat(speedRangeY.value)
let velocityZ = parseFloat(speedRangeZ.value)

// Change speed

speedRangeX.addEventListener('input', () => {
  velocityX = parseFloat(speedRangeX.value)
})
speedRangeY.addEventListener('input', () => {
  velocityY = parseFloat(speedRangeY.value)
})
speedRangeZ.addEventListener('input', () => {
  velocityZ = parseFloat(speedRangeZ.value)
})

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

  // rotate z-axis

  let angleZ = timeDelta * 0.001 * velocityZ

  for (let v of vertices) {
    let dx = v.x - cx
    let dy = v.y - cy

    let x = dx * Math.cos(angleZ) - dy * Math.sin(angleZ)
    let y = dx * Math.sin(angleZ) + dy * Math.cos(angleZ)

    v.x = x + cx
    v.y = y + cy
  }

  // rotate x-axis

  let angleX = timeDelta * 0.001 * velocityX

  for (let v of vertices) {
    let dy = v.y - cy
    let dz = v.z - cz

    let y = dy * Math.cos(angleX) - dz * Math.sin(angleX)
    let z = dy * Math.sin(angleX) + dz * Math.cos(angleX)

    v.y = y + cy
    v.z = z + cz
  }

  // rotate y-axis

  let angleY = timeDelta * 0.001 * velocityY

  for (let v of vertices) {
    let dx = v.x - cx
    let dz = v.z - cz

    let x = dx * Math.cos(angleY) - dz * Math.sin(angleY)
    let z = dx * Math.sin(angleY) + dz * Math.cos(angleY)

    v.x = x + cx
    v.z = z + cz
  }

  for (let edge of edges) {
    ctx.beginPath()
    ctx.moveTo(vertices[edge[0]].x, vertices[edge[0]].y)
    ctx.lineTo(vertices[edge[1]].x, vertices[edge[1]].y)
    ctx.stroke()
  }

  requestAnimationFrame(loop)
}

// color randomizer

function randomColor() {
  let letters = '0123456789abcdef'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  console.log(color)
  return color
}

colorBtn.addEventListener('click', () => {
  ctx.strokeStyle = randomColor()
})

// HEX → RGB
function hexToRgb(hex) {
  let bigint = parseInt(hex.slice(1), 16)
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  }
}

// RGB → HEX
function rgbToHex(r, g, b) {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        let hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      })
      .join('')
  )
}
