class CartListModal extends Events {
  constructor() {
    super()
    this.reference = createElement('div', {
      class:
        'w-64 p-4 bg-slate-200 border rounded-md shadow-md gap-4 ' +
        'hidden right-0 top-0 absolute z-10',
    })

    this.timeMouseLeave = 0
    this.reference.onmouseleave = () => {
      this.timeMouseLeave = setTimeout(() => {
        this.hide()
      }, 1500)
    }

    this.reference.onmouseenter = () => {
      clearTimeout(this.timeMouseLeave)
    }
  }

  getElement() {
    return this.reference
  }

  render(products) {
    const items = Object.entries(
      products.reduce((p, n) => {
        if (!p[n.id]) {
          p[n.id] = n
          p[n.id].amount = 0
        }

        p[n.id].amount += 1

        return p
      }, {})
    )
      .map(([_, product]) => product)
      .map(product => {
        const card = createElement(
          'li',
          {
            class: 'bg-white rounded-md border flex items-center relative',
          },
          createElement(
            'figure',
            { class: 'p-2 flex items-center' },
            createElement('img', {
              class: 'w-8 h-8 rounded-full shadow-sm',
              src: product.image_url,
              alt: product.name,
              title: product.name,
            })
          ),
          createElement(
            'div',
            { class: 'flex-1 flex flex-col items-end' },
            createElement(
              'strong',
              { class: 'text-xs text-right' },
              product.name
            ),
            createElement(
              'div',
              {},
              createElement(
                'span',
                { class: 'text-xs px-2' },
                `${product.amount}x`
              ),
              createElement(
                'span',
                { class: 'text-xs text-green-600' },
                format(product.price)
              )
            )
          ),
          createElement('div', {
            class: 'flex items-center justify-center p-2',
          }),
          createElement(
            'button',
            {
              class:
                'w-4 h-4 bg-red-600 flex justify-center items-center ' +
                'rounded-full shadow text-xs text-white ' +
                'right-0 top-0 absolute',
              onDblclick: () => this.emit('remove', product),
            },
            createElement('i', { class: 'fa fa-times' })
          )
        )

        return card
      })

    this.reference.innerHTML = ''
    this.reference.append(
      ...items,
      createElement(
        'footer',
        { class: 'pt-2 mt-2 border-t border-white flex justify-between' },
        createElement('span', { class: 'text-xs' }, 'Total'),
        createElement('strong', {}, format(0))
      )
    )
  }

  show() {
    this.reference.classList.remove('hidden')
    this.reference.classList.add('grid')
  }

  hide() {
    this.reference.classList.remove('grid')
    this.reference.classList.add('hidden')
  }
}
