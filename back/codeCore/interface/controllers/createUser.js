const CreateUser = require('../../useCases/createUser');

const createUserController = (userRepository) => async (req, res) => {
    try {
        const createUser = new CreateUser(userRepository);
        const user = await createUser.execute(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = createUserController;
