const UpdateUser = require('../../useCases/updateUser');

const updateUserController = (userRepository) => async (req, res) => {
    try {
        const updateUser = new UpdateUser(userRepository);
        const user = await updateUser.execute(req.params.id, req.body);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = updateUserController;
