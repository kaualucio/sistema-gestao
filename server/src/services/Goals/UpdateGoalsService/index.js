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
exports.UpdateGoalsService = void 0;
const client_1 = require("../../../prisma/client");
class UpdateGoalsService {
    execute({ goalsId, userId, maxExpenditure, minReceipt, currentExpenditure, currentReceipt }) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataToUpdate = {
                maxExpenditure,
                minReceipt,
                currentExpenditure,
                currentReceipt
            };
            const goalsExist = yield client_1.client.goals.findFirst({
                where: {
                    id: goalsId
                }
            });
            if (!goalsExist) {
                return {
                    type: 'error',
                    message: 'Não existe nenhuma meta para este usuário!'
                };
            }
            try {
                const uploadedGoals = yield client_1.client.goals.update({
                    where: {
                        userId: userId
                    },
                    data: Object.assign({}, dataToUpdate)
                });
                return {
                    type: 'success',
                    message: 'Suas metas foram atualizadas com sucesso!',
                    uploadedGoals
                };
            }
            catch (error) {
                return {
                    type: 'error',
                    message: 'Houve um erro ao atualizar as metas, tente novamente!'
                };
            }
        });
    }
}
exports.UpdateGoalsService = UpdateGoalsService;
