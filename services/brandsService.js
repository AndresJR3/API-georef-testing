const faker = require('faker');

class BrandsService {
  constructor() {
    this.brands = [];
    this.generate();
  }

  generate() {
    for (let i = 0; i < 100; i++) {
      this.brands.push({
        id: i + 1,
        brandName: faker.company.companyName(),
        description: faker.commerce.productDescription(),
        active: faker.datatype.boolean(),
      });
    }
  }

  create(data) {
    const newBrand = {
      id: this.brands.length + 1,
      ...data,
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  getAll() {
    return this.brands;
  }

  getById(id) {
    return this.brands.find(b => b.id === parseInt(id, 10));
  }

  update(id, changes) {
    const index = this.brands.findIndex(b => b.id === parseInt(id, 10));
    if (index === -1) throw new Error("Brand not found");
    this.brands[index] = { ...this.brands[index], ...changes };
    return this.brands[index];
  }

  delete(id) {
    const index = this.brands.findIndex(b => b.id === parseInt(id, 10));
    if (index === -1) throw new Error("Brand not found");
    this.brands.splice(index, 1);
    return { message: "Brand deleted" };
  }
}

module.exports = BrandsService;
