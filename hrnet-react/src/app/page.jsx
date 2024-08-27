"use client";

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from './redux/employeeSlice'; 
import Link from 'next/link';
import './global.css';
import Image from 'next/image';
import Modal from 'react-modal';

// Configure l'élément principal pour le modal
Modal.setAppElement('body'); 

export default function AddEmployee() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [startDate, setStartDate] = useState('');
  const [department, setDepartment] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      firstName,
      lastName,
      dob,
      startDate,
      department,
      address: {
        street,
        city,
        state,
        postalCode
      }
    };
    dispatch(addEmployee(newEmployee));
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 my-10 rounded-lg shadow-xl w-full max-w-3xl border border-gray-200">
        <div className="space-y-8">
          <div className="border-b border-gray-300 pb-8">
            <h1 className="text-2xl font-bold text-gray-800 text-center">HRnet</h1>
            <div className="flex flex-col items-center mt-4">
              <Image
                src="/hrnet-logo.png"
                alt="HRnet Logo"
                width={150}
                height={100}
                className="rounded-lg shadow-md"
              />
              <Link className="mt-2 text-sm text-indigo-600 hover:underline" href="/allEmployee">View Current Employees</Link>
              <h2 className="text-xl font-semibold text-gray-800 mt-4">Create Employee</h2>
            </div>
          </div>
          
          <div className="border-b border-gray-300 pb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  placeholder="Jane"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="block w-full border border-gray-300 rounded-lg p-2 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  placeholder="Smith"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="block w-full border border-gray-300 rounded-lg p-2 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                  className="block w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">Start Working Date</label>
                <input
                  id="start-date"
                  name="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="block w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  id="department"
                  name="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                  className="block w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Department</option>
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>Engineering</option>
                  <option>Human Resources</option>
                  <option>Legal</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-300 pb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Address</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                <input
                  id="street"
                  name="street"
                  type="text"
                  placeholder="123 Main St"
                  autoComplete="street-address"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                  className="block w-full border border-gray-300 rounded-lg p-2 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="City"
                  autoComplete="address-level2"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="block w-full border border-gray-300 rounded-lg p-2 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <select
                  id="state"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  className="block w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select State</option>
                  <option>State1</option>
                  <option>State2</option>
                  <option>State3</option>
                </select>
              </div>
              <div>
                <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 mb-1">ZIP / Postal Code</label>
                <input
                  id="postal-code"
                  name="postal-code"
                  type="text"
                  autoComplete="postal-code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                  className="block w-full border border-gray-300 rounded-lg p-2 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button type="button" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </form>

      {/* Modal de confirmation */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Employee Added"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Employee Added</h2>
        <button onClick={closeModal} className="button">OK</button>
      </Modal>
    </div>
  );
}
