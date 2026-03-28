import dotenv from 'dotenv'
import express from 'express' 
import authRoutes from './routes/authRoutes.js'
import dBConnection from './utils/db.js'

dotenv.config()
dBConnection()

const PORT = process.env.PORT || 3000
const app = express();
app.use(express.json());

app.use('/auth', authRoutes)

app.get('/', (req, res) => {
    res.send('Home')
})

app.listen(PORT, ()=> {
    console.log(`Server runnig on port ${PORT}`)
})

