const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const Admin = require("../model/Admin");
const fetchAdmin = require("../middleware/fetchadmin");
const Spraying = require("../model/Spraying");
const router = express.Router();

router.post("/add", fetchAdmin, async (req, res) => {
  const userid = req.admin.id;
  try {
    const verify = await Admin.findById(userid);
    if (!verify) return res.json({ msg: "Invalid Access" });
    const data = await Spraying.create({
      teaName: req.body.teaName,
      name: req.body.name,
      dob: req.body.dob,
      sex: req.body.sex,
      father: req.body.father,
      address: req.body.address,
      idMark: req.body.idMark,
      appointment: req.body.appointment,
      mobile: req.body.mobile,
      aadhaar: req.body.aadhaar,
      abhaId: req.body.abhaId,
      addedBy: userid,
    });
    res.json({ status: true, msg: "Added", data });
  } catch (error) {
    res.json({ error, msg: "Internal Server Error" });
  }
});
router.post("/get", fetchAdmin, async (req, res) => {
  const userid = req.admin.id;
  try {
    const verify = await Admin.findById(userid);
    if (!verify) return res.json({ msg: "Invalid Access" });
    const data = await Spraying.find({ addedBy: userid });
    res.json({ status: true, msg: "data found", data });
  } catch (error) {
    res.json({ error, msg: "Internal Server Error" });
  }
});
module.exports = router;
