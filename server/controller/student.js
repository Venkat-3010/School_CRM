const Student = require("../models/student");

const createStudent = async (req, res) => {
  const { name, gender, dob, contactDetails, feesPaid, classId } = req.body;
  try {
    const newStudent = new Student({
      name,
      gender,
      dob,
      contactDetails,
      feesPaid,
      classId,
    });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id).populate("class");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(deletedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudentsInClass = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "name",
      order = "asc",
      search = "",
    } = req.query;

    const students = await Student.find({
      name: { $regex: search, $options: "i" },
    })
      .populate("class")
      .sort({ [sort]: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Student.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({ data: students, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  getStudentsInClass,
};
