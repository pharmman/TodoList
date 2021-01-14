import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'ea1464d3-6693-4a83-9755-2421f1dd088c'
    }
})

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TodolistType = {
    id: string,
    addedDate: string,
    order: number,
    title: string
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}


type ResponseTodolistType<T = {}> = {
    data: T
    resultCode: number,
    messages: string[],
    fieldsErrors: []
}

type GetTaskResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}

type ResponseTaskType<T = {}> = {
    data: T,
    resultCode: number,
    messages: string[]
}

type UpdateTaskModelType = {
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
        return instance.get<GetTaskResponseType>(`todo-lists/${id}/tasks`)
    },
    createTask(data: { id: string, title: string }) {
        return instance.post<ResponseTaskType<{ item: TaskType }>>(`todo-lists/${data.id}/tasks`, {title: data.title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, data: UpdateTaskModelType) {
        return instance.put<ResponseTaskType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, data)
    }
}