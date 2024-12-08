const User = require('../entities/users');

class UserRepository {
    constructor(database) {
        this.database = database;
        this.UserModel = this.database.sequelize.define('User', {
            id: { type: Sequelize.INTEGER, primaryKey: true },
            name: { type: Sequelize.STRING },
            email: { type: Sequelize.STRING },
        });
    }

    async findById(id) {
        const user = await this.UserModel.findByPk(id);
        return user ? new User(user.id, user.name, user.email) : null;
    }

  
}

module.exports = UserRepository;