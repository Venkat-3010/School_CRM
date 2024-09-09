const express = require("express");
const {
  createTeacher,
  getTeacherById,
  deleteTeacherById,
  updateTeacherById,
  getAllTeachers,
} = require("../controller/teacher");
const router = express.Router();

router.post("/", createTeacher);
router.get("/:id", getTeacherById);
router.put("/:id", updateTeacherById);
router.delete("/:id", deleteTeacherById);
router.get("/", getAllTeachers);

module.exports = router;
