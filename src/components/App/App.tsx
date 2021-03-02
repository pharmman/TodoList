import React, {useEffect} from 'react';
import './App.css';
import {AppBar, Button, CircularProgress, Container, LinearProgress, Toolbar} from '@material-ui/core';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {initializeApp, RequestStatusType} from './app-reducer';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {ErrorSnackbar} from '../ErrorSnackbar/ErrorSnackbar';
import {logout} from '../features/Login/auth-reducer';

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLogged)
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
