"use client";

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaSearch, FaArrowLeft, FaArrowRight, FaSortUp, FaSortDown, FaHome } from 'react-icons/fa'; 
import Link from 'next/link';

const AllEmployee = () => {
  const employees = useSelector((state) => state.employees);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const filteredEmployees = employees.filter(employee => 
    (employee.firstName || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (employee.lastName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (employee.zipCode || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (employee.state || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (employee.city || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (employee.dateOfBirth || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (employee.startDate || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (employee.department || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (!sortField) return 0;

    let aValue = a[sortField];
    let bValue = b[sortField];

    if (typeof aValue === 'string') aValue = aValue.toLowerCase();
    if (typeof bValue === 'string') bValue = bValue.toLowerCase();

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else if (sortDirection === 'desc') {
      return aValue < bValue ? 1 : -1;
    }

    return 0;
  });

  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Employee List</h1>
        <Link href="/">
          <FaHome className="text-gray-600 cursor-pointer hover:text-indigo-600" size={24} />
        </Link>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search by first or last name, zip code, etc."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-3 pl-12 border border-gray-300 rounded-full w-full shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        />
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-indigo-100">
            <tr>
              {['firstName', 'lastName', 'startDate', 'department', 'dateOfBirth', 'street', 'city', 'state', 'zipCode'].map((field) => (
                <th key={field} className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">
                  <div className="flex items-center">
                    <span className="mr-2">{field.replace(/([A-Z])/g, ' $1').toUpperCase()}</span>
                    <div className="flex flex-col">
                      <FaSortUp className="text-gray-400 cursor-pointer hover:text-indigo-600" onClick={() => handleSort(field)} />
                      <FaSortDown className="text-gray-400 cursor-pointer hover:text-indigo-600" onClick={() => handleSort(field)} />
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentEmployees.length === 0 ? (
              <tr>
                <td colSpan="9" className="py-4 px-6 text-center text-gray-500">No employees found.</td>
              </tr>
            ) : (
              currentEmployees.map((employee, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4 text-sm text-gray-700">{employee.firstName}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{employee.lastName}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{employee.startDate}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{employee.department}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{employee.dateOfBirth}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{employee.street}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{employee.city}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{employee.state}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{employee.zipCode}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <FaArrowLeft className="inline-block mr-2" /> Previous
        </button>

        <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>

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
