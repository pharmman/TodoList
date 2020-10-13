import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App'

type PropsType = {
    id: string
    filter: FilterValuesType
    title: String,
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (taskTitle: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
}

export function ToDoList(props: PropsType) {

    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim(), props.id);
            setTitle('');
        } else {
            setError('Title is required')
        }
    }

    const onchangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };
    const onKeyPressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const onSetAllFilterClick = () => props.changeFilter('all', props.id);
    const onSetActiveFilterClick = () => props.changeFilter('active', props.id);
    const onSetCompletedFilterClick = () => props.changeFilter('completed', props.id);
    const deleteTodoList = () => props.removeTodoList(props.id);



    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.id);
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        };
        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}><
                input
                type="checkbox"
                onChange={changeStatus}
                checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })

    return (
        <div className="App">
            <div>
                <h3>{props.title}<button onClick={deleteTodoList}>Delete</button></h3>
                <div>
                    <input value={title} onChange={onchangeTitleHandler}
                           onKeyPress={onKeyPressEnterHandler}
                           className={error ? 'error' : ''}
                    />

                    <button onClick={addTask}>+</button>
                    {error && <div className={'error-message'}>{error}</div>}
                </div>
                <ul>
                    {tasks}
                </ul>
                <div>
                    <button
                        className={props.filter === 'all' ? 'active' : ''}
                        onClick={onSetAllFilterClick}>All
                    </button>
                    <button
                        className={props.filter === 'active' ? 'active' : ''}
                        onClick={onSetActiveFilterClick}>Active
                    </button>
                    <button
                        className={props.filter === 'completed' ? 'active' : ''}
                        onClick={onSetCompletedFilterClick}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}