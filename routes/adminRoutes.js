const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const {
  viewAssignments,
  changeStatus,
} = require("../controllers/assignmentController");
const auth = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/assignments", auth, viewAssignments);
router.post("/assignments/:id/accept", auth, (req, res) =>
  changeStatus(req, res, "accepted")
);
router.post("/assignments/:id/reject", auth, (req, res) =>
  changeStatus(req, res, "rejected")
);

module.exports = router;
