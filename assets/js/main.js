const renderProducts = new RenderProducts()
const filterProducts = new FilterProducts()
const cart = new Cart()

filterProducts.execute().then(products => renderProducts.render(products))

filterProducts.on('change', products => renderProducts.render(products))

renderProducts.on('click', product => cart.addProduct(product))
