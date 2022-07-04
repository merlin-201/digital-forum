const express = require("express")
const router = express.Router()

const cronLogsController = require("../controllers/cronLogs.controller.js");

router.post('/download', cronLogsController.downloadCronLogs);
router.post('/purge', cronLogsController.purgeCronLogs);

module.exports = router