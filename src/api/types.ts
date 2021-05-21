import {EntityStatusType} from '../components/features/TodolistsList/Todolist/todolist-reducer';

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

//types
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
export type ResponseTodolistType<T = {}> = {
    data: T
    resultCode: number,
    messages: string[],
    fieldsErrors: []
}
export type GetTaskResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}
export type FieldsErrorsType = {
    'field': string,
    'error': string
};
export type ResponseType<T = {}> = {
    data: T,
    resultCode: number,
    messages: string[],
    fieldsErrors?: Array<FieldsErrorsType>
}
export type LoginRequestPayloadType = {
    email: string,
    password: string,
    rememberMe: boolean
}
export type UpdateTaskModelType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}