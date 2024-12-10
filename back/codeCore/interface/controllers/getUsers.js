const GetUsers = require('../../useCases/getUsers');

const getUsersController = (userRepository) => async (req, res) => {
    try {
        const getUsers = new GetUsers(userRepository);
        const users = await getUsers.execute();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getUsersController;
