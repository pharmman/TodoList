import {Dispatch} from 'redux';
import {ResponseType} from '../api/todolistsAPI'
import {setAppError, setAppStatus} from '../components/App/app-reducer';

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch:Dispatch) => {
    debugger
    if (data.messages.length > 0) {
        dispatch(setAppError(data.messages[0]))
    } else {
        dispatch(setAppError('Failed'))
    }
    dispatch(setAppStatus('failed'))
}

export const handleServerNetworkError = (error: {message:string}, dispatch:Dispatch) => {
    dispatch(setAppError(error.message? error.message : 'Some error occurred'))
    dispatch(setAppStatus('failed'))
}