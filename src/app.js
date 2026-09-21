const express = require('express');

const usersRoutes = require('./routes/v1/users.routes');

const app = express();

const PORT = process.env.PORT || 3000;

// Permite recibir datos en formato JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Workout Tracker API funcionando'
    });
});

// Rutas de usuarios
app.use('/v1/users', usersRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});