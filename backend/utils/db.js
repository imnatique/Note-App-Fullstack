import mongoose from 'mongoose'

const dBConnection = async()=>{
    try {
        mongoose.connect(process.env.DB_URL)
        console.log('MONGODB is connected')

    } catch (error) {
        console.log('error in mongodb connection')
    }
}

export default dBConnection