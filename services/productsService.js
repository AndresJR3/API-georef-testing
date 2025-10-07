const faker = require('faker');

class productsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    for (let i = 0; i < 100; i++) {
      this.products.push({
        id: i + 1,
        image: faker.image.imageUrl(),
        productName: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        price: parseFloat(faker.commerce.price()),
        stock: faker.datatype.number({ min: 0, max: 100 }),
        categoryId: faker.datatype.number({ min: 1, max: 20 }),
        brandId: faker.datatype.number({ min: 1, max: 20 })
      });
    }
  }

  create(data) {
    const newProduct = {
      id: this.products.length + 1,
      ...data
    };
    this.products.push(newProduct);
    return newProduct;
  }

  getAll() {
    return this.products;
  }

  getById(id) {
    return this.products.find(p => p.id === parseInt(id, 10));
  }

  update(id, changes) {
    const index = this.products.findIndex(p => p.id === parseInt(id, 10));
    if (index === -1) throw new Error("Producto no encontrado");

    this.products[index] = {
      ...this.products[index],
      ...changes };
    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex(p => p.id === parseInt(id, 10));
    if (index === -1) throw new Error("Producto no encontrado");

    this.products.splice(index, 1);
    return { message: "Producto eliminado" };
  }
}

module.exports = productsService;
