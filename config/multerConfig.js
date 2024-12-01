const multer = require("multer");
const path = require("path");

// Configure storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with original extension
  },
});

// File filter to only allow image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, JPG, and PNG files are allowed"), false);
  }
};

// Set limits on file size (e.g., 4MB per image)
const limits = { fileSize: 4 * 1024 * 1024 };

// Initialize the Multer upload middleware
const upload = multer({
  storage,
  fileFilter,
  limits,
});

module.exports = upload;
