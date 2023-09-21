const express = require("express");
const { body } = require("express-validator");
const reportController = require("../controllers/reportController");
const router = express.Router();
const isAuth = require("../middleware/is-auth");

router.get("/reports", reportController.getReports);
// prettier-ignore
router.post(
    "/report/addReport",
    body("description").trim().isLength({ min: 10, max: 300 }).withMessage("Please enter between 10 to 300 characters"),
    isAuth,
    reportController.createReport);

router.get("/report", reportController.getReport);

module.exports = router;
