import { createCustomPalette } from './createCustomPalette.js'

const canvasElemant = document.querySelector('[data-js-canvas]')
const controlsElement = document.querySelector('[data-js-controls]')
const paletteSelectorElement = controlsElement.querySelector('[data-js-palette-selector]')
const paletteAddButtonElement = controlsElement.querySelector('[data-js-palette-add-button]')
const settingsResolutionInputElements = controlsElement.querySelectorAll('[data-js-settings-resolution-input]')
const settingsPixelSizeInputElement = controlsElement.querySelector('[data-js-settings-pixel-size-input]')
const imageWidthElement = controlsElement.querySelector('[data-js-image-width]')
const imageHeightElement = controlsElement.querySelector('[data-js-image-height]')
const imageGenerateButtonElement = controlsElement.querySelector('[data-js-image-generate-button]')

const defaultPalettes = [
  { id: "pt0", value: 'random', name: "Случайные цвета" },
  { id: "pt1", value: 'red', name: "Красная", colors: ['#f80808ff', '#ff3c3cff', '#661515ff', '#f57777ff', '#a70606ff', '#e72b1eff'] },
  { id: "pt2", value: 'blue', name: "Синяя", colors: ['#003153', '#4285B4', '#3079d8ff', '#002F55', '#0E294B', '#1560BD'] },
  { id: "pt3", value: 'pink', name: "Розовая", colors: ['#fa1e67', '#FF1493', '#D71868', '#FF43A4', '#EF0097', '#FF00CC'] },
  { id: "pt4", value: 'gray', name: "Серая", colors: ['#5a5a5a', '#252525', '#333333', '#575757', '#949494', '#979797'] },
]

// localStorage.clear()
let storedPalettes
!localStorage.palettes ? storedPalettes = [] : storedPalettes = JSON.parse(localStorage.getItem('palettes'))
const palettes = defaultPalettes.concat(storedPalettes)

palettes.map((palette) => {
  const newOption = `<option class="palette__option" id="${palette.id}" value="${palette.value}">${palette.name}</option>`
  paletteSelectorElement.insertAdjacentHTML("beforeend", newOption)
})

const canvasSizeUpdate = () => {
  const imageWidth = imageSize[0] * pixelSize
  const imageHeight = imageSize[1] * pixelSize

  canvasElemant.width = imageWidth
  canvasElemant.height = imageHeight
  imageWidthElement.textContent = imageWidth
  imageHeightElement.textContent = imageHeight
}

const ctx = canvasElemant.getContext('2d')
let imageSize = [16, 16]
let pixelSize = 20
let iteration = storedPalettes.length
canvasSizeUpdate()

const getRandomNumber = (min = 0, max = 256) => {
  const number = Math.floor(Math.random() * (max + 1 - min)) + min
  return number
}

const getRandomColor = () => {
  const color = `rgb( ${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`
  return color
}

const findPalette = (palette) => {
  return paletteSelectorElement.value === palette.value
}

const generateImage = () => {
  ctx.clearRect(0, 0, canvasElemant.width, canvasElemant.height)

  const findedPalette = palettes.find(findPalette)

  for (let i = 0; i < imageSize[0]; i++) {
    for (let j = 0; j < imageSize[1]; j++) {

      if (findedPalette.value === "random") {
        ctx.fillStyle = getRandomColor()
      }
      else if (findedPalette.hasOwnProperty("colors")) {
        ctx.fillStyle = findedPalette.colors[getRandomNumber(0, findedPalette.colors.length - 1)]
      }
      else {
        console.log('Ошибка палитры')
        break
      }

      ctx.fillRect(i * pixelSize, j * pixelSize, pixelSize, pixelSize)
    }
  }
}

const inputVerification = () => {
  let answer = true
  if (paletteSelectorElement.value === "") {
    paletteSelectorElement.classList.add('invalid')
    answer = false
  }
  else {
    paletteSelectorElement.classList.remove('invalid')
  }
  settingsResolutionInputElements.forEach((element, index) => {
    if (element.value <= 0) {
      element.classList.add('invalid')
      answer = false
    }
    else {
      element.classList.remove('invalid')
      imageSize[index] = element.value
    }
  })
  if (settingsPixelSizeInputElement.value <= 0) {
    settingsPixelSizeInputElement.classList.add('invalid')
    answer = false
  }
  else {
    settingsPixelSizeInputElement.classList.remove('invalid')
    pixelSize = settingsPixelSizeInputElement.value
  }

  canvasSizeUpdate()
  return answer
}

controlsElement.addEventListener('change', () => {

  if (!inputVerification()) {
    imageGenerateButtonElement.setAttribute('disabled', 'true')
  }
  else {
    imageGenerateButtonElement.removeAttribute('disabled')
  }
})

imageGenerateButtonElement.addEventListener('click', (event) => {
  event.preventDefault()

  if (inputVerification() === false) {
    imageGenerateButtonElement.setAttribute('disabled', 'true')
  }
  else {
    generateImage()
  }
})

function onPaletteAddButtonClick() {
  createCustomPalette(iteration)
}

paletteAddButtonElement.addEventListener('click', onPaletteAddButtonClick)