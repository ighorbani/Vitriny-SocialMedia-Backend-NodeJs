const express = require("express");
const { body } = require("express-validator");
const commentController = require("../controllers/commentController");
const router = express.Router();
const isAuth = require("../middleware/is-auth");

router.get("/comments/:businessId/:currentPage", commentController.getComments);
// prettier-ignore
router.post(
    "/addComment/:businessId",
    body("comment").trim().isLength({ min: 3, max: 300 }).withMessage("Please enter between 3 to 300 characters"),
    isAuth,
    commentController.createComment);

router.get("/comment/:commentId", commentController.getComment);
// prettier-ignore
router.put( "/deleteComment/:commentId", isAuth, commentController.deleteComment);

module.exports = router;
