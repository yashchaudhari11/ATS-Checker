const express = require("express");
const axios = require("axios");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/uploads", upload.fields([{ name: "resume" }, { name: "jobDescription" }]), async (req, res) => {
    try {
        const formData = new FormData();
        formData.append("resume", req.files["resume"][0].buffer, req.files["resume"][0].originalname);
        formData.append("jobDescription", req.files["jobDescription"][0].buffer, req.files["jobDescription"][0].originalname);

        const response = await axios.post("http://localhost:5001/api/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        res.json({ atsScore: response.data.atsScore });
    } catch (error) {
        console.error("Error uploading files:", error);
        res.status(500).json({ error: "Failed to process files" });
    }
});

module.exports = router;
