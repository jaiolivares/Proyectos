import { Router } from "express";
import { HealthController } from "../../controllers/healths/health.controller";
import { createRateLimiter } from "../../utils/rateLimiter";

const router = Router();

const healthLimiter = createRateLimiter({
  windowMs: 10,
  max: 5,
});

const healthController = new HealthController();

router.get("/", healthLimiter, healthController.getHealth.bind(healthController));

export default router;
