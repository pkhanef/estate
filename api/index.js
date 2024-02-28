import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routers/user.route.js'
import authRouter from './routers/auth.route.js'

dotenv.config()

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log('Connect to MongoDB!')
    })
    .catch((err) => {
        console.log(err)
    })

const app = express()
app.use(express.json())

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)

app.listen(3000, () => {
    console.log('Server is running on port 3000!!!')
})