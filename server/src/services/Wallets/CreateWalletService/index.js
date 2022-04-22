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
exports.CreateWalletService = void 0;
const client_1 = require("../../../prisma/client");
class CreateWalletService {
    execute({ userId, name, userPlan }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userPlan === 'GRATIS') {
                const amountWalletsUser = yield client_1.client.wallet.findMany({
                    where: {
                        userId
                    }
                });
                if (amountWalletsUser.length === 3) {
                    return {
                        type: 'error',
                        message: 'Seu plano atual não permite a criação de mais de 3 carteiras'
                    };
                }
            }
            const alreadyExistWalletByName = yield client_1.client.wallet.findFirst({
                where: {
                    name,
                    userId
                }
            });
            if (alreadyExistWalletByName) {
                return {
                    type: 'error',
                    message: 'Você já possui uma carteira com esse nome'
                };
            }
            try {
                const wallet = yield client_1.client.wallet.create({
                    data: {
                        userId,
                        name
                    }
                });
                return {
                    type: 'success',
                    message: 'Sua carteira foi criada com sucesso!',
                    wallet
                };
            }
            catch (error) {
                console.log(error);
                return {
                    type: 'error',
                    message: 'Houve um erro ao criar uma Carteira, tente novamente!'
                };
            }
        });
    }
}
exports.CreateWalletService = CreateWalletService;
