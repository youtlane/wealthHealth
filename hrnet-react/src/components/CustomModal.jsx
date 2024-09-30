import React from "react";


const CustomModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; 

    return (
    <div className="modal-overlay">
        <div className="modal-content">
            {children}
            <button 
                onClick={onClose} 
                className="modal-close-btn bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                Close
            </button>
        </div>
    </div>
    );
};

export default CustomModal;
