import {ThunkType} from '../TodolistsList/Todolist/todolist-reducer';
import {setAppStatus, setInitializeApp} from '../../App/app-reducer';
import {authAPI, LoginRequestPayloadType, ResultCodes} from '../../../api/todolistsAPI';
import {handleServerAppError} from '../../../utils/error-utils';

type AuthReducerInitialStateType = {
    isLogged: boolean
}

export type AuthActionsType = ReturnType<typeof setIsLogged>

const initialState: AuthReducerInitialStateType = {
    isLogged: false
}

export const authReducer = (state: AuthReducerInitialStateType = initialState, action: AuthActionsType): AuthReducerInitialStateType => {
    switch (action.type) {
        case 'SET-IS-LOGGED':
            return {...state, isLogged: action.isLogged}
        default:
            return state
    }
}

const setIsLogged = (isLogged: boolean) => ({type: 'SET-IS-LOGGED', isLogged} as const)

export const login = (data: LoginRequestPayloadType): ThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        let res = await authAPI.login(data)
        if (res.data.resultCode === ResultCodes.Success) {
            dispatch(setIsLogged(true))
            dispatch(setAppStatus('succeeded'))
        } else {
            handleServerAppError<{ userId: number }>(res.data, dispatch)
        }
    } catch (err) {
        handleServerAppError(err, dispatch)
    }
}

export const logOut = (): ThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        let res = await authAPI.logOut()
        if (res.data.resultCode === ResultCodes.Success) {
            dispatch(setIsLogged(false))
            dispatch(setAppStatus('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (err) {
        handleServerAppError(err, dispatch)
    }
}

export const initializeApp = (): ThunkType => async (dispatch) => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === ResultCodes.Success) {
            dispatch(setIsLogged(true))
            dispatch(setAppStatus('succeeded'))
        } else {
        }
    } catch (err) {
        handleServerAppError(err, dispatch)
    } finally {
        dispatch(setInitializeApp())
    }
}

