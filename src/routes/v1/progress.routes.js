const express = require('express');
const router = express.Router();
const {
    getProgress,
    getProgressById,
    createProgress,
    updateProgress,
    patchProgress,
    deleteProgress
} = require('../../controllers/progress.controller');

// Endpoints v1/progress
router.get('/', getProgress);
router.get('/:id', getProgressById);
router.post('/', createProgress);
router.put('/:id', updateProgress);
router.patch('/:id', patchProgress);
router.delete('/:id', deleteProgress);

module.exports = router;