import React, {useCallback, useEffect} from 'react';
import {AddItemForm, AddItemFormSubmitHelpersType} from '../../../AddItemForm/AddItemForm';
import {EditableSpan} from '../../../EditableSpan/EditableSpan';
import {Button, IconButton, Paper} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useSelector} from 'react-redux';
import {Task} from './Task/Task';
import {TodolistDomainType} from './todolist-reducer';
import {tasksActions, todolistActions} from '../index';
import {useActions, useAppDispatch} from '../../../../utils/redux-utils';
import {AppRootStateType} from '../../../../utils/types';
import {TaskStatuses, TaskType} from '../../../../api/types';


type TodoListPropsType = {
    todolist: TodolistDomainType
    demo: boolean | undefined
}

export const ToDoList: React.FC<TodoListPropsType> = React.memo(({
                                                                     todolist,
                                                                     demo
                                                                 }) => {
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolist.id])
    const {getTasksTC} = useActions(tasksActions)
    const {changeTodoListFilter, deleteTodolist, changeTodolistTitle} = useActions(todolistActions)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        getTasksTC(todolist.id)
    }, [demo, getTasksTC, todolist.id])

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

    const addTask = useCallback(async(title: string, helper: AddItemFormSubmitHelpersType) => {
        const thunk = tasksActions.createTaskTC({id: todolist.id, title})
        const action = await dispatch(thunk)

        if (tasksActions.createTaskTC.rejected.match(action)) {
            if (action.payload?.errors?.length) {
                const error = action.payload?.errors[0]
                helper.setError(error)
            } else {
                helper.setError('Some error occurred')
            }
        } else {
            helper.setTitle('')
        }
    }, [todolist.id, dispatch])

    const localChangeTodoListTitle = useCallback((title: string) => {
        changeTodolistTitle({id: todolist.id, newTitle: title})
    }, [todolist.id, changeTodolistTitle])


    let currentTasks = tasksForTodoList.map(t => {
        return (
            <span key={t.id}>
                <Task entityStatus={t.entityStatus} task={t}/>
            </span>
        )
    })

    return (
        <div className="App">
            <Paper elevation={3} style={{padding: '15px', position: 'relative'}}>
                <h3><EditableSpan title={todolist.title} changeTitle={localChangeTodoListTitle}
                                  entityStatus={todolist.entityStatus}/>
                    <IconButton style={{position: 'absolute', top: '0', right: '0'}} onClick={removeTodoList}
                                color={'primary'}
                                disabled={todolist.entityStatus === 'loading'}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask} entityStatus={todolist.entityStatus}/>
                <ul style={{listStyle: 'none', padding: '0'}}>
                    {currentTasks}
                    {tasksForTodoList.length === 0 && <span style={{opacity: '0.7', padding: '10px'}}>No tasks</span>}
                </ul>
                <div>
                    <FilterButton callback={onSetAllFilterClick}
                                  isSelected={todolist.filter === 'all'}>All</FilterButton>
                    <FilterButton callback={onSetActiveFilterClick}
                                  isSelected={todolist.filter === 'active'}>Active</FilterButton>
                    <FilterButton callback={onSetCompletedFilterClick}
                                  isSelected={todolist.filter === 'completed'}>Completed</FilterButton>
                </div>
            </Paper>
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
