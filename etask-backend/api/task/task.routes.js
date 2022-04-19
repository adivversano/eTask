const express = require('express')
const { saveTask, getTasks, removeTask } = require('./task.controller')

const router = express.Router()

router.get('/', getTasks);
router.put('/save', saveTask);
router.delete('/remove', removeTask);

module.exports = router