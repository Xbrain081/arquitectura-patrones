const { User } = require('../infrastructure/models');

const deleteUser = async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    await user.destroy();
    return { message: `Usuario con ID ${id} eliminado correctamente` };
};

module.exports = deleteUser;
