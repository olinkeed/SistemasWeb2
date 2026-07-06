import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { EventoController } from "../controllers/EventoController";
import { isAuthenticated } from "../../../../shared/http/middlewares/isAuthenticated";

const eventosRouter = Router();
const eventosController = new EventoController();

eventosRouter.use(isAuthenticated); // All routes after this will require authentication

eventosRouter.get(
  "/",
  eventosController.index
);

eventosRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  eventosController.show
);

eventosRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      local: Joi.string().required(),
      data_evento: Joi.date().required(),
      distancia_km: Joi.number().required(),
      categoria: Joi.string().required(),
    },
  }),
  eventosController.create
);

eventosRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      nome: Joi.string().required(),
      local: Joi.string().required(),
      data_evento: Joi.date().required(),
      distancia_km: Joi.number().required(),
      categoria: Joi.string().required(),
    },
  }),
  eventosController.update
);

eventosRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  eventosController.delete
);

export default eventosRouter;
