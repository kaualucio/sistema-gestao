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
exports.CreateReceiptService = void 0;
const client_1 = require("../../../prisma/client");
class CreateReceiptService {
    execute({ name, category, typeReceipt, userId, walletsId, parcels, receiptValue }) {
        return __awaiter(this, void 0, void 0, function* () {
            const alreadyExistsRecByName = yield client_1.client.receipts.findFirst({
                where: {
                    name
                }
            });
            if (alreadyExistsRecByName) {
                return {
                    type: 'error',
                    message: 'Você já possue uma receita com esse nome!'
                };
            }
            try {
                const expenditure = yield client_1.client.receipts.create({
                    data: {
                        walletsId,
                        userId,
                        name,
                        category,
                        typeReceipt,
                        parcels,
                        receiptValue,
                        isClosed: false
                    }
                });
                return {
                    type: 'success',
                    message: 'Sua receita foi criada com sucesso!',
                    expenditure
                };
            }
            catch (error) {
                return {
                    type: 'error',
                    message: 'Houve um erro ao criar sua receita, tente novamente!'
                };
            }
        });
    }
}
exports.CreateReceiptService = CreateReceiptService;
