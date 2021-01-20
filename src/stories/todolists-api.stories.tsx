import React, {useState} from 'react';
import {Meta} from '@storybook/react';
import {APITasks, APITodolist} from '../api/todolistsAPI';

export default {
    title: 'API'
} as Meta

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    const getTodolistHandler = () => {
        APITodolist.getTodolist().then(response => {
            setState(response.data)
        })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <button onClick={getTodolistHandler}>GET</button>
            </div>
        </div>
    )
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const createTodolistHandler = () => {
        APITodolist.createTodolist(title).then(response => {
            debugger
            setState(response.data.data.item)
            setTitle('')
        })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={createTodolistHandler}>Create</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const deleteTodolistHandler = () => {
        APITodolist.deleteTodolist(title).then(response => {
            setState(response.data.data)
        })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={deleteTodolistHandler}>Create</button>
        </div>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [id, setId] = useState<string>('')

    const updateHandler = () => {
        APITodolist.updateTodolist(id, title).then(response => {
            setState(response.data)
            setTitle('')
            setId('')
        })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            id: <input value={id} onChange={(e) => {
            setId(e.currentTarget.value)
        }}/>
            title: <input value={title} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>
            <button onClick={updateHandler}>Update</button>
        </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [id, setId] = useState<string>('4502e57a-b03c-42ef-96de-0027d9084649')

    const onClickHandler = () => {
        APITasks.getTasks(id).then(response => {
            setState(response.data.items)
        })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <button onClick={onClickHandler}>GET</button>
                <input type="text" value={id} onChange={e => setId(e.currentTarget.value)}/>
            </div>
        </div>
    )

}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [id, setId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const onClickHandler = () => {
        APITasks.createTask({id, title}).then(response => {
            setState(response.data.data)
        })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <button onClick={onClickHandler}>CREATE</button>
                ID: <input type="text" value={id} onChange={e => setId(e.currentTarget.value)}/>
                TITLE: <input value={title} onChange={e => setTitle(e.currentTarget.value)}/>
            </div>
        </div>
    )

}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('4502e57a-b03c-42ef-96de-0027d9084649')
    const [taskId, setTaskId] = useState<string>('eabd29c9-0f67-4abe-8993-06da86e7129d')

    const onClickHandler = () => {
        APITasks.deleteTask(todolistId, taskId).then(response => {
            setState(response.data.data)
        })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <button onClick={onClickHandler}>DELETE</button>
                TodolistID: <input type="text" value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
                TaskID: <input type="text" value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
            </div>
        </div>
    )
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('4502e57a-b03c-42ef-96de-0027d9084649')
    const [taskId, setTaskId] = useState<string>('eabd29c9-0f67-4abe-8993-06da86e7129d')
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [completed, setCompleted] = useState<boolean>(true)
    const [status, setStatus] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('2021-01-12T16:56:49.557')
    const [deadline, setDeadline] = useState<string>('2022-01-12T16:56:50.557')


    const onClickHandler = () => {
        APITasks.updateTask(todolistId,taskId,{
            title,
            description,
            status,
            startDate,
            deadline,
            priority: 1
        }).then(response => {
            setState(response.data.data)
        })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <button onClick={onClickHandler}>UPDATE</button>
                TodolistID: <input type="text" value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
                TaskID: <input type="text" value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
                TITLE: <input value={title} onChange={e => setTitle(e.currentTarget.value)}/>
                DESCRIPTION: <input value={description} onChange={e => setDescription(e.currentTarget.value)}/>
            </div>
        </div>
    )
}
