"use client";

import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "./redux/employeeSlice";
import NewEmployeeForm from "../components/NewEmployeeForm";
//import { CustomModal } from "custom-modal-react-hy";

import './global.css';
import { CustomModal } from "custom-modal-react-hy";


export default function AddEmployee() {
  const [modalIsOpen, setModalIsOpen] = useState(false); 
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const handleSubmit = (data) => {
    // Récupérer les données du formulaire
    const { firstName, lastName, dateOfBirth, startDate, department, street, city, state, zipCode } = data;

    // Créer un nouvel objet employé
    const newEmployee = { firstName, lastName, dateOfBirth, startDate, department, street, city, state, zipCode };

    // Dispatcher l'action pour ajouter l'employé
    dispatch(addEmployee(newEmployee));

    // Ouvrir le modal après la soumission
    setModalIsOpen(true);
  };

  const closeModal = () => {
    // Réinitialiser le formulaire
    if (formRef.current) {
      formRef.current.resetForm();
    }
    // Fermer le modal
    setModalIsOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <NewEmployeeForm onSubmit={handleSubmit} ref={formRef} />

      {/* Modal personnalisé */}
      <CustomModal isOpen={modalIsOpen} onClose={closeModal}>
        <h2>Employee Added</h2>
      </CustomModal> 
    </div>
  );
}
