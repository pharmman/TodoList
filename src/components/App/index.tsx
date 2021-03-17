import * as appSelectors from './selectors'
import {asyncActions as appAsyncActions, slice as appSlice} from './app-reducer';

const {setAppStatus, setAppError} = appSlice.actions
const appReducer = appSlice.reducer

export {
    appSelectors,
    appAsyncActions,
    setAppStatus,
    setAppError,
    appReducer
}