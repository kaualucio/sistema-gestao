"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticate = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function ensureAuthenticate(request, response, next) {
    const authToken = request.headers.authorization;
    if (!authToken) {
        return response.status(401).json({ error: 'Token is not sent' });
    }
    const [, token] = authToken.split(' ');
    try {
        (0, jsonwebtoken_1.verify)(token, '668ecc57-75e3-4bd3-91ac-276383a6a6d4');
        next();
    }
    catch (error) {
        return response.status(401).json({ error, message: 'Token expired' });
    }
}
exports.ensureAuthenticate = ensureAuthenticate;
