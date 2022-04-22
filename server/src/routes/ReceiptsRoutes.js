"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiptsRoutes = void 0;
const express_1 = require("express");
const ensureAuthenticate_1 = require("../middlewares/ensureAuthenticate");
const index_1 = require("./../controllers/Receipts/DeleteReceiptByIdController/index");
const index_2 = require("./../controllers/Receipts/CheckReceiptController/index");
const index_3 = require("./../controllers/Receipts/UpdateReceiptByIdController/index");
const index_4 = require("./../controllers/Receipts/GetAllReceiptsByIdController/index");
const index_5 = require("./../controllers/Receipts/GetUniqueReceiptController/index");
const GetAllReceiptByWalletIdController_1 = require("./../controllers/Receipts/GetAllReceiptByWalletIdController");
const index_6 = require("./../controllers/Receipts/CreateReceiptController/index");
const receiptsRoutes = (0, express_1.Router)();
exports.receiptsRoutes = receiptsRoutes;
receiptsRoutes.post('/create', ensureAuthenticate_1.ensureAuthenticate, new index_6.CreateReceiptController().handle);
receiptsRoutes.get('/get-one/:receiptId', ensureAuthenticate_1.ensureAuthenticate, new index_5.GetUniqueReceiptController().handle);
receiptsRoutes.get('/get-all-by-wallet/:walletId', ensureAuthenticate_1.ensureAuthenticate, new GetAllReceiptByWalletIdController_1.GetAllReceiptByWalletIdController().handle);
receiptsRoutes.get('/get-all/:userId', ensureAuthenticate_1.ensureAuthenticate, new index_4.GetAllReceiptsByIdController().handle);
receiptsRoutes.put('/update/:receiptId', ensureAuthenticate_1.ensureAuthenticate, new index_3.UpdateReceiptByIdController().handle);
receiptsRoutes.put('/check/:receiptId', ensureAuthenticate_1.ensureAuthenticate, new index_2.CheckReceiptController().handle);
receiptsRoutes.delete('/delete/:receiptId', ensureAuthenticate_1.ensureAuthenticate, new index_1.DeleteReceiptByIdController().handle);
