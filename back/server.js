// clean arquitecture: 
// 1 organizacion de carpetas
// 2 implementar sequelize en el codigo
// 3 mejorar las respuestas del los metodos
// 4 crear frontend 
// rule: - de la rama principal (master) sacar otra rama si se hace una modificacion
//       - se sube la rama creada a git 
//       - se realiza el approbal de los participantes 
//       - se mergea la rama que saco uno de los participantes 

const express = require('express');
const Database = require('./codeCore/infraestructure/db');
const UserRepository = require('./codeCore/interface/repositories/userRepository');
const getUserController = require('./codeCore/interface/controllers/getUser');
const getUsersController = require('./codeCore/interface/controllers/getUsers');
const createUserController = require('./codeCore/interface/controllers/createUser');
const deleteUserController = require('./codeCore/interface/controllers/deleteUser');
const updateUserController = require('./codeCore/interface/controllers/updateUser');
const partialUpdateUserController = require('./codeCore/interface/controllers/partialUpdateUser');

const app = express();
app.use(express.json());

const port = 3000;

// Instancias para la conexion a la base de datos
const database = new Database();
const userRepository = new UserRepository(database);

// Rutas
app.get('/user/:id', getUserController(userRepository));
app.get('/users', getUsersController(userRepository));
app.post('/user/create', createUserController(userRepository));
app.delete('/user/:id', deleteUserController(userRepository));
app.put('/user/:id', updateUserController(userRepository));
app.patch('/user/:id', partialUpdateUserController(userRepository));

app.listen(port, () => {
    console.log(`Servidor activo en http://localhost:${port}`);
});