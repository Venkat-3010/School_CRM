const Teacher = require("../models/teacher");
const Class = require("../models/class");

const createTeacher = async (req, res) => {
  console.log(req.body)
  const { name, gender, dob, contactNumber, email, salary, assignedClass } = req.body;
  console.log(req.body);
  try {
    const teacher = new Teacher({
      name,
      gender,
      dob,
      contactNumber,
      email,
      salary,
      assignedClass,
    });
    await teacher.save();

    const updatedTeacher = await Class.findByIdAndUpdate(
      assignedClass,
      { $push: { teacher: teacher._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Teacher created successfully",
      teacher,
      updatedTeacher,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTeacherById = async (req, res) => {
  const { id } = req.params;
  try {
    const teacherData = await Teacher.findById(id).populate("assignedClass");
    if (!teacherData) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(teacherData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTeacherById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTeacherById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllTeachers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "name",
      order = "asc",
      search = "",
    } = req.query;

    const teachers = await Teacher.find({
      name: { $regex: search, $options: "i" },
    })
      .populate("assignedClass")
      .sort({ [sort]: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Teacher.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    console.log(teachers)

    res.status(200).json({
      data: teachers,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTeacher,
  getTeacherById,
  updateTeacherById,
  deleteTeacherById,
  getAllTeachers,
};
