const express = require("express");
const {
  createClass,
  getClassById,
  updateClassById,
  deleteClassById,
  getAllClasses,
} = require("../controller/class");
const router = express.Router();

router.post("/", createClass);
router.get("/:id", getClassById);
router.put("/:id", updateClassById);
router.delete("/:id", deleteClassById);
router.get("/:id", getAllClasses);

module.exports = router;