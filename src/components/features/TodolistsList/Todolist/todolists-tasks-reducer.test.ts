import {TodolistDomainType, todoListReducer} from './todolist-reducer';
import {tasksReducer, TasksStateType} from './tasks-reducer';
import {asyncActions as todolistAsyncActions} from './todolist-reducer'

const {createTodolist} = todolistAsyncActions


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<TodolistDomainType> = [];

    const action = createTodolist.fulfilled({
        todolist: {
            id: 'todolistId1',
            title: 'What to learn',
            addedDate: '',
            order: 1
        }
    }, 'requestId', 'What to learn');

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});
