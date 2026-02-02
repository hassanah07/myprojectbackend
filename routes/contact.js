const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/contact", async (req, res) => {
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
        to: "hassanah0007@gmail.com",
        subject: `You have a new Message✔`,
        html: `
          <h2><b>A new Message from Client!</b></h2>
          <b>Name :</b><b><u>${req.body.name}</u></b><br />
          <b>Email Id :</b><b><u>${req.body.email}</u></b><br />
          <b>Message :</b><b><u>${req.body.message}</u></b><br />
          <small>you can use this email is to login at your Admin Portal</small>
          <small>This is an auto generated email for Extra security</small>
          <small>With Regards @www.hassan.dev</small>
          `,
      });
      res.status(200).json({
        msg: "Message sent!",
        status: true,
      });
    }
    main().catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ msg: "Unable To Send Message", status: false, error });
    });
  } catch (error) {
    res.status(500).json({ msg: "Message Server Error", status: false, error });
  }
});

module.exports = router;
