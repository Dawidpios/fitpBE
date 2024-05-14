import express from 'express'
import { addUser, getUser } from '../controllers/userController'
const router = express.Router()

router.post('/addUser', addUser)

router.get('/getUser', getUser)

export default router