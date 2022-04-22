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
exports.DeleteExpenditureByIdController = void 0;
const index_1 = require("./../../../services/Expenditure/DeleteExpenditureService/index");
class DeleteExpenditureByIdController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { expenditureId } = request.params;
            const deleteExpenditureService = new index_1.DeleteExpenditureService();
            const result = yield deleteExpenditureService.execute(expenditureId);
            return response.json(result);
        });
    }
}
exports.DeleteExpenditureByIdController = DeleteExpenditureByIdController;
