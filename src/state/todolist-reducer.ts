import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id:string
    filter: FilterValuesType
}

type ActionType = ChangeTodolistFilterActionType | ChangeTodolistTitleActionType | AddTodolistActionType | RemoveTodolistActionType

export const todoListReducer = (state:Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodoList: TodoListType = {
                id:v1(),
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodoList];
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(t => t.id === action.id)
            if (todoList){
                todoList.title = action.title
                return [...state]
            }
            return state
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = state.find(t => t.id === action.id)
            if (todoList){
                todoList.filter = action.filter
                return [...state]
            }
            return state
        }
        default:
            throw new Error('I don\'t understand this type');
    }
}

export const RemoveTodoListAC = (todoListID:string):RemoveTodolistActionType => ({type:'REMOVE-TODOLIST', id:todoListID});
export const AddTodoListAC = (todoListTitle: string):AddTodolistActionType  => ({type:'ADD-TODOLIST', title: todoListTitle});