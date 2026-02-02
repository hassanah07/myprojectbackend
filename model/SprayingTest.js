const mongoose = require("mongoose");
const { Schema } = mongoose;

const SprayingTestSchema = new Schema(
  {
    slno: {
      type: Number,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
    pastHistory: {
      type: String,
    },
    familyHistory: {
      type: String,
    },
    personalHistory: {
      type: String,
    },
    genExam: {
      weight: {
        type: number,
      },
      pulse: {
        type: number,
      },
      bp: {
        type: number,
      },
      anemia: {
        type: number,
      },
      odema: {
        type: number,
      },
      jaundic: {
        type: number,
      },
    },
    gestroExam: {
      type: String,
    },
    neuroExam: {
      type: String,
    },
    eye: {
      type: String,
    },
    psychological: {
      type: String,
    },
    kidney: {
      type: String,
    },
    investigation: {
      serumChol: {
        type: number,
      },
      hb: {
        type: number,
      },
      glucose: {
        type: number,
      },
      belarubin: {
        type: number,
      },
      uring: {
        type: number,
      },
      xray: {
        type: String,
      },
    },
    lft: {
      type: Number,
    },
    addedBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const SprayingTest = mongoose.model("SprayingTest", SprayingTestSchema);
module.exports = SprayingTest;
