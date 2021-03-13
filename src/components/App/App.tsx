import React, {useEffect} from 'react';
import './App.css';
import {AppBar, Button, CircularProgress, Container, LinearProgress, Toolbar} from '@material-ui/core';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {useDispatch, useSelector} from 'react-redux';
import {initializeApp} from './app-reducer';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from '../features/Auth/Login';
import {ErrorSnackbar} from '../ErrorSnackbar/ErrorSnackbar';
import {logout} from '../features/Auth/auth-reducer';
import {selectIsInitialized, selectStatus} from './selectors';
import {authSelectors} from '../features/Auth';

type PropsType = {
    demo?: boolean
}


function App({demo = false}: PropsType) {

    const status = useSelector(selectStatus)
    const isInitialized = useSelector(selectIsInitialized)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    const logOutHandler = () => {
        dispatch(logout())
    }

    return (
        <div className="App">
            <AppBar position="static" className={'appBar'}>
                <Toolbar>
                    {isLoggedIn ? <Button onClick={logOutHandler} color="inherit">LogOut</Button> : <></>}
                </Toolbar>
            </AppBar>
            <div style={{height: '4px'}}>
                <LinearProgress className={'linearProgress'} hidden={status !== 'loading'}/>
            </div>
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <Redirect to={'/'}/>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;
