//Define el modelo User con Sequelize.
const { User } = require('../infrastructure/models');

class UserRepository {
    // Obtener todos los usuarios
    async getAllUsers() {
        return await User.findAll();
    }

    // Obtener un usuario por ID
    async getUserById(id) {
        return await User.findByPk(id);
    }

    // Crear un nuevo usuario
    async createUser(userData) {
        return await User.create(userData);
    }

    // Actualizar un usuario
    async updateUser(id, userData) {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return await user.update(userData);
    }

    // Eliminar un usuario
    async deleteUser(id) {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        await user.destroy();
        return { message: `Usuario con ID ${id} eliminado correctamente` };
    }
}

module.exports = new UserRepository();
/* Clase UserRepository:
Contiene métodos para interactuar con el modelo User:
getAllUsers: Obtiene todos los registros de usuarios.
getUserById: Obtiene un usuario específico por su ID.
createUser: Crea un nuevo usuario en la base de datos.
updateUser: Actualiza los datos de un usuario existente.
deleteUser: Elimina un usuario por ID.
Exportación: Se exporta una instancia única del repositorio. */