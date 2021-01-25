import {
    addTodoListAC,
    FilterValuesType,
    removeTodoListAC,
    setTodolists,
    TodolistDomainType,
    todoListReducer
} from './todolist-reducer';
import {v1} from 'uuid';

let startState: Array<TodolistDomainType>
let todolistId1: string;
let todolistId2: string;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 1, entityStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 1, entityStatus: 'idle'}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todoListReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist';


    const endState = todoListReducer(startState, addTodoListAC({
        id: todolistId1,
        title: newTodolistTitle,
        addedDate: '',
        order: 1
    }));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist';

    const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = todoListReducer(startState, action);

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = 'completed';

    const action = {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: todolistId2,
        filter: newFilter
    };

    const endState = todoListReducer(startState, action);

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});

test('todolists should be set to state', () => {

    const action = setTodolists(startState)

    const endState = todoListReducer([], action);

    expect(endState).toEqual(startState)
});



