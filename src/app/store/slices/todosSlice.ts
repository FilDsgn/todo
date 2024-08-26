import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ITodo} from '../../shared/types/todo.interface';

interface IChannelsSlice {
    todos: ITodo[];
}

const initialState: IChannelsSlice = {
    todos: [],
};

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<ITodo>) => {
            state.todos = [...state.todos, action.payload];
        },
        setTodoType: (state, action: PayloadAction<ITodo>) => {
            state.todos = state.todos.map((todo: ITodo) => {
                if (todo.id === action.payload.id) {
                    return {
                        ...todo,
                        type: action.payload.type === 'completed' ? 'active' : 'completed',
                    };
                } else {
                    return todo;
                }
            });
        },
        clearCompleted: (state) => {
            state.todos = state.todos.filter((todo: ITodo) => todo.type !== 'completed');
        },
    },
});

export default todosSlice.reducer;
export const {addTodo, setTodoType, clearCompleted} = todosSlice.actions;
