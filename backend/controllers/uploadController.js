const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage }).fields([
  { name: "resume", maxCount: 1 },
  { name: "jobDescription", maxCount: 1 },
]);

module.exports = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: "File upload error" });
    res.json({ message: "Files uploaded successfully!" });
  });
};
