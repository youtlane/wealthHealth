"use client";

import React from 'react';
import { useSelector } from 'react-redux';

const allEmployee = () => {
  // Use the useSelector hook to access the employees from the Redux store
  const employees = useSelector((state) => state.employees);

  console.log('employees ', employees);
  return (
    <div>
      <h1>Employee List { employees.length }</h1>
      <ul>
        {employees.length > 0 ? (
          employees.map((employee, index) => (

            
            <li key={index}>{employee.firstName}</li>
          ))
        ) : (
          <li>No employees available.</li>
        )}
      </ul>
    </div>
  );
}

export default allEmployee;