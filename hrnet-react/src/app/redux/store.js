import { configureStore } from '@reduxjs/toolkit';
import { employeeReducer } from './employeeSlice';


const loadState = () => {
    try {
        const serializedState = localStorage.getItem('employees');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};


const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('employees', serializedState);
    } catch (err) {
        // oublier pas ici les erreurs  :D
    }
};

const preloadedState = loadState();

const store = configureStore({
    reducer: {
        employees: employeeReducer,
    },
    preloadedState: {
        employees: preloadedState,
    },
});


store.subscribe(() => {
    saveState(store.getState().employees);
});

export default store;
