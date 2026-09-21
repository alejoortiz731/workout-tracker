const express = require('express');
const usersRoutes = require('./routes/v1/users.routes');
const workoutsRoutes = require('./routes/v1/workouts.routes');
const exercisesRoutes = require('./routes/v1/exercises.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Workout Tracker API funcionando'
    });
});

// Rutas versionadas v1
app.use('/v1/users', usersRoutes);
app.use('/v1/workouts', workoutsRoutes);
app.use('/v1/exercises', exercisesRoutes);

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});