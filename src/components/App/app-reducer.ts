export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppErrorType = null | string

export const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as AppErrorType
}

export type AppActionsType = SetStatusType | SetErrorType
export type SetStatusType = ReturnType<typeof setAppStatus>
export type SetErrorType = ReturnType<typeof setAppError>
export type InitialAppReducerStateType = typeof initialState



export const appReducer = (state:InitialAppReducerStateType = initialState, action:AppActionsType) => {
        switch (action.type) {
            case 'APP/SET-STATUS':
                return {...state, status: action.status}
            case 'APP/SET-ERROR':
                return {...state, error: action.error}
            default:
                return state
        }
}

export const setAppStatus = (status:RequestStatusType) => ({type:'APP/SET-STATUS', status} as const)
export const setAppError = (error:AppErrorType) => ({type: 'APP/SET-ERROR', error} as const)