const express = require("express");
const {
  createClass,
  getClassById,
  updateClassById,
  deleteClassById,
  getAllClasses,
  getFinancialAnalytics,
} = require("../controller/class");
const router = express.Router();

router.post("/", createClass);
router.get('/analytics/', getFinancialAnalytics);
router.get("/:id", getClassById);
router.put("/:id", updateClassById);
router.delete("/:id", deleteClassById);
router.get("/", getAllClasses);

module.exports = router;