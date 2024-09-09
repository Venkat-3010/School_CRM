const Class = require("../models/class");

const createClass = async (req, res) => {
  const { name, year, teacher, studentFees, studentLimit } = req.body;
  try {
    const newClass = new Class({
      name,
      year,
      teacher,
      studentFees,
      studentLimit,
    });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getClassById = async (req, res) => {
  const { id } = req.params;
  try {
    const classData = await Class.findById(id).populate("teacher student");
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json(classData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateClassById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedClass = await Class.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteClassById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedClass = await Class.findByIdAndDelete(id);
    if (!deletedClass) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllClasses = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "name",
      order = "asc",
      search = "",
    } = req.query;

    const classes = await Class.find({
      name: { $regex: search, $options: "i" },
    })
      .populate("teacher students")
      .sort({ [sort]: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Class.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({ data: classes, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createClass,
  getClassById,
  updateClassById,
  deleteClassById,
  getAllClasses,
};
