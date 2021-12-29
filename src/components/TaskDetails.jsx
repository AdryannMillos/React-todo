import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import Button from "./Button";
import "./TaskDetails.css";

const TaskDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <div className="back-button-container">
        <Button onClick={() => navigate(-1)}>Voltar</Button>
      </div>
      <div className="task-details-container">
        <h2>{params.taskTitle}</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo deleniti
          totam deserunt nobis pariatur. Fugiat?
        </p>
      </div>
    </div>
  );
};

export default TaskDetails;
