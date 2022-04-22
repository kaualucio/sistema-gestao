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
exports.CheckExpenditureService = void 0;
const client_1 = require("../../../prisma/client");
// interface UpdateExpenditureProps {
//   expenditureId: string, 
//   name?: string, 
//   category?: string, 
//   typeReceipt?: string, 
//   receiptValue?: string, 
//   parcels?: number, 
//   isClosed?: boolean
// }
class CheckExpenditureService {
    execute(expenditureId) {
        return __awaiter(this, void 0, void 0, function* () {
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
            try {
                yield client_1.client.expenditures.update({
                    where: {
                        id: expenditureId
                    },
                    data: {
                        isClosed: true
                    }
                });
                return {
                    type: 'success',
                    message: 'Sua despesa foi encerrada com sucesso!',
                };
            }
            catch (error) {
                return {
                    type: 'error',
                    message: 'Houve um erro ao encerrar sua despesa, tente novamente!'
                };
            }
        });
    }
}
exports.CheckExpenditureService = CheckExpenditureService;
