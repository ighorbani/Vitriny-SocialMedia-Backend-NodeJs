const express = require("express");
const { body } = require("express-validator");
const invoiceController = require("../controllers/invoiceController");
const router = express.Router();
const isAuth = require("../middleware/is-auth");

router.get("/getBusinessInvoices/", isAuth, invoiceController.getBusinessInvoices);
router.post("/getUserBusinessInvoices/", isAuth, invoiceController.getUserBusinessInvoices);
router.get("/getUserInvoices/", isAuth, invoiceController.getUserInvoices);
router.get("/getUnpayedInvoicesCount/", isAuth, invoiceController.getUnpayedInvoicesCount);
router.get("/getInvoice/:invoiceId", isAuth, invoiceController.getInvoice);
router.post("/createInvoice/",
body("name").trim().isLength({ min: 3, max: 60 }).withMessage("Please enter between 3 to 60 characters"),
body("price").trim().isNumeric().withMessage("Only numbers are allowed"),
body("unit").trim().isLength({ min: 3, max: 30 }).withMessage("Please enter between 3 to 30 characters"),
isAuth, invoiceController.createInvoice);
router.get("/calculateBusinessFinancial/", isAuth, invoiceController.calculateBusinessFinancial);
router.put("/editInvoice/",
body("name").trim().isLength({ min: 3, max: 60 }).withMessage("Please enter between 3 to 60 characters"),
body("price").trim().isNumeric().withMessage("Only numbers are allowed"),
body("unit").trim().isLength({ min: 3, max: 30 }).withMessage("Please enter between 3 to 30 characters"),

isAuth, invoiceController.editInvoice);
router.put("/payInvoice/", isAuth, invoiceController.payInvoice);

module.exports = router;
