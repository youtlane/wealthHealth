"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaSearch, FaArrowLeft, FaArrowRight, FaSortUp, FaSortDown, FaHome } from "react-icons/fa";
import Link from "next/link";
import '../global.css';

const filterEmployees = (employees, searchTerm) => {
  const term = searchTerm.toLowerCase();
  return employees.filter((employee) =>
    Object.values(employee).some((value) =>
      value ? value.toLowerCase().includes(term) : false
    )
  );
};

const sortEmployees = (employees, sortField, sortDirection) => {
  if (!sortField) return employees;

  return [...employees].sort((a, b) => {
    const aValue = typeof a[sortField] === "string" ? a[sortField].toLowerCase() : a[sortField];
    const bValue = typeof b[sortField] === "string" ? b[sortField].toLowerCase() : b[sortField];

    if (sortDirection === "asc") return aValue > bValue ? 1 : -1;
    if (sortDirection === "desc") return aValue < bValue ? 1 : -1;
    return 0;
  });
};

const AllEmployee = () => {
  const employees = useSelector((state) => state.employees);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const filteredEmployees = filterEmployees(employees, searchTerm);
  const sortedEmployees = sortEmployees(filteredEmployees, sortField, sortDirection);

  const totalEmployees = filteredEmployees.length;
  const totalPages = Math.ceil(totalEmployees / itemsPerPage);
  const currentEmployees = sortedEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (delta) => {
    setCurrentPage((prevPage) => Math.max(1, Math.min(totalPages, prevPage + delta)));
  };

  const handleSortClick = (field) => () => {
    if (sortField === field) {
      setSortDirection((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Employee List</h1>
        <div className="flex items-center">
          <Link href="/">
            <FaHome className="text-gray-600 cursor-pointer hover:text-indigo-600 mr-4" size={24} />
          </Link>
          <div className="flex items-center space-x-2">
            <label className="text-gray-600">Show:</label>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border border-gray-300 rounded-lg p-2 pl-3 pr-8 shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {[10, 25, 50, 100].map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

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
              {["firstName", "lastName", "startDate", "department", "dateOfBirth", "street", "city", "state", "zipCode"].map((field) => (
                <th key={field} className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">
                  <div className="flex items-center">
                    <span className="mr-2">{field.replace(/([A-Z])/g, " $1").toUpperCase()}</span>
                    <div className="flex flex-col">
                      <FaSortUp
                        className={`cursor-pointer ${sortField === field && sortDirection === "asc" ? "text-indigo-600" : "text-gray-400"}`}
                        onClick={handleSortClick(field)}
                        aria-label={`Sort by ${field.replace(/([A-Z])/g, " $1")}`}
                      />
                      <FaSortDown
                        className={`cursor-pointer ${sortField === field && sortDirection === "desc" ? "text-indigo-600" : "text-gray-400"}`}
                        onClick={handleSortClick(field)}
                        aria-label={`Sort by ${field.replace(/([A-Z])/g, " $1")}`}
                      />
                    </div>
                  </div>
                </th>
              ))}
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
          onClick={() => handlePageChange(-1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
          className="bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <FaArrowLeft className="inline-block mr-2" /> Previous
        </button>

        <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>

        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
          className="bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Next <FaArrowRight className="inline-block ml-2" />
        </button>
      </div>
    </div>
  );
};

export default AllEmployee;
