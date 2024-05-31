import React from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Todo = ({id, title, description, duedate, status, getTodos}) => {

  const navigate = useNavigate();
  
  const bgColor = status === "completed" ? "#cdf6cdc4" : status === "pending" ? "#e59f9f70" : "#ffff002b";
  const statusColor = status === "completed" ? "green" : status === "pending" ? "red" : "rgb(220 143 18)";
  status = status.charAt(0).toUpperCase() + status.slice(1);

  const handleEdit = () => {
    navigate(`/update/${id}`);
  }

  const handleDelete = async () => {
    try{
      const response = await fetch(`http://localhost:9005/tasks/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if(data.success){
        toast.success('Task Deleted Successfully');
        getTodos();
      }
      else{
        toast.error('Task Not Deleted');
      }
    }
    catch(error){
      console.error(error.message);
    }
  }

  return (
    <div className="todo" style={{backgroundColor: bgColor }}>
      <div className="todo-details">
        <h3>{title}</h3>
        <p className="todo-description">{description}</p>
        <p>Due Date: {duedate.toString().slice(0,10).split('-').reverse().join('-')}</p>
      </div>
      <div className="todo-bottom">
        <div className="todo-status" style={{color: statusColor}}>{status}</div>
        <div className="todo-action">
            <div className="button edit-button" onClick={handleEdit}><MdOutlineModeEdit size={20} /></div>
            <div className="button delete-button" onClick={handleDelete}><MdDeleteOutline size={20} /></div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
