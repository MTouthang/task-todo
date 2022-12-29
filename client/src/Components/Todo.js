import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import userContext from "../contextAPI/userContext";

const Todo = () => {
  const [userData, setUserData] = useState([]);
  const { userDetails } = useContext(userContext);

  const fetchUserData = async (userId) => {
    const data = await axios.get(`/tasks/${userId}`);
    console.log(data.data.tasks);
    setUserData(data.data.tasks);
  };

  useEffect(() => {
    fetchUserData(userDetails.$id);
  }, [userDetails]);

  return (
    <section className="text-gray-600 body-fon">
      <div className="container px-5  mx-auto">
        {userData.map((item, index) => {
          return (
            <div
              key={index}
              className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto border-2 border-gray-200 rounded-md px-3 my-1 py-1"
            >
              <h1 className="flex-grow sm:pr-16 text-xl font-medium title-font text-gray-900">
                {item.taskName}
              </h1>
              <button className="flex-shrink-0 text-white bg-indigo-500 border-0  px-5  focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 m:2 sm:mt-0 mx-2 ">
                Edit
              </button>
              <button className="flex-shrink-0 text-white bg-indigo-500 border-0  px-5 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0 mx-2 ">
                delete
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Todo;
