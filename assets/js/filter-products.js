class FilterProducts {
  constructor() {
    this.filters = [
      {
        key: 'is-off-sellers',
        check(product) {
          return typeof product.original_price === 'number'
        },
      },
      {
        key: 'free-delivery',
        check(product) {
          return product.is_free_delivery === true
        },
      },
      {
        key: 'brand',
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
    ]
  }

  async execute() {
    const data = await getProducts()
    return data
  }

  on(eventName, fn) {
    this.events = { [eventName]: fn }
  }
}
