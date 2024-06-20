import { Request, Response, NextFunction } from "express";
import prisma from "../utils/prismaClient";
import { comparePassword } from "../lib/comparePassword";

interface UserRequest extends Request {
  user?: any;
}

export const userCheckPassword = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { password, id } = req.body;

    const userPromise = prisma.user.findUnique({ where: { id: id } });
    const userExist = await userPromise;

    if (!userExist) {
      return res.status(404).send({ message: "User not found" });
    }

    const passwordIsEqualPromise = comparePassword(password, userExist.password);
    const passwordIsEqual = await passwordIsEqualPromise;

    if (!passwordIsEqual) {
      return res.status(401).send({ message: "Incorrect password" });
    }
    req.user = userExist
    next();

  } catch (error) {
    console.error("Error in userCheckPassword:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};