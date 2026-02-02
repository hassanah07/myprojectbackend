const mongoose = require("mongoose");
const { Schema } = mongoose;

const SprayingSchema = new Schema(
  {
    teaName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    sign: {
      type: String,
    },
    father: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    idMark: {
      type: String,
      required: true,
    },
    appointment: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    aadhaar: {
      type: String,
      required: true,
    },
    abhaId: {
      type: String,
    },
    status: {
      type: Boolean,
      required: false,
    },
    addedBy: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Spraying = mongoose.model("Spraying", SprayingSchema);
module.exports = Spraying;
