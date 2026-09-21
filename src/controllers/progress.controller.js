// Datos en memoria para progreso
let progressLogs = [
    { id: 1, userId: 1, workoutId: 1, weightKg: 75.5, repsCompleted: 10, date: '2026-09-15' },
    { id: 2, userId: 1, workoutId: 2, weightKg: 0, repsCompleted: 15, date: '2026-09-18' },
    { id: 3, userId: 2, workoutId: 3, weightKg: 60.0, repsCompleted: 8, date: '2026-09-20' }
];

// GET /v1/progress (soporta req.query: limit y userId)
const getProgress = (req, res) => {
    const { limit, userId } = req.query;
    let result = [...progressLogs];

    if (userId) {
        result = result.filter(p => p.userId === parseInt(userId, 10));
    }

    if (limit) {
        result = result.slice(0, parseInt(limit, 10));
    }

    res.status(200).json(result);
};

// GET /v1/progress/:id (soporta req.params)
const getProgressById = (req, res) => {
    const { id } = req.params;
    const log = progressLogs.find(p => p.id === parseInt(id, 10));

    if (!log) {
        return res.status(404).json({
            message: `Registro de progreso con id ${id} no encontrado`
        });
    }

    res.status(200).json(log);
};

// POST /v1/progress (soporta req.body y validaciones)
const createProgress = (req, res) => {
    const { userId, workoutId, weightKg, repsCompleted, date } = req.body;

    if (!userId || !workoutId || repsCompleted === undefined) {
        return res.status(400).json({
            message: 'userId, workoutId y repsCompleted son obligatorios'
        });
    }

    const newLog = {
        id: progressLogs.length ? progressLogs[progressLogs.length - 1].id + 1 : 1,
        userId: parseInt(userId, 10),
        workoutId: parseInt(workoutId, 10),
        weightKg: weightKg !== undefined ? parseFloat(weightKg) : 0,
        repsCompleted: parseInt(repsCompleted, 10),
        date: date || new Date().toISOString().split('T')[0]
    };

    progressLogs.push(newLog);

    res.status(201).json({
        message: 'Registro de progreso creado exitosamente',
        data: newLog
    });
};

// PUT /v1/progress/:id (Actualización completa)
const updateProgress = (req, res) => {
    const { id } = req.params;
    const { userId, workoutId, weightKg, repsCompleted, date } = req.body;
    const index = progressLogs.findIndex(p => p.id === parseInt(id, 10));

    if (index === -1) {
        return res.status(404).json({ message: `Registro de progreso con id ${id} no encontrado` });
    }

    if (!userId || !workoutId || repsCompleted === undefined || !date) {
        return res.status(400).json({
            message: 'Todos los campos (userId, workoutId, weightKg, repsCompleted, date) son requeridos para PUT'
        });
    }

    progressLogs[index] = {
        id: parseInt(id, 10),
        userId: parseInt(userId, 10),
        workoutId: parseInt(workoutId, 10),
        weightKg: parseFloat(weightKg),
        repsCompleted: parseInt(repsCompleted, 10),
        date
    };

    res.status(200).json({
        message: 'Registro de progreso actualizado completamente',
        data: progressLogs[index]
    });
};

// PATCH /v1/progress/:id (Actualización parcial)
const patchProgress = (req, res) => {
    const { id } = req.params;
    const index = progressLogs.findIndex(p => p.id === parseInt(id, 10));

    if (index === -1) {
        return res.status(404).json({ message: `Registro de progreso con id ${id} no encontrado` });
    }

    progressLogs[index] = {
        ...progressLogs[index],
        ...req.body
    };

    res.status(200).json({
        message: 'Registro de progreso actualizado parcialmente',
        data: progressLogs[index]
    });
};

// DELETE /v1/progress/:id
const deleteProgress = (req, res) => {
    const { id } = req.params;
    const index = progressLogs.findIndex(p => p.id === parseInt(id, 10));

    if (index === -1) {
        return res.status(404).json({ message: `Registro de progreso con id ${id} no encontrado` });
    }

    progressLogs.splice(index, 1);
    res.status(204).send();
};

module.exports = {
    progressLogs,
    getProgress,
    getProgressById,
    createProgress,
    updateProgress,
    patchProgress,
    deleteProgress
};