import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { allowRoles } from "../middleware/role.js";

// Import controller functions
import {
  addRationItem,
  getRationItems,
  updateRationItem,
  deleteRationItem,
  getMonthlyConsumption,
  addRationConsumption,
  getRationConsumptionByDate
} from "../controller/messSupervisor.controller.js";

const router = Router();

// =========================================
// RATION ITEMS MANAGEMENT
// =========================================

router.post("/add-ration-item", authMiddleware, allowRoles("MESS_SUPERVISOR"), addRationItem);

router.get("/get-ration-items", authMiddleware, allowRoles("MESS_SUPERVISOR", "STUDENT"), getRationItems);

router.patch("/update-ration-item/:id", authMiddleware, allowRoles("MESS_SUPERVISOR"), updateRationItem);

router.delete("/delete-ration-item/:id", authMiddleware, allowRoles("MESS_SUPERVISOR"), deleteRationItem);

router.get("/monthly-consumption", authMiddleware, allowRoles("MESS_SUPERVISOR"), getMonthlyConsumption);


router.post("/add-ration-consumption", authMiddleware, allowRoles("MESS_SUPERVISOR"), addRationConsumption);

router.get("/ration-consumption-by-date", authMiddleware, allowRoles("MESS_SUPERVISOR"), getRationConsumptionByDate);

export default router;