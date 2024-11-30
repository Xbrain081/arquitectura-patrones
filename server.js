const express = require('express');
const mysql2 = require('mysql2/promise');
const app = express();
const port = 3000;

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'aprendiz',
    password: 'S3Na2024*',
    database: 'users_data'
});

app.use(express.json());

app.get('/', (request, response) => {
    try {
        response.send('¡Hola ADSO Noche!');
    } catch (error) {
        console.error(error);
        response.status(500).json({message: "contacte a soporte"});
    }
});

app.get('/users', async (request, response) => {
    try {
        const [users] = await pool.query('SELECT * FROM users');
        response.json(users);
    } catch (error) {
        console.error(error);
        response.status(500).json({message: "contacte a soporte"});
    }
});

app.get('/user/:id', async (request, response) => {
    try {
        const userId = parseInt(request.params.id);
        const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
        if (user.length === 0) {
            return response.status(404).json({message: "usuario no encontrado"});
        }
        response.json(user);
    } catch (error) {
        console.error(error);
        response.status(500).json({message: "contacte a soporte"});
    }
});

app.post('/users', async (request, response) => {
    try {
        const { name, email, age } = request.body;
    if (!name || !email || !age) {
        return response.status(400).json({message: "Todos los campos son obligatorios"});
    }
    const [newUser] = await pool.query(
        'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
        [name, email, age]
    );
    response.status(201).json({id: newUser.insertId, name, email, age});
    } catch (error) {
        console.error(error);
        response.status(500).json({message: "contacte a soporte"});
    }
});

app.put('/user/:id', async (request, response) => {
    try {
        const userId = parseInt(request.params.id);
        const { name, email, age } = request.body;
        if (!name) {
            return response.status(400).json({ message: "El campo 'name' es obligatorio" });
        } else if (!email) {
            return response.status(400).json({ message: "El campo 'email' es obligatorio" });
        } else if (!age) {
            return response.status(400).json({ message: "El campo 'age' es obligatorio" });
        }
        const [user] = await pool.query(
            'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
            [name, email, age, userId]
        );
        if (user.affectedRows === 0) {
            return response.status(404).json({ message: "Usuario no encontrado" });
        }
        response.json({ id: userId, name, email, age });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Contacte a soporte" });
    }
});

app.patch('/user/:id', async (request, response) => {
    try {
    const userId = parseInt(request.params.id);
    const { name, email, age } = request.body;
    if (!name && !email && !age) {
        return response.status(400).json({message: "no se proporcionaron datos para actualizar"});
    }
        const [result] = await pool.query(
            'UPDATE users SET name = IFNULL(?, name), email = IFNULL(?, email), age = IFNULL(?, age) WHERE id = ?',
            [name, email, age, userId]
        );
        if (result.affectedRows === 0) {
            return response.status(404).json({message: "usuario no encontrado"});
        }
        response.json({id: userId, name, email, age});
    } catch (error) {
        console.error(error);
        response.status(500).json({message: "contacte a soporte"});
    }
});

app.delete('/user/:id', async (request, response) => {
    try {
        const userId = parseInt(request.params.id);
        const [user] = await pool.query('DELETE FROM users WHERE id = ?', [userId]);
        if (user.affectedRows === 0) {
            return response.status(404).json({ message: "usuario no encontrado"});
        }
        response.json({message: `usuario ${userId} ha sido eliminado`});
    } catch (error) {
        console.error(error);
        response.status(500).json({message: "contacte a soporte"});
    }
});

app.listen(port, () => {
    console.log(`servidor activo en http://localhost:${port}`);
});
