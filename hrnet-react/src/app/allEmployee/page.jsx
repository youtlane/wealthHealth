"use client";

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import icons

const AllEmployee = () => {
  // Use the useSelector hook to access the employees from the Redux store 
  const employees = useSelector((state) => state.employees);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

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
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Employee List</h1>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search by first or last name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-3 pl-12 border border-gray-300 rounded-full w-full shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        />
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Employee Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-indigo-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">First Name</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">Last Name</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">Start Date</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">Department</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">Date of Birth</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">Street</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">City</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">State</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">Zip Code</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((employee, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50 transition duration-150`}>
                  <td className="py-3 px-4 border-b">{employee.firstName}</td>
                  <td className="py-3 px-4 border-b">{employee.lastName}</td>
                  <td className="py-3 px-4 border-b">{employee.startDate}</td>
                  <td className="py-3 px-4 border-b">{employee.department}</td>
                  <td className="py-3 px-4 border-b">{employee.dob}</td>
                  <td className="py-3 px-4 border-b">{employee.address?.street || 'N/A'}</td>
                  <td className="py-3 px-4 border-b">{employee.address?.city || 'N/A'}</td>
                  <td className="py-3 px-4 border-b">{employee.address?.state || 'N/A'}</td>
                  <td className="py-3 px-4 border-b">{employee.address?.postalCode || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-6 px-4 text-center text-gray-500" colSpan="9">
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-600">
          Showing {indexOfFirstEmployee + 1} to {Math.min(indexOfLastEmployee, filteredEmployees.length)} of {filteredEmployees.length} entries
        </p>
        <div className="flex gap-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`flex items-center bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
          >
            <FaArrowLeft className="mr-2" />
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
          >
            Next
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AllEmployee;
