import React, {useState} from 'react';
import './App.css';
import {ToDoList} from './ToDoList';
import {v1} from 'uuid';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
type TodoListType = {
    id: string;
    title: string,
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    /* const [tasks, setTasks] = useState<Array<TaskType>>(
         [
             {id: v1(), title: 'HTML&CSS', isDone: true},
             {id: v1(), title: 'JS', isDone: true},
             {id: v1(), title: 'ReactJS', isDone: false},
             {id: v1(), title: 'RestAPI', isDone: false},
             {id: v1(), title: 'GraphQL', isDone: false}
         ],
     )*/

    const todoListID1 = v1();
    const todoListID2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'active'}
    ]);

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Fish', isDone: false},
        ]
    })

    function addTask(taskTitle: string, todoListID: string) {
        const newTask: TaskType = {id: v1(), title: taskTitle, isDone: false};
        const todoList = tasks[todoListID];
        tasks[todoListID] = [newTask, ...todoList];
        setTasks({...tasks});
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }


    function removeTask(taskID: string, todoListID: string) {
        const todoList = tasks[todoListID];
        tasks[todoListID] = todoList.filter(t => t.id !== taskID);
        setTasks({...tasks});
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        const todoList = tasks[todoListID];
        let task = todoList.find(t => t.id === taskID);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID));
        delete tasks[todoListID];
        setTasks({...tasks});
    }


    return (
        <div className="App">
            {
                todoLists.map(tl => {
                    let tasksForTodoList = tasks[tl.id];

                    if (tl.filter === 'active') {
                        tasksForTodoList = tasks[tl.id].filter(t => !t.isDone);
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodoList = tasks[tl.id].filter(t => t.isDone);
                    }
                    return (
                        <ToDoList
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            filter={tl.filter}
                            tasks={tasksForTodoList}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            removeTodoList={removeTodoList}/>
                    )
                })
            }
        </div>
    );
}

export default App;
