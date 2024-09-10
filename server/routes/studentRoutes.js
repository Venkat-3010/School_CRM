const express = require("express");
const {
  createStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  getAllStudentsInClass,
} = require("../controller/student");
const router = express.Router();

router.post("/", createStudent);
router.get("/:id", getStudentById);
router.put("/:id", updateStudentById);
router.delete("/:id", deleteStudentById);
router.get("/", getAllStudentsInClass);

module.exports = router;
