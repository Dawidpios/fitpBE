import { Request, Response, NextFunction } from "express";

export const dietAssistant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    gender,
    age,
    height,
    weight,
    activity,
    intensity,
    goal,
    data: dietPreferences,
  } = req.body;
  const promise = await new Promise(resolve => setTimeout(() => resolve("OK"), 2000))
  return res.status(404).send({message: "The diet assistant is not available yet, sorry."})
};


// `You are a dietitian, creating a dietary plan that best suits a person with the specified parameters : gender: ${gender} age: ${age}, height: ${height}, weight: ${weight}. Person activity is ${activity.toLowerCase()}, activity intense is ${intensity.toLowerCase()}. This person want ${goal.toLowerCase()}. Person diet preferences are ${dietPreferences.map((diet: string) => diet)} The plan should cover 7 days a week and include specific advice and a breakdown of macronutrients`