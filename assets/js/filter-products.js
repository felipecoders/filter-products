// filter-products.js

class FilterProducts {
  constructor() {
    this.filters = []
  }

  async execute() {
    const data = await getProducts()
    return data
  }

  on(eventName, fn) {
    this.events = { [eventName]: fn }
  }
}
