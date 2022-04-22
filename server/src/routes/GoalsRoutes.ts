import { Router } from "express";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreateGoalsController } from './../controllers/Goals/CreateGoalsController/index';
import { GetGoalsByIdController } from "../controllers/Goals/GetGoalsByIdController";
import { UpdateGoalsByIdController } from './../controllers/Goals/UpdateGoalsByIdController/index';
import { DeleteGoalsByIdController } from './../controllers/Goals/DeleteGoalsByIdController/index';

const goalsRoutes = Router();

goalsRoutes.post('/create', ensureAuthenticate, new CreateGoalsController().handle)
goalsRoutes.get('/get/:goalsId', ensureAuthenticate, new GetGoalsByIdController().handle)
goalsRoutes.put('/update/:goalsId', ensureAuthenticate, new UpdateGoalsByIdController().handle)
goalsRoutes.delete('/delete/:goalsId', ensureAuthenticate, new DeleteGoalsByIdController().handle)


export { goalsRoutes }