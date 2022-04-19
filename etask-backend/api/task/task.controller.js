
const logger = require('../../services/logger.service');
const { isDateType } = require('../../services/utils.service');
const { save, remove, getByFilter, getTasksInfo } = require('./task.service');

async function saveTask(req, res) {
    try {
        const { task } = req.body;
        if (!('title' in task && 'deadline' in task && 'status' in task) ||
            !(typeof task.title === 'string' &&
                isDateType(task.deadline) &&
                typeof task.status === 'string')) {
            throw { err: true, msg: 'Parameters are not valid.' };
        }
        const success = await save(task);
        res.json(success);
    } catch (err) {
        logger.error('Failed to save task', err);
        res.json(err);
    }
}
async function getTasks(req, res) {
    try {
        const filter = req.query?.filter && JSON.parse(req.query.filter) || {};
        const tasks = await getByFilter(filter);
        const tasksInfo = await getTasksInfo(filter);
        res.json({ tasks, tasksInfo });
    } catch (err) {
        logger.error('Failed to get tasks', err);
        res.json(err);
    }
}
async function removeTask(req, res) {
    try {
        const { taskId } = req.body;
        const success = await remove(taskId);
        res.json(success);
    } catch (err) {
        logger.error('Failed to delete task', err);
        res.json(err);
    }
}

module.exports = {
    getTasks,
    saveTask,
    removeTask
}
