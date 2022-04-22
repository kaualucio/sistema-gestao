import { GetUserByIdController } from './../controllers/Users/GetUserByIdController/index';
import { Router } from "express";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const usersRoutes = Router();

usersRoutes.get('/get-by-id/:idUser', new GetUserByIdController().handle)


export { usersRoutes }