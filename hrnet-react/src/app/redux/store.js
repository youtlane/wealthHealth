import { configureStore } from '@reduxjs/toolkit';
import { employeeReducer } from './employeeSlice';
import mockEmployees from '@/data/mockEmployees';

const loadState = () => {
    try {
        const savedEmployees = localStorage.getItem('employees');
        if (savedEmployees === null) {
            return mockEmployees;
        }
        const parsedEmployees = JSON.parse(savedEmployees);
        return parsedEmployees;
    } catch (err) {
        console.error('Error loading state from localStorage', err);
        return mockEmployees;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('employees', serializedState); // Sauvegarde dans le local storage
    } catch (err) {
        console.error('Error saving state to localStorage', err); // Gestion des erreurs
    }
};


const preloadedState = {
    employees: loadState(), // Charge les employés du local storage ou des mocks
};


const store = configureStore({
    reducer: {
        employees: employeeReducer,
    },
    preloadedState,
});

store.subscribe(() => {
    saveState(store.getState().employees); // Sauvegarde les employés dans le local storage à chaque modification
});


export default store;
