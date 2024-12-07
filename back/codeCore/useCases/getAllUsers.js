const UserRepository = require('../repositories/UserRepository');

const getAllUsers = async () => {
    return await UserRepository.getAllUsers();
};

module.exports = getAllUsers;
