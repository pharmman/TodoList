import {
    addTodoListAC,
    FilterValuesType,
    removeTodoListAC,
    setTodolistEntityStatus,
    setTodolists,
    TodolistDomainType,
    todoListReducer,
    changeTodoListFilterAC,
    changeTodoListTitleAC
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
    const endState = todoListReducer(startState, removeTodoListAC({todoListID: todolistId1}))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist';


    const endState = todoListReducer(startState, addTodoListAC({
        todolist: {
            id: todolistId1,
            title: newTodolistTitle,
            addedDate: '',
            order: 1
        }
    }));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist';

    const action = changeTodoListTitleAC({title: newTodolistTitle, id: todolistId2})

    const endState = todoListReducer(startState, action);

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = 'completed';

    const action = changeTodoListFilterAC({filter: 'completed', id:todolistId2})

    const endState = todoListReducer(startState, action);

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});

test('todolists should be set to state', () => {

    const action = setTodolists({todolists: startState})

    const endState = todoListReducer([], action);

    expect(endState).toEqual(startState)
});

test('entity status should be added to correct todolist', () => {
    const action = setTodolistEntityStatus({entityStatus: 'loading', id: todolistId1})
    const endState = todoListReducer(startState, action)

    expect(endState[0].entityStatus).toBe('loading')
    expect(endState[1].entityStatus).toBe('idle')
})



