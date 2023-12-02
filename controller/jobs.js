const JobModel = require("../model/Job");
const getJobs = async (req, res, next) => {
  let searchTerm = req.query.searchTerm || "";
  let filterObj = { name: RegExp(searchTerm, "i") };
  try {
    let user = await JobModel.find(filterObj).populate("createdBy");
    res.send(user);
  } catch (error) {
    next(error);
  }
};

const postJobs = async (req, res, next) => {
  try {
    let job = await JobModel.create({ ...req.body, createdBy: req.user._id });
    res.send(job);
  } catch (error) {
    next(error);
  }
};

module.exports = { getJobs, postJobs };
