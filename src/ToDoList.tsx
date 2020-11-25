import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './AppWithRedux'
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';

type PropsType = {
    id: string
    filter: FilterValuesType
    title: string,
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
}

export function ToDoList(props: PropsType) {
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch();

    let tasksForTodoList: Array<TaskType> = tasks

    if (props.filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone);
    }
    if (props.filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone);
    }

    const onSetAllFilterClick = () => props.changeFilter('all', props.id);
    const onSetActiveFilterClick = () => props.changeFilter('active', props.id);
    const onSetCompletedFilterClick = () => props.changeFilter('completed', props.id);
    const deleteTodoList = () => props.removeTodoList(props.id);
    const addTask = (title: string) => {
        dispatch(addTaskAC(props.id, title))
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title)
    }


    const currentTasks = tasksForTodoList.map(t => {
        const removeTask = () => dispatch(removeTaskAC(t.id, props.id));
        const changeTitle = (title: string) => {
            dispatch(changeTaskTitleAC(props.id, t.id, title))
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTaskStatusAC(props.id, t.id, e.currentTarget.checked))
        };
        return (
            <li style={{marginLeft: '0'}} key={t.id} className={t.isDone ? 'is-done' : ''}>
                <Checkbox
                    onChange={changeStatus}
                    checked={t.isDone}
                    color={'primary'}
                />
                <EditableSpan changeTitle={changeTitle} title={t.title}/>
                <IconButton onClick={removeTask} color={'primary'}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })


    return (
        <div className="App">
            <div>
                <h3><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                    <IconButton onClick={deleteTodoList} color={'primary'}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>
                <ul style={{listStyle: 'none', padding: '0'}}>
                    {currentTasks}
                </ul>
                <div>
                    <Button
                        style={{margin: '3px'}}
                        variant={props.filter === 'all' ? 'outlined' : 'contained'}
                        size={'small'}
                        color={'primary'}
                        onClick={onSetAllFilterClick}>All
                    </Button>
                    <Button
                        style={{margin: '3px'}}
                        variant={props.filter === 'active' ? 'outlined' : 'contained'}
                        size={'small'}
                        color={'primary'}
                        onClick={onSetActiveFilterClick}>Active
                    </Button>
                    <Button
                        style={{margin: '3px'}}
                        variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                        size={'small'}
                        color={'primary'}
                        onClick={onSetCompletedFilterClick}>Completed
                    </Button>
                </div>
            </div>
        </div>
    )
}