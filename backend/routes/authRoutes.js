import express from 'express'
import register from '../controllers/authControllers.js'

const authRoutes = express.Router()

authRoutes.post('/register', register)

export default authRoutes