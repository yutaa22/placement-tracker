import express from "express";
import {
  createPlacement,
  getPlacements,
  getPlacementById,
  updatePlacement,
  deletePlacement
} from "../controllers/placementController.js";

const router = express.Router();

// /api/placements
router.route("/")
  .get(getPlacements)
  .post(createPlacement);

// /api/placements/:id
router.route("/:id")
  .get(getPlacementById)
  .put(updatePlacement)
  .delete(deletePlacement);

export default router;