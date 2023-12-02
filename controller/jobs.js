const JobModel = require("../model/Job");
const path = require("path");

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
  let imagePath = null;
  try {
    if (req.files?.image) {
      let rootPath = path.resolve();
      let uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      imagePath = path.join(
        "/uploads",
        `${uniqueSuffix}-${req.files.image.name}`
      );
      let destination = path.join(rootPath, imagePath);
      await req.files.image.mv(destination);
    }
  } catch (error) {
    console.log(error);
  }

  try {
    let job = await JobModel.create({
      ...req.body,
      createdBy: req.user._id,
      image: imagePath,
    });
    res.send(job);
  } catch (error) {
    next(error);
  }
};

module.exports = { getJobs, postJobs };
