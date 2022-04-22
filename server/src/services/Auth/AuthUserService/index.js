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
exports.AuthUserService = void 0;
const client_1 = require("../../../prisma/client");
const bcryptjs_1 = require("bcryptjs");
const refreshTokenProvider_1 = require("../../../provider/refreshTokenProvider");
const tokenProvider_1 = require("../../../provider/tokenProvider");
class AuthUserService {
    execute({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExist = yield client_1.client.user.findUnique({
                where: {
                    email
                }
            });
            if (!userExist) {
                return {
                    type: 'error',
                    message: 'Não existe usuário com este email ou senha!'
                };
            }
            if (userExist.isActive === false) {
                return {
                    type: 'error',
                    message: 'Sua conta não está ativada, ative-a primeiro para conseguir logar!'
                };
            }
            const matchedPassword = yield (0, bcryptjs_1.compare)(password, userExist.password);
            if (!matchedPassword) {
                return {
                    type: 'error',
                    message: 'Senha incorreta!'
                };
            }
            try {
                const token = yield new tokenProvider_1.TokenProvider().execute({ idUser: userExist.id, expiresIn: '900s', data: {
                        name: userExist.name,
                        email: userExist.email,
                        userPlan: userExist.userPlan,
                        isActive: userExist.isActive,
                    } });
                const refreshToken = yield new refreshTokenProvider_1.RefreshTokenProvider().execute(userExist.id);
                return { token, refreshToken };
            }
            catch (error) {
                return {
                    type: 'error',
                    message: 'Houve um error ao realizar o login, tente novamente'
                };
            }
        });
    }
}
exports.AuthUserService = AuthUserService;
