import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoType } from './todo.types';

const INITIAL_STATE: { todos: TodoType[] } = {
    todos: [

    ]
}

export const todoSlicer = createSlice({
    name: 'todos',
    reducers: {
        add: (state, action: PayloadAction<TodoType>) => {
            state.todos.push(action.payload);
        },
        remove: (state, action: PayloadAction<{ id: number }>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
        }
    },
    initialState: INITIAL_STATE
});

export const { add, remove } = todoSlicer.actions;

export default todoSlicer.reducer;