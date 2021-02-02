export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppErrorType = null | string

export type AppActionsType = SetStatusType | SetErrorType | SetInitializeType
export type SetStatusType = ReturnType<typeof setAppStatus>
export type SetErrorType = ReturnType<typeof setAppError>
export type SetInitializeType = ReturnType<typeof setInitializeApp>
export type InitialAppReducerStateType = typeof initialState

export const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as AppErrorType,
    isInitialized: false as boolean
}

export const appReducer = (state: InitialAppReducerStateType = initialState, action: AppActionsType): InitialAppReducerStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZE':
            return {...state, isInitialized: true}
        default:
            return state
    }
}

export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppError = (error: AppErrorType) => ({type: 'APP/SET-ERROR', error} as const)
export const setInitializeApp = () => ({type:'APP/SET-INITIALIZE'} as const)