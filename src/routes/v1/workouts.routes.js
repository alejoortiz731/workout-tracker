const express = require('express');
const router = express.Router();
const {
    getWorkouts,
    getWorkoutById,
    createWorkout,
    updateWorkout,
    patchWorkout,
    deleteWorkout
} = require('../../controllers/workouts.controller');

// Endpoints v1/workouts
router.get('/', getWorkouts);
router.get('/:id', getWorkoutById);
router.post('/', createWorkout);
router.put('/:id', updateWorkout);
router.patch('/:id', patchWorkout);
router.delete('/:id', deleteWorkout);

module.exports = router;