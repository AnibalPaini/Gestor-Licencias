import express from "express";
import {
  authMiddleware,
  authRolMiddleware,
} from "../middlewares/auth.middlewares.js";
import licenciasController from "../controllers/licencias.controller.js";
const router = express.Router();

router.get(
  "/",
  authMiddleware,
  authRolMiddleware(["admin"]),
  licenciasController.getLicencias,
);
router.get("/:id", licenciasController.getLicenciasById);
router.post("/", licenciasController.postLicencia);
router.put("/:id", licenciasController.putLicencia);
router.delete("/:id", licenciasController.deleteLicencia);

export default router;
