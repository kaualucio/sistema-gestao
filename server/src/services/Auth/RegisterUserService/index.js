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
exports.RegisterUserService = void 0;
const client_1 = require("../../../prisma/client");
const bcryptjs_1 = require("bcryptjs");
class RegisterUserService {
    execute({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAlreadyExists = yield client_1.client.user.findUnique({
                where: {
                    email
                }
            });
            if (userAlreadyExists) {
                return {
                    type: 'error',
                    message: 'Já existe um usuário com este e-mail'
                };
            }
            const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
            try {
                const user = yield client_1.client.user.create({
                    data: {
                        name,
                        email,
                        password: hashedPassword
                    },
                });
                // const activeAccountToken = await new TokenProvider().execute({idUser: user.id, expiresIn: '1d'})
                return {
                    user,
                    // activeAccountToken, 
                    type: 'success'
                };
            }
            catch (error) {
                // console.log(error)
                return {
                    type: 'error',
                    message: 'Houve um erro ao criar o usuário, tente novamente'
                };
            }
        });
    }
}
exports.RegisterUserService = RegisterUserService;
