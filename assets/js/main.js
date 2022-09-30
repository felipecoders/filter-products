const renderProducts = new RenderProducts()
const filterProducts = new FilterProducts()

filterProducts.execute().then(products => renderProducts.render(products))

filterProducts.on('change', products => renderProducts.render(products))
