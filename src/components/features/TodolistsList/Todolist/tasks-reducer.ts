import {addTodoListAC, EntityStatusType, removeTodoListAC, setTodolists} from './todolist-reducer';
import {APITasks, ResultCodes, TaskPriorities, TaskStatuses, TaskType} from '../../../../api/todolistsAPI';
import {setAppError, setAppStatus} from '../../../App/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../../../utils/error-utils';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../../../App/store';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
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

//thunks
export const getTasks = createAsyncThunk('tasks/getTasks', async (todolistId: string, thunkAPI) => {
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
export const removeTaskTC = createAsyncThunk('tasks/removeTask', async (params: { todolistId: string, taskId: string }, thunkAPI) => {
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
        debugger
        thunkAPI.dispatch(setAppError({error: err.message}))
        thunkAPI.dispatch(setAppStatus({status: 'failed'}))
        thunkAPI.dispatch(setTaskEntityStatus({entityStatus: 'failed', todolistId, taskId}))
        return thunkAPI.rejectWithValue({})
    }
})

const slice = createSlice({
    name: 'tasks',
    initialState: {count: []} as TasksStateType,
    reducers: {
        setTaskEntityStatus: (state, action: PayloadAction<{ entityStatus: EntityStatusType, todolistId: string, taskId: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks[index] = {...tasks[index], entityStatus: action.payload.entityStatus}
        },
        updateTaskAC: (state, action: PayloadAction<{ todolistId: string, taskId: string, task: UpdateTaskDomainType }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks[index] = {...tasks[index], ...action.payload.task}
        },
        addTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
            const tasks = state[action.payload.task.todoListId]
            tasks.unshift(action.payload.task)
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
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        })
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks.splice(index, 1)
        })
    }
})

export const tasksReducer = slice.reducer
//actions
export const {setTaskEntityStatus, updateTaskAC, addTaskAC} = slice.actions

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
