import React, {useCallback, useEffect} from 'react';
import './App.css';
import {ToDoList} from './ToDoList';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    changeTodoListFilterAC,
    changeTodolistTitleTC,
    createTodolist,
    deleteTodolist,
    FilterValuesType,
    getTodolists,
    TodolistDomainType
} from './state/todolist-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TaskType} from './api/todolistsAPI';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists)

    useEffect(() => {
        dispatch(getTodolists())
    }, [])


    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        dispatch(changeTodoListFilterAC(value, todoListID))
    }, [dispatch])


    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(deleteTodolist(todoListID))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodolist(title))
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoListId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todoListId, title))
    }, [dispatch])


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '15px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {
                        todoLists.map(tl => {
                            return (
                                <Grid item key={tl.id}>
                                    <Paper elevation={3} style={{padding: '15px'}}>
                                        <ToDoList
                                            key={tl.id}
                                            todoListId={tl.id}
                                            title={tl.title}
                                            filter={tl.filter}
                                            changeFilter={changeFilter}
                                            removeTodoList={removeTodoList}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
