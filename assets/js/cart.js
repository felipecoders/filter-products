class Cart {
  constructor() {
    this.products = []
    this.badge = document.getElementById('badge')
  }

  addProduct(product) {
    this.products.push(product)
    this.updateBadge()
  }

  removeProduct(product) {
    const index = this.products.findIndex(_ => _.id === product.id)
    this.products.splice(index, 1)
    this.updateBadge()
  }

  updateBadge() {
    this.badge.innerHTML = this.products.length
    this.badge.hidden = this.products.length === 0
  }
}
