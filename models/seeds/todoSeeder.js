require('dotenv').config()
const mongoose = require('mongoose')
const Todo = require('../todo.js')

mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection

db.on('error', () => {
    console.log('MongoDB error')
})

db.once('open', () => {
    console.log('MongoDB connection')
    for (let i = 0; i < 10; i++) {
        Todo.create({ name: `name-${i}` })
    }
    console.log('Seeds created.')
})