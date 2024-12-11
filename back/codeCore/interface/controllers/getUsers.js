const GetUsers = require('../../useCases/getUsers');

const getUsersController = (userRepository) => async (request, response) => {
    try {
        const getUsers = new GetUsers(userRepository);
        const users = await getUsers.execute();
        response.json(users);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

module.exports = getUsersController;
