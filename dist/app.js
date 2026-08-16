//import 'reflect-metadata'
import express from "express";
import { clientRouter } from "./client/client.routes.js";
import { orm, syncSchema } from './shared/db/orm.js';
import { RequestContext } from '@mikro-orm/core';
import { sportRouter } from "./sport/sport.routes.js";
import { priceRouter } from "./price/price.routes.js";
import { courseRouter } from "./course/course.routes.js";
import { inscriptionRouter } from "./inscription/inscription.routes.js";
const app = express();
app.use(express.json()); //Middleware
//luego de los middleware base
app.use((req, res, next) => {
    RequestContext.create(orm.em, next); //em = entity manager
});
// y antes de las rutas y meddlewares de negocio
app.use('/api/sports', sportRouter);
app.use('/api/clients', clientRouter);
app.use('/api/prices', priceRouter);
app.use('/api/courses', courseRouter);
app.use('/api/inscriptions', inscriptionRouter);
//Por si ingresa mal a la url (notar que no hay ninguna ruta)
app.use((_, res) => {
    return res.status(404).send({ message: "Resource not found" });
});
console.log('Sincronizando schema...');
await syncSchema(); //never in production
console.log('Schema sincronizado');
app.listen(3000, () => { console.log("Server is runing on http://localhost:3000/"); });
//# sourceMappingURL=app.js.map