import express from 'express'
import { addUser, getUser, authUser } from '../controllers/userController'
import { userStats } from '../controllers/userStats'
const router = express.Router()

router.get('/getUser', getUser).post('/authUser', authUser).post('/addUser', addUser).put('/updateStats', userStats)

export default router