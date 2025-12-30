import { createUserSchema, listUsersSchema } from "./../schema/user"
import express from "express"

import validateResource from "../middleware/validateResource"
import { createUserHandler, listUsersHandler } from "../controller/user.controller"
import { getCartByUserIdHandler } from "../controller/cart.controller"
import auth from "../middleware/auth"
import admin from "../middleware/admin"

const router = express.Router()

//Get a Cart
router.get("/:userId/cart", getCartByUserIdHandler)

// List users (admin only)
router.get("/", auth as any, admin as any, validateResource(listUsersSchema), listUsersHandler)

router.post("/", validateResource(createUserSchema), createUserHandler)
export default router
