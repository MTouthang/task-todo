import axios from "axios";
import React, { useContext, useState } from "react";
import dataContext from "../contextAPI/dataContext";
import userContext from "../contextAPI/userContext";
import api_base from "../config/api";

const TodoForm = () => {
  /** dataContext for storing tasks -  */
  const { dataContextValue, setDataContextValue } = useContext(dataContext);

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState("");

  const { userDetails } = useContext(userContext);

  const data = {
    taskName: "",
    todos: "",
    userId: "",
  };
  const objArr = [];

  const submitData = async () => {
    try {
      const res = await axios.post(`${api_base}/task/create`, data);

      if (res) {
        console.log("Task posted! ");
        setDataContextValue(res.data.task);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const todoFormSubmit = async (e) => {
    e.preventDefault();

    /* handling data in required format --*/
    const strArray = todos.split(",");
    for (let i = 0; i < strArray.length; i++) {
      const obj = { todo: strArray[i] };
      objArr.push(obj);
    }
    data.taskName = task;
    data.todos = objArr;
    data.userId = userDetails.$id;
    submitData();
    setTask("");
    setTodos("");
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-5 mx-auto">
        <div className=" flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
          <div className="relative flex-grow w-full">
            <input
              type="text"
              id="task"
              name="task"
              value={task}
              placeholder="Enter  Task"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mb-9"
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="relative flex-grow w-full">
            <textarea
              type="text"
              id="todo"
              name="todo"
              placeholder="Enter Todos sperated by comma"
              value={todos}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={(e) => setTodos(e.target.value)}
            ></textarea>
          </div>
          <div className="pb-7">
            <button
              className=" text-white bg-indigo-500 border-0 py-1 my-4 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              onClick={todoFormSubmit}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodoForm;
