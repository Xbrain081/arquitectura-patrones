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



const { Sequelize, DataTypes } = require('sequelize');

// Configura Sequelize 
const sequelize = new Sequelize('users_data', 'aprendiz', 'S3Na2024*', {
    host: 'localhost',
    dialect: 'mysql'
});

// Define el modelo User
const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false }
}, {
    tableName: 'users', // Nombre de la tabla 
    timestamps: false // Si no tienes columnas createdAt/updatedAt
});

// bloque de codigo que cambia sequelize
app.get('/users', async (request, response) => {
    try {
//se utiliza para obtener todos los registros de la tabla correspondiente al modelo User
//usamos await para que el código espere la respuesta antes de continuar
//findAll() devolverá todos los usuarios sin ningún filtro.
        const users = await User.findAll(); 
        response.json(users);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Contacte a soporte" });
    }
});

// Obtener un usuario por ID
app.get('/user/:id', async (request, response) => {
    try {
//convertimos el id en numero entero usando parseint
//request.params.id: Accede al valor del parámetro id que fue enviado en la URL.
        const userId = parseInt(request.params.id);
        const user = await User.findByPk(userId); 
//la búsqueda se guarda en la variable user
        if (!user) {
            return response.status(404).json({ message: "Usuario no encontrado" });
        }
        response.json(user);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Contacte a soporte" });
    }
});


app.post('/users', async (request, response) => {
    try {
        const { name, email, age } = request.body;
        if (!name || !email || !age) {
            return response.status(400).json({ message: "Todos los campos son obligatorios" });
        }
        const newUser = await User.create({ name, email, age }); // Corregido
        response.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Contacte a soporte" });
    }
});

// Actualizar un usuario completamente
app.put('/user/:id', async (request, response) => {
    try {
        const userId = parseInt(request.params.id);
        const { name, email, age } = request.body;
        const user = await User.findByPk(userId);
        if (!user) {
            return response.status(404).json({ message: "Usuario no encontrado" });
        }
        await user.update({ name, email, age }); // Corregido
        response.json(user);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Contacte a soporte" });
    }
});

// Actualizar parcialmente un usuario
app.patch('/user/:id', async (request, response) => {
    try {
        const userId = parseInt(request.params.id);
        const { name, email, age } = request.body;
        const user = await User.findByPk(userId);
        if (!user) {
            return response.status(404).json({ message: "Usuario no encontrado" });
        }
        await user.update({ name, email, age }, { fields: ['name', 'email', 'age'] });
        response.json(user);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Contacte a soporte" });
    }
});

// Eliminar un usuario
app.delete('/user/:id', async (request, response) => {
    try {
        const userId = parseInt(request.params.id); // Cambiado a User (mayúscula)
        const user = await User.findByPk(userId);
        if (!user) {
            return response.status(404).json({ message: "Usuario no encontrado" });
        }
        await user.destroy();
        response.json({ message: `Usuario con ID ${userId} eliminado correctamente` });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Contacte a soporte" });
    }
});

// Iniciar servidor
const port = 3001;
app.listen(port, () => {
    console.log(`Servidor activo en http://localhost:${port}`);
});