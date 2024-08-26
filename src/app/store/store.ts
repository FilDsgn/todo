import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import todosSlice from './slices/todosSlice';

const rootReducer = combineReducers({
    todosSlice,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }).concat(),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
