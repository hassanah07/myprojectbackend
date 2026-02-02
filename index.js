require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToMongoDB = require("./db");
const bodyParser = require("body-parser");
const path = require("path");

connectToMongoDB();

const app = express();
app.use(express.json());
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
  : [];

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  }),
);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/uploadsdefault", express.static(path.join(process.cwd(), "uploads")));

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "35mb",
    parameterLimit: 50000,
  }),
);
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/static/index.html"));
});

app.listen(port, () => {
  console.log(`Great! Happy Hacking with port ${port}`);
});

app.use("/api/auth/admin", require("./routes/auth"));
app.use("/api/auth/worker", require("./routes/spraying"));
