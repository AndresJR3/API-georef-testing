const faker = require('faker');

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  // Generar usuarios falsos
  generate() {
    for (let i = 0; i < 100; i++) {
      this.users.push({
        id: i + 1,
        name: faker.name.firstName(),
        username: faker.internet.userName(),
        password: faker.internet.password()
      });
    }
  }

  // Crear nuevo usuario
  create(data) {
    const exists = this.users.some(u => u.username === data.username);
    if (exists) {
      throw new Error("El nombre de usuario ya existe");
    }

    const newUser = {
      id: this.users.length + 1,
      ...data
    };
    this.users.push(newUser);
    return newUser;
  }

  // Obtener todos los usuarios
  getAll() {
    return this.users;
  }

  // Obtener un usuario por ID
  getById(id) {
    return this.users.find(u => u.id === parseInt(id, 10));
  }

  // Actualizar usuario por ID (acepta cambios parciales)
  update(id, changes) {
    const index = this.users.findIndex(u => u.id === parseInt(id, 10));
    if (index === -1) throw new Error("Usuario no encontrado");

    this.users[index] = {
      ...this.users[index],
      ...changes
    };
    return this.users[index];
  }

  // Eliminar usuario por ID
  deleteById(id) {
    const index = this.users.findIndex(u => u.id === parseInt(id, 10));
    if (index === -1) throw new Error("Usuario no encontrado");

    this.users.splice(index, 1);
    return { message: "Usuario eliminado" };
  }
}

module.exports = UsersService;
