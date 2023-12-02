const express = require("express");
const router = express.Router();

const { getJobs, postJobs } = require("../controller/jobs");
const auth = require("../middleware/auth");

router.get("/api/jobs", getJobs);
router.post("/api/jobs", auth, postJobs);

module.exports = router;
