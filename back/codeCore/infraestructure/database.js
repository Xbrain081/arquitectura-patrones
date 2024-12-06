const { Sequelize } = require('sequelize');

class Database {
    constructor() {
        if (!Database.instance) {
            this.sequelize = new Sequelize('mysql://root:S3Na2024*@localhost:3306/usersAdmin');
            Database.instance = this;
        }  
        return Database.instance;
    }

    getsequelize () {
        return this.sequelize;
    }
}

module.exports = new Database();