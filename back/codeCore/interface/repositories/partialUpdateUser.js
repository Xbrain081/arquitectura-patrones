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
    async partialUpdate(id, userData) {
        const user = await this.UserModel.update(userData, { where: { id } });
        return user ? new User(id, userData.name, userData.email) : null;
    }
}