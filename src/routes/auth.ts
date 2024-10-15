import { Router } from "express";
import { errorHandler } from "../errorHandler";
import { signup } from "./../controllers/auth.controller";

const authRoutes: Router = Router();

authRoutes.post("/signup", errorHandler(signup));

export default authRoutes;
