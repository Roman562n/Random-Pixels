const canvasElemant = document.querySelector('[data-js-canvas]')
const paletteSelectElement = document.querySelector('[data-js-palette-select]')
const paletteResolutionInputElements = document.querySelectorAll('[data-js-palette-resolution-input]')
const pixelSizeInputElement = document.querySelector('[data-js-palette-resolution-pixel-size]')
const generateButtonElement = document.querySelector('[data-js-generate-button]')
const customizeMenuElement = document.querySelector('[data-js-customize-menu]')
const colorSelectElement = customizeMenuElement.querySelector('[data-js-color-select-inputs]')
const colorAddButtonElement = customizeMenuElement.querySelector('[data-js-color-select-add-button]')
const customizeMenuCancelButtonElement = customizeMenuElement.querySelector('[data-js-customize-menu-cancel-button]')

const canvasSizeUpdate = () => {
  canvasElemant.width = imageSize[0] * pixelSize
  canvasElemant.height = imageSize[1] * pixelSize
}

const ctx = canvasElemant.getContext('2d')
let imageSize = [16, 16]
let pixelSize = 20
canvasSizeUpdate()

const defaultPalettes = [
  { id: "pt1", value: 'random', name: "Случайные цвета" },
  { id: "pt2", value: 'blue', name: "Синяя", colors: ['#003153', '#4285B4', '#3079d8ff', '#002F55', '#0E294B', '#1560BD'] },
  { id: "pt3", value: 'pink', name: "Розовая", colors: ['#fa1e67', '#FF1493', '#D71868', '#FF43A4', '#EF0097', '#FF00CC'] },
  { id: "pt4", value: 'gray', name: "Серая", colors: ['#5a5a5a', '#252525', '#333333', '#575757', '#949494', '#979797'] },
  { id: "ptcu", value: 'custom', name: "+ Создать свою" },
]

const getRandomNumber = (min = 0, max = 256) => {
  const number = Math.floor(Math.random() * (max + 1 - min)) + min
  return number
}

const getRandomColor = () => {
  const color = `rgb( ${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`
  return color
}

const findPalette = (palette) => {
  return paletteSelectElement.value === palette.value
}

const generateImage = () => {
  ctx.clearRect(0, 0, canvasElemant.width, canvasElemant.height)

  const findedPalette = defaultPalettes.find(findPalette)

  for (let i = 0; i < imageSize[0]; i++) {
    for (let j = 0; j < imageSize[1]; j++) {

      if (findedPalette.value === "random") {
        ctx.fillStyle = getRandomColor()
      }
      else if (findedPalette.hasOwnProperty("colors")) {
        ctx.fillStyle = findedPalette.colors[getRandomNumber(0, findedPalette.colors.length - 1)]
      } else {
        console.log('custom')
      }

      ctx.fillRect(i * pixelSize, j * pixelSize, pixelSize, pixelSize)
    }
  }
}

defaultPalettes.map((palette) => {
  const newOption = `<option class="palette__option" id="${palette.id}" value="${palette.value}">${palette.name}</option>`
  paletteSelectElement.insertAdjacentHTML("beforeend", newOption)
})

generateButtonElement.addEventListener('click', (event) => {
  const selectedPalette = paletteSelectElement.value
  event.preventDefault()

  if (selectedPalette === "") {
    console.log('Палитра не выбрана')
    paletteSelectElement.style.boxShadow = "-3px 3px 0 0 #c00f2cff"
  }
  else {
    paletteSelectElement.style.boxShadow = "-3px 3px 0 0 #2a0e30"
    generateImage()
  }
})

paletteSelectElement.addEventListener('change', (event) => {
  if (event.target.value === 'custom') {
    customizeMenuElement.classList.add('is-active')
  }
})

colorAddButtonElement.addEventListener('click', () => {
  const newColorInput = `<input class="color-select__input" type="color">`
  colorSelectElement.insertAdjacentHTML("beforeend", newColorInput)
})

customizeMenuCancelButtonElement.addEventListener('click', () => {
  customizeMenuElement.classList.remove('is-active')
})

paletteResolutionInputElements.forEach((element, index) => {
  element.addEventListener("change", (event) => {
    imageSize[index] = event.target.value
    canvasSizeUpdate()
  })
})

pixelSizeInputElement.addEventListener('change', (event) => {
  pixelSize = event.target.value
  canvasSizeUpdate()
})

// colorSelectElement.addEventListener('change', (event) => {
//   const hex = event.target.value 
//   console.log(hex.slice(1, 3))
//   console.log(hex)
//   console.log(parseInt(hex.slice(1,3), 16))
//   console.log(parseInt(hex.slice(3,5), 16))
//   console.log(parseInt(hex.slice(5,7), 16))
// })
