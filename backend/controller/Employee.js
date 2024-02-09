import { Employee } from "../model/employee.js";
import bcrypt from "bcrypt";
import { User } from "../model/user.js";

//new employee
export const newEmployee = async (req, res) => {
  // Fetch all the details from the request body
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
  } = req.body;

  try {
    // Validation
    if (
      !employeeName ||
      !employeeEmail ||
      !employeePhoneNumber ||
      !password ||
      !designation ||
      !designationType
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }


    // Encrypt password
    const hashPassword = await bcrypt.hash(password, 10);

    // Check if the email already exists
    const isEmailExist = await User.findOne({ email: employeeEmail });
    if (isEmailExist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }


    //convert the designation type into lowercase character
    const lowercaseDesignationType = designationType.toLowerCase();


    
      // Create an entry in the employee collection
      const employee = await Employee.create({
        employeeName,
        employeeEmail,
        password: hashPassword,
        gender,
        employeePhoneNumber,
        dateOfBirth,
        address,
        postOffice,
        policeStation,
        city,
        state,
        pinNumber,
        designation,
        designationType: lowercaseDesignationType,
        department,
      });

      
      // Create a user entry for authentication
      const user = await User.create({
        employeeId: employee._id,
        name: employeeName,
        email: employeeEmail,
        password: hashPassword,
        designation,
        designationType : lowercaseDesignationType,
      });


      return res.status(200).json({
        success: true,
        user,
        employee,
        message: "Account created successfully!",
      });
    
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Please check all the details",
    });
  }
};

//get all employee
export const allEmployee = async (req, res) => {
  try {
    // get all emplyee details

    const data = await Employee.find({});

    // validation
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "No record found!",
      });
    }

    // return the result
    return res.status(200).json({
      success: true,
      data,
      message: "All record fetched successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//update details
export const updateEmployee = async (req, res) => {
  //fetch id from params

  const { id } = req.params;

  //fetch all the details from
  const {
    employeePhoneNumber,
    address,
    postOffice,
    policeStation,
    city,
    state,
    pinNumber,
    designation,
    department,
  } = req.body;

  try {
    // update the employee details
    const foundEmployee = await Employee.findById(id);

    if (!foundEmployee) {
      return res.status(400).json({
        success: false,
        message: "Employee details not found. Please register!",
      });
    }

    foundEmployee.employeePhoneNumber = employeePhoneNumber;
    foundEmployee.address = address;
    foundEmployee.postOffice = postOffice;
    foundEmployee.policeStation = policeStation;
    foundEmployee.city = city;
    foundEmployee.state = state;
    foundEmployee.pinNumber = pinNumber;
    foundEmployee.designation = designation;
    foundEmployee.department = department;

    //save updated data
    const updateEmployeDetails = foundEmployee.save();

    // return the result
    return res.status(200).json({
      success: true,
      message: "Detail updated successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Please check your request!",
    });
  }
};

//delete employee
export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    // validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Employee not found!",
      });
    }

    const deleteEmployee = await Employee.deleteOne({ _id: id });

    return res.status(200).json({
      success: true,
      deleteEmployee,
      message: "Emplyee details deleted successfully!",
    });
  } catch (error) {}
};

