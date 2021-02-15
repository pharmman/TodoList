import {appReducer, appReducerInitialState, setAppError, setAppStatus} from './app-reducer';

let startState: appReducerInitialState;
beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        isInitialized: false
    }
})

test('Status should be set to correct task', () => {
    const action = setAppStatus({status: 'loading'})
    const endState = appReducer(startState, action)

    expect(endState.error).toBe(null)
    expect(endState.status).toBe('loading')
})

test('Error should be set to correct task', () => {
    const action = setAppError({error: 'ERROR'})
    const endState = appReducer(startState, action)

    expect(endState.error).toBe('ERROR')
    expect(endState.status).toBe('idle')
})

