import axios from 'axios';
import {
    GetTaskResponseType,
    LoginRequestPayloadType,
    ResponseTodolistType,
    ResponseType,
    TaskType,
    TodolistType,
    UpdateTaskModelType
} from './types';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'ea1464d3-6693-4a83-9755-2421f1dd088c'
    }
})

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