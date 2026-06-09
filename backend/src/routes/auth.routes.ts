import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { RegisterSchema, LoginSchema } from "../dtos/auth.dto";

const router = Router();
const authController = new AuthController();

router.post('/registrar', validate(RegisterSchema), authController.register);
router.post('/login', validate(LoginSchema), authController.login);

export default router;
