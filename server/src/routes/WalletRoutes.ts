import { Router } from "express";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreateWalletController } from './../controllers/Wallets/CreateWalletController/index';
import { GetAllWalletsUserController } from '../controllers/Wallets/GetAllWalletsUserController';
import { GetWalletByIdController } from '../controllers/Wallets/GetWalletByIdController';
import { UpdateWalletsByIdController } from './../controllers/Wallets/UpdateWalletsByIdController/index';
import { DeleteWalletByIdController } from '../controllers/Wallets/DeleteWalletByIdController';

const walletRoutes = Router();

walletRoutes.post('/create', ensureAuthenticate, new CreateWalletController().handle)
walletRoutes.get('/get-one/:walletId', ensureAuthenticate, new GetWalletByIdController().handle)
walletRoutes.get('/get-all/:userId', ensureAuthenticate, new GetAllWalletsUserController().handle)
walletRoutes.put('/update/:walletId', ensureAuthenticate, new UpdateWalletsByIdController().handle)
walletRoutes.delete('/delete/:walletId', ensureAuthenticate, new DeleteWalletByIdController().handle)


export { walletRoutes }