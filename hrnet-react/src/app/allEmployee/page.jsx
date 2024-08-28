"use client";

import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTable, usePagination, useGlobalFilter } from 'react-table';

const AllEmployee = () => {
  const employees = useSelector((state) => state.employees);

  const [searchInput, setSearchInput] = useState('');

  const columns = useMemo(
    () => [
      { Header: 'First Name', accessor: 'firstName' },
      { Header: 'Last Name', accessor: 'lastName' },
      { Header: 'Start Date', accessor: 'startDate' },
      { Header: 'Department', accessor: 'department' },
      { Header: 'Date of Birth', accessor: 'dob' },
      { Header: 'Street', accessor: 'address.street' },
      { Header: 'City', accessor: 'address.city' },
      { Header: 'State', accessor: 'address.state' },
      { Header: 'Zip Code', accessor: 'address.postalCode' },
    ],
    []
  );

  const data = useMemo(() => employees, [employees]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  );

  const { pageIndex, globalFilter } = state;

  const handleSearchChange = (e) => {
    const value = e.target.value || '';
    setGlobalFilter(value);
    setSearchInput(value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>
      <input
        value={searchInput}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <table {...getTableProps()} className="min-w-full bg-white border border-gray-200">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100">
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="p-2 border-b border-gray-200">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.length > 0 ? (
            page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="text-center">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="p-2 border-b border-gray-200">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center p-2">
                No data available in table
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <span>
          Showing {page.length > 0 ? `${pageIndex * 10 + 1} to ${pageIndex * 10 + page.length}` : '0'} of{' '}
          {employees.length} entries
        </span>
        <div className="flex space-x-2">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllEmployee;
