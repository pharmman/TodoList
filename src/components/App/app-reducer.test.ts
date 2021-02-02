
import {appReducer, InitialAppReducerStateType, setAppError, setAppStatus} from './app-reducer';

let startState: InitialAppReducerStateType;
beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        isInitialized: false
    }
})

test('Status should be set to correct task', () => {
    const action = setAppStatus('loading')
    const endState = appReducer(startState, action)

    expect(endState.error).toBe(null)
    expect(endState.status).toBe('loading')
})

test('Error should be set to correct task', () => {
    const action = setAppError('ERROR')
    const endState = appReducer(startState, action)

    expect(endState.error).toBe('ERROR')
    expect(endState.status).toBe('idle')
})

