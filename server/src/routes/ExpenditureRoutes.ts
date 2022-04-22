
import { Router } from "express";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreateExpenditureController } from './../controllers/Expenditure/CreateExpenditureController/index';
import { UpdateExpenditureByIdController } from './../controllers/Expenditure/UpdateExpenditureByIdController/index';
import { GetAllExpenditureByWalletIdController } from './../controllers/Expenditure/GetAllExpenditureByWalletIdController/index';
import { DeleteExpenditureByIdController } from './../controllers/Expenditure/DeleteExpenditureByIdController/index';
import { GetAllExpendituresByIdController } from './../controllers/Expenditure/GetAllExpendituresByIdController/index';
import { GetUniqueExpenditureController } from './../controllers/Expenditure/GetUniqueExpenditureController/index';
import { CheckExpenditureController } from "./../controllers/Expenditure/CheckExpenditureController";
const expenditureRoutes = Router();

expenditureRoutes.post('/create', ensureAuthenticate, new CreateExpenditureController().handle)
expenditureRoutes.get('/get-one/:expenditureId', ensureAuthenticate, new GetUniqueExpenditureController().handle)
expenditureRoutes.get('/get-all-by-wallet/:walletId', ensureAuthenticate, new GetAllExpenditureByWalletIdController().handle)
expenditureRoutes.get('/get-all/:userId', ensureAuthenticate, new GetAllExpendituresByIdController().handle)
expenditureRoutes.put('/update/:expenditureId', ensureAuthenticate, new UpdateExpenditureByIdController().handle)
expenditureRoutes.put('/check/:expenditureId', ensureAuthenticate, new CheckExpenditureController().handle)
expenditureRoutes.delete('/delete/:expenditureId', ensureAuthenticate, new DeleteExpenditureByIdController().handle)


export { expenditureRoutes }