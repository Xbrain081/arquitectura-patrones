//Define el modelo User con Sequelize.
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
/* Modelo User: Define los campos y su tipo de datos (name, email, age).
Configuración:
tableName: Define el nombre de la tabla en la base de datos.
timestamps: Desactiva las columnas createdAt y updatedAt.
Exportación: Exporta el modelo para que pueda ser utilizado por otros archivos*/  