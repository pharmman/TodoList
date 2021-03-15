import * as authSelectors from './selectors'
import {asyncActions, slice} from './auth-reducer'
import { Login } from './Login'

const authActions = {
    ...asyncActions,
    ...slice.actions
}

export {
    authSelectors,
    Login,
    authActions
}