import { Request, Response, NextFunction } from "express";
import prisma from "../utils/prismaClient";
import { comparePassword } from "../lib/comparePassword";
import { hashPassword } from "../lib/hashPassword";

export const userPasswordHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { password, newPassword, confirmPassword, id } = req.body;

  if (!password || !newPassword || !confirmPassword || !id) {
    return res.status(400)
      .send({
        message:
          "Missing data, You should send user id, password, new password and confirmed password",
      });
  }

  if (newPassword !== confirmPassword) {
    return res.status(401).send({ message: "New passwords are not equal!" });
  }

  if(newPassword.trim().length < 8) {
    return res.status(401).send({message: "New password must be at least 8 characters long"})
  }
  
  const userExist = await prisma.user.findUnique({ where: { id: id } });

  if (!userExist) {
    return res.status(404).send({ message: "User not exists" });
  }

  const passwordIsEqual = await comparePassword(password, userExist.password);

  if (!passwordIsEqual) {
    return res.status(401).send({ message: "Incorrect password" });
  }

  const hashedPassword = await hashPassword(newPassword);

  const userUpdated = await prisma.user.update({
    where: { id: id },
    data: { password: hashedPassword },
  });

  if(!userUpdated) {
    return res.status(400).send({ message: "User updated failed!" });
  }
   
  return res.send({ message: "User password updated!" }).status(200);
};

