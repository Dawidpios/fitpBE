import { Request, Response, NextFunction } from "express"
import prisma from "../utils/prismaClient";

export const userStats = async (req: Request, res: Response, next: NextFunction) => {
  const {formData, id} = req.body

  if(Object.keys(formData).length === 0 || id.trim().length === 0) {
    return res.status(400).send({msg: "Missing arguments"})
  }

  const user = await prisma.user.findUnique({
    where: { id: id },
    select: { stats: true },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const currentStats = typeof user.stats === 'object' && user.stats !== null ? user.stats : {};

  Object.keys(formData).forEach(key => {
    if (formData[key] === '') {
      delete formData[key];
    } else {
      formData[key] = {value: formData[key], updatedAt: new Date().toLocaleString()}
    }
  });

  const newStats = {
    ...currentStats,
    ...formData
  };

  await prisma.user.update({
    where: { id: id },
    data: {
      stats: {
         ...newStats,
      },
    },
  });

  return res.status(200).send(user)
}