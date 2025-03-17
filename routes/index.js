import express from 'express';
import productRouter from './products.router.js';
import usersRouter from './users.router.js';
import categoriesRouter from './categories.router.js';

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);

  router.use("/products", productRouter);
  router.use("/users", usersRouter);
  router.use("/categories", categoriesRouter);
}

export default routerApi;
