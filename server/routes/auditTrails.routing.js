const express = require("express")
const router = express.Router()

const auditTrailsController = require("../controllers/auditTrails.controller.js");

router.post('/download', auditTrailsController.downloadAuditTrails);
router.post('/purge', auditTrailsController.purgeAuditTrails);



module.exports = router