import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../AddItemForm/AddItemForm';
import {EditableSpan} from '../../../EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useSelector} from 'react-redux';
import {AppRootStateType, useActions} from '../../../App/store';
import {Task} from './Task/Task';
import {TodolistDomainType} from './todolist-reducer';
import {TaskStatuses, TaskType} from '../../../../api/todolistsAPI';
import {tasksActions, todolistActions} from '../index';


type TodoListPropsType = {
    todolist: TodolistDomainType
    demo: boolean | undefined
}

export const ToDoList: React.FC<TodoListPropsType> = React.memo(({
                                                                     todolist,
                                                                     demo
                                                                 }) => {
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolist.id])
    const {createTaskTC, getTasksTC} = useActions(tasksActions)
    const {changeTodoListFilter, deleteTodolist, changeTodolistTitle} = useActions(todolistActions)

    useEffect(() => {
        if (demo) {
            return
        }
        getTasksTC(todolist.id)
    }, [todolist.id, demo, getTasksTC])

    let tasksForTodoList: Array<TaskType> = tasks

    if (todolist.filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.status !== TaskStatuses.Completed);
    }
    if (todolist.filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    const onSetAllFilterClick = useCallback(
        () => changeTodoListFilter({filter: 'all', id: todolist.id}), [todolist.id, changeTodoListFilter]);
    const onSetActiveFilterClick = useCallback(
        () => changeTodoListFilter({filter: 'active', id: todolist.id}), [todolist.id, changeTodoListFilter]);
    const onSetCompletedFilterClick = useCallback(
        () => changeTodoListFilter({filter: 'completed', id: todolist.id}), [todolist.id, changeTodoListFilter]);

    const removeTodoList = () => deleteTodolist(todolist.id);

    const addTask = useCallback((title: string) => {
        createTaskTC({id: todolist.id, title})
    }, [todolist.id, createTaskTC])

    const localChangeTodoListTitle = useCallback((title: string) => {
        changeTodolistTitle({id: todolist.id, newTitle: title})
    }, [todolist.id, changeTodolistTitle])




    const currentTasks = tasksForTodoList.map(t => {
        return (
            <span key={t.id}>
                <Task entityStatus={t.entityStatus} task={t}/>
            </span>
        )
    })

    return (
        <div className="App">
            <div>
                <h3><EditableSpan title={todolist.title} changeTitle={localChangeTodoListTitle}
                                  entityStatus={todolist.entityStatus}/>
                    <IconButton onClick={removeTodoList} color={'primary'}
                                disabled={todolist.entityStatus === 'loading'}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask} entityStatus={todolist.entityStatus}/>
                <ul style={{listStyle: 'none', padding: '0'}}>
                    {currentTasks}
                </ul>
                <div>
                    <FilterButton callback={onSetAllFilterClick}
                                  isSelected={todolist.filter === 'all'}>All</FilterButton>
                    <FilterButton callback={onSetActiveFilterClick}
                                  isSelected={todolist.filter === 'active'}>Active</FilterButton>
                    <FilterButton callback={onSetCompletedFilterClick}
                                  isSelected={todolist.filter === 'completed'}>Completed</FilterButton>
                </div>
            </div>
        </div>
    )
})

type FilterButtonPropsType = {
    isSelected: boolean
    callback: () => void
}

const FilterButton: React.FC<FilterButtonPropsType> = ({callback, isSelected, children}) => {
    return (
        <Button
            style={{margin: '3px'}}
            variant={isSelected ? 'outlined' : 'contained'}
            size={'small'}
            color={'primary'}
            onClick={callback}>{children}
        </Button>
    )
}
