const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

ctx.fillStyle = '#1f1f21'
ctx.fillRect(0, 0, canvas.width, canvas.height)

// Some constants

const cubeColor = '#d11f31'
const velocityX = 0.12
const velocityY = 0.13
const velocityZ = 0.9

var w = canvas.width
var h = canvas.height

//

ctx.strokeStyles = cubeColor
ctx.lineWidth = w / 10
ctx.lineCap = 'round'
