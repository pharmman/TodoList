import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType, ThunkType} from './todolist-reducer';
import {TasksStateType} from '../AppWithRedux';
import {APITasks, TaskPriorities, TaskStatuses, TaskType} from '../api/todolistsAPI';

export type ActionTasksType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasks>

export type UpdateTaskDomainType = {
    description?: string
    title?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


const initialState: TasksStateType = {
    count: []
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionTasksType): TasksStateType => {
    switch (action.type) {
        case 'DELETE-TASK':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)
            }
        case 'ADD-TASK':
            const stateCopy = {...state}
            const tasks = state[action.task.todoListId]
            const newTasks = [action.task, ...tasks]
            stateCopy[action.task.todoListId] = newTasks
            return stateCopy
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id !== action.taskID ? t : {
                    ...t, ...action.task
                })
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolist.id]: []
            }
        case 'REMOVE-TODOLIST':
            delete state[action.id]
            return {
                ...state,
            }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(t => {
                stateCopy[t.id] = []
            })
            return stateCopy
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskID: string, todolistID: string) => {
    return {
        type: 'DELETE-TASK',
        taskID,
        todolistID
    } as const
}


export const addTaskAC = (task: TaskType) => ({
    type: 'ADD-TASK',
    task
} as const)


export const changeTaskAC = (todoListID: string, taskID: string, task: UpdateTaskDomainType) => ({
    type: 'UPDATE-TASK',
    task,
    todoListID,
    taskID
} as const)

export const setTasks = (tasks: Array<TaskType>, todolistId: string) => {
    return {
        type: 'SET-TASKS',
        tasks,
        todolistId
    } as const
}

export const getTasks = (todolistId: string): ThunkType => (dispatch) => {
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

export const updateTaskTC = (todolistId: string, taskId: string, updatingField:UpdateTaskDomainType):ThunkType => (dispatch, getState) => {

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
          dispatch(changeTaskAC(todolistId, taskId, res.data.data.item))
        })
    }
}
