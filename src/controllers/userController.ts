import { Request, Response, NextFunction } from "express"
import prisma from "../utils/prismaClient";
import { hashPassword }  from "../lib/hashPassword";
import { comparePassword } from "../lib/comparePassword";

export const addUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, password, email } = req.body;
  
  if(!name || !password || !email) {
    return res.status(400).send({msg: `Missing arguments name: ${name}, pass: ${password} or email: ${email}`})
  }

  const userExist = await prisma.user.findUnique({ where: { email: email } });

  if (userExist) {
    return res.status(409).json({ message: "User already exist" });
  }
  const hashedPassword = await hashPassword(password)
  await prisma.user.create({ data: { name, password: hashedPassword, email } });

  return res.status(200).json({ message: "User has been created" });
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.query.id as string | undefined;
  const email = req.query.email as string | undefined;

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

export const authUser = async (req: Request, res: Response, next: NextFunction) => {
  const {email, password} = req.body

  if(!email || !password) {
    return res.status(400).send({msg: "You need to pass email and password"})
  }

  const user = await prisma.user.findUnique({where: {email : email}});
  const authUser = await comparePassword(password, user.password)

  if(authUser) {
    const { password, ...userWithoutPass } = user;
    return res.status(200).send({...userWithoutPass})
  } else {
    return res.status(401).send({msg: "Authentication failed"})
  }
}