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
ctx.lineWidth = w / 10
ctx.lineCap = 'round'

// cube

const cx = w / 2
const cy = h / 2
const cz = 0
const size = h / 2

// animation

var timeDelta,
  timeLast = 0
requestAnimationFrame(loop)

function loop(timeNow) {
  timeDelta = timeNow - timeLast
  timeLast = timeNow

  requestAnimationFrame(loop)
}
