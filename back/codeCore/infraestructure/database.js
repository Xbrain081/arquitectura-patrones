const { Sequelize } = require('sequelize');

class Database {
    constructor() {
        if (!Database.instance) {
            this.sequelize = new Sequelize('users_data', 'aprendiz', 'S3Na2024*', {
                host: 'localhost',
                dialect: 'mysql',
            });
            Database.instance = this;
        }
        return Database.instance;
    }
}

module.exports = new Database();