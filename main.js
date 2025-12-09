const canvasElemant = document.querySelector('[data-js-canvas]')
const generateButtonElement = document.querySelector('[data-js-generate-button]')
const ctx = canvasElemant.getContext('2d')
const imageSize = [16, 16]
const pixelSize = 20

canvasElemant.width = imageSize[0] * pixelSize
canvasElemant.height = imageSize[1] * pixelSize

const getRandomColor = () => {
  const color = `rgb( ${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`
  return color
}

const getRandomNumber = (min = 0, max = 256) => {
  const number = Math.floor(Math.random() * (max + 1 - min)) + min
  return number
}

const generateImage = () => {
  ctx.clearRect(0, 0, canvasElemant.width, canvasElemant.height)

  for (let i = 0; i < imageSize[0]; i++) {
  for (let j = 0; j < imageSize[1]; j++) {
    ctx.fillStyle = getRandomColor()
    ctx.fillRect(i * pixelSize, j * pixelSize, pixelSize, pixelSize)
  }
}
}

generateButtonElement.addEventListener('click', generateImage)

