import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import dataContext from "../contextAPI/dataContext";
import userContext from "../contextAPI/userContext";
import api_base from "../config/api";

const Todo = () => {
  /** dataContext for storing tasks -  */
  const { dataContextValue } = useContext(dataContext);

  const { userDetails } = useContext(userContext);

  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState();
  const [toggle, setToggle] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [reverseData, setReverseData] = useState([]);
  const [hide, setHide] = useState(true);

  const fetchUserData = async (userId) => {
    try {
      const data = await axios.get(`${api_base}/tasks/${userId}`);

      setUserData(data.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  // refresh with respect to the wen the data change
  useEffect(() => {
    fetchUserData(userDetails.$id);
  }, [userDetails, dataContextValue]);

  // handle edit button for task name update
  //TODO: handle edit for todo too and cross mark the Todo

  const handleEdit = async (item) => {
    try {
      const taskTitle = prompt("Enter the new Title", `${item.taskName}`);

      if (!taskTitle) {
        console.log("Please enter the task title!");
      } else {
        const res = await axios.put(`${api_base}/task/${item._id}`, {
          taskName: taskTitle,
        });

        if (res) {
          fetchUserData(userDetails.$id);
        }
      }
    } catch (error) {
      console.log(`Edit handle Error: ${error}`);
    }
    handleSearch();
  };

  /** handling delete */
  const handleDelete = async (item) => {
    try {
      const res = await axios.delete(`${api_base}/task/${item._id}`);

      if (res.data.success) {
        fetchUserData(userDetails.$id);
      }
    } catch (error) {
      console.log(`error - ${error}`);
    }
    handleSearch();
  };

  /** handle search query --- */
  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `${api_base}/tasks/search/${userDetails.$id}?search=${search}`
      );

      if (res.data.success) {
        const data = res.data.taskResult;
        setSearchData(data);
      }
    } catch (error) {
      console.log(error);
    }

    if (searchData) {
      setToggle(true);
    }
    if (search === "") {
      setToggle(false);
    }
  };

  /** handling to order recently added thing */
  const handleRecentlyAdded = () => {
    setReverseData(userData.reverse());
  };
  const handleNormalOrder = () => {
    fetchUserData(userDetails.$id);
  };

  // TODO: handle todo view fo only one particular task
  const showTodo = () => {
    hide ? setHide(false) : setHide(true);
  };

  return (
    <section className="text-gray-600 body-fon">
      <div className="container px-5  mx-auto">
        {/*****  search field ******/}
        <div className="relative mt-1 w-96 mx-auto">
          <span className="absolute inset-y-0 flex items-center pl-2 mx-auto">
            <button
              type="submit"
              className="p-1 focus:outline-none focus:ring "
              onClick={handleSearch}
            >
              <svg
                fill="currentColor"
                viewBox="0 0 512 512"
                className="w-4 h-4 dark:text-gray-100"
              >
                <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
              </svg>
            </button>
          </span>
          <input
            type="search"
            name="Search"
            placeholder="Search..."
            value={search}
            className="w-full py-3 pl-12 text-sm rounded-full sm:w-96 focus:outline-none bg-indigo-500 text-white focus:dark:bg-indigo-700"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {toggle ? (
          searchData.map((item, index) => {
            return (
              <div
                key={index}
                className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto border-2 border-gray-200 rounded-md px-3 my-1 py-1"
              >
                <h1 className="flex-grow sm:pr-16 text-xl font-medium title-font text-gray-900">
                  {item.taskName}
                </h1>
                <button
                  className="flex-shrink-0 text-white bg-indigo-500 border-0  px-5  focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 m:2 sm:mt-0 mx-2 "
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="flex-shrink-0 text-white bg-indigo-500 border-0  px-5 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0 mx-2 "
                  onClick={() => handleDelete(item)}
                >
                  delete
                </button>
              </div>
            );
          })
        ) : (
          <h1 className="flex-grow sm:pr-16 text-sm font-medium title-font text-gray-400 text-center py-2">
            Search item not found
          </h1>
        )}

        {/* sort order */}
        <div className="w-80 mx-auto">
          <label
            htmlFor="Toggle3"
            className="inline-flex pl-5 items-center p-1 rounded-md cursor-pointer dark:text-gray-800"
          >
            <input id="Toggle3" type="checkbox" className="hidden peer" />
            <span
              className="px-4 rounded-l-md dark:bg-indigo-400 peer-checked:dark:bg-gray-300"
              onClick={handleNormalOrder}
            >
              Normal Order
            </span>
            <span
              className="px-4  rounded-r-md dark:bg-gray-300 peer-checked:dark:bg-indigo-400"
              onClick={handleRecentlyAdded}
            >
              Recently Added
            </span>
          </label>
        </div>

        {userData.map((item, index) => {
          return (
            <>
              <div
                key={index}
                className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto border-2 border-gray-200 rounded-md px-3 mt-2 py-1"
                onClick={showTodo}
              >
                <h1 className="flex-grow sm:pr-16 text-xl font-medium title-font text-gray-900">
                  {item.taskName}
                </h1>
                <button
                  className="flex-shrink-0 text-white bg-indigo-500 border-0  px-5  focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 m:2 sm:mt-0 mx-2 "
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="flex-shrink-0 text-white bg-indigo-500 border-0  px-5 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0 mx-2 "
                  onClick={() => handleDelete(item)}
                >
                  delete
                </button>
              </div>
              {hide ? (
                ""
              ) : (
                <div className="border-1 w-2/3 mx-auto border rounded-xl px-4">
                  {item.todos.map((todo, index) => {
                    return <li key={index}>{todo.todo}</li>;
                  })}
                </div>
              )}
            </>
          );
        })}
      </div>
    </section>
  );
};

export default Todo;
