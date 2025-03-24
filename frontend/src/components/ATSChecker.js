import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";

const ATSChecker = () => {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e, type) => {
    if (type === "resume") {
      setResume(e.target.files[0]);
    } else {
      setJobDesc(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume || !jobDesc) {
      setError("Both Resume and Job Description are required!");
      return;
    }

    setError("");
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDesc);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/ats-score", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAtsScore(response.data.atsScore);
    } catch (err) {
      setError("Error calculating ATS Score. Try again.");
    }
  };

  return (
    <Container className="mt-5">
      <h2>📄 Resume ATS Score Checker</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="resume">
          <Form.Label>Upload Resume (PDF)</Form.Label>
          <Form.Control type="file" accept=".pdf" onChange={(e) => handleFileChange(e, "resume")} />
        </Form.Group>

        <Form.Group controlId="jobDesc" className="mt-3">
          <Form.Label>Upload Job Description (PDF)</Form.Label>
          <Form.Control type="file" accept=".pdf" onChange={(e) => handleFileChange(e, "jobDesc")} />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">🔍 Check ATS Score</Button>
      </Form>

      {atsScore !== null && (
        <Alert variant="success" className="mt-4">
          ✅ Your ATS Score: <strong>{atsScore}%</strong>
        </Alert>
      )}
    </Container>
  );
};

export default ATSChecker;
