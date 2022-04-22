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
exports.ActiveAccountService = void 0;
const client_1 = require("../../../prisma/client");
const jsonwebtoken_1 = require("jsonwebtoken");
class ActiveAccountService {
    execute(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = (0, jsonwebtoken_1.decode)(token);
            const isValidToken = (0, jsonwebtoken_1.verify)(token, '668ecc57-75e3-4bd3-91ac-276383a6a6d4');
            if (isValidToken) {
                yield client_1.client.user.update({
                    where: {
                        id: data === null || data === void 0 ? void 0 : data.idUser
                    },
                    data: {
                        isActive: true
                    }
                });
                return { type: 'success', message: 'Sua conta foi ativada com sucesso!' };
            }
            else {
                return { type: 'error', message: 'O link para ativação expirou, envie outro link para seu email!' };
            }
        });
    }
}
exports.ActiveAccountService = ActiveAccountService;
