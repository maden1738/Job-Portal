const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const JobSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["frontend", "backend"],
    },
    jobLevel: {
      type: String,
      enum: ["fresher", "junior", "mid", "senior"],
    },
    numberOfVacancy: { type: Number },
    offeredSalary: { type: Number },
    createdBy: { type: ObjectId, ref: "Users", immutable: true },
  },
  {
    timestamps: true,
  }
);

const JobModel = mongoose.model("Job", JobSchema);

module.exports = JobModel;
