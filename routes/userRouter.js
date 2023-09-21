const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const isAuth = require("../middleware/is-auth");
const { body } = require("express-validator");

router.get("/users", userController.getUsers);
router.get("/user/getUser", isAuth, userController.getUser);
router.get("/user/getMyBusiness", isAuth, userController.getMyBusiness);
router.put("/user/userCTA", isAuth, userController.userCTA);
router.put("/user/manageFollow", isAuth, userController.manageFollow);
router.put("/user/changeSettings", isAuth, userController.changeSettings);
router.get("/user/getSettings", isAuth, userController.getSettings);
router.get("/user/likedProducts", isAuth, userController.likedProducts);
router.get("/user/WhatsUp", userController.WhatsUp);
// prettier-ignore
router.get("/user/followedBusinesses", isAuth, userController.followedAccounts);
router.post("/user/loginUserVerification", userController.loginVerification);
// prettier-ignore
router.post( "/user/sendVerificationCodeAgain", userController.sendVerificationCodeAgain);

// prettier-ignore
router.post(
  "/user/loginUserNumber",
  body("number").trim().isLength({ min: 11, max: 11 }).withMessage("Please enter the mobile number in full 09... format."),
  body('number').custom((value, { req }) => {
      if (!value.startsWith("09")) {
          throw new Error({ param: "number", msg: "Please enter the mobile number in full 09... format.", value: req.body.number });
      }
      return true;
  }).withMessage("Please enter the mobile number in full 09... format."),
  userController.loginNumber
);

// prettier-ignore
router.post(
  "/user/loginRegister",
  body("name").trim().isLength({ min: 3, max: 20 }).withMessage("Please enter between 3 to 20 characters"),
  userController.loginRegister);

// prettier-ignore
router.put("/user/deactivateUserPage", isAuth, userController.deactivateUserPage);

// prettier-ignore
router.get("/user/getUserAdmin", isAuth, userController.getUserAdmin);

// prettier-ignore
router.get("/getSoundLength/:soundName", userController.getSoundLength);

// prettier-ignore
router.get("/user/getUserView/:slug", userController.getUserView);
// prettier-ignore
router.get("/user/getUserFollows/:followState/:userId", userController.getUserFollows);
// prettier-ignore
router.get("/user/getMyFollows/:followState", isAuth, userController.getMyFollows);
// prettier-ignore
router.put(
  "/user/editUser",
  body("name").trim().isLength({ min: 3, max: 20 }).withMessage("Please enter between 3 to 20 characters"),
  body("slug").trim().isLength({ min: 3, max: 20 }).matches(/^[A-Za-z0-9.,-_]+$/).withMessage("Please enter between 3 to 20 characters consisting of English letters, - _, and numbers without spaces"),
  body("description").trim().isLength({ min: 10, max: 400 }).withMessage("Please enter between 10 to 400 characters"),
  isAuth, userController.editUser);

// prettier-ignore
router.post(
  "/user/addSocial",
  body("link").trim().isLength({ min: 3 }).withMessage("Must be at least 3 characters."),
  isAuth,
  userController.addSocial);

// prettier-ignore
router.put(
  "/user/editSocial/:socialId",
  body("link").trim().isLength({ min: 3 }).withMessage("Must be at least 3 characters."),
  isAuth,
  userController.editSocial);

// prettier-ignore
router.put( "/user/deleteSocial/:socialId", isAuth, userController.deleteSocial);
router.get("/user/getSocial/:socialId", userController.getSocial);
module.exports = router;
