import React from 'react';
import {AppRootStateType, store} from '../../state/store';
import {tasksReducer} from '../../state/tasks-reducer';
import {todoListReducer} from '../../state/todolist-reducer';
import {combineReducers, createStore} from 'redux';
import {v1} from 'uuid';
import {Provider} from 'react-redux';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
})

type StorybookReducerType = ReturnType<typeof rootReducer>

const initialGlobalState:AppRootStateType = {
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


const storybookStore = createStore(rootReducer, initialGlobalState)


export const ReduxStoreProviderDecorator = (storyFn:any) => {
    return (
        <Provider store={storybookStore}>{storyFn()}</Provider>
    )
}