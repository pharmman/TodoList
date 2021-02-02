import axios from 'axios';
import {EntityStatusType} from '../components/features/TodolistsList/Todolist/todolist-reducer';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'ea1464d3-6693-4a83-9755-2421f1dd088c'
    }
})

//types
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

export enum ResultCodes {
    Success = 0,
    Error = 1,
    Captcha = 10
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
    entityStatus?: EntityStatusType
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

export type ResponseType<T = {}> = {
    data: T,
    resultCode: number,
    messages: string[]
}

export type LoginRequestPayloadType = {
    email: string,
    password: string,
    rememberMe: boolean
}

type UpdateTaskModelType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

//api-s
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
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${data.id}/tasks`, {title: data.title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, data: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, data)
    }
}

export const authAPI = {
    me() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>(`auth/me`)
    },
    login(data: LoginRequestPayloadType) {
        return instance.post<ResponseType<{userId: number}>>('auth/login', data)
    },
    logOut() {
        return instance.delete<ResponseType>('auth/login')
    }
}