import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  getUsers,
  removeUser,
  updateUser,
} from "../redux/actions/users";
import { toast } from "react-toastify";
import Loader from "./Loader";

const TABLE_HEAD = [
  "Name",
  "Email",
  "Number",
  "City",
  "View",
  "Edit",
  "Delete",
];

function Table() {
  const { users } = useSelector((state) => state);
  const [isOpen, setIsOpen] = useState(false);
  const [isViewOpen, setViewIsOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  console.log(number);
  const [city, setCity] = useState("");
  const [userId, setUserId] = useState();

  useEffect(() => {
    setTimeout(() => {
      dispatch(getUsers());
    }, 5000);
  }, [dispatch]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!name || !email || !number || !city) {
      toast.error("Please fill out all fields");
      return;
    }
    try {
      const newUser = {
        name,
        email,
        number,
        city,
      };

      await dispatch(createUser(newUser));
      toast.success("User Created Successfully");

      setName("");
      setEmail("");
      setNumber("");
      setCity("");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while creating the user");
    }
  };

  const popoverRef = useRef(null);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setIsUpdateOpen(false);
    }
  };
  const handleToggleUpdate = (user) => {
    setIsUpdateOpen(true);
    setUserId(user.id);
    setName(user.name);
    setEmail(user.email);
    setNumber(user.phone); // Assuming phone is used instead of number
    setCity(user.address.city);
  };
  const handleToggleView = (user) => {
    setViewIsOpen(true);
    setUserId(user.id);
    setName(user.name);
    setEmail(user.email);
    setNumber(user.phone); // Assuming phone is used instead of number
    setCity(user.address.city);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCreate = (e) => {
    handleCreateUser(e);
    setIsOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(removeUser(id));
    toast.success("User Deleted Successfully");
  };

  const handleUpdate = async () => {
    const updatedUser = {
      name,
      email,
      number,
      city,
    };
    toast.success("User Updated Successfully");
    setTimeout(await dispatch(updateUser(userId, updatedUser)), 2000);
    setIsUpdateOpen(false);
  };
  if (users.length == 0) {
    return <Loader />;
  }
  return (
    <div className="m-3 backCss" ref={popoverRef}>
      <div className="h-full w-full border border-gray-200 rounded-lg">
        <div className="p-2 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-xl font-semibold text-gray-800">
                Users list
              </h5>
              <p className="mt-1 text-sm text-gray-600">
                See information about all users
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                onClick={handleToggle}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add member
              </button>
            </div>
          </div>
        </div>

        {/* Create User Form */}
        {isOpen && (
          <div className="absolute right-0 z-10 mt-2 w-96 bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
            <h6 className="text-lg font-medium text-gray-800 mb-4">
              Create User
            </h6>
            <form onSubmit={handleCreate}>
              <label className="text-sm font-bold text-gray-700 mb-1">
                Name
              </label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <label className="text-sm font-bold text-gray-700 mb-1">
                Email
              </label>
              <div className="flex mb-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <label className="text-sm font-bold text-gray-700 mb-1">
                Number
              </label>
              <div className="flex mb-2">
                <input
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="Enter Phone Number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <label className="text-sm font-bold text-gray-700 mb-1">
                City
              </label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700"
              >
                Create
              </button>
            </form>
          </div>
        )}

        {/* Update User Form */}
        {isUpdateOpen && (
          <div className="absolute right-0 z-10 mt-2 w-96 bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
            <h6 className="text-lg font-medium text-gray-800 mb-4">
              Update User
            </h6>
            <form onSubmit={handleUpdate}>
              <label className="text-sm font-bold text-gray-700 mb-1">
                Name
              </label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <label className="text-sm font-bold text-gray-700 mb-1">
                Email
              </label>
              <div className="flex mb-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <label className="text-sm font-bold text-gray-700 mb-1">
                Number
              </label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="Enter Phone Number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <label className="text-sm font-bold text-gray-700 mb-1">
                City
              </label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex item-center mt-4 ">
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700"
                >
                  Update
                </button>
                <button
                  onClick={() => setIsUpdateOpen(false)}
                  className="px-4 py-2 ml-48 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        )}
        {/* View Card */}
        {isViewOpen && (
          <>
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-gray-800 bg-opacity-50"
            ></div>

            <div className="fixed inset-0 flex items-center justify-center z-20">
              <div className="bg-white overflow-hidden shadow rounded-lg border max-w-md w-full">
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex item-center">
                    <div>
                      <h3 className=" text-lg leading-6 font-medium text-gray-900">
                        User Profile
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        This is some information about the user.
                      </p>
                    </div>
                    <div style={{ position: "relative", left: "4.5rem" }}>
                      {" "}
                      <button
                        onClick={() => setViewIsOpen(false)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Full name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {name}
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Email address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {email}
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Phone number
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {number}
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Address
                      </dt>
                      <dd className=" mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {city}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </>
        )}
        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            {/* Table Head */}
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="px-4 py-2 border-b bg-gray-50 text-left text-sm font-medium text-gray-700"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {users?.map((user, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-800">
                          {user.name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 border-b">
                    <span className="text-sm text-gray-600">{user.email}</span>
                  </td>
                  <td className="px-4 py-4 border-b">
                    <span>{user.phone}</span>
                  </td>
                  <td className="px-4 py-4 border-b">
                    <span className="text-sm text-gray-600">
                      {user.address.city}
                    </span>
                  </td>
                  <td className="px-4 py-4 border-b">
                    <button onClick={() => handleToggleView(user)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14 12c-1.095 0-2-.905-2-2 0-.354.103-.683.268-.973C12.178 9.02 12.092 9 12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-.092-.02-.178-.027-.268-.29.165-.619.268-.973.268z"></path>
                        <path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z"></path>
                      </svg>
                    </button>
                  </td>
                  <td className="px-4 py-4 border-b">
                    <button
                      onClick={() => handleToggleUpdate(user)} // Load user data
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        style={{ color: "red" }}
                      >
                        <path d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z"></path>
                        <path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"></path>
                      </svg>
                    </button>
                  </td>
                  <td className="px-4 py-4 border-b">
                    <button onClick={() => handleDelete(user.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        style={{ color: "gray" }}
                      >
                        <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
                        <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;
