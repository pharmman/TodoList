import * as appSelectors from './selectors'
import {asyncActions as appAsyncActions, slice as appSlice} from './application-reducer';

const appReducer = appSlice.reducer

export {
    appSelectors,
    appAsyncActions,
    appReducer,

}