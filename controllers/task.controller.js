const Task = require("../models/task.model");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    if (tasks.length == 0) {
      return res
        .status(200)
        .json({data:[], message: "Tasks not found", success: true });
    }
    res.status(200).json({ data: tasks, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const createTask = async (req, res) => {

  try { 
    const task = req.body;
    const newTask = new Task(task);
    await newTask.save();
    res.status(201).json({ data: task, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const searchById = async (req, res) => {
  try {
    await Task.find({
      _id: req.params.id,
    }).then((task) => {
      if (task.length == 0) {
        return res
          .status(404)
          .json({ message: "Task not found", success: false });
      }
      res.status(200).json({ data: task, success: true });
    });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
};

const updayeById = async (req, res) => {
    const {title, description, status, dueDate} = req.body;
    try{
        await Task.findOneAndUpdate(
            {_id:req.params.id},
            {title: title, description: description, status: status, dueDate: dueDate},
        ).then((task) => {
            if(task.length == 0){
                return res.status(404).json({message: "Task not found", success: false});
            }
            res.status(200).json({data: task,message:"Successfully Updated", success: true});
        });
    }
    catch(error){
        res.status(500).json({error: error.message, success: false});
    }
};

const deleteById = async (req, res) => {
    try{
        await Task.findOneAndDelete({
            _id:req.params.id,
        }).then((task) => {
            if(task.length == 0){
                return res.status(404).json({message: "Task not found", success: false});
            }
            res.status(200).json({data: task,message:"Successfully Deleted", success: true});
        });
    }
    catch(error){
        res.status(500).json({error: error.message, success: false});
    }
};



module.exports = { getTasks, createTask, searchById , updayeById, deleteById};
