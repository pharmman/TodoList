import {asyncActions as todolistsAsyncActions, EntityStatusType} from './todolist-reducer';
import {APITasks} from '../../../../api/todolistsAPI';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {appActions} from '../../CommonActions/commonApplicationActions';
import {handleServerAppError, handleServerNetworkError} from '../../../../utils/error-utils';
import {AppRootStateType, ThunkErrorType} from '../../../../utils/types';
import {ResultCodes, TaskPriorities, TaskStatuses, TaskType} from '../../../../api/types';
import {authActions} from '../../Auth';

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

const {setAppError, setAppStatus} = appActions

export const updateTaskTC = createAsyncThunk('tasks/updateTask',
    async (params: { todolistId: string, taskId: string, model: UpdateTaskDomainType },
           {dispatch, getState, rejectWithValue}) => {
        const state = getState() as AppRootStateType
        const currentTask = state.tasks[params.todolistId].find(t => t.id === params.taskId)
        if (!currentTask) {
            console.warn('Task for updating not found')
            return rejectWithValue('Task for updating not found')
        }
        const apiModel = {
            title: currentTask.title,
            status: currentTask.status,
            startDate: currentTask.startDate,
            description: currentTask.description,
            priority: currentTask.priority,
            deadline: currentTask.deadline,
            ...params.model
        };
        dispatch(setAppStatus({status: 'loading'}))
        const res = await APITasks.updateTask(params.todolistId, params.taskId, apiModel)
        try {
            if (res.data.resultCode === ResultCodes.Success) {
                dispatch(setAppStatus({status: 'succeeded'}))
                return params
            } else {
                handleServerAppError<{ item: TaskType }>(res.data, dispatch)
                return rejectWithValue({})
            }
        } catch (err) {
            handleServerNetworkError(err, dispatch)
            return rejectWithValue({})
        }
    })
export const getTasksTC = createAsyncThunk('tasks/getTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await APITasks.getTasks(todolistId)
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        return {tasks: res.data.items, todolistId}
    } catch (err) {
        thunkAPI.dispatch(setAppError(err.message))
        thunkAPI.dispatch(setAppStatus({status: 'failed'}))
        return thunkAPI.rejectWithValue({})
    }
})
export const removeTaskTC = createAsyncThunk('tasks/removeTask',
    async (params: { todolistId: string, taskId: string }, thunkAPI) => {
        const {todolistId, taskId} = params;
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        thunkAPI.dispatch(setTaskEntityStatus({
            entityStatus: 'loading',
            todolistId,
            taskId
        }))
        try {
            const res = await APITasks.deleteTask(todolistId, taskId)
            if (res.data.resultCode === ResultCodes.Success) {
                thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
                // thunkAPI.dispatch(removeTaskAC({taskId, todolistId}))
                return {taskId: taskId, todolistId: todolistId}
            } else {
                thunkAPI.dispatch(setAppError({error: res.data.messages[0]}))
                thunkAPI.dispatch(setAppStatus({status: 'failed'}))
                thunkAPI.dispatch(setTaskEntityStatus({
                    entityStatus: 'failed',
                    todolistId: todolistId,
                    taskId: taskId
                }))
                return thunkAPI.rejectWithValue({})
            }
        } catch (err) {
            thunkAPI.dispatch(setAppError({error: err.message}))
            thunkAPI.dispatch(setAppStatus({status: 'failed'}))
            thunkAPI.dispatch(setTaskEntityStatus({entityStatus: 'failed', todolistId, taskId}))
            return thunkAPI.rejectWithValue({})
        }
    })
export const createTaskTC = createAsyncThunk<{ task: TaskType }, { id: string, title: string },
    ThunkErrorType>
('tasks/createTask', async (params, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    const res = await APITasks.createTask({...params})
    try {
        if (res.data.resultCode === ResultCodes.Success) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {task: res.data.data.item}
        } else {
            handleServerAppError<{ item: TaskType }>(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err) {
        handleServerNetworkError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [err.message], fieldsErrors: undefined})
    }
})

export const asyncActions = {
    updateTaskTC,
    getTasksTC,
    removeTaskTC,
    createTaskTC
}

export const slice = createSlice({
    name: 'tasks',
    initialState: {todolist: []} as TasksStateType,
    reducers: {
        setTaskEntityStatus: (state, action: PayloadAction<{ entityStatus: EntityStatusType, todolistId: string, taskId: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks[index] = {...tasks[index], entityStatus: action.payload.entityStatus}
        }
    },
    extraReducers: builder => {
        builder.addCase(todolistsAsyncActions.createTodolist.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(todolistsAsyncActions.deleteTodolist.fulfilled, (state, action) => {
            delete state[action.payload.todoListID]
        });
        builder.addCase(todolistsAsyncActions.getTodolists.fulfilled, (state, action) => {
            action.payload.todolists.forEach(t => {
                state[t.id] = []
            })
        })
        builder.addCase(getTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        })
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks.splice(index, 1)
        })
        builder.addCase(updateTaskTC.fulfilled, ((state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks[index] = {...tasks[index], ...action.payload.model}
        }))
        builder.addCase(createTaskTC.fulfilled, ((state, action) => {
            const tasks = state[action.payload.task.todoListId]
            tasks.unshift(action.payload.task)
        }))
        builder.addCase(authActions.logout.fulfilled, (state) => {
          const keys = Object.keys(state)
          keys.forEach(k => {
              delete state[k]
          })
        })
    }
})


//actions
export const {setTaskEntityStatus} = slice.actions
