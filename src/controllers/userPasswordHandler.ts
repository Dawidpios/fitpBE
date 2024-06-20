import { Request, Response, NextFunction } from "express";
import prisma from "../utils/prismaClient";
import { hashPassword } from "../lib/hashPassword";

interface UserRequest extends Request {
  user?: any;
}

export const userPasswordHandler = async (req: UserRequest, res: Response, next: NextFunction) => {
  const { password, newPassword, confirmPassword, id } = req.body;
  const { user } = req

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
  
  if (!user) {
    return res.status(404).send({ message: "User not exists" });
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

