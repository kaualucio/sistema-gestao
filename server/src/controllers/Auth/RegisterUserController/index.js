"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserController = void 0;
const RegisterUserService_1 = require("../../../services/Auth/RegisterUserService");
class RegisterUserController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = request.body;
            const registerUserService = new RegisterUserService_1.RegisterUserService();
            const { user, type } = yield registerUserService.execute({ name, email, password });
            // const mailer = new MailService(user?.email, 'emailparatestes992@gmail.com', 'Ative sua conta', 'activeAccount/active_account', { token: activeAccountToken, idUser: user?.id }).sendEmail()
            return response.json({ user, type });
        });
    }
}
exports.RegisterUserController = RegisterUserController;
