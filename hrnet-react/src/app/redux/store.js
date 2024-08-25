
import { configureStore } from '@reduxjs/toolkit';
import { employeeReducer } from './employeeSlice'; // Importer le reducer des employés

const store = configureStore({
    reducer: {
        employees: employeeReducer,
    },
});

export default store;
