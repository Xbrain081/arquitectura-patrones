const PartialUpdateUser = require('../../useCases/partialUpdateUser');

const partialUpdateUserController = (userRepository) => async (request, response) => {
    try {
        const partialUpdateUser = new PartialUpdateUser(userRepository);
        const user = await partialUpdateUser.execute(request.params.id, request.body);
        if (!user) return response.status(404).json({ message: 'User not found' });
        response.json(user);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

module.exports = partialUpdateUserController;
