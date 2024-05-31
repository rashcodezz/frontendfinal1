import React, { useEffect, useState } from "react";
import Todo from "../components/Todo";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Main = () => {

  const [todolist, setTodolist] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:9005/tasks");
      const data = await response.json();
     if(data.success === false){
      toast.error("Error in loading To Do List");
      return;
     }
      setTodolist(data.data);

    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="main-container">
      <h1 className="page-title">To Do List</h1>
      <div className="header">
        <div className="search">
          <input type="text" placeholder="Search To Do" />
        </div>
        <Link to="/add" className="add-button">Add To Do</Link>
      </div>
      <div className="todo-list">
        {
          todolist && todolist?.length !== 0 && todolist.map((todo) => (
            <Todo key={todo._id} id={todo._id} title={todo.title} description={todo.description} duedate={todo.dueDate} status={todo.status} getTodos={getTodos} />
          ))
        }
        {
          todolist && todolist?.length === 0 && <h3>No To Do Found</h3>
        }
      </div>
    </div>
  );
};

export default Main;
