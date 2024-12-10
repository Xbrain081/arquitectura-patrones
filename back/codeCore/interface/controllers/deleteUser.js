const DeleteUser = require('../../useCases/deleteUser');

const deleteUserController = (userRepository) => async (req, res) => {
    try {
        const deleteUser = new DeleteUser(userRepository);
        const success = await deleteUser.execute(req.params.id);
        if (!success) return res.status(404).json({ message: 'User not found' });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = deleteUserController;
