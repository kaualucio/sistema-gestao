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
exports.UpdateWalletService = void 0;
const client_1 = require("../../../prisma/client");
class UpdateWalletService {
    execute({ id, name, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const walletExist = yield client_1.client.wallet.findFirst({
                where: {
                    id
                }
            });
            if (!walletExist) {
                return {
                    type: 'error',
                    message: 'Você não possue uma carteira com esse nome'
                };
            }
            if (walletExist.userId !== userId) {
                return {
                    type: 'error',
                    message: 'Esta carteira não pertecence a você!'
                };
            }
            try {
                const updateWallet = yield client_1.client.wallet.update({
                    where: {
                        id: walletExist.id
                    },
                    data: {
                        name
                    }
                });
                return {
                    type: 'success',
                    message: 'O nome da carteira foi atualizada com sucesso',
                    updateWallet
                };
            }
            catch (error) {
                console.log(error);
                return {
                    type: 'error',
                    message: 'Houve um erro ao atualizar a carteira, tente novemente'
                };
            }
        });
    }
}
exports.UpdateWalletService = UpdateWalletService;
