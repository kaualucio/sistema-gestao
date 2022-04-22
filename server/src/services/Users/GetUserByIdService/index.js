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
exports.GetUserByIdService = void 0;
const client_1 = require("../../../prisma/client");
class GetUserByIdService {
    execute(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDoesntExists = yield client_1.client.user.findFirst({
                where: {
                    id: idUser
                }
            });
            if (!userDoesntExists) {
                return { error: 'Usuário não foi encontrado' };
            }
            return {
                id: userDoesntExists.id,
                name: userDoesntExists.name,
                email: userDoesntExists.email,
                plan: userDoesntExists.userPlan
            };
            return userDoesntExists;
        });
    }
}
exports.GetUserByIdService = GetUserByIdService;
