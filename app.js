const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

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

app.use(bodyParser.urlencoded({ extended: true }))

//router settings
app.get('/', (req, res) => {
    Todo.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(todos => res.render('index', { todos }))
        .catch(error => console.error(error))
})

app.get('/todos/new', (req, res) => {
    return res.render('new')
})

app.post('/todos', (req, res) => {
    const name = req.body.name
    return Todo.create({ name: name })
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
})

app.get('/todos/:id', (req, res) => {
    const id = req.params.id
    return Todo.findById(id)
        .lean()
        .then(todo => res.render('detail', { todo }))
        .catch(error => console.log(error))
})

app.get('/todos/:id/edit', (req, res) => {
    const id = req.params.id
    return Todo.findById(id)
        .lean()
        .then(todo => res.render('edit', { todo }))
        .catch(error => console.log(error))
})

app.post('/todos/:id/edit', (req, res) => {
    const id = req.params.id
    const { name, isDone } = req.body

    return Todo.findById(id)
        .then(todo => {
            todo.name = name
            todo.isDone = isDone === 'on'
            return todo.save()
        })
        .then(() => res.redirect(`/todos/${id}`))
        .catch(errer => console.log(error))
})

app.post('/todos/:id/delete', (req, res) => {
    const id = req.params.id
    return Todo.findById(id)
        .then(todo => todo.remove())
        .then(() => res.redirect('/'))
        .catch(errer => console.log(error))
})


app.listen(port, () => {
    console.log(`app is running on http://localhost:${port}`)
})