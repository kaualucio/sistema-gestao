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
exports.UpdateExpenditureService = void 0;
const client_1 = require("../../../prisma/client");
class UpdateExpenditureService {
    execute({ expenditureId, name, category, typeReceipt, receiptValue, parcels, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataToUpdate = {
                name,
                category,
                typeReceipt,
                receiptValue,
                parcels,
            };
            const expenditureExist = yield client_1.client.expenditures.findFirst({
                where: {
                    id: expenditureId
                }
            });
            if (!expenditureExist) {
                return {
                    type: 'error',
                    message: 'Não existe nenhuma despesa para este usuário!'
                };
            }
            if (expenditureExist.userId !== userId) {
                return {
                    type: 'error',
                    message: 'Esta despesa não pertecence a você!'
                };
            }
            try {
                const uploadedExpenditure = yield client_1.client.expenditures.update({
                    where: {
                        id: expenditureExist.id
                    },
                    data: Object.assign({}, dataToUpdate)
                });
                return {
                    type: 'success',
                    message: 'Sua despesa foram atualizadas com sucesso!',
                    uploadedExpenditure
                };
            }
            catch (error) {
                return {
                    type: 'error',
                    message: 'Houve um erro ao atualizar a despesa, tente novamente!'
                };
            }
        });
    }
}
exports.UpdateExpenditureService = UpdateExpenditureService;
