import { createStore } from 'redux';
import { combineReducers } from 'redux';
import menuReducer from './menuReducer'

const reducers = combineReducers({
    menuState : menuReducer
});


export function configureStore(initialState) {
    const store = createStore(
        reducers,
        initialState
    );
    return store;
}
