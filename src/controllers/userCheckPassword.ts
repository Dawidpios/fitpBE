import { Request, Response, NextFunction } from "express";
import prisma from "../utils/prismaClient";
import { comparePassword } from "../lib/comparePassword";

export const userCheckPassword = async (req: Request, res: Response, next: NextFunction) => {

  const { password, id } = req.body

  const userExist = await prisma.user.findUnique({ where: { id: id } })

  const passwordIsEqual = await comparePassword(password, userExist.password);

  if (!passwordIsEqual) {
    return res.status(401).send({ message: "Incorrect password" });
  }

  next()
  
};