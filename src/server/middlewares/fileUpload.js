const multer = require("multer");
const path = require('path');
const validImageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
const validDocumentExtensions = ['.pdf', '.doc', '.docx'];

// Configure storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine the folder based on the file type
    const fileExtension = path.extname(file.originalname).toLowerCase();
    
    if (validImageExtensions.includes(fileExtension)) {
      cb(null, './public/uploads/images');
    } else if (validDocumentExtensions.includes(fileExtension)) {
      cb(null, './public/uploads/documents');
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
  filename: (req, file, cb) => {
    // Save the file with its original name, prefixed with a timestamp
    cb(null, Date.now()+ file.originalname);
  }
});

// File filter to reject invalid file types
const fileFilter = (req, file, cb) => {
  const fileExtension = path.extname(file.originalname).toLowerCase();
  
  if (validImageExtensions.includes(fileExtension) || validDocumentExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file format'), false);
  }
};

// Initialize Multer with storage and file filter
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
});
module.exports = {
    upload,
    validDocumentExtensions,
    validImageExtensions
}