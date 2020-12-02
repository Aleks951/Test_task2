import { createStore } from 'redux';
import reducer from './index';

export default function initializeStore(initialState) {
    return createStore(
        reducer,
        initialState
    );
};