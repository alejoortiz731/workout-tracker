// Datos en memoria para entrenamientos
let workouts = [
    { id: 1, userId: 1, name: 'Rutina de Pecho y Tríceps', durationMinutes: 60, level: 'intermedio' },
    { id: 2, userId: 2, name: 'Cardio HIIT', durationMinutes: 30, level: 'principiante' },
    { id: 3, userId: 1, name: 'Pierna y Abdomen', durationMinutes: 75, level: 'avanzado' }
];

// GET /v1/workouts (soporta req.query: limit y level)
const getWorkouts = (req, res) => {
    const { limit, level } = req.query;
    let result = [...workouts];

    if (level) {
        result = result.filter(w => w.level.toLowerCase() === level.toLowerCase());
    }

    if (limit) {
        result = result.slice(0, parseInt(limit, 10));
    }

    res.status(200).json(result);
};

// GET /v1/workouts/:id (soporta req.params)
const getWorkoutById = (req, res) => {
    const { id } = req.params;
    const workout = workouts.find(w => w.id === parseInt(id, 10));

    if (!workout) {
        return res.status(404).json({
            message: `Entrenamiento con id ${id} no encontrado`
        });
    }

    res.status(200).json(workout);
};

// POST /v1/workouts (soporta req.body y validaciones)
const createWorkout = (req, res) => {
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
};

// PUT /v1/workouts/:id (Actualización completa)
const updateWorkout = (req, res) => {
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
};

// PATCH /v1/workouts/:id (Actualización parcial)
const patchWorkout = (req, res) => {
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
};

// DELETE /v1/workouts/:id
const deleteWorkout = (req, res) => {
    const { id } = req.params;
    const index = workouts.findIndex(w => w.id === parseInt(id, 10));

    if (index === -1) {
        return res.status(404).json({ message: `Entrenamiento con id ${id} no encontrado` });
    }

    workouts.splice(index, 1);
    res.status(204).send();
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