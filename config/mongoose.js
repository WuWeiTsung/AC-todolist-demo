const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection

db.on('error', () => {
    console.log('MongoDB error')
})
db.once('open', () => {
    console.log('MongoDB connection')
})

module.exports = db