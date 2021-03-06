"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const ActiveAccountController_1 = require("../controllers/Auth/ActiveAccountController");
const AuthenticateUserController_1 = require("../controllers/Auth/AuthenticateUserController");
const RefreshTokenController_1 = require("../controllers/Auth/RefreshTokenController");
const RegisterUserController_1 = require("../controllers/Auth/RegisterUserController");
const authRoutes = (0, express_1.Router)();
exports.authRoutes = authRoutes;
authRoutes.post('/login', new AuthenticateUserController_1.AuthenticateUserController().handle);
authRoutes.post('/register', new RegisterUserController_1.RegisterUserController().handle);
authRoutes.post('/refresh-token', new RefreshTokenController_1.RefreshTokenController().handle);
authRoutes.get('/active-account/:activeAccountToken', new ActiveAccountController_1.ActiveAccountController().handle);
