import { Request, Response, NextFunction } from "express"
import prisma from "../utils/prismaClient";


export const userAvatar = async (req: Request, res: Response, next: NextFunction) => {
  const { id, img } = req.body

  if(id.trim().length === 0 && img.trim().length === 0) {
    return res.status(400).send({msg: "You need to pass id and image src"})
  }

  await prisma.user.update({
    where:{id:id},
    data: {
      image: img
    }
  })

  return res.send({msg: "Image updated!"}).status(200)
}