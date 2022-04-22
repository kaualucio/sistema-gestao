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
exports.UpdateWalletsByIdController = void 0;
const index_1 = require("./../../../services/Wallets/UpdateWalletService/index");
class UpdateWalletsByIdController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const { name, userId } = request.body;
            const updateWalletService = new index_1.UpdateWalletService();
            const updatedWallet = yield updateWalletService.execute({ id, name, userId });
            return response.json(updatedWallet);
        });
    }
}
exports.UpdateWalletsByIdController = UpdateWalletsByIdController;