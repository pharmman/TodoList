import {AddTodolistActionType, RemoveTodolistActionType} from './todolist-reducer';
import {TasksStateType} from '../AppWithRedux';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../api/todolistsAPI';

type ActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: TasksStateType = {
    count: []
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'DELETE-TASK':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistID]: [...state[action.todolistID], {
                    id: action.id,
                    title: action.title,
                    status: TaskStatuses.New,
                    addedDate: '',
                    deadline: '',
                    description: '',
                    order: 1,
                    priority: TaskPriorities.Middle,
                    startDate: '',
                    todoListId: action.todolistID
                }]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id !== action.taskID ? t : {
                    ...t,
                    status: action.status
                })
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id !== action.taskID ? t : {
                    ...t,
                    title: action.title
                })
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.id]: []
            }
        case 'REMOVE-TODOLIST':
            delete state[action.id]
            return {
                ...state,
            }
        default:
            return state;
    }
}

export const removeTaskAC = (taskID: string, todolistID: string) => ({type: 'DELETE-TASK', taskID, todolistID} as const)
export const addTaskAC = (todolistID: string, title: string) => ({
    type: 'ADD-TASK',
    todolistID,
    title,
    id: v1()
} as const)
export const changeTaskStatusAC = (todoListID: string, taskID: string, status: TaskStatuses) => ({
    type: 'CHANGE-TASK-STATUS',
    todolistID: todoListID,
    taskID,
    status
} as const)

export const changeTaskTitleAC = (todoListID: string, taskID: string, title: string) => ({
    type: 'CHANGE-TASK-TITLE',
    todoListID,
    taskID,
    title
} as const)
