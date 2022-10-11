class FilterProducts {
  constructor() {
    this.filters = [
      {
        key: 'is-off-sellers',
        input: [document.getElementById('is-off-sellers')],
        check(product) {
          return typeof product.original_price === 'number'
        },
      },
      {
        key: 'is-free-delivery',
        input: [document.getElementById('is-free-delivery')],
        check(product) {
          return product.is_free_delivery === true
        },
      },
      {
        key: 'brand',
        input: [],
        check(product) {
          const selected = Array.from(
            document.querySelectorAll(`[data-brand]:checked`)
          )
          const finded = selected.find(brand => brand.name === product.brand)
          return typeof finded !== 'undefined'
        },
      },
      {
        key: 'condition',
        input: [],
        check(product) {
          const selected = Array.from(
            document.querySelectorAll(`[data-condition]:checked`)
          )
          const finded = selected.find(
            condition => condition.name === product.condition
          )
          return typeof finded !== 'undefined'
        },
      },
      {
        key: 'category',
        input: [],
        check(product) {
          const selected = Array.from(
            document.querySelectorAll(`[data-category]:checked`)
          )
          const finded = selected.find(
            category => category.name === product.category
          )
          return typeof finded !== 'undefined'
        },
      },
      {
        key: 'price',
        input: [
          document.querySelector('[name="min-price"]'),
          document.querySelector('[name="max-price"]'),
        ],
        check(product) {
          const min = document.querySelector('[name="min-price"]').value
          const max = document.querySelector('[name="max-price"]').value

          return (
            (!min || product.price >= Number(min)) &&
            (!max || product.price < Number(max))
          )
        },
      },
    ]

    this.render()
  }

  async execute() {
    const data = await getProducts()
    return data
  }

  on(eventName, fn) {
    this.events = { [eventName]: fn }
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
          input.oninput = () => this.filter(filter.key)
        } else {
          input.onchange = () => this.filter(filter.key)
        }
      })
    })
  }

  filter(key) {
    console.log(key)
  }
}
