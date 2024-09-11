import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
    name: 'employees',
    initialState: [], 
    reducers: {
        addEmployee: (state, action) => {
            const newEmployee = {
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                dateOfBirth: action.payload.dateOfBirth, 
                startDate: action.payload.startDate,
                department: action.payload.department,
                street: action.payload.street,  
                city: action.payload.city,
                state: action.payload.state,
                zipCode: action.payload.zipCode, 
            };
            state.push(newEmployee); 
        },
    },
});

export const { addEmployee } = employeeSlice.actions;
export const employeeReducer = employeeSlice.reducer;
