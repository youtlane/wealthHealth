"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "./redux/employeeSlice";
import Link from "next/link";
import Image from "next/image";
import Modal from "react-modal";
import NewEmployeeForm from "../components/NewEmployeeForm"; 
import './global.css';


Modal.setAppElement('body');

export default function AddEmployee() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    const newEmployee = {
      ...data,
      address: {
        street: data.address,
        city: data.city,
        state: data.state,
        postalCode: data.zipCode
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
      <div className="bg-white p-8 my-10 rounded-lg shadow-xl w-full max-w-3xl border border-gray-200">
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
              <Link className="mt-2 text-sm text-indigo-600 hover:underline" href="/allEmployee">
                View Current Employees
              </Link>
              <h2 className="text-xl font-semibold text-gray-800 mt-4">Create Employee</h2>
            </div>
          </div>
          
          <NewEmployeeForm onSubmit={handleSubmit} />
        </div>
      </div>

      {/* Modal de confirmation */}
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
