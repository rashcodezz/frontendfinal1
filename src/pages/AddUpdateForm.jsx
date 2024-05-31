import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../Form.css";
import { IoArrowBack } from "react-icons/io5";

const AddUpdateForm = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [duedate, setDuedate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bodyData = {
      title: title,
      description: description,
      status: status,
      dueDate: duedate,
    };
    try {
      const url = params.id
        ? `http://localhost:9005/tasks/${params.id}`
        : "http://localhost:9005/tasks";
      const response = await fetch(url, {
        method: params.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();
      if (data.success) {
        const message = params.id
          ? "Task Updated Successfully"
          : "Task Added Successfully";
        toast.success(message);
        navigate("/");
      } else {
        const message = params.id ? "Task Not Updated" : "Task Not Added";
        toast.success(message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    if (name === "description") setDescription(value);
    if (name === "status") setStatus(value);
    if (name === "duedate") setDuedate(value);
  };

  const getTodo = async () => {
    try {
      const response = await fetch(`http://localhost:9005/tasks/${params.id}`);
      const data = await response.json();
      console.log(data);
      setTitle(data.data[0].title);
      setDescription(data.data[0].description);
      setStatus(data.data[0].status);
      setDuedate(data.data[0].dueDate.toString().slice(0, 10));
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (params.id) {
      getTodo();
    }
  }, []);

  return (
    <div className="main-container">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-header">
            <IoArrowBack size={20} className="back-button" onClick={() => navigate("/")} />
            <h2>{params.id ? "Update" : "Add"} To Do</h2>
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={handleChange}
              rows={4}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={handleChange}
            >
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="duedate">Due Date</label>
            <input
              type="date"
              id="duedate"
              name="duedate"
              value={duedate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              disabled={!title || !description || !duedate}
              className="submit-button"
            >{params.id ? "Update To Do" : "Add To Do"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUpdateForm;
