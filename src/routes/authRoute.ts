import express from 'express'
import { authUser } from '../controllers/userController'
const router = express.Router()

router.post('/authUser', authUser)

export default router