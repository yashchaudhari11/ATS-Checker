import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 text-white"
      style={{
        background: "url('https://source.unsplash.com/1600x900/?career,technology,success')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(6px)",
        position: "relative",
      }}
    >
      {/* Overlay for better readability */}
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

      <div className="text-center p-5 rounded shadow-lg"
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          zIndex: 1,
          maxWidth: "600px",
        }}
      >
        <h1 className="display-4 fw-bold text-uppercase">
          🚀 Elevate Your Career with AI!
        </h1>
        <p className="fs-5 fst-italic mb-3 text-light">
          "Your resume is the first step towards success!" 💼✨
        </p>
        
        {/* Animated Icon */}
        <img 
          src="https://cdn-icons-png.flaticon.com/512/3094/3094839.png"
          alt="Resume Icon"
          width="120"
          className="mb-3"
          style={{ animation: "float 3s ease-in-out infinite" }}
        />

        <p className="fs-5 text-light">
          Match your resume with job descriptions & get instant ATS insights!  
          Optimize your resume with AI-powered suggestions. 📄💡
        </p>

        

        <div className="mt-4 d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg"
            style={{
              background: "linear-gradient(45deg, #ff5733, #e64a19)",
              color: "white",
              borderRadius: "50px",
              padding: "12px 30px",
              fontSize: "18px",
              boxShadow: "0px 4px 10px rgba(255, 87, 51, 0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0px 6px 15px rgba(255, 87, 51, 0.5)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0px 4px 10px rgba(255, 87, 51, 0.3)";
            }}
            onClick={() => navigate("/login")}
          >
            🔑 Login
          </button>

          <button
            className="btn btn-lg"
            style={{
              background: "linear-gradient(45deg, #28a745, #218838)",
              color: "white",
              borderRadius: "50px",
              padding: "12px 30px",
              fontSize: "18px",
              boxShadow: "0px 4px 10px rgba(40, 167, 69, 0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0px 6px 15px rgba(40, 167, 69, 0.5)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0px 4px 10px rgba(40, 167, 69, 0.3)";
            }}
            onClick={() => navigate("/signup")}
          >
            📝 Sign Up
          </button>
        </div>
      </div>

      {/* Floating Animation */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
};

export default Welcome;
