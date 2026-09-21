// Datos en memoria para entrenamientos
let workouts = [
    { id: 1, userId: 1, name: 'Rutina de Pecho y Tríceps', durationMinutes: 60, level: 'intermedio' },
    { id: 2, userId: 2, name: 'Cardio HIIT', durationMinutes: 30, level: 'principiante' },
    { id: 3, userId: 1, name: 'Pierna y Abdomen', durationMinutes: 75, level: 'avanzado' }
];

// GET /v1/workouts (soporta req.query: limit y level)
const getWorkouts = (req, res) => {
    try {
        const { limit, level } = req.query;
        let result = [...workouts];

        if (level) {
            result = result.filter(w => w.level.toLowerCase() === level.toLowerCase());
        }

        if (limit) {
            result = result.slice(0, parseInt(limit, 10));
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// GET /v1/workouts/:id (soporta req.params)
const getWorkoutById = (req, res) => {
    try {
        const { id } = req.params;
        const workout = workouts.find(w => w.id === parseInt(id, 10));

        if (!workout) {
            return res.status(404).json({
                message: `Entrenamiento con id ${id} no encontrado`
            });
        }

        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// POST /v1/workouts (soporta req.body y validaciones)
const createWorkout = (req, res) => {
    try {
        // Validar si req.body existe o está vacío
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ 
                message: 'El cuerpo de la petición está vacío. Selecciona formato JSON en el Body de Thunder Client.' 
            });
        }

        const { userId, name, durationMinutes, level } = req.body;

        if (!userId || !name || !durationMinutes) {
            return res.status(400).json({
                message: 'userId, name y durationMinutes son obligatorios'
            });
        }

        const newWorkout = {
            id: workouts.length ? workouts[workouts.length - 1].id + 1 : 1,
            userId: parseInt(userId, 10),
            name,
            durationMinutes: parseInt(durationMinutes, 10),
            level: level || 'principiante'
        };

        workouts.push(newWorkout);

        res.status(201).json({
            message: 'Entrenamiento creado exitosamente',
            data: newWorkout
        });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// PUT /v1/workouts/:id (Actualización completa)
const updateWorkout = (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'El cuerpo de la petición está vacío' });
        }

        const { id } = req.params;
        const { userId, name, durationMinutes, level } = req.body;
        const index = workouts.findIndex(w => w.id === parseInt(id, 10));

        if (index === -1) {
            return res.status(404).json({ message: `Entrenamiento con id ${id} no encontrado` });
        }

        if (!userId || !name || !durationMinutes || !level) {
            return res.status(400).json({
                message: 'Todos los campos (userId, name, durationMinutes, level) son requeridos para PUT'
            });
        }

        workouts[index] = {
            id: parseInt(id, 10),
            userId: parseInt(userId, 10),
            name,
            durationMinutes: parseInt(durationMinutes, 10),
            level
        };

        res.status(200).json({
            message: 'Entrenamiento actualizado completamente',
            data: workouts[index]
        });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// PATCH /v1/workouts/:id (Actualización parcial)
const patchWorkout = (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'El cuerpo de la petición está vacío' });
        }

        const { id } = req.params;
        const index = workouts.findIndex(w => w.id === parseInt(id, 10));

        if (index === -1) {
            return res.status(404).json({ message: `Entrenamiento con id ${id} no encontrado` });
        }

        workouts[index] = {
            ...workouts[index],
            ...req.body
        };

        res.status(200).json({
            message: 'Entrenamiento actualizado parcialmente',
            data: workouts[index]
        });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// DELETE /v1/workouts/:id
const deleteWorkout = (req, res) => {
    try {
        const { id } = req.params;
        const index = workouts.findIndex(w => w.id === parseInt(id, 10));

        if (index === -1) {
            return res.status(404).json({ message: `Entrenamiento con id ${id} no encontrado` });
        }

        workouts.splice(index, 1);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

module.exports = {
    workouts,
    getWorkouts,
    getWorkoutById,
    createWorkout,
    updateWorkout,
    patchWorkout,
    deleteWorkout
};