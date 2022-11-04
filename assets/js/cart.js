class Cart extends Events {
  constructor() {
    super()

    this.products = []
    this.badge = document.getElementById('badge')
    this.reference = document.getElementById('button-open-cart')
    this.cartListModal = new CartListModal()

    this.reference.onclick = () => {
      this.cartListModal.show()
    }

    this.reference.ondblclick = () => {
      window.location.href = 'cart.html'
    }

    this.cartListModal.on('remove', product => {
      this.removeProduct(product)
    })

    this.reference.parentElement.append(this.cartListModal.getElement())
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
    this.cartListModal.render(this.products)
  }
}
