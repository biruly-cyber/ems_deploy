import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../App";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  //get profile
  useEffect(() => {
    const myProfile = async () => {
      const response = await axios.get(`${server}/users/me`, {
        withCredentials: true,
      });

      setProfile(response.data.user);
    };

    //invoke
    myProfile();
  }, []);

  // const handle on profile card
  const handleOnOpenProfile = () => {
    setIsProfileOpen((prev) => !prev);
  };

  //handle logout
  const handleOnLogout = async () => {
    const response = await axios.get(`${server}/users/logout`, {
      withCredentials: true,
    });

    const { success, message } = response.data;

    if (success) {
      alert(message);
      // Assuming you want to remove an item with the key 'myItem' from local storage
      localStorage.removeItem("id");
      localStorage.removeItem("managerId");
      navigate("../login");
    }
  };

  //set managerId local storage
  localStorage.setItem("managerId", profile.employeeId);
  localStorage.setItem("id", profile.employeeId);


  return (
    <>
      <header className="bg-slate-800 text-white p-4 flex justify-between items-center ">
        <div>
          <h1 className="text-2xl font-semibold mx-20">Blurock</h1>
        </div>
        <div>
          <h1
            className="text-lg font-semibold mx-20 cursor-pointer"
            onClick={handleOnOpenProfile}
          >
            Profile
          </h1>
        </div>
      </header>

      {/* show profile card  */}
      {isProfileOpen && (
        <div className="fixed z-10 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          {/* Profile Card */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-end">
              {/* Close Button */}
              <button
                onClick={() => {
                  // Set isProfileOpen to false to close the profile card
                  // This function depends on your state management logic
                  setIsProfileOpen(false);
                }}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Profile Content */}
            <div className="flex items-center">
              {/* Profile Image */}
              <img
                className="w-16 h-16 rounded-full mr-4"
                src="https://placekitten.com/100/100" // Replace with your actual image URL
                alt="Profile"
              />

              {/* Profile Details */}
              <div>
                <h2 className="text-xl font-bold"> Name : {profile.name}</h2>
                <p className="text-gray-600 capitalize">
                  Designation: {profile.designation}
                </p>
              </div>
            </div>

            {/* Additional Profile Information */}
            <div className="mt-4 flex items-center justify-center">
              <button
                className="text-white bg-red-600 p-2 rounded px-4"
                onClick={handleOnLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
