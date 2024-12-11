const UpdateUser = require('../../useCases/updateUser');

const updateUserController = (userRepository) => async (request, response) => {
    try {
        const updateUser = new UpdateUser(userRepository);
        const user = await updateUser.execute(request.params.id, request.body);
        if (!user) return response.status(404).json({ message: 'User not found' });
        response.json(user);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

module.exports = updateUserController;
