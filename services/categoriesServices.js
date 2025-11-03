const faker = require("faker");

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  // Generar categorías falsas
  generate() {
    for (let i = 0; i < 100; i++) {
      this.categories.push({
        id: i + 1,
        categoryName: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        active: faker.datatype.boolean(),
      });
    }
  }

  async getAll() {
    return this.categories;
  }

  async getById(id) {
    return this.categories.find(c => c.id === parseInt(id, 10));
  }

  async create(data) {
    const newCategory = {
      id: this.categories.length + 1,
      ...data
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  async update(id, changes) {
    const index = this.categories.findIndex(c => c.id === parseInt(id, 10));
    if (index === -1) throw new Error("Categoría no encontrada");

    this.categories[index] = {
      ...this.categories[index],
      ...changes
    };
    return this.categories[index];
  }

  async deleteById(id) {
    const index = this.categories.findIndex(c => c.id === parseInt(id, 10));
    if (index === -1) throw new Error("Categoría no encontrada");

    const deleted = this.categories.splice(index, 1);
    return { message: "Categoría eliminada", category: deleted[0] };
  }
}

module.exports = CategoriesService;
