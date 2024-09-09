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
                <div className="flex items-center">
                  <span className="mr-2">First Name</span>
                  <div className="flex flex-col">
                    <FaSortUp className="text-gray-400 cursor-pointer hover:text-indigo-600" onClick={() => handleSort('firstName')} />
                    <FaSortDown className="text-gray-400 cursor-pointer hover:text-indigo-600" onClick={() => handleSort('firstName')} />
                  </div>
                </div>
              </th>

              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">
                <div className="flex items-center">
                  <span className="mr-2">Last Name</span>
                  <div className="flex flex-col">
                    <FaSortUp className="text-gray-400 cursor-pointer hover:text-indigo-600" onClick={() => handleSort('lastName')} />
                    <FaSortDown className="text-gray-400 cursor-pointer hover:text-indigo-600" onClick={() => handleSort('lastName')} />
                  </div>
                </div>
              </th>

              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">
                <div className="flex items-center">
                  <span className="mr-2">Start Date</span>
                  <div className="flex flex-col">
                    <FaSortUp className="text-gray-400 cursor-pointer hover:text-indigo-600" onClick={() => handleSort('startDate')} />
                    <FaSortDown className="text-gray-400 cursor-pointer hover:text-indigo-600" onClick={() => handleSort('startDate')} />
                  </div>
                </div>
              </th>

              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">
                <div className="flex items-center">
                  <span className="mr-2">Department</span>
                  <div className="flex flex-col">
                    <FaSortUp className="text-gray-400 cursor-pointer hover:text-indigo-600" onClick={() => handleSort('department')} />
                    <FaSortDown className="text-gray-400 cursor-pointer hover:text-indigo-600" onClick={() => handleSort('department')} />
                  </div>
                </div>
              </th>

              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">
                <div className="flex items-center">
                  <span className="mr-2">Date of Birth</span>
                  <div className="flex flex-col">
                    <FaSortUp className="text-gray-400 cursor-pointer hover:text-indigo-600" onClick={() => handleSort('dob')} />
                    <FaSortDown className="text-gray-400 cursor-pointer hover:text-indigo-600" onClick={() => handleSort('dob')} />
                  </div>
                </div>
              </th>

              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">
                <div className="flex items-center">
                  <span className="mr-2">Street</span>
                  <div className="flex flex-col">
                    <FaSortUp className="text-gray-400 cursor-pointer hover:text-indigo-600" onClick={() => handleSort('address.street')} />
                    <FaSortDown className="text-gray-400 cursor-pointer hover:text-indigo-600" onClick={() => handleSort('address.street')} />
                  </div>
                </div>
              </th>

              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">
                <div className="flex items-center">
                  <span className="mr-2">City</span>
                  <div className="flex flex-col">
                    <FaSortUp className="text-gray-400 cursor-pointer hover:text-indigo-600" onClick={() => handleSort('address.city')} />
                    <FaSortDown className="text-gray-400 cursor-pointer hover:text-indigo-600" onClick={() => handleSort('address.city')} />
                  </div>
                </div>
              </th>

              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">
                <div className="flex items-center">
                  <span className="mr-2">State</span>
                  <div className="flex flex-col">
                    <FaSortUp className="text-gray-400 cursor-pointer hover:text-indigo-600" onClick={() => handleSort('address.state')} />
                    <FaSortDown className="text-gray-400 cursor-pointer hover:text-indigo-600" onClick={() => handleSort('address.state')} />
                  </div>
                </div>
              </th>

              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">
                <div className="flex items-center">
                  <span className="mr-2">Zip Code</span>
                  <div className="flex flex-col">
                    <FaSortUp className="text-gray-400 cursor-pointer hover:text-indigo-600" onClick={() => handleSort('address.postalCode')} />
                    <FaSortDown className="text-gray-400 cursor-pointer hover:text-indigo-600" onClick={() => handleSort('address.postalCode')} />
                  </div>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {currentEmployees.length === 0 ? (
              <tr>
                <td colSpan="9" className="py-4 px-6 text-center text-gray-500">
                  No employees found.
                </td>
              </tr>
            ) : (
              currentEmployees.map((employee) => (
                <tr key={employee.id} className="border-b">
                  <td className="py-3 px-4 text-sm text-gray-700">{employee.firstName}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{employee.lastName}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{employee.startDate}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{employee.department}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{employee.dob}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{employee.address.street}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{employee.address.city}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{employee.address.state}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{employee.address.postalCode}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <FaArrowLeft className="inline-block mr-2" /> Previous
        </button>

        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Next <FaArrowRight className="inline-block ml-2" />
        </button>
      </div>
    </div>
  );
};

export default AllEmployee;
