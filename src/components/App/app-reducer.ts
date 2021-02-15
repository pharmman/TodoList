import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppErrorType = null | string
export type appReducerInitialState = typeof initialState

export const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as AppErrorType,
    isInitialized: false as boolean
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppError: (state, action: PayloadAction<{ error: AppErrorType }>) => {
            state.error = action.payload.error
        },
        setInitializeApp: (state) => {
            state.isInitialized = true
        }
    }
})

export const appReducer = slice.reducer
export const {setAppStatus, setAppError, setInitializeApp} = slice.actions