import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from '../../state/tasks-reducer';
import {todoListReducer} from '../../state/todolist-reducer';
import {v1} from 'uuid';

type AppRootStateType = ReturnType<typeof storybookRootReducer>

const initialState:AppRootStateType = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

const storybookRootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
})


const storybookStore = createStore(storybookRootReducer,initialState)


export const ReduxStoreProviderDecorator = (storyFn:any) => {
    return (
        <Provider store={storybookStore}>{storyFn()}</Provider>
    )
}