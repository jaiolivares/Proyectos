import { Router } from "express";
import { HealthController } from "../../controllers/healths/health.controller";

const router = Router();

const healthController = new HealthController();

router.get("/api/health", healthController.getHealth.bind(healthController));

export default router;
