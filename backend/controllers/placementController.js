import Placement from "../models/placementModel.js";
import Student from "../models/studentModel.js";

// @desc Get all placements
// @route GET /api/placements
// @access Public
export const getPlacements = async (req, res) => {
  try {
    const placements = await Placement.find().populate("studentId", "name email course");
    res.json(placements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get placement by ID
// @route GET /api/placements/:id
// @access Public
export const getPlacementById = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id).populate("studentId", "name email course");
    if (placement) {
      res.json(placement);
    } else {
      res.status(404).json({ message: "Placement not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create new placement
// @route POST /api/placements
// @access Public
export const createPlacement = async (req, res) => {
  try {
    const { company, role, status, studentId } = req.body;

    // Validate student
    const studentExists = await Student.findById(studentId);
    if (!studentExists) {
      return res.status(400).json({ message: "Student not found" });
    }

    const placement = new Placement({
      company,
      role,
      status,
      studentId
    });

    const createdPlacement = await placement.save();
    res.status(201).json(createdPlacement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update placement
// @route PUT /api/placements/:id
// @access Public
export const updatePlacement = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);

    if (!placement) {
      return res.status(404).json({ message: "Placement not found" });
    }

    placement.company = req.body.company || placement.company;
    placement.role = req.body.role || placement.role;
    placement.status = req.body.status || placement.status;

    const updatedPlacement = await placement.save();
    res.json(updatedPlacement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete placement
// @route DELETE /api/placements/:id
// @access Public
export const deletePlacement = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);

    if (!placement) {
      return res.status(404).json({ message: "Placement not found" });
    }

    await placement.remove();
    res.json({ message: "Placement removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
