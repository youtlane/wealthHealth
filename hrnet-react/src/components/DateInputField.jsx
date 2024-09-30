import React from 'react';

const DateInputField = ({ label, id, register, validation, errors, className, ...props }) => {
    return (
        <div>
            
            <input
                id={id}
                {...register(id, validation)}
                type="date"
                aria-invalid={errors[id] ? "true" : "false"}
                aria-describedby={`${id}-error`}
                className={`${className} block w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                {...props}
            />
            {errors[id] && (
                <span id={`${id}-error`} className="text-red-500 text-sm">
                    {errors[id].message}
                </span>
            )}
        </div>
    );
};

export default DateInputField;
