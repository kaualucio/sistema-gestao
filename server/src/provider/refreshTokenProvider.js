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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenProvider = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const client_1 = require("../prisma/client");
class RefreshTokenProvider {
    execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const expiresIn = (0, dayjs_1.default)().add(1, 'hour').unix();
            const currentRefreshToken = yield client_1.client.refreshToken.findFirst({
                where: {
                    userId
                }
            });
            if (currentRefreshToken) {
                const refreshTokenExpires = (0, dayjs_1.default)().isAfter(dayjs_1.default.unix(currentRefreshToken.expiresIn));
                if (refreshTokenExpires) {
                    //delete prev refresh_token
                    yield client_1.client.refreshToken.delete({
                        where: {
                            userId
                        }
                    });
                    //create a new refresh_token
                    const newRefreshToken = yield client_1.client.refreshToken.create({
                        data: {
                            userId,
                            expiresIn
                        }
                    });
                    //return new refresh token
                    return newRefreshToken.id;
                }
                //if not expired return current refresh token
                return currentRefreshToken.id;
            }
            const refreshToken = yield client_1.client.refreshToken.create({
                data: {
                    userId,
                    expiresIn
                }
            });
            return refreshToken.id;
        });
    }
}
exports.RefreshTokenProvider = RefreshTokenProvider;
