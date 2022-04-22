import { Router } from "express";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { DeleteReceiptByIdController } from './../controllers/Receipts/DeleteReceiptByIdController/index';
import { CheckReceiptController } from './../controllers/Receipts/CheckReceiptController/index';
import { UpdateReceiptByIdController } from './../controllers/Receipts/UpdateReceiptByIdController/index';
import { GetAllReceiptsByIdController } from './../controllers/Receipts/GetAllReceiptsByIdController/index';
import { GetUniqueReceiptController } from './../controllers/Receipts/GetUniqueReceiptController/index';
import { GetAllReceiptByWalletIdController } from './../controllers/Receipts/GetAllReceiptByWalletIdController';
import { CreateReceiptController } from './../controllers/Receipts/CreateReceiptController/index';

const receiptsRoutes = Router();

receiptsRoutes.post('/create', ensureAuthenticate, new CreateReceiptController().handle)
receiptsRoutes.get('/get-one/:receiptId', ensureAuthenticate, new GetUniqueReceiptController().handle)
receiptsRoutes.get('/get-all-by-wallet/:walletId', ensureAuthenticate, new GetAllReceiptByWalletIdController().handle)
receiptsRoutes.get('/get-all/:userId', ensureAuthenticate, new GetAllReceiptsByIdController().handle)
receiptsRoutes.put('/update/:receiptId', ensureAuthenticate, new UpdateReceiptByIdController().handle)
receiptsRoutes.put('/check/:receiptId', ensureAuthenticate, new CheckReceiptController().handle)
receiptsRoutes.delete('/delete/:receiptId', ensureAuthenticate, new DeleteReceiptByIdController().handle)


export { receiptsRoutes }