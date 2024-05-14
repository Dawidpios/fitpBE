import express from 'express'
import { addUser, getUser } from '../controllers/userController'
const router = express.Router()

router.get('/getUser', getUser).post('/addUser', addUser)

export default router