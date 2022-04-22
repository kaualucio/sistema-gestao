import { Router } from "express";
import { ActiveAccountController } from "../controllers/Auth/ActiveAccountController";
import { AuthenticateUserController } from "../controllers/Auth/AuthenticateUserController";
import { RefreshTokenController } from "../controllers/Auth/RefreshTokenController";
import { RegisterUserController } from "../controllers/Auth/RegisterUserController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const authRoutes = Router();

authRoutes.post('/login', new AuthenticateUserController().handle)
authRoutes.post('/register', new RegisterUserController().handle)
authRoutes.post('/refresh-token', new RefreshTokenController().handle)
authRoutes.get('/active-account/:activeAccountToken', new ActiveAccountController().handle)


export { authRoutes }