import Student from "../models/studentModel.js";

// @desc Get all students
export const getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

// @desc Create a student
export const createStudent = async (req, res) => {
  const { name, rollNo, branch, year, email } = req.body;
  const student = await Student.create({ name, rollNo, branch, year, email });
  res.status(201).json(student);
};

// @desc Get student by ID
export const getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (student) {
    res.json(student);
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
};

// @desc Update student
export const updateStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (student) {
    student.name = req.body.name || student.name;
    student.rollNo = req.body.rollNo || student.rollNo;
    student.branch = req.body.branch || student.branch;
    student.year = req.body.year || student.year;
    student.email = req.body.email || student.email;
    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
};

// @desc Delete student
export const deleteStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (student) {
    await student.remove();
    res.json({ message: "Student removed" });
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
};
