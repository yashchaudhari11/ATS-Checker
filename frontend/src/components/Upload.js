import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUpload, FaFilePdf, FaCheckCircle } from "react-icons/fa";

const Upload = () => {
    const [resume, setResume] = useState(null);
    const [jobDescription, setJobDescription] = useState(null);
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        if (!resume || !jobDescription) {
            alert("🚨 Please select both files before uploading!");
            return;
        }

        const formData = new FormData();
        formData.append("resume", resume);
        formData.append("jobDescription", jobDescription);

        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/api/ats-score", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 200) {
                setScore(response.data.ats_score);
            } else {
                alert(response.data.message || "❌ Error processing files.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("⚠️ Failed to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center vh-100 text-white"
            style={{
                background: "url('https://source.unsplash.com/1600x900/?technology,futuristic,innovation')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
            }}
        >
            {/* Overlay */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0, 0, 0, 0.6)",
                }}
            ></div>

            <div className="p-5 bg-dark bg-opacity-75 rounded shadow-lg text-center" style={{ zIndex: 1 }}>
                <h1 className="fw-bold">📄 Upload Your Resume & Job Description</h1>
                <p className="fst-italic">Get your <strong>ATS Score</strong> instantly! 🚀</p>

                {/* Resume Upload */}
                <label className="btn btn-outline-light my-2 w-100">
                    <FaFilePdf className="me-2" />
                    Upload Resume (PDF)
                    <input
                        type="file"
                        hidden
                        accept=".pdf"
                        onChange={(e) => setResume(e.target.files[0])}
                    />
                </label>
                {resume && <p className="text-success"><FaCheckCircle /> {resume.name}</p>}

                {/* Job Description Upload */}
                <label className="btn btn-outline-light my-2 w-100">
                    <FaFilePdf className="me-2" />
                    Upload Job Description (PDF)
                    <input
                        type="file"
                        hidden
                        accept=".pdf"
                        onChange={(e) => setJobDescription(e.target.files[0])}
                    />
                </label>
                {jobDescription && <p className="text-success"><FaCheckCircle /> {jobDescription.name}</p>}

                {/* Upload Button */}
                <button
                    className="btn btn-lg btn-success w-100 mt-3"
                    onClick={handleUpload}
                    disabled={loading}
                >
                    {loading ? "🔄 Processing..." : <><FaUpload className="me-2" /> Upload & Check Score</>}
                </button>

                {/* Display ATS Score */}
                {score !== null && (
                    <div className="mt-4 text-center">
                        <h3 className="fw-bold">🎯 ATS Score: {score}%</h3>
                        <div className="progress mt-2" style={{ height: "20px" }}>
                            <div
                                className="progress-bar progress-bar-striped bg-info"
                                role="progressbar"
                                style={{ width: `${score}%` }}
                                aria-valuenow={score}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            >
                                {score}%
                            </div>
                        </div>
                        <p className="mt-2">
                            {score > 80 ? "✅ Great Match! Apply Now!" : "📌 Improve your resume for a better match!"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Upload;
