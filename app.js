const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
//port setting
const app = express()
const port = 3000

//mongoDB settings
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

//view engine settings(express-handlebars)
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set(`view engine`, 'hbs')

//router settings
app.get('/', (req, res) => {
    Todo.find()
        .lean()
        .then(todos => res.render('index', { todos }))
        .catch(error => console.error(error))
})

app.listen(port, () => {
    console.log(`app is running on http://localhost:${port}`)
})