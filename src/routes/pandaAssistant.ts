import express from "express";
import { dietAssistant } from '../controllers/dietAssistant'
const router = express.Router();


router.post('/dietAssistant', dietAssistant)

export default router;
