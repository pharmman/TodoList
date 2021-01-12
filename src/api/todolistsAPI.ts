import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'ea1464d3-6693-4a83-9755-2421f1dd088c'
    }
})

type TodolistType = {
    id: string,
    addedDate: string,
    order: number,
    title: string
}
type TaskType = UpdateTaskRequestPayload & {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

type ResponseTodolistType<T = {}> = {
    data: T
    resultCode: number,
    messages: string[],
    fieldsErrors: []
}

type GetResponseTaskType = {
    items: TaskType[]
    totalCount: number
    error: string
}

type ResponseTaskType<T = {}> = {
    data: T,
    resultCode: number,
    messages: string[]
}

type UpdateTaskRequestPayload = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}


export const APITodolist = {
    getTodolist() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseTodolistType<{ item: TodolistType }>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseTodolistType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseTodolistType>(`todo-lists/${todolistId}`, {title})
    }
}

export const APITasks = {
    getTasks(id: string) {
        return instance.get<GetResponseTaskType>(`todo-lists/${id}/tasks`)
    },
    createTask(data: { id: string, title: string }) {
        return instance.post<ResponseTaskType<{ item: TaskType }>>(`todo-lists/${data.id}/tasks`, {title: data.title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, data: UpdateTaskRequestPayload) {
        return instance.put<ResponseTaskType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, {...data})
    }
}