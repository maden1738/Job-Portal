const express = require("express");
const router = express.Router();

const { getJobs, postJobs } = require("../controller/jobs");

router.get("/api/jobs", getJobs);
router.post("/api/jobs", postJobs);

module.exports = router;
