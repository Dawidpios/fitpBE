import express from "express";
import { dietAssistant } from '../controllers/dietAssistant'
import { getCalculatorResult } from '../controllers/calculator'
const router = express.Router();


router
  .post('/dietAssistant', dietAssistant)
  .post("/getCalculatorResult", getCalculatorResult)

export default router;
