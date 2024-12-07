const { User } = require('../infrastructure/models');

const updateUser = async (id, userData) => {
    const user = await User.findByPk(id);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    await user.update(userData);
    return user;
};

module.exports = updateUser;
