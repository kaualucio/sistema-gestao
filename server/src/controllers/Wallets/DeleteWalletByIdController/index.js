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
exports.DeleteWalletByIdController = void 0;
const index_1 = require("./../../../services/Wallets/DeleteWalletByIdService/index");
class DeleteWalletByIdController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { walletId } = request.params;
            const deleteWalletByIdService = new index_1.DeleteWalletByIdService();
            const result = yield deleteWalletByIdService.execute(walletId);
            return response.json({ type: result.type, message: result.message });
        });
    }
}
exports.DeleteWalletByIdController = DeleteWalletByIdController;