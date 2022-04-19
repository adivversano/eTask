
import { httpService } from './http.service'

export const taskService = {
    getByFilter,
    save,
    remove
}

async function getByFilter(filter = {}) {
    try {
        console.log(filter)
        const res = await httpService.get('task/', { filter })
        console.log(res)
        if (res.err) throw res
        return res;
    } catch ({ msg }) {
        throw msg
    }
}

async function save(task) {
    try {
        const res = await httpService.put('task/save', { task })
        if (res.err) throw res
        return res;
    } catch ({ msg }) {
        throw msg
    }
}

async function remove(taskId) {
    try {
        console.log(taskId)
        const res = await httpService.delete('task/remove', { taskId })
        console.log(res)
        if (res.err) throw res
        return res;
    } catch ({ msg }) {
        throw msg
    }
}
