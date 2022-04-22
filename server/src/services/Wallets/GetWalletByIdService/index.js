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
exports.GetWalletByIdService = void 0;
const client_1 = require("../../../prisma/client");
class GetWalletByIdService {
    execute(walletId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wallet = yield client_1.client.wallet.findFirst({
                    where: {
                        id: walletId
                    }
                });
                return wallet;
            }
            catch (error) {
                return { error: 'Houve um erro ao recuperar a carteira, tente novamete' };
            }
        });
    }
}
exports.GetWalletByIdService = GetWalletByIdService;
