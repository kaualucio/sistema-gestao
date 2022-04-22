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
exports.RefreshTokenService = void 0;
const client_1 = require("../../../prisma/client");
const refreshTokenProvider_1 = require("../../../provider/refreshTokenProvider");
const tokenProvider_1 = require("../../../provider/tokenProvider");
class RefreshTokenService {
    execute(refresh_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshTokenAlreadyExists = yield client_1.client.refreshToken.findFirst({
                where: {
                    id: refresh_token
                }
            });
            if (!refreshTokenAlreadyExists) {
                return {
                    type: 'error',
                    message: 'Token invalid'
                };
            }
            const user = yield client_1.client.user.findFirst({
                where: {
                    id: refreshTokenAlreadyExists.userId
                }
            });
            const refreshToken = yield new refreshTokenProvider_1.RefreshTokenProvider().execute(refreshTokenAlreadyExists.userId);
            const token = yield new tokenProvider_1.TokenProvider().execute({ idUser: refreshTokenAlreadyExists.userId, expiresIn: '30s', data: {
                    name: user === null || user === void 0 ? void 0 : user.name,
                    email: user === null || user === void 0 ? void 0 : user.email,
                    isActive: user === null || user === void 0 ? void 0 : user.isActive,
                    userPlan: user === null || user === void 0 ? void 0 : user.userPlan
                } });
            return { token, refreshToken };
        });
    }
}
exports.RefreshTokenService = RefreshTokenService;
