import express from 'express'
import { addUser, getUser, authUser } from '../controllers/userController'
const router = express.Router()

router.get('/getUser', getUser).get('/authUser', authUser).post('/addUser', addUser)

export default router