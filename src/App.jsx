import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import TaskDetails from "./components/TaskDetails";
import "./App.css";

function App() {
  const [tasks, setTask] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.cypress.io/todos?_limit=10"
      );
      setTask(data);
    };
    fetchTasks();
  }, []);

  const handleTaskAddition = (taskTitle) => {
    const newTasks = [
      ...tasks,
      {
        title: taskTitle,
        id: uuidv4(),
        completed: false,
      },
    ];
    setTask(newTasks);
  };

  const handleAddTaskClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) return { ...task, completed: !task.completed };
      return task;
    });
    setTask(newTasks);
  };

  const handleTaskDeletion = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);

    setTask(newTasks);
  };

  return (
    <div className="container">
      <Header></Header>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div>
                <AddTask handleTaskAddition={handleTaskAddition} />
                <Tasks
                  tasks={tasks}
                  handleAddTaskClick={handleAddTaskClick}
                  handleTaskDeletion={handleTaskDeletion}
                />
              </div>
            }
          ></Route>
          <Route
            path="/:taskTitle"
            exact
            element={
              <div>
                <TaskDetails />
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
