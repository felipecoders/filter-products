/// <reference path="./products.js" />
// criar uma classe que vai ser responsavel
// pegar os produtos que estão bo outro arquivo
// renderizar estes produtos na tela

class RenderProducts {
  constructor() {
    this.events = {}
    this.target = document.getElementById('products-list')
  }

  render(products) {
    const elements = products.map(product => {
      const element = createElement('div', {
        class:
          'p-4 bg-white rounded-md hover:shadow-xl relative  overflow-hidden product-item',
      })

      const figure = createElement(
        'figure',
        { class: 'flex justify-center' },
        createElement('img', {
          src: product.image_url,
          alt: product.name,
          class: 'h-full max-h-48'
        })
      )
      element.append(figure)

      const originalPrice = !product.original_price
        ? ''
        : createElement(
            'div',
            { class: 'text-xs' },
            createElement(
              'span',
              { class: 'text-slate-600 line-through' },
              format(product.original_price)
            ),
            ' ',
            createElement(
              'span',
              { class: 'text-green-600' },
              porcentBetween(product.original_price, product.price) + '%'
            )
          )

      const freeDelivery = !product.is_free_delivery
        ? ''
        : createElement(
            'div',
            null,
            createElement(
              'span',
              { class: 'text-sm text-green-600' },
              'Entrega grátis',
              createElement(
                'span',
                { class: 'ml-2' },
                createElement('i', { class: 'fa-solid fa-truck-fast' })
              )
            )
          )

      const content = createElement(
        'div',
        { class: 'py-2 flex flex-col' },
        createElement('strong', null, product.name),
        createElement(
          'div',
          { class: 'py-2' },
          originalPrice,
          createElement(
            'span',
            { class: 'text-2xl text-green-600' },
            format(product.price)
          )
        ),
        freeDelivery
      )
      element.append(content)

      const footer = createElement(
        'footer',
        null,
        createElement('p', null, product.description)
      )
      element.append(footer)

      const buttonAdd = createElement(
        'button',
        {
          class:
            'py-2 flex-1 flex items-center justify-center bg-indigo-700 ' +
            'text-white rounded-md shadow-md font-bold cursor-pointer ' +
            'hover:bg-indigo-900',
        },
        'Adicionar ao carrinho'
      )
      const buttonWrapper = createElement(
        'div',
        {
          class:
            'p-4 flex bg-white bottom-0 left-0 right-0 absolute button-wrapper',
        },
        buttonAdd
      )
      buttonWrapper.onclick = () => {
        this.events.onclick(product)
      }
      element.append(buttonWrapper)

      return element
    })

    this.target.innerHTML = ''
    this.target.append(...elements)
  }

  on(event, fn) {
    this.events[`on${event}`] = fn
  }
}
