import React, {useEffect} from 'react';
import './App.css';
import {AppBar, Button, CircularProgress, Container, LinearProgress, Toolbar} from '@material-ui/core';
import {TodolistsList} from '../components/features/TodolistsList';
import {useSelector} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';
import {authActions, authSelectors, Login} from '../components/features/Auth';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {selectIsInitialized, selectStatus} from '../components/features/Application/selectors';
import {appAsyncActions} from '../components/features/Application';
import {useActions} from '../utils/redux-utils';

type PropsType = {
    demo?: boolean
}


function App({demo = false}: PropsType) {

    const status = useSelector(selectStatus)
    const isInitialized = useSelector(selectIsInitialized)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)
    const {initializeApp} = useActions(appAsyncActions)
    const {logout} = useActions(authActions)

    useEffect(() => {
        if (!demo) {
            initializeApp()
        }
    }, [initializeApp, demo])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    const logOutHandler = () => {
        logout()
    }

    return (
        <div className="App">
            <AppBar position="static" className={'appBar'}>
                <Toolbar>
                    {isLoggedIn && <Button onClick={logOutHandler} color="inherit">LogOut</Button>}
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
