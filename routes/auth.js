const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const Admin = require("../model/Admin");
const fetchAdmin = require("../middleware/fetchadmin");

const router = express.Router();

router.post("/createadmin", fetchAdmin, async (req, res) => {
  try {
    let admin = await Admin.findOne({ email: req.body.email });
    if (admin)
      return res
        .status(400)
        .json({ error: "Sorry a Admin with this email already exists" });
    if (admin) {
      res.status(400).json({ msg: "Oppssss! Mobile already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const randPassword = `PMX${Math.floor(Math.random() * 10000000)}`;
      const hashedPassword = await bcrypt.hash(randPassword, salt);
      const otpId = Math.floor(10000 + Math.random() * 500000).toString();

      admin = await Admin.create({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        photo: "/uploadsdefault/avatar.jpg",
        sign: "/uploadsdefault/sign.png",
        password: hashedPassword,
        isSuperAdmin: false,
      });
      try {
        const transporter = nodemailer.createTransport({
          host: "smtp.forwardemail.net",
          port: 465,
          secure: true,
          service: "gmail",
          auth: {
            user: process.env.MAILER_USERID,
            pass: process.env.MAILER_PASSWORD,
          },
        });
        async function main() {
          const info = await transporter.sendMail({
            from: '"Server Mail"noreply@hassan.dev',
            to: req.body.email,
            subject: `You are Assigned as Admin: ${otpId} ✔`,
            html: `
        <h2><b>Congratulation!</b></h2>
        <b>New Login ID is :</b><b><u>${req.body.email}</u></b><br />
        <b>New Password is :</b><b><u>${randPassword}</u></b><br />
        <small>you can use this email is to login at your Admin Portal</small>
        <small>This is an auto generated email for Extra security</small>
        <small>With Regards @www.hassan.dev</small>
        `,
          });
          res.status(200).json({
            msg: "Password Has Been Sent to Your Email",
            type: "success",
          });
        }
        main().catch((error) => {
          console.log(error);
          res.status(500).json({ msg: "Unable To Send Email", type: "error" });
        });
      } catch (error) {
        res.status(500).json({ msg: "E-Mail Server Error", type: "error" });
      }
    }
  } catch (error) {
    res.json(error);
  }
});

// authenticate a admin using: POST "/api/auth/login". No login required
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ msg: "Invalid Credentials0" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials1" });
    }
    // create and assign a token
    const payload = {
      admin: {
        id: admin.id,
      },
    };
    const authtoken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ authtoken, status: true });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error", err });
  }
});

router.post("/verify", fetchAdmin, async (req, res) => {
  const userid = req.admin.id;
  try {
    const verify = await Admin.findById(userid);
    if (!verify) return res.json({ status: false });
    res.json({ status: true });
  } catch (error) {
    res.json({ error, msg: "Internal Server Error", status: false });
  }
});
router.post("/changepassword", fetchAdmin, async (req, res) => {
  const userid = req.admin.id;
  try {
    let admin = await Admin.findById(userid);
    if (!admin) {
      return res.status(400).json({ msg: "Invalid Access" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    admin = await Admin.findByIdAndUpdate(userid, {
      $set: {
        password: hashedPassword,
      },
    });
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials1" });
    }
    // create and assign a token
    const payload = {
      admin: {
        id: admin.id,
      },
    };
    const authtoken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ authtoken, status: true });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error", err });
  }
});

module.exports = router;
