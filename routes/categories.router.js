import express from "express";
import CategoryService from "../services/category.service.js";
import { validatorHandler } from "../middlewares/validator.handler.js";
import {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} from "../schemas/category.schema.js";

const router = express.Router();
const service = new CategoryService();

router.get("/categories/:categoryId/products/:productId", (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});

router.get("/", async (req, res) => {
  const categories = await service.getAll();
  res.json(categories);
});

router.get(
  "/:categoryId",
  validatorHandler(getCategorySchema, "params"),
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const category = await service.findOne(categoryId);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/",
  validatorHandler(createCategorySchema, "body"),
  async (req, res) => {
    const body = req.body;

    const category = await service.create(body);
    res.status(201).json({
      message: "Created",
      data: category,
    });
  },
);

router.patch(
  "/:categoryId",
  validatorHandler(getCategorySchema, "params"),
  validatorHandler(updateCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const body = req.body;

      const category = await service.update(categoryId, body);
      res.json({
        message: "Updated",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/:categoryId",
  validatorHandler(getCategorySchema, "params"),
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      await service.delete(categoryId);
      res.status(201).json({ categoryId });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
