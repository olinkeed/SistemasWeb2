import { Router } from "express";

import atletasRouter from "@modules/atletas/routes/atletas.routes";
import usersRouter from "@modules/users/routes/users.routes";
import sessionsRouter from "@modules/sessions/routes/sessions.routes";
import eventosRouter from "@modules/eventos/eventos/routes/eventos.routes";

const routes = Router();

routes.use("/atletas", atletasRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/eventos", eventosRouter);

routes.get("/", (request, response) => {
  return response.json({ message: "API de Atletas - Online!" });
});

export default routes;