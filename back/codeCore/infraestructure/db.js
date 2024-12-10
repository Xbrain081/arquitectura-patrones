const { Sequelize, DataTypes } = require('sequelize');

class Database {
    constructor() {
        this.sequelize = new Sequelize('user_models', 'aprendiz', 'S3Na2024*', {
            host: 'localhost',
            dialect: 'mysql'//3306, PostgreSQL: 5432, Microsoft SQL Server:1433
          //port: 3006 en caso de q sea un puerto diferente al q se usa por defecto
        });
        this.connect();
    }

    async connect() {
        try {
            await this.sequelize.authenticate();
            console.log('Database connected');
            
            // Sincroniza todos los modelos
            await this.sequelize.sync({ alter: true }); // Crea o actualiza tablas automáticamente
            console.log('All models were synchronized successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

module.exports = Database;

