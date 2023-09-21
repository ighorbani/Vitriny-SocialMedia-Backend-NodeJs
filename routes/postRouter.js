const sharp = require("sharp");
const express = require("express");
const { body } = require("express-validator");
const postController = require("../controllers/postController");
const router = express.Router();
const isAuth = require("../middleware/is-auth");

router.post("/userPosts", postController.getPosts);
// prettier-ignore
router.post(
    "/addPost",
     isAuth,
     body("name").trim().isLength({ min: 3, max: 60 }).withMessage("Please enter between 3 to 60 characters"),
     body("description").trim().isLength({ min: 0, max: 2000 }).withMessage("Please enter between 10 to 2000 characters"),
     postController.createPost);
// prettier-ignore
router.put(
    "/editPost/:postId/",
    body("name").trim().isLength({ min: 3, max: 60 }).withMessage("Please enter between 3 to 60 characters"),
    body("description").trim().isLength({ min: 0, max: 2000 }).withMessage("Please enter between 10 to 2000 characters"),
     isAuth,
     postController.editPost);
// prettier-ignore
router.get( "/businessPosts/:businessId/:currentPage", postController.businessPosts);
router.get("/getPost/:postId", postController.getPost);
router.put("/deletePost/:postId", isAuth, postController.deletePost);

module.exports = router;
