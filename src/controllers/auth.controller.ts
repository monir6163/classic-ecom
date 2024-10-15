import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { prisma } from "..";
import { BadRequest } from "../exceptions/badRequest";
import { ErrorCodes } from "../exceptions/root";
import { signupSchema } from "../schema/user";
import { hashPassword } from "./../../libs/hashPassword";

export const signup = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    signupSchema.parse(req.body);
    const { name, email, password } = req.body;
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      next(
        new BadRequest("User already exists", ErrorCodes.USER_ALREADY_EXISTS)
      );
    }
    const hashPass = await hashPassword(password);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashPass,
      },
    });
    res.status(201).json({ status: "success", message: "User created" });
  }
);
