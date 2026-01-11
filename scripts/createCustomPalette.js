const customizeMenuElement = document.querySelector('[data-js-customize-menu]')
const newPaletteElement = customizeMenuElement.querySelector('[data-js-new-palette]')
const newPaletteNameElement = newPaletteElement.querySelector('[data-js-new-palette-name]')
const colorsContainerElement = newPaletteElement.querySelector('[data-js-colors-container]')
const colorsInputElements = colorsContainerElement.children
const colorsAddButtonElement = newPaletteElement.querySelector('[data-js-colors-add-button]')
const newPaletteCancelButtonElement = newPaletteElement.querySelector('[data-js-new-palette-cancel-button]')

let storedPalettes
!localStorage.palettes ? storedPalettes = [] : storedPalettes = JSON.parse(localStorage.getItem('palettes'))

export const createCustomPalette = (iteration) => {
  customizeMenuElement.classList.add('is-active')
  const newPalette = {}

  const clearEvents = () => {
    newPaletteElement.removeEventListener('submit', onFormSubmit)
    colorsAddButtonElement.removeEventListener('click', onColorAddButtonClick)
    newPaletteCancelButtonElement.removeEventListener('click', onCancelButtonClick)
  }

  function onFormSubmit(event) {
    event.preventDefault()

    newPalette.id = `cp${iteration}`
    newPalette.value = `custom${iteration}`

    newPalette.name = newPaletteNameElement.value
    if (newPalette.name === '') {
      newPalette.name = `Custom palette ${iteration}`
    }

    newPalette.colors = []
    Array.from(colorsInputElements).forEach(({ value }) => {
      newPalette.colors.push(value)
    })

    storedPalettes.push(newPalette)
    localStorage.setItem('palettes', JSON.stringify(storedPalettes))
    customizeMenuElement.classList.remove('is-active')
    clearEvents()
    location.reload()
  }

  function onColorAddButtonClick(event) {
    const newColorInput = `<input class="color-select__input input" type="color" value="#000000">`
    colorsContainerElement.insertAdjacentHTML("beforeend", newColorInput)
  }

  function onCancelButtonClick(event) {
    customizeMenuElement.classList.remove('is-active')
    newPaletteElement.reset()
    colorsContainerElement.innerHTML = `<input class="color-select__input" type="color" value="#000000">`
    clearEvents()
  }

  newPaletteElement.addEventListener('submit', onFormSubmit)
  colorsAddButtonElement.addEventListener('click', onColorAddButtonClick)
  newPaletteCancelButtonElement.addEventListener('click', onCancelButtonClick)
}


