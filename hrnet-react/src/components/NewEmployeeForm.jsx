import React, { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import StateSelect from './StateSelect';
import DepartmentSelect from './DepartmentSelect';
import HeaderForms from "./HeaderForms";
import DateInputField from "./DateInputField";

const NewEmployeeForm = forwardRef((props, ref) => {
    const { onSubmit } = props;
    const { register, handleSubmit, formState: { errors }, setValue, getValues, reset } = useForm();

    // Expose the reset function to parent components
    useImperativeHandle(ref, () => ({
        resetForm: () => reset()
    }));

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 my-10 rounded-lg shadow-xl w-full max-w-3xl border border-gray-200">
            <div className="space-y-8">
                <HeaderForms />
                <div className="border-b border-gray-300 pb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input
                                id="first-name"
                                {...register("firstName", {
                                    required: "First name is required",
                                    pattern: {
                                        value: /^[A-Za-z]+$/i,
                                        message: "First name must contain only letters"
                                    }
                                })}
                                type="text"
                                placeholder="Jane"
                                autoComplete="given-name"
                                aria-invalid={errors.firstName ? "true" : "false"}
                                aria-describedby="first-name-error"
                                className="block w-full border border-gray-300 rounded-lg p-2 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.firstName && (
                                <span id="first-name-error" className="text-red-500 text-sm">
                                    {errors.firstName.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input
                                id="last-name"
                                {...register("lastName", {
                                    required: "Last name is required",
                                    pattern: {
                                        value: /^[A-Za-z]+$/i,
                                        message: "Last name must contain only letters"
                                    }
                                })}
                                type="text"
                                placeholder="Smith"
                                autoComplete="family-name"
                                aria-invalid={errors.lastName ? "true" : "false"}
                                aria-describedby="last-name-error"
                                className="block w-full border border-gray-300 rounded-lg p-2 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.lastName && (
                                <span id="last-name-error" className="text-red-500 text-sm">
                                    {errors.lastName.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="date-of-birth" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                            <DateInputField
                                id="dateOfBirth" 
                                register={register}
                                validation={{
                                    required: "Date of Birth is required",
                                    validate: (value) => {
                                        return (
                                            value <= new Date().toISOString().split("T")[0] ||
                                            "Date of Birth cannot be in the future"
                                        );
                                    },
                                }}
                                errors={errors}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">Start Working Date</label>
                            <DateInputField
                                id="startDate" 
                                register={register}
                                validation={{
                                    required: "Start date is required",
                                    validate: (value) => {
                                        return (
                                            value >= new Date().toISOString().split("T")[0] ||
                                            "Start date cannot be in the past"
                                        );
                                    },
                                }}
                                errors={errors}
                            />
                        </div>

                        
                        <DepartmentSelect
                            value={getValues("department")}
                            onChange={(value) => setValue('department', value)}
                            error={errors.department?.message}
                        />
                    </div>
                </div>
                <div className="border-b border-gray-300 pb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Address</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                            <input
                                id="street"
                                {...register("street", { required: "Street is required" })}
                                type="text"
                                placeholder="123 Main St"
                                aria-invalid={errors.street ? "true" : "false"}
                                aria-describedby="street-error"
                                className="block w-full border border-gray-300 rounded-lg p-2 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.street && (
                                <span id="street-error" className="text-red-500 text-sm">
                                    {errors.street.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                            <input
                                id="city"
                                {...register("city", { required: "City is required" })}
                                type="text"
                                placeholder="City"
                                aria-invalid={errors.city ? "true" : "false"}
                                aria-describedby="city-error"
                                className="block w-full border border-gray-300 rounded-lg p-2 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.city && (
                                <span id="city-error" className="text-red-500 text-sm">
                                    {errors.city.message}
                                </span>
                            )}
                        </div>
                        <StateSelect
                            value={getValues("state")}
                            onChange={(value) => setValue('state', value)}
                            error={errors.state?.message}
                        />
                        <div>
                            <label htmlFor="zip-code" className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                            <input
                                id="zip-code"
                                {...register("zipCode", {
                                    required: "Zip Code is required",
                                    pattern: {
                                        value: /^[0-9]{5}$/,
                                        message: "Zip Code must be in the format 12345"
                                    }
                                })}
                                type="text"
                                placeholder="12345"
                                aria-invalid={errors.zipCode ? "true" : "false"}
                                aria-describedby="zip-code-error"
                                className="block w-full border border-gray-300 rounded-lg p-2 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.zipCode && (
                                <span id="zip-code-error" className="text-red-500 text-sm">
                                    {errors.zipCode.message}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-4 mt-8">
                <button
                    type="submit"
                    className="bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Save
                </button>
            </div>
        </form>
    );
});

export default NewEmployeeForm;
