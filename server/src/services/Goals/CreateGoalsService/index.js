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
exports.CreateGoalsService = void 0;
const client_1 = require("../../../prisma/client");
class CreateGoalsService {
    execute({ maxExpenditure, minReceipt, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const alreadyExistsGoalsToUser = yield client_1.client.goals.findFirst({
                where: {
                    userId
                }
            });
            if (alreadyExistsGoalsToUser) {
                return {
                    type: 'error',
                    message: 'Você já possui metas criadas, não pode criar outros, caso queria mudar suas metas atualize elas'
                };
            }
            const goals = yield client_1.client.goals.create({
                data: {
                    userId,
                    maxExpenditure,
                    minReceipt
                }
            });
            return {
                type: 'success',
                message: 'Suas metas foram criadas com sucesso!',
                goals
            };
        });
    }
}
exports.CreateGoalsService = CreateGoalsService;
