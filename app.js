require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000

mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection

db.on('error', () => {
    console.log('MongoDB error')
})

db.once('open', () => {
    console.log('MongoDB connection')
})


app.get('/', (req, res) => {
    res.send('Project init')
})

app.listen(port, () => {
    console.log(`app is running on http://localhost:${port}`)
})