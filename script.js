const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

ctx.fillStyle = '#1f1f21'
ctx.fillRect(0, 0, canvas.width, canvas.height)

const colorBtn = document.querySelector('.color-btn')
const gradientBtn = document.querySelector('.gradient-btn')

// Some variables

let cubeColor = '#d11f31'

// Gradient mode variables
let gradientMode = false
let currentColor = cubeColor
let nextColor = randomColor()
let t = 0
let colorSpeed = 0.005

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

ctx.lineWidth = w / 100
ctx.lineCap = 'round'

// линейная интерполяция
function lerp(a, b, t) {
  return a + (b - a) * t
}

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
  ctx.strokeStyle = cubeColor

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

  // if gradient mode is on
  if (gradientMode) {
    t += colorSpeed
    if (t >= 1) {
      t = 0
      currentColor = nextColor
      nextColor = randomColor()
    }
    let c1 = hexToRgb(currentColor)
    let c2 = hexToRgb(nextColor)
    let r = Math.floor(lerp(c1.r, c2.r, t))
    let g = Math.floor(lerp(c1.g, c2.g, t))
    let b = Math.floor(lerp(c1.b, c2.b, t))
    cubeColor = rgbToHex(r, g, b)
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
  return color
}

colorBtn.addEventListener('click', () => {
  gradientMode = false
  cubeColor = randomColor()
  console.log('gradientMode:', gradientMode)
})

gradientBtn.addEventListener('click', () => {
  gradientMode = true
  currentColor = cubeColor
  nextColor = randomColor()
  t = 0
  console.log('gradientMode:', gradientMode)
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
