import express from "express";
import { dietAssistant } from '../controllers/dietAssistant'
const router = express.Router();


router.post('/dietAssistent', dietAssistant)

export default router;
