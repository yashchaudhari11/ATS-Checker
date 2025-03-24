import React from "react";
import { useLocation } from "react-router-dom";

function Result() {
  const location = useLocation();
  return (
    <div className="container mt-5">
      <h2>Resume ATS Score</h2>
      <h3>{location.state.atsScore}</h3>
    </div>
  );
}

export default Result;
