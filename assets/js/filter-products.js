class FilterProducts extends Events {
  constructor() {
    super()

    this.filters = [
      {
        key: 'name',
        input: [document.getElementById('product-name')]
      },
      {
        key: 'is-off-sellers',
        input: [document.getElementById('is-off-sellers')],
      },
      {
        key: 'is-free-delivery',
        input: [document.getElementById('is-free-delivery')],
      },
      {
        key: 'brand',
        input: [],
      },
      {
        key: 'condition',
        input: [],
      },
      {
        key: 'category',
        input: [],
      },
      {
        key: 'price',
        input: [
          document.querySelector('[name="min-price"]'),
          document.querySelector('[name="max-price"]'),
        ],
      },
    ]

    this.render()
  }

  async execute() {
    this.data = await getProducts()
    return this.data
  }

  async render() {
    const products = await getProducts()

    this.filters
      .filter(filter => filter.input.length === 0)
      .forEach(filter => {
        const keys = products.map(product => product[filter.key])
        const uniqueKeys = Array.from(new Set(keys))

        const target = document.getElementById(filter.key)
        target.innerHTML = ''
        uniqueKeys.forEach(key => {
          const input = createElement('input', {
            type: 'checkbox',
            name: key,
            'data-key': '',
          })
          const element = createElement(
            'label',
            { class: 'flex items-center' },
            input,
            createElement(
              'span',
              { class: 'text-sm ml-2' },
              strings.camelize(key)
            )
          )

          target.append(element)
          filter.input.push(input)
        })
      })

    this.filters.forEach(filter => {
      filter.input.forEach(input => {
        if (filter.key === 'price') {
          input.oninput = () => this.filter()
        } else {
          input.onchange = () => this.filter()
        }
      })
    })

    document.getElementById('product-name-dispatcher').onclick = () => {
      this.filter()
    }
  }

  filter() {
    const filters = this.filters
      .map(filter => {
        const temp = { key: filter.key, values: [] }
        filter.input
          .map(input => {
            if (input.type === 'checkbox') {
              return input.checked ? input.getAttribute('name') : null
            } else {
              return input.value
            }
          })
          .filter(value => (filter.key === 'price' ? true : !!value))
          .forEach(value => {
            temp.values.push(value)
          })
        return temp
      })
      .filter(filter => filter.values.length > 0)

    const products = this.data.filter(product => {
      return filters.every(filter => {
        if (filter.key === 'is-free-delivery') {
          return product.is_free_delivery
        } else if (filter.key === 'is-off-sellers') {
          return typeof product.original_price !== 'undefined'
        } else if (filter.key === 'price') {
          const min = filter.values[0] || 0
          const max = filter.values[1] || Number.MAX_SAFE_INTEGER
          return product.price >= min && product.price <= max
        } else if(filter.key === 'name') {
          const value = filter.values[0].trim().toLowerCase()
          return product.name.toLowerCase().includes(value)
        } else {
          return filter.values.includes(product[filter.key])
        }
      })
    })

    this.emit('change', products)
  }
}
