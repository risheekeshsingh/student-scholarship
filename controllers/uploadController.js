const path = require('path');
const fs = require('fs');

const API_KEY = process.env.UPLOAD_API_KEY || 'nirf-secure-key-2026';

/**
 * POST /api/v1/upload
 * Accepts a single multipart/form-data file with field name "file".
 * Requires the header: X-API-Key: <API_KEY>
 */
const uploadDataset = (req, res) => {
  // --- API Key Auth ---
  const providedKey = req.headers['x-api-key'];
  if (!providedKey || providedKey !== API_KEY) {
    return res.status(401).json({ detail: 'Unauthorized: Invalid or missing API key.' });
  }

  // --- File presence check (multer attaches it to req.file) ---
  if (!req.file) {
    return res.status(400).json({ detail: 'No file uploaded. Please attach a file with field name "file".' });
  }

  const { originalname, mimetype, size, filename, path: filePath } = req.file;

  // Optional: Only allow specific file types
  const ALLOWED_TYPES = [
    'application/json',
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain'
  ];

  if (!ALLOWED_TYPES.includes(mimetype)) {
    // Remove the uploaded file and reject
    fs.unlink(filePath, () => {});
    return res.status(415).json({
      detail: `Unsupported file type: "${mimetype}". Allowed types: JSON, CSV, Excel, TXT.`
    });
  }

  return res.status(200).json({
    message: `✅ Dataset "${originalname}" uploaded successfully!`,
    file: {
      originalName: originalname,
      savedAs: filename,
      type: mimetype,
      sizeKB: (size / 1024).toFixed(2)
    }
  });
};

module.exports = { uploadDataset };
