const GetUser = require('../../useCases/getUser');

const getUserController = (userRepository) => async (request, response) => {
    try {
        const getUser = new GetUser(userRepository); 
        const user = await getUser.execute(request.params.id); 
        if (!user) return response.status(404).json({ message: 'Usuario no encontrado' });
        response.json(user); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getUserController;
