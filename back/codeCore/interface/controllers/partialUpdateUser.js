const PartialUpdateUser = require('../../useCases/partialUpdateUser');

const partialUpdateUserController = (userRepository) => async (req, res) => {
    try {
        const partialUpdateUser = new PartialUpdateUser(userRepository);
        const user = await partialUpdateUser.execute(req.params.id, req.body);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = partialUpdateUserController;
