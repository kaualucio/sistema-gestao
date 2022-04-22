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
exports.UpdateGoalsByIdController = void 0;
const UpdateGoalsService_1 = require("../../../services/Goals/UpdateGoalsService");
class UpdateGoalsByIdController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { goalsId } = request.params;
            const { maxExpenditure, userId, minReceipt, currentExpenditure, currentReceipt } = request.body;
            const updateGoalsService = new UpdateGoalsService_1.UpdateGoalsService();
            const goals = yield updateGoalsService.execute({ goalsId, userId, maxExpenditure, minReceipt, currentExpenditure, currentReceipt });
            return response.json(goals);
        });
    }
}
exports.UpdateGoalsByIdController = UpdateGoalsByIdController;
