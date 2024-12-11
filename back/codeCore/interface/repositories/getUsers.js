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
}