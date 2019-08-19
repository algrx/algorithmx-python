const BUTTON_COLOR = 'rgb(238, 238, 238)'
const HOVER_COLOR = 'rgb(220, 220, 220)'
const CLICK_COLOR = 'rgb(200, 200, 200)'

const SIZE = 28

export const createButton = (iconName: string, onclick: () => void): HTMLDivElement => {
  const button = document.createElement('div')
  createButton
  button.onclick = onclick

  button.style.width = `${SIZE}px`
  button.style.height = `${SIZE}px`
  button.style.backgroundColor = BUTTON_COLOR
  button.style.display = 'inline-block'
  button.style.textAlign = 'center'
  button.style.marginRight = '6px'
  button.style.cssFloat = 'left'

  button.onmouseover = () => {
    button.style.backgroundColor = HOVER_COLOR
    button.style.cursor = 'pointer'
  }
  button.onmousedown = () => { button.style.backgroundColor = CLICK_COLOR }
  button.onmouseup = () => { button.style.backgroundColor = HOVER_COLOR }
  button.onmouseleave = () => {
    button.style.backgroundColor = BUTTON_COLOR
    button.style.cursor = ''
  }

  const icon = document.createElement('i')
  icon.setAttribute('class', `fa-${iconName} fa`)
  icon.style.fontSize = '12px'
  icon.style.color = 'rgb(50, 50, 50)'
  icon.style.lineHeight = `${SIZE}px`

  button.appendChild(icon)

  return button
}

export const setIcon = (button: Element, iconName: string): void => {
  const icon = button.querySelector('i')
  if (icon !== null) icon.setAttribute('class', `fa-${iconName} fa`)
}
