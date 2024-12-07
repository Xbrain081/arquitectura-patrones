const UserRepository = require('../repositories/UserRepository');

const createUser = async (userData) => {
    const { name, email, age } = userData;
    if (!name || !email || !age) {
        throw new Error('Todos los campos son obligatorios');
    }
    return await UserRepository.createUser(userData);
};

module.exports = createUser;
