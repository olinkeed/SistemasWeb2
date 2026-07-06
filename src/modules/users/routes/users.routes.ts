import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { UserController } from "../controllers/UserController";
import { isAuthenticated } from "../../../shared/http/middlewares/isAuthenticated";

const usersRouter = Router();
const usersController = new UserController();

usersRouter.get("/", isAuthenticated, usersController.index);

usersRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticated,
  usersController.show
);

usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create
);

usersRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
    },
  }),
  isAuthenticated,
  usersController.update
);

usersRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticated,
  usersController.delete
);

export default usersRouter;
