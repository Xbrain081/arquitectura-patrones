const UserRepository = require('../repositories/UserRepository');

const getUserById = async (id) => {
    const user = await UserRepository.getUserById(id);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    return user;
};

module.exports = getUserById;
