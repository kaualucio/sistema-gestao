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
exports.GetAllReceiptsService = void 0;
const client_1 = require("../../../prisma/client");
class GetAllReceiptsService {
    execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allReceipts = yield client_1.client.receipts.findMany({
                    where: {
                        userId
                    }
                });
                return {
                    type: 'success',
                    allReceipts
                };
            }
            catch (error) {
                return {
                    type: 'error',
                    message: 'Houve um erro ao carregar todas as receitas'
                };
            }
        });
    }
}
exports.GetAllReceiptsService = GetAllReceiptsService;
