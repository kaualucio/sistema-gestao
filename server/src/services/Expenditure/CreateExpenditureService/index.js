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
exports.CreateExpenditureService = void 0;
const client_1 = require("../../../prisma/client");
class CreateExpenditureService {
    execute({ name, category, typeExpenditure, userId, walletsId, parcels, expenditureValue }) {
        return __awaiter(this, void 0, void 0, function* () {
            const alreadyExistsExpByName = yield client_1.client.expenditures.findFirst({
                where: {
                    name
                }
            });
            if (alreadyExistsExpByName) {
                return {
                    type: 'error',
                    message: 'Você já possue uma despesa com esse nome!'
                };
            }
            try {
                const expenditure = yield client_1.client.expenditures.create({
                    data: {
                        walletsId,
                        userId,
                        name,
                        category,
                        typeExpenditure,
                        parcels,
                        expenditureValue,
                        isClosed: false
                    }
                });
                return {
                    type: 'success',
                    message: 'Sua despesa foi criada com sucesso!',
                    expenditure
                };
            }
            catch (error) {
                console.log(error);
                return {
                    type: 'error',
                    message: 'Houve um erro ao criar sua despesa, tente novamente!'
                };
            }
        });
    }
}
exports.CreateExpenditureService = CreateExpenditureService;
