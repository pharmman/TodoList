import {CommonActionTypes, ThunkType} from './todolist-reducer';
import {APITasks, TaskPriorities, TaskStatuses, TaskType} from '../../../../api/todolistsAPI';
//types
export type ActionTasksType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasks>

export type UpdateTaskDomainType = {
    description?: string
    title?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {
    count: []
}

export const tasksReducer = (state: TasksStateType = initialState, action: CommonActionTypes): TasksStateType => {
    switch (action.type) {
        case 'DELETE-TASK':
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state, [action.todoListID]: state[action.todoListID].map(t => t.id !== action.taskID ?
                    t : {...t, ...action.task})
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(t => {
                stateCopy[t.id] = []
            })
            return stateCopy
        }
        case 'SET-TASKS':
            return {...state,[action.todolistId]: action.tasks}
        default:
            return state;
    }
}
//actions
export const removeTaskAC = (taskID: string, todolistID: string) =>
    ({type: 'DELETE-TASK', taskID, todolistID} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (todoListID: string, taskID: string, task: UpdateTaskDomainType) =>
    ({type: 'UPDATE-TASK', task, todoListID, taskID} as const)
export const setTasks = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

//thunks
export const getTasks = (todolistId: string): ThunkType => dispatch => {
    APITasks.getTasks(todolistId)
        .then(res => {
            dispatch(setTasks(res.data.items, todolistId))
        })
}
export const createTaskTC = (id: string, title: string): ThunkType => dispatch => {
    APITasks.createTask({id, title})
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string): ThunkType => dispatch => {
    APITasks.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, updatingField: UpdateTaskDomainType): ThunkType => (dispatch, getState) => {

    const task = getState().tasks[todolistId]
    const currentTask = task.find(t => t.id === taskId)

    if (!currentTask) {
        console.warn('Task for updating not found')
    } else {
        APITasks.updateTask(todolistId, taskId, {
            title: currentTask.title,
            status: currentTask.status,
            startDate: currentTask.startDate,
            description: currentTask.description,
            priority: currentTask.priority,
            deadline: currentTask.deadline,
            ...updatingField
        })
            .then((res) => {
                dispatch(updateTaskAC(todolistId, taskId, res.data.data.item))
            })
    }
}
