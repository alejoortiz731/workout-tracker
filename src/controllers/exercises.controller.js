// Datos en memoria para ejercicios
let exercises = [
    { id: 1, name: 'Press de Banca', muscleGroup: 'pecho', equipment: 'barra' },
    { id: 2, name: 'Sentadilla Libre', muscleGroup: 'pierna', equipment: 'barra' },
    { id: 3, name: 'Dominadas', muscleGroup: 'espalda', equipment: 'peso corporal' }
];

// GET /v1/exercises (soporta req.query: limit y muscleGroup)
const getExercises = (req, res) => {
    const { limit, muscleGroup } = req.query;
    let result = [...exercises];

    if (muscleGroup) {
        result = result.filter(e => e.muscleGroup.toLowerCase() === muscleGroup.toLowerCase());
    }

    if (limit) {
        result = result.slice(0, parseInt(limit, 10));
    }

    res.status(200).json(result);
};

// GET /v1/exercises/:id (soporta req.params)
const getExerciseById = (req, res) => {
    const { id } = req.params;
    const exercise = exercises.find(e => e.id === parseInt(id, 10));

    if (!exercise) {
        return res.status(404).json({
            message: `Ejercicio con id ${id} no encontrado`
        });
    }

    res.status(200).json(exercise);
};

// POST /v1/exercises (soporta req.body y validaciones)
const createExercise = (req, res) => {
    const { name, muscleGroup, equipment } = req.body;

    if (!name || !muscleGroup) {
        return res.status(400).json({
            message: 'El nombre (name) y el grupo muscular (muscleGroup) son obligatorios'
        });
    }

    const newExercise = {
        id: exercises.length ? exercises[exercises.length - 1].id + 1 : 1,
        name,
        muscleGroup,
        equipment: equipment || 'ninguno'
    };

    exercises.push(newExercise);

    res.status(201).json({
        message: 'Ejercicio creado exitosamente',
        data: newExercise
    });
};

// PUT /v1/exercises/:id (Actualización completa)
const updateExercise = (req, res) => {
    const { id } = req.params;
    const { name, muscleGroup, equipment } = req.body;
    const index = exercises.findIndex(e => e.id === parseInt(id, 10));

    if (index === -1) {
        return res.status(404).json({ message: `Ejercicio con id ${id} no encontrado` });
    }

    if (!name || !muscleGroup || !equipment) {
        return res.status(400).json({
            message: 'Todos los campos (name, muscleGroup, equipment) son requeridos para PUT'
        });
    }

    exercises[index] = {
        id: parseInt(id, 10),
        name,
        muscleGroup,
        equipment
    };

    res.status(200).json({
        message: 'Ejercicio actualizado completamente',
        data: exercises[index]
    });
};

// PATCH /v1/exercises/:id (Actualización parcial)
const patchExercise = (req, res) => {
    const { id } = req.params;
    const index = exercises.findIndex(e => e.id === parseInt(id, 10));

    if (index === -1) {
        return res.status(404).json({ message: `Ejercicio con id ${id} no encontrado` });
    }

    exercises[index] = {
        ...exercises[index],
        ...req.body
    };

    res.status(200).json({
        message: 'Ejercicio actualizado parcialmente',
        data: exercises[index]
    });
};

// DELETE /v1/exercises/:id
const deleteExercise = (req, res) => {
    const { id } = req.params;
    const index = exercises.findIndex(e => e.id === parseInt(id, 10));

    if (index === -1) {
        return res.status(404).json({ message: `Ejercicio con id ${id} no encontrado` });
    }

    exercises.splice(index, 1);
    res.status(204).send();
};

module.exports = {
    exercises,
    getExercises,
    getExerciseById,
    createExercise,
    updateExercise,
    patchExercise,
    deleteExercise
};