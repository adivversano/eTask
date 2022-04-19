
const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');

async function save(task) {
    try {
        let {
            id = null,
            title = null,
            description = null,
            status = null,
            deadline = null,
            createdAt = null
        } = task;
        let res;
        if (task.id) {
            // UPDATE
            res = await dbService.query(`
                UPDATE task
                SET title = '${title}',
                description = '${description}',
                status = '${status}',
                deadline = '${new Date(deadline).toISOString()}'
                WHERE id = ${id};
            `)
        } else {
            // CREATE
            res = await dbService.query(`
                INSERT INTO task (title, description, status, deadline, createdAt)
                VALUES ('${title}', '${description}', '${status}', '${new Date(deadline).toISOString()}', '${new Date(createdAt).toISOString()}');
            `)
        }
        return res.rowsAffected[0] > 0;
    } catch (err) {
        logger.error('Failed to save task', err)
        throw err
    }
}

async function getByFilter({
    page = 1,
    amount = 10,
    sort = {
        by: 'createdAt',
        type: 'descending'
    },
    date = {
        by: 'deadline',
        from: null,
        to: null
    }
}) {
    try {
        const res = await dbService.query(`
            SELECT
            ROW_NUMBER() OVER(ORDER BY ${sort.by} ${sort?.type === 'ascending' ? 'ASC' : 'DESC'}) AS idx,
            id,
            title,
            description,
            status,
            deadline,
            createdAt
            FROM task
            WHERE (${date?.from ? `'${date?.from}'` : date?.from} IS NULL OR ${date.by} >= '${new Date(date?.from).toISOString()}' )
            AND (${date?.to ? `'${date?.to}'` : date?.to} IS NULL OR ${date.by} <= '${new Date(date?.to).toISOString()}' )
            ORDER BY ${sort.by} ${sort?.type === 'ascending' ? 'ASC' : 'DESC'}
            OFFSET (${amount} * (${page} - 1)) ROWS FETCH NEXT ${amount} ROWS ONLY;
        `);

        return res.recordset;
    } catch (err) {
        logger.error('Failed to get tasks', err)
        throw err
    }
}

async function getTasksInfo({ date = {
    by: 'deadline',
    from: null,
    to: null
} }) {
    try {
        const { by, from, to } = date;
        const res = await dbService.query(`
            SELECT COUNT(*) as length,
            SUM(CASE WHEN status = 'done' THEN 1 ELSE 0 END) AS doneCount,
            SUM(CASE WHEN status = 'inProgress' THEN 1 ELSE 0 END) AS inProgressCount,
            SUM(CASE WHEN status = 'notStarted' THEN 1 ELSE 0 END) AS notStartedCount,
            COUNT(CASE WHEN (${from ? `'${from}'` : from} IS NULL OR ${by} >= '${new Date(from).toISOString()}') AND (${to ? `'${to}'` : to} IS NULL OR ${by} <= '${new Date(to).toISOString()}') THEN 1 ELSE NULL END) AS filteredLength
            FROM task;
        `);

        return res.recordset[0];
    } catch (err) {
        logger.error('Failed to get tasks', err);
        throw err;
    }
}
async function remove(taskId) {
    try {

        const task = await _getById(taskId);
        const sixDaysMs = 1000 * 60 * 60 * 24 * 6
        if (!task) return Promise.reject({ err: true, msg: 'Task not found.' });
        if (Date.parse(task?.deadline) - sixDaysMs > Date.now()) {
            return Promise.reject({ err: true, msg: 'You can not delete task with due date larger than 6 days.' });
        }

        const res = await dbService.query(`
        DELETE FROM task
        WHERE id = ${taskId}
        `)

        return res?.rowsAffected[0];

    } catch (err) {
        logger.error('Failed to get tasks', err);
        throw err;
    }
}

async function _getById(taskId) {
    try {
        const res = await dbService.query(`
        SELECT * FROM task
        WHERE id = ${taskId}
        `)
        return res.recordset[0]
    } catch (err) {
        logger.error('Failed to get task', err)
        throw err
    }
}

module.exports = {
    getByFilter,
    getTasksInfo,
    save,
    remove
}