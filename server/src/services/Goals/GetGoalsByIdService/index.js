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
exports.GetGoalsByIdService = void 0;
const client_1 = require("../../../prisma/client");
class GetGoalsByIdService {
    execute(goalsId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const goalsExists = yield client_1.client.goals.findFirst({
                    where: {
                        id: goalsId
                    }
                });
                return {
                    type: 'success',
                    goalsExists
                };
            }
            catch (error) {
                return {
                    type: 'error',
                    message: "Houve ao carregar suas metas, tente novamente"
                };
            }
        });
    }
}
exports.GetGoalsByIdService = GetGoalsByIdService;
