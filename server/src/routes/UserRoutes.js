"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const index_1 = require("./../controllers/Users/GetUserByIdController/index");
const express_1 = require("express");
const usersRoutes = (0, express_1.Router)();
exports.usersRoutes = usersRoutes;
usersRoutes.get('/get-by-id/:idUser', new index_1.GetUserByIdController().handle);
