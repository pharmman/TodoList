import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App'
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

type PropsType = {
    id: string
    filter: FilterValuesType
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (taskTitle: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
}

export function ToDoList(props: PropsType) {


    const onSetAllFilterClick = () => props.changeFilter('all', props.id);
    const onSetActiveFilterClick = () => props.changeFilter('active', props.id);
    const onSetCompletedFilterClick = () => props.changeFilter('completed', props.id);
    const deleteTodoList = () => props.removeTodoList(props.id);
    const addTask = (title: string) => {
        debugger
        props.addTask(title, props.id);
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title)
    }


    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.id);
        const changeTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.id)
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
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
                <ul style={{listStyle: 'none', padding:'0'}}>
                    {tasks}
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