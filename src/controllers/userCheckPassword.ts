import { Request, Response, NextFunction } from "express";
import prisma from "../utils/prismaClient";
import { comparePassword } from "../lib/comparePassword";


export const userCheckPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, id } = req.body;

    // Asynchronicznie wyszukaj użytkownika w bazie danych
    const userPromise = prisma.user.findUnique({ where: { id: id } });
    const userExist = await userPromise;

    // Jeśli użytkownik nie istnieje, zwróć błąd
    if (!userExist) {
      return res.status(404).send({ message: "User not found" });
    }

    // Asynchronicznie porównaj hasła
    const passwordIsEqualPromise = comparePassword(password, userExist.password);
    const passwordIsEqual = await passwordIsEqualPromise;

    // Jeśli hasła się nie zgadzają, zwróć błąd
    if (!passwordIsEqual) {
      return res.status(401).send({ message: "Incorrect password" });
    }

    // Jeśli wszystko jest poprawne, przejdź do następnego middleware
    next();
  } catch (error) {
    console.error("Error in userCheckPassword:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};