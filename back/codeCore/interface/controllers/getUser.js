const GetUser = require('../../useCases/getUser');

const getUserController = (userRepository) => async (req, res) => {
    try {
        const getUser = new GetUser(userRepository);
        const user = await getUser.execute(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getUserController;