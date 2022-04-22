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
exports.CheckReceiptService = void 0;
const client_1 = require("../../../prisma/client");
class CheckReceiptService {
    execute(receiptId) {
        return __awaiter(this, void 0, void 0, function* () {
            const receiptExist = yield client_1.client.receipts.findFirst({
                where: {
                    id: receiptId
                }
            });
            if (!receiptExist) {
                return {
                    type: 'error',
                    message: 'Não existe nenhuma despesa para este usuário!'
                };
            }
            try {
                yield client_1.client.receipts.update({
                    where: {
                        id: receiptId
                    },
                    data: {
                        isClosed: true
                    }
                });
                return {
                    type: 'success',
                    message: 'Sua receita foi encerrada com sucesso!',
                };
            }
            catch (error) {
                return {
                    type: 'error',
                    message: 'Houve um erro ao encerrar sua receita, tente novamente!'
                };
            }
        });
    }
}
exports.CheckReceiptService = CheckReceiptService;
