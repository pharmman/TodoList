import {addTodoListAC, EntityStatusType, removeTodoListAC, setTodolists} from './todolist-reducer';
import {APITasks, ResultCodes, TaskPriorities, TaskStatuses, TaskType} from '../../../../api/todolistsAPI';
import {setAppError, setAppStatus} from '../../../App/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../../../utils/error-utils';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../../../App/store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
//types
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

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        setTaskEntityStatus: (state, action: PayloadAction<{ entityStatus: EntityStatusType, todolistId: string, taskId: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks[index] = {...tasks[index], entityStatus: action.payload.entityStatus}
        },
        setTasks: (state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) => {
            state[action.payload.todolistId] = action.payload.tasks
        },
        updateTaskAC: (state, action: PayloadAction<{ todolistId: string, taskId: string, task: UpdateTaskDomainType }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks[index] = {...tasks[index], ...action.payload.task}
        },
        addTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
            const tasks = state[action.payload.task.todoListId]
            tasks.unshift(action.payload.task)
        },
        removeTaskAC: (state, action: PayloadAction<{ taskId: string, todolistId: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks.splice(index, 1)
        }
    },
    extraReducers: builder => {
        builder.addCase(addTodoListAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodoListAC, (state, action) => {
            delete state[action.payload.todoListID]
        });
        builder.addCase(setTodolists, (state, action) => {
            action.payload.todolists.forEach(t => {
                state[t.id] = []
            })
        })
    }
})

export const tasksReducer = slice.reducer
//actions
const {setTaskEntityStatus, setTasks, updateTaskAC, addTaskAC, removeTaskAC} = slice.actions

//thunks
export const getTasks = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    APITasks.getTasks(todolistId)
        .then(res => {
            dispatch(setTasks({tasks: res.data.items, todolistId}))
            dispatch(setAppStatus({status: 'succeeded'}))
        })
        .catch(err => {
            dispatch(setAppError(err.message))
            dispatch(setAppStatus({status: 'failed'}))
        })
}
export const createTaskTC = (id: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    APITasks.createTask({id, title})
        .then(res => {
            if (res.data.resultCode === ResultCodes.Success) {
                dispatch(addTaskAC({task: res.data.data.item}))
                dispatch(setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError<{ item: TaskType }>(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(setTaskEntityStatus({entityStatus: 'loading', todolistId, taskId}))
    APITasks.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === ResultCodes.Success) {
                dispatch(removeTaskAC({taskId, todolistId}))
                dispatch(setAppStatus({status: 'succeeded'}))
            } else {
                dispatch(setAppError({error: res.data.messages[0]}))
                dispatch(setAppStatus({status: 'failed'}))
                dispatch(setTaskEntityStatus({entityStatus: 'failed', todolistId, taskId}))
            }
        })
        .catch(err => {
            dispatch(setAppError(err.message))
            dispatch(setAppStatus({status: 'failed'}))
            dispatch(setTaskEntityStatus({entityStatus: 'failed', todolistId, taskId}))
        })

}
export const updateTaskTC = (todolistId: string, taskId: string, updatingField: UpdateTaskDomainType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId]
    const currentTask = task.find(t => t.id === taskId)

    if (!currentTask) {
        console.warn('Task for updating not found')
    } else {
        dispatch(setAppStatus({status: 'loading'}))
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
                if (res.data.resultCode === ResultCodes.Success) {
                    dispatch(updateTaskAC({todolistId, taskId, task: res.data.data.item}))
                    dispatch(setAppStatus({status: 'succeeded'}))
                } else {
                    handleServerAppError<{ item: TaskType }>(res.data, dispatch)
                }
            })
            .catch(err => {
                handleServerNetworkError(err, dispatch)
            })
    }
}
