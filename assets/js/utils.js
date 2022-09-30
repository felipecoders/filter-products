function createElement(tag, attrs = {}, ...childrens) {
  const element = document.createElement(tag)

  for (let attr in attrs) {
    element.setAttribute(attr, attrs[attr])
  }

  element.append(...childrens)

  return element
}

const format = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
}).format

function porcentBetween(original, current) {
  return Math.floor(((current - original) / original) * -100)
}
