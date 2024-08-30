
import React from 'react';


const departments = [
    { value: '', label: 'Select Department' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'Legal', label: 'Legal' }
];

const DepartmentSelect = ({ value, onChange, error }) => (
    <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
            Department
        </label>
        <select
            id="department"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={error ? "true" : "false"}
            aria-describedby="department-error"
            className="block w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
            {departments.map((dept) => (
                <option key={dept.value} value={dept.value}>
                    {dept.label}
                </option>
            ))}
        </select>
        {error && <span id="department-error" className="text-red-500 text-sm">{error}</span>}
    </div>
);

export default DepartmentSelect;
