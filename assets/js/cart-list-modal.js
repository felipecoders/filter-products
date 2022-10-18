class CartListModal {
  constructor() {
    this.reference = createElement('div', {
      className: 'w-64 p-4 bg-white rounded-md shadow-md grid gap-4',
    })
  }

  show(products) {
    const items = Object.entries(
      products.reduce((p, n) => ({ ...p, [n.id]: n }), {})
    )
      .map(([_, product]) => product)
      .map(product => {
        const card = createElement(
          'li',
          {
            className:
              'bg-white rounded-md border flex items-center cart-list-item',
          },
          createElement(
            'figure',
            { className: 'p-2 flex items-center' },
            createElement('img', {
              className: 'w-8 h-8 rounded-full shadow-sm',
              src: product.image_url,
              alt: product.name,
              title: product.name,
            })
          ),
          createElement(
            'div',
            { className: 'flex-1 flex flex-col' },
            createElement('strong', {}, product.name),
            createElement('span', {}, product.price)
          ),
          createElement('div', {
            className: 'flex items-center justify-center p-2',
          })
        )

        return card
      })
    this.reference.innerHTML = ''

    this.reference.classList.add('active')
  }

  hide() {
    this.reference.classList.remove('active')
  }
}
