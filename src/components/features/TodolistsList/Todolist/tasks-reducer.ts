import {createTodolist, deleteTodolist, EntityStatusType, getTodolists} from './todolist-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from '../../../../api/todolistsAPI';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createTaskTC, getTasks, removeTaskTC, updateTaskTC} from './tasks-actions';
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

const slice = createSlice({
    name: 'tasks',
    initialState: {count: []} as TasksStateType,
    reducers: {
        setTaskEntityStatus: (state, action: PayloadAction<{ entityStatus: EntityStatusType, todolistId: string, taskId: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks[index] = {...tasks[index], entityStatus: action.payload.entityStatus}
        }
    },
    extraReducers: builder => {
        builder.addCase(createTodolist.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(deleteTodolist.fulfilled, (state, action) => {
            delete state[action.payload.todoListID]
        });
        builder.addCase(getTodolists.fulfilled, (state, action) => {
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
        builder.addCase(updateTaskTC.fulfilled, ((state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks[index] = {...tasks[index], ...action.payload.model}
        }))
        builder.addCase(createTaskTC.fulfilled, ((state, action) => {
            const tasks = state[action.payload.task.todoListId]
            tasks.unshift(action.payload.task)
        }))
    }
})

export const tasksReducer = slice.reducer

//actions
export const {setTaskEntityStatus} = slice.actions
