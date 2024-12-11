const CreateUser = require('../../useCases/createUser');

const createUserController = (userRepository) => async (request, response) => {
    try {
        const createUser = new CreateUser(userRepository);
        const user = await createUser.execute(request.body);
        response.status(201).json(user);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

module.exports = createUserController;
