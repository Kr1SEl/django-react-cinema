import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import rootReducer from '../reducers';

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware, loggerMiddleware]
});

export default store;

