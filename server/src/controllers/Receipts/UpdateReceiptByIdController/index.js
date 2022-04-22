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
exports.UpdateReceiptByIdController = void 0;
const index_1 = require("./../../../services/Receipts/UpdateReceiptService/index");
class UpdateReceiptByIdController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { receiptId } = request.params;
            const { name, category, typeReceipt, receiptValue, parcels, userId } = request.body;
            const updateExpenditureService = new index_1.UpdateReceiptService();
            const receipt = yield updateExpenditureService.execute({ receiptId, name, category, typeReceipt, receiptValue, parcels, userId });
            return response.json(receipt);
        });
    }
}
exports.UpdateReceiptByIdController = UpdateReceiptByIdController;
