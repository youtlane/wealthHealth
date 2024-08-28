import { createSlice } from '@reduxjs/toolkit';
import mockEmployees from '@/data/mockEmployees'; 


const getInitialEmployees = () => {
    if (typeof window !== 'undefined') {
        const savedEmployees = localStorage.getItem('employees');
        if (savedEmployees) {
            return JSON.parse(savedEmployees);
        }
    }
    return mockEmployees; // Retourner les données mockées si aucune donnée n'est trouvée dans le local storage
};

const employeeSlice = createSlice({
    name: 'employees',
    initialState: getInitialEmployees(),
    reducers: {
        addEmployee: (state, action) => {
            state.push(action.payload);
            if (typeof window !== 'undefined') {
                localStorage.setItem('employees', JSON.stringify(state));
            }
        },
    },
});

export const { addEmployee } = employeeSlice.actions;
export const employeeReducer = employeeSlice.reducer;
