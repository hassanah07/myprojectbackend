// backend/routes/upload.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Upload = require("../model/Upload.js");
const fetchAdmin = require("../middleware/fetchAdmin.js");
const Admin = require("../model/Admin.js");

const router = express.Router();
const UPLOAD_DIR = path.join(process.cwd(), "uploads");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// admin uploads
router.get("/uploads/:filename", fetchAdmin, (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(process.cwd(), "uploads", filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  res.sendFile(filePath);
});
//photo: Upload and create DB record
router.post("/photo", fetchAdmin, upload.single("photo"), async (req, res) => {
  const userId = req.admin.id;
  try {
    if (!req.file) return res.status(400).json({ error: "No file" });

    const fileUrl = `/uploads/${req.file.filename}`;

    // Get previous photo from DB
    const admin = await Admin.findById(userId);
    if (admin.image) {
      const fs = require("fs");
      const oldPath = path.join(
        process.cwd(),
        "uploads",
        path.basename(admin.image),
      );
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath); // Delete previous file
      }
    }

    // Update DB
    const update = await Admin.findByIdAndUpdate(
      req.body.id,
      { image: fileUrl },
      { new: true },
    );

    res.json({ msg: "Image Uploaded", status: true, doc: req.file, update });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Upload failed", status: false });
  }
});
//sign: Upload and create DB record
router.post("/sign", fetchAdmin, upload.single("sign"), async (req, res) => {
  const userId = req.admin.id;
  try {
    if (!req.file) return res.status(400).json({ error: "No file" });

    const fileUrl = `/uploads/${req.file.filename}`;

    // Get previous photo from DB
    const admin = await Admin.findById(userId);
    if (admin.image) {
      const fs = require("fs");
      const oldPath = path.join(
        process.cwd(),
        "uploads",
        path.basename(admin.sign),
      );
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath); // Delete previous file
      }
    }

    // Update DB
    const update = await Admin.findByIdAndUpdate(
      req.body.id,
      { sign: fileUrl },
      { new: true },
    );

    res.json({
      msg: "Signature Uploaded",
      status: true,
      doc: req.file,
      update,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Upload failed", status: false });
  }
});

module.exports = router;
