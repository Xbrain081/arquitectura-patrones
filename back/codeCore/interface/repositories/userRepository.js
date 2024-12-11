const { DataTypes } = require('sequelize');
const User = require('../../entities/users');

class UserRepository {
    constructor(database) {
        this.database = database;
        this.UserModel = this.database.sequelize.define('User', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: DataTypes.STRING },
            email: { type: DataTypes.STRING }
        });
    }

    async findById(id) {
        const user = await this.UserModel.findByPk(id);
        return user ? new User(user.id, user.name, user.email) : null;
    }

    async findAll() {
        const users = await this.UserModel.findAll();
        return users.map(user => new User(user.id, user.name, user.email));
    }

    async create(userData) {
        const user = await this.UserModel.create(userData);
        return new User(user.id, user.name, user.email);
    }

    async update(id, userData) {
        const user = await this.UserModel.update(userData, { where: { id } });
        return user ? new User(id, userData.name, userData.email) : null;
    }

    async partialUpdate(id, userData) {
        const user = await this.UserModel.update(userData, { where: { id } });
        return user ? new User(id, userData.name, userData.email) : null;
    }

    async delete(id) {
        const result = await this.UserModel.destroy({ where: { id } });
        return result > 0;
    }
}

module.exports = UserRepository;
