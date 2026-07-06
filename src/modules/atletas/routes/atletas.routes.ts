import { Router } from "express";
import AtletaController from "../controllers/AtletaController";
import { celebrate, Joi, Segments } from "celebrate";

const atletasRouter = Router();
const atletaController = new AtletaController();


atletasRouter.get("/", async (req, res, next) => {
  try {
    await atletaController.index(req, res, next);
  } catch (err) {
    next(err);
  }
});

atletasRouter.get(
  "/:id_atleta",
  celebrate({
    [Segments.PARAMS]: { id_atleta: Joi.string().uuid().required() },
  }),
  async (req, res, next) => {
    try {
      await atletaController.show(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

atletasRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      data_nascimento: Joi.string().isoDate().required(),
      sexo: Joi.string().valid("M", "F").length(1).required(),
      nacionalidade: Joi.string().required(),
      peso: Joi.number().precision(2).min(0).required(),
      altura: Joi.number().precision(2).min(0).required(),
      evento_id: Joi.string().uuid().optional(),
    },
  }),
  async (req, res, next) => {
    try {
      await atletaController.create(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

atletasRouter.put(
  "/:id_atleta",
  celebrate({
    [Segments.PARAMS]: { id_atleta: Joi.string().uuid().required() },
    [Segments.BODY]: {
      nome: Joi.string().required(),
      data_nascimento: Joi.string().isoDate().required(),
      sexo: Joi.string().valid("M", "F").length(1).required(),
      nacionalidade: Joi.string().required(),
      peso: Joi.number().precision(2).min(0).required(),
      altura: Joi.number().precision(2).min(0).required(),
      evento_id: Joi.string().uuid().optional(),
    },
  }),
  async (req, res, next) => {
    try {
      await atletaController.update(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

atletasRouter.delete(
  "/:id_atleta",
  celebrate({
    [Segments.PARAMS]: { id_atleta: Joi.string().uuid().required() },
  }),
  async (req, res, next) => {
    try {
      await atletaController.delete(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

export default atletasRouter;
