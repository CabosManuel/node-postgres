import express from "express";
import { validatorHandler } from "../middlewares/validator.handler.js";
import { UserService } from "../services/users.service.js";
import {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} from "../schemas/user.schema.js";

const router = express.Router();
const service = new UserService();

router.get("/users", (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send("No parameters");
  }
});

router.get("/", async (req, res) => {
  const users = await service.getAll();
  res.json(users);
});

router.get(
  "/:userId",
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await service.findOne(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/",
  validatorHandler(createUserSchema, "body"),
  async (req, res) => {
    const body = req.body;

    const user = await service.create(body);
    res.status(201).json({
      message: "Created",
      data: user,
    });
  },
);

router.patch(
  "/:userId",
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const body = req.body;

      const user = await service.update(userId, body);
      res.json({
        message: "Updated",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/:userId",
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      await service.delete(userId);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

export default router;
