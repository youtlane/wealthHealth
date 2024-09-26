"use client";

import React, { useMemo, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useTable, usePagination } from "react-table";
import { FaSearch, FaHome } from "react-icons/fa";
import Link from "next/link";
import '../global.css';

const AllEmployee = () => {
  const employees = useSelector((state) => state.employees);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) =>
      Object.values(employee).some((value) =>
        value ? value.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false
      )
    );
  }, [employees, searchTerm]);

  const data = useMemo(() => {
    return filteredEmployees.map((employee) => ({
      ...employee,
    }));
  }, [filteredEmployees]);

  const columns = useMemo(
    () => [
      { Header: "First Name", accessor: "firstName" },
      { Header: "Last Name", accessor: "lastName" },
      { Header: "Start Date", accessor: "startDate" },
      { Header: "Department", accessor: "department" },
      { Header: "Date of Birth", accessor: "dateOfBirth" },
      { Header: "Street", accessor: "street" },
      { Header: "City", accessor: "city" },
      { Header: "State", accessor: "state" },
      { Header: "Zip Code", accessor: "zipCode" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Employee List</h1>
        <div className="flex items-center">
          <Link href="/">
            <FaHome className="text-gray-600 cursor-pointer hover:text-indigo-600 mr-4" size={24} />
          </Link>
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

      <table {...getTableProps()} className="min-w-full border-collapse border border-gray-200 rounded-lg overflow-hidden shadow-lg">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="border border-gray-300 p-2" style={{ backgroundColor: 'rgb(224, 231, 255)', color: 'rgb(75, 85, 99)' }}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border border-gray-300">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="border border-gray-300 p-2">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button onClick={() => previousPage()} disabled={!canPreviousPage} className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50">
          Previous
        </button>
        <span>
          Page {pageIndex + 1} of {pageOptions.length}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage} className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default AllEmployee;
