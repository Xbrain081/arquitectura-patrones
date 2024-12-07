//configura y conecta la base de datos con Sequelize.
const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');

const defineUserModel = (sequelize) => {
    return sequelize.define('User', {
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        age: { type: DataTypes.INTEGER, allowNull: false }
    }, {
        tableName: 'users', // Nombre de la tabla en la base de datos
        timestamps: false   // No se utilizarán createdAt ni updatedAt
    });
};

module.exports = defineUserModel;
/*Clase Database: Implementa un patrón Singleton para asegurarse de que siempre se use la misma instancia de la conexión a la base de datos en toda la aplicación.
Método getSequelize: Devuelve la instancia de Sequelize para interactuar con la base de datos.
Exportación: Exporta una instancia única de la clase para que pueda ser utilizada en cualquier parte del proyecto.*/