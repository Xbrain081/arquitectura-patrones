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
// dylon: organizacion de carpetas y arquitectura
// daniel: sequelize implemetacion en el codigo y base de datos
// laura: revisar documentacion "clean architecture docs" y estudiar codigo. 



const express = require('express');
const { connectDatabase } = require('./infrastructure/database');
const getAllUsers = require('./useCases/getAllUsers');
const getUserById = require('./useCases/getUserById');
const createUser = require('./useCases/createUser');
const updateUser = require('./useCases/updateUser');
const deleteUser = require('./useCases/deleteUser');

const app = express();
app.use(express.json());

app.get('/users', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error del servidor" });
    }
});

app.get('/user/:id', async (req, res) => {
    try {
        const user = await getUserById(parseInt(req.params.id));
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message });
    }
});

app.post('/users', async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

app.put('/user/:id', async (req, res) => {
    try {
        const updatedUser = await updateUser(parseInt(req.params.id), req.body);
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message });
    }
});

app.delete('/user/:id', async (req, res) => {
    try {
        const result = await deleteUser(parseInt(req.params.id));
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message });
    }
});

// Iniciar el servidor
const PORT = 3001;
connectDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
});
