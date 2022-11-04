function createElement(tag, attrs = {}, ...childrens) {
  const element = document.createElement(tag)

  for (let attr in attrs) {
    if (/^on[A-Z]{1}.*/.test(attr)) {
      element[attr.toLowerCase()] = (e) => attrs[attr].call(element, e)
    } else {
      element.setAttribute(attr, attrs[attr])
    }
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

const strings = {
  camelize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase()
  },
}
