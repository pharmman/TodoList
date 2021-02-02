import React, {useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {RequestStatusType} from './app-reducer';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {ErrorSnackbar} from '../ErrorSnackbar/ErrorSnackbar';
import {initializeApp, logOut} from '../features/Login/auth-reducer';

function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLogged)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    const logOutHandler = () => {
        dispatch(logOut())
    }

    return (
        <div className="App">
            <AppBar position="static" className={'appBar'}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn? <Button onClick={logOutHandler} color="inherit">LogOut</Button> : <></>}
                </Toolbar>
            </AppBar>
            <div style={{height: '4px'}}>
                <LinearProgress className={'linearProgress'} hidden={status !== 'loading'}/>
            </div>
            <Container fixed>
                <BrowserRouter>
                    <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <h1>Page not found</h1>}/>
                    <Redirect from={'*'} to={'/404'}/>
                    </Switch>
                </BrowserRouter>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;
