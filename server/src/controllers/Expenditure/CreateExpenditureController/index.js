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
exports.CreateExpenditureController = void 0;
const CreateExpenditureService_1 = require("../../../services/Expenditure/CreateExpenditureService");
class CreateExpenditureController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, category, typeExpenditure, userId, walletsId, parcels, expenditureValue } = request.body;
            const createExpenditureService = new CreateExpenditureService_1.CreateExpenditureService();
            const expenditure = yield createExpenditureService.execute({ name, category, typeExpenditure, userId, walletsId, parcels, expenditureValue });
            return response.json(expenditure);
        });
    }
}
exports.CreateExpenditureController = CreateExpenditureController;
