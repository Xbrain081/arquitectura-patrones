// clean arquitecture: 
// 1 organizacion de carpetas
// 2 implementar sequelize en el codigo
// 3 mejorar las respuestas del los metodos
// 4 crear frontend 
// rule: - de la rama principal (master) sacar otra rama si se hace una modificacion
//       - se sube la rama creada a git 
//       - se realiza el approbal de los participantes 
//       - se mergea la rama que saco uno de los participantes 

// actividades: 
// dylan: organizacion de carpetas y arquitectura
// daniel: sequelize implemetacion en el codigo y base de datos
// laura: revisar documentacion "clean architecture docs" y estudiar codigo. 

const express = require('express');
const Database = require('./codeCore/infraestructure/database');
const UserRepository = require('./codeCore/interfaces/repositories/userRepository');
const getUserController = require('./codeCore/interfaces/controllers/getUser');

const app = express();
const port = 3000;

//las instancias
const database = new Database();
const userRepository = new UserRepository(Database);

app.get('/user/:id', getUserController(userRepository));

app.listen(port, () => {
    console.log(`servidor activo en http://localhost:${port}`);
});