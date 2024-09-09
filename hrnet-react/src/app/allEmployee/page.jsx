"use client";

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaSearch, FaArrowLeft, FaArrowRight, FaSortUp, FaSortDown } from 'react-icons/fa'; 

const AllEmployee = () => {
  const employees = useSelector((state) => state.employees);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  // Filter employees based on the search term
  const filteredEmployees = employees.filter(employee => 
    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    employee.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort employees based on the current sorting field and direction
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (!sortField) return 0;

    let aValue = a[sortField];
    let bValue = b[sortField];

    // Convert to lowercase for string comparison
    if (typeof aValue === 'string') aValue = aValue.toLowerCase();
    if (typeof bValue === 'string') bValue = bValue.toLowerCase();

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else if (sortDirection === 'desc') {
      return aValue < bValue ? 1 : -1;
    }

    return 0;
  });

  // Pagination logic
  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
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

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
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
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">
                First Name
                <FaSortUp className="inline ml-1 cursor-pointer" onClick={() => handleSort('firstName')} />
                <FaSortDown className="inline ml-1 cursor-pointer" onClick={() => handleSort('firstName')} />
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">
                Last Name
                <FaSortUp className="inline ml-1 cursor-pointer" onClick={() => handleSort('lastName')} />
                <FaSortDown className="inline ml-1 cursor-pointer" onClick={() => handleSort('lastName')} />
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">
                Start Date
                <FaSortUp className="inline ml-1 cursor-pointer" onClick={() => handleSort('startDate')} />
                <FaSortDown className="inline ml-1 cursor-pointer" onClick={() => handleSort('startDate')} />
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">
                Department
                <FaSortUp className="inline ml-1 cursor-pointer" onClick={() => handleSort('department')} />
                <FaSortDown className="inline ml-1 cursor-pointer" onClick={() => handleSort('department')} />
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">
                Date of Birth
                <FaSortUp className="inline ml-1 cursor-pointer" onClick={() => handleSort('dob')} />
                <FaSortDown className="inline ml-1 cursor-pointer" onClick={() => handleSort('dob')} />
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">
                Street
                <FaSortUp className="inline ml-1 cursor-pointer" onClick={() => handleSort('address.street')} />
                <FaSortDown className="inline ml-1 cursor-pointer" onClick={() => handleSort('address.street')} />
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">
                City
                <FaSortUp className="inline ml-1 cursor-pointer" onClick={() => handleSort('address.city')} />
                <FaSortDown className="inline ml-1 cursor-pointer" onClick={() => handleSort('address.city')} />
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">
                State
                <FaSortUp className="inline ml-1 cursor-pointer" onClick={() => handleSort('address.state')} />
                <FaSortDown className="inline ml-1 cursor-pointer" onClick={() => handleSort('address.state')} />
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">
                Zip Code
                <FaSortUp className="inline ml-1 cursor-pointer" onClick={() => handleSort('address.postalCode')} />
                <FaSortDown className="inline ml-1 cursor-pointer" onClick={() => handleSort('address.postalCode')} />
              </th>
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
