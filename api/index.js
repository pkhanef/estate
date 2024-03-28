import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routers/user.route.js'
import authRouter from './routers/auth.route.js'
import listingRouter from './routers/listing.route.js'
import cookieParser from 'cookie-parser'
import path from 'path'

dotenv.config()

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log('Connect to MongoDB!')
    })
    .catch((err) => {
        console.log(err)
    })

const _dirname = path.resolve()

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/listing", listingRouter)

app.use(express.static(path.join(_dirname, '/client/dist')))

app.use('*', (req, res) => {
    res.sendFile(path.join(_dirname, "client", 'dist', 'index.html'))
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000!!!')
})