import { Router } from "express";
import { AuthController } from "../../controllers/auths/auth.controller";
import { AuthCommandService } from "../../services/commands/auths/auth/auth.command.service";
import { UsuarioQueryService } from "../../services/queries/usuarios/usuario/usuario.query.service";
import { createRateLimiter } from "../../utils/rateLimiter";

const router = Router();
const usuarioQueryService = new UsuarioQueryService();
const authCommandService = new AuthCommandService(usuarioQueryService);

const authController = new AuthController(authCommandService);

const loginLimiter = createRateLimiter({
  windowMs: 5,
  max: 5,
});

router.post("/login", loginLimiter, authController.login.bind(authController));

export default router;
