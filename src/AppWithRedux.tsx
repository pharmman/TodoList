import React from 'react';
import './App.css';
import {ToDoList} from './ToDoList';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC} from './state/todolist-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
export type TodoListType = {
    id: string;
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function AppWithRedux() {

    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)


    function changeFilter(value: FilterValuesType, todoListID: string) {
        dispatch(changeTodoListFilterAC(value, todoListID))
    }


    function removeTodoList(todoListID: string) {
        dispatch(removeTodoListAC(todoListID))
    }

    function addTodoList(title: string) {
        dispatch(addTodoListAC(title))
    }

    function changeTodoListTitle(todoListId: string, title: string) {
        dispatch(changeTodoListTitleAC(todoListId, title))
    }


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
                                            id={tl.id}
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
