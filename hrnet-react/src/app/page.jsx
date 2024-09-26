"use client";

import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "./redux/employeeSlice";
import Modal from "react-modal";
import NewEmployeeForm from "../components/NewEmployeeForm";
import './global.css';

export default function AddEmployee() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const handleSubmit = (data) => {
    // destructure the form data
    const { firstName, lastName, dateOfBirth, startDate, department, street, city, state, zipCode } = data;

    // create new employee object with all fields at the top level
    const newEmployee = {
      firstName,
      lastName,
      dateOfBirth,
      startDate,
      department,
      street,
      city,
      state,
      zipCode,
    };

    // dispatch the action to add the employee
    dispatch(addEmployee(newEmployee));

    // open the modal
    setModalIsOpen(true);
  };

  const closeModal = () => {
    // reeset all form fields
    if (formRef.current) {
      formRef.current.resetForm();
    }
    setModalIsOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <NewEmployeeForm onSubmit={handleSubmit} ref={formRef} />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Employee Added"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Employee Added</h2>
        <button 
          onClick={closeModal}
          className="bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </Modal>
    </div>
  );
}
