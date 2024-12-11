const DeleteUser = require('../../useCases/deleteUser');

const deleteUserController = (userRepository) => async (request, response) => {
    try {
        const deleteUser = new DeleteUser(userRepository);
        const success = await deleteUser.execute(request.params.id);
        if (!success) return response.status(404).json({ message: 'User not found' });
        response.status(204).end();
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

module.exports = deleteUserController;
