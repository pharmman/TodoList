import {addTaskAC, updateTaskAC, removeTaskAC, setTasks, tasksReducer, TasksStateType} from './tasks-reducer';
import {addTodoListAC, removeTodoListAC, setTodolists} from './todolist-reducer';
import {TaskPriorities, TaskStatuses} from '../../../../api/todolistsAPI';

let startState: TasksStateType;
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId1'
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId2'
            }
        ]
    };
})

test('correct task should be deleted from correct todolist', () => {

    const action = removeTaskAC('2', 'todolistId2');
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'][1].id).toBe('3')
    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId1'
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId2'
            }
        ]
    })
})

test('correct task should be added to correct todolist', () => {

    const action = addTaskAC({
        id: '100', title: 'WORK', status: TaskStatuses.New, addedDate: '',
        deadline: '',
        description: '',
        order: 1,
        priority: TaskPriorities.Middle,
        startDate: '',
        todoListId: 'todolistId1'
    });

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '100', title: 'WORK', status: TaskStatuses.New, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: '1', title: 'CSS', status: TaskStatuses.New, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId1'
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId2'
            }
        ]
    })
})

test('status of specified task should be changed', () => {

    const action = updateTaskAC('todolistId2', '2', {status: TaskStatuses.New})
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId1'
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.New, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId2'
            }
        ]
    })
})

test('title specify task should be changed', () => {

    const action = updateTaskAC('todolistId1', '1', {title:'Redux'})
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1', title: 'Redux', status: TaskStatuses.New, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId1'
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId2'
            }
        ]
    })
})

test('new array should be added when new todolist is added', () => {

    const action = addTodoListAC( {id: 'todolistId3', title: 'What to learn', addedDate: '', order: 1});

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2');
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {


    const action = removeTodoListAC('todolistId2');

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined();
});

test('empty arrays should be added when todolist added', () => {
    const action = setTodolists([{id: '1', order: 1, addedDate: '', title: ''},
        {id: '2', order: 2, addedDate: '', title: ''}])

    const endState = tasksReducer({}, action)

    expect(Object.keys(endState).length).toBe(2)
    expect(endState['1']).toEqual([])
    expect(endState['2']).toEqual([])
})

test('tasks should be setted to todolists', () => {
    const action = setTasks(startState['todolistId1'], 'todolistId1')

    const endState = tasksReducer({
        'todolistId1': [],
        'todolistId2': [],
    }, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState['todolistId1']).toBe(startState['todolistId1'])
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(0)

})
