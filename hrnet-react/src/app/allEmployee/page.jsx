"use client";

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const AllEmployee = () => {
  // Use the useSelector hook to access the employees from the Redux store
  const employees = useSelector((state) => state.employees);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Filter employees based on the search term
  const filteredEmployees = employees.filter(employee => 
    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    employee.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by first or last name"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      />

      {/* Employee Table */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Start Date</th>
            <th className="py-2 px-4 border-b">Department</th>
            <th className="py-2 px-4 border-b">Date of Birth</th>
            <th className="py-2 px-4 border-b">Street</th>
            <th className="py-2 px-4 border-b">City</th>
            <th className="py-2 px-4 border-b">State</th>
            <th className="py-2 px-4 border-b">Zip Code</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.length > 0 ? (
            currentEmployees.map((employee, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{employee.firstName}</td>
                <td className="py-2 px-4 border-b">{employee.lastName}</td>
                <td className="py-2 px-4 border-b">{employee.startDate}</td>
                <td className="py-2 px-4 border-b">{employee.department}</td>
                <td className="py-2 px-4 border-b">{employee.dob}</td>
                <td className="py-2 px-4 border-b">{employee.address?.street || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{employee.address?.city || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{employee.address?.state || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{employee.address?.postalCode || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-2 px-4 border-b text-center" colSpan="9">No data available in table</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          Showing {indexOfFirstEmployee + 1} to {Math.min(indexOfLastEmployee, filteredEmployees.length)} of {filteredEmployees.length} entries
        </p>
        <div className="flex gap-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AllEmployee;
