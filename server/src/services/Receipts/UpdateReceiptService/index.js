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
exports.UpdateReceiptService = void 0;
const client_1 = require("../../../prisma/client");
class UpdateReceiptService {
    execute({ receiptId, name, category, typeReceipt, receiptValue, parcels, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataToUpdate = {
                name,
                category,
                typeReceipt,
                receiptValue,
                parcels,
            };
            const receiptExist = yield client_1.client.receipts.findFirst({
                where: {
                    id: receiptId
                }
            });
            if (!receiptExist) {
                return {
                    type: 'error',
                    message: 'Não existe nenhuma receita para este usuário!'
                };
            }
            if (receiptExist.userId !== userId) {
                return {
                    type: 'error',
                    message: 'Esta receita não pertecence a você!'
                };
            }
            try {
                const uploadedReceipt = yield client_1.client.receipts.update({
                    where: {
                        name: receiptExist.name
                    },
                    data: Object.assign({}, dataToUpdate)
                });
                return {
                    type: 'success',
                    message: 'Sua receita foi atualizada com sucesso!',
                    uploadedReceipt
                };
            }
            catch (error) {
                return {
                    type: 'error',
                    message: 'Houve um erro ao atualizar a receita, tente novamente!'
                };
            }
        });
    }
}
exports.UpdateReceiptService = UpdateReceiptService;
