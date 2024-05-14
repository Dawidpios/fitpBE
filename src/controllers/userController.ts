import { Request, Response, NextFunction } from "express"
import prisma from "../utils/prismaClient.js";
import { hashPassword }  from "../lib/hashPassword.js";

export const addUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, password, email } = req.body;
  const hashedPassword = await hashPassword(password)
  const userExist = await prisma.user.findUnique({ where: { email: email } });

  if (userExist) {
    return res.status(409).json({ message: "User already exist" });
  }

  await prisma.user.create({ data: { name, password: hashedPassword, email } });

  return res.status(200).json({ message: "User has been created" });
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id, email } = req.body;

  if(id) {
    const userExist = await prisma.user.findUnique({where: {id : id}});
    if (userExist) {
      const { password, ...userWithoutPass } = userExist;
      return res.status(200).send({...userWithoutPass});
    }

    return res.status(404).send({ msg: "User not found" });
  }
  if(email) {
    const userExist = await prisma.user.findUnique({where: {email : email}});
    if (userExist) {
      const { password, ...userWithoutPass } = userExist;
      return res.status(200).send({...userWithoutPass});
    }

    return res.status(404).send({ msg: "User not found" });
  }

  return res.status(400).send({ msg: "You should use user id or email" });

};