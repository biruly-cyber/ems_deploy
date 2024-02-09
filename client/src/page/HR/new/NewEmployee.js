import axios from "axios";
import React, { useState } from "react";
import { server } from "../../../App";
import { ToastContainer, toast } from "react-toastify";

const NewEmployee = () => {
  const [formData, setFormData] = useState({
    employeeName: "",
    gender: "",
    employeeEmail: "",
    password: "",
    employeePhoneNumber: "",
    dateOfBirth: "",
    address: "",
    postOffice: "",
    policeStation: "",
    city: "",
    state: "",
    pinNumber: "",
    designation: "",
    designationType: "",
    department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here

    const {
      employeeName,
      gender,
      employeeEmail,
      password,
      employeePhoneNumber,
      dateOfBirth,
      address,
      postOffice,
      policeStation,
      city,
      state,
      pinNumber,
      designation,
      designationType,
      department,
    } = formData;

    try {
      const response = await axios.post(
        `${server}/employee/new`,
        {
          employeeName,
          gender,
          employeeEmail,
          password,
          employeePhoneNumber,
          dateOfBirth,
          address,
          postOffice,
          policeStation,
          city,
          state,
          pinNumber,
          designation,
          designationType,
          department,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message } = response.data;
      if (success) {
       
        toast.success(message)

        setFormData( { employeeName: "",
        gender: "",
        employeeEmail: "",
        password: "",
        employeePhoneNumber: "",
        dateOfBirth: "",
        address: "",
        postOffice: "",
        policeStation: "",
        city: "",
        state: "",
        pinNumber: "",
        designation: "",
        designationType: "",
        department: "",});
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log("error occured to create new Employee")
    }
  };

  return (
    <>
      <div className=" w-[60rem]  container mx-auto flex flex-col ">
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white p-2 rounded-lg shadow-md mt-2 "
        >
          <h2 className="text-2xl flex justify-center font-bold">
            Employee Information
          </h2>

          <div className="flex flex-col justify-evenly ">
            <div className=" bg-slate-800 text-white text-sm mt-4 p-2 font-semibold rounded-lg ">
              Personal Information
            </div>
            {/* div 1 */}
            <div className="mt-8">
              <div className="flex mx-8 flex-row justify-between">
                {/* employee name  */}
                <div className="mb-4 flex flex-col w-[15rem]">
                  <label
                    className=" text-gray-700 text-sm font-bold mb-2"
                    htmlFor="employeeName"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="employeeName"
                    name="employeeName"
                    value={formData.employeeName}
                    onChange={handleChange}
                    className="border border-black rounded-lg p-2 "
                    required
                  />
                </div>
                {/* gender */}
                <div className="mb-4 flex-col w-[15rem]">
                  <label
                    className=" text-gray-700 text-sm font-bold mb-2"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <input
                    type="text"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="border border-black rounded-lg p-2 w-full"
                    required
                  />
                </div>
              </div>

              <div className="flex mx-8 flex-row justify-between">
                {/* employeesPhoneNumber  */}
                <div className="mb-4 flex flex-col w-[15rem]">
                  <label
                    className=" text-gray-700 text-sm font-bold mb-2"
                    htmlFor="employeePhoneNumber"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="employeePhoneNumber"
                    name="employeePhoneNumber"
                    value={formData.employeePhoneNumber}
                    onChange={handleChange}
                    className="border border-black rounded-lg p-2 "
                    required
                  />
                </div>

                {/* Date of Birth */}
                <div className="mb-4">
                  <label
                    className=" text-gray-700 text-sm font-bold mb-2"
                    htmlFor="dateOfBirth"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="border border-black rounded-lg p-2 w-full"
                    required
                  />
                </div>
              </div>
              <div className="flex mx-8 flex-row justify-between"></div>
            </div>

            <div className="w-full mt-4 bg-slate-800 text-white text-sm p-2 font-semibold rounded-lg ">
              Login Credentials
            </div>
            {/* div 2 */}
            <div className="mt-8">
              <div className="flex mx-8 flex-row justify-between">
                {/* EmployeeEmail */}
                <div className="mb-4">
                  <label
                    className=" text-gray-700 text-sm font-bold mb-2"
                    htmlFor="employeeEmail"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="employeeEmail"
                    name="employeeEmail"
                    value={formData.employeeEmail}
                    onChange={handleChange}
                    className="border border-black rounded-lg p-2 w-full"
                    required
                  />
                </div>

                {/* password */}
                <div className="mb-4 flex flex-col w-[15rem]">
                  <label
                    className=" text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border border-black rounded-lg p-2"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="w-full mt-4 bg-slate-800 text-white text-sm p-2 font-semibold rounded-lg ">
              Departmental Information
            </div>

            {/* div 3 */}
            <div className="mt-8">
              <div className="flex mx-8 flex-row justify-between">
                {/* department */}
                <div className="mb-4 flex flex-col w-[15rem]">
                  <label
                    className=" text-gray-700 text-sm font-bold mb-2"
                    htmlFor="department"
                  >
                    Department
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="border border-black rounded-lg p-2"
                    required
                  />
                </div>

                {/* designation */}
                <div className="mb-4 flex flex-col w-[15rem]">
                  <label
                    className=" text-gray-700 text-sm font-bold mb-2"
                    htmlFor="designation"
                  >
                    Designation
                  </label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="border border-black rounded-lg p-2 "
                    required
                  />
                </div>
              </div>
            </div>

            {/* div 3 */}

            <div className="flex mx-8 flex-row justify-between">
              {/* department */}

              {/* designationType */}
              <div className="mb-4 flex flex-col w-[15rem]">
                <label
                  className=" text-gray-700 text-sm font-bold mb-2"
                  htmlFor="designationType"
                >
                  Designation Type
                </label>
                <input
                  type="text"
                  id="designationType"
                  name="designationType"
                  value={formData.designationType}
                  onChange={handleChange}
                  className="border border-black rounded-lg p-2 "
                  required
                />
              </div>
            </div>

            <div className="w-full mt-4 bg-slate-800 text-white text-sm p-2 font-semibold rounded-lg ">
              Residential Address
            </div>

            {/* div 4*/}
            <div className="flex mx-8 flex-row justify-between mt-8">
              {/* Post office */}
              <div className="mb-4 flex flex-col w-[15rem]">
                <label
                  className=" text-gray-700 text-sm font-bold mb-2"
                  htmlFor="postOffice"
                >
                  Post Office
                </label>
                <input
                  type="text"
                  id="postOffice"
                  name="postOffice"
                  value={formData.postOffice}
                  onChange={handleChange}
                  className="border border-black rounded-lg p-2 "
                  required
                />
              </div>

              {/* state */}
              <div className="mb-4 flex flex-col w-[15rem]">
                <label
                  className=" text-gray-700 text-sm font-bold mb-2"
                  htmlFor="state"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="border border-black rounded-lg p-2 "
                  required
                />
              </div>
            </div>
            {/* div 5*/}
            <div className="flex mx-8 flex-row justify-between">
              {/* pinNumber */}
              <div className="mb-4 flex flex-col w-[15rem]">
                <label
                  className=" text-gray-700 text-sm font-bold mb-2"
                  htmlFor="pinNumber"
                >
                  Pin Code
                </label>
                <input
                  type="text"
                  id="pinNumber"
                  name="pinNumber"
                  value={formData.pinNumber}
                  onChange={handleChange}
                  className="border border-black rounded-lg p-2 "
                  required
                />
              </div>
              {/* Address */}

              <div className="mb-4 flex flex-col w-[15rem]">
                <label
                  className=" text-gray-700 text-sm font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border border-black rounded-lg p-2 "
                  required
                />
              </div>
            </div>

            {/* div 6 */}
            <div>
              <div className="flex mx-8 flex-row justify-between">
                {/* policeStation */}
                <div className="mb-4 flex flex-col w-[15rem]">
                  <label
                    className=" text-gray-700 text-sm font-bold mb-2"
                    htmlFor="policeStation"
                  >
                    Police Station
                  </label>
                  <input
                    type="text"
                    id="policeStation"
                    name="policeStation"
                    value={formData.policeStation}
                    onChange={handleChange}
                    className="border border-black rounded-lg p-2 "
                    required
                  />
                </div>

                {/* city */}
                <div className="mb-4 flex flex-col w-[15rem]">
                  <label
                    className=" text-gray-700 text-sm font-bold mb-2"
                    htmlFor="city"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="border border-black rounded-lg p-2 "
                    required
                  />
                </div>
              </div>
            </div>

            {/* Add more fields as needed */}
          </div>

          <div className=" flex mt-6  justify-center">
            <button
              type="submit"
              className="bg-sky-500  text-white py-2.5 px-6 rounded hover:bg-slate-900 duration-200 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Submit
            </button>
            <ToastContainer></ToastContainer>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewEmployee;
