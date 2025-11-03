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

  async create(data) {
    const newProduct = {
      id: this.products.length + 1,
      ...data
    };
    this.products.push(newProduct);
    return newProduct;
  }

  // hacer que la llamada tome 10 segundos
  async getAll() {
    // return this.products;
    // anadimos la nueva promise para
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 10000);
    })
  }

  async getById(id) {
    //creamos una constante para hacer llamado a una funcion que no existe
    return this.products.find(p => p.id === parseInt(id, 10));
  }

  async update(id, changes) {
    const index = this.products.findIndex(p => p.id === parseInt(id, 10));
    if (index === -1) throw new Error("Producto no encontrado");

    this.products[index] = {
      ...this.products[index],
      ...changes };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(p => p.id === parseInt(id, 10));
    if (index === -1) throw new Error("Producto no encontrado");

    this.products.splice(index, 1);
    return { message: "Producto eliminado" };
  }
}

module.exports = productsService;

/*

1. Procesar solicitud -> Permite manipular y gestionar las solicitudes de entrada antes de que lleguen a
  los manejadores de rutas (endponts)

2. Respuesta: Pueden modificar las respuestas antes de que evnien de vuelta al cliente

3. Encadenar tareas: Permiten encadenar una serie de funciones que se ejecutan en orden,
  cada una de las cuales puede realizar una tarea específica

4. Control de flujo: Permite determinar si se deebe continuar con el siguiente middleware o
  manejador de ruta, o si se debe cortar la cadena de middlewares.

  function(req, res, next) {
  if (condition) {
  res.send('Condición cumplida');
  } else {
  next();
  }

*/
