const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')


const routes = require('./routes/index')
require('./config/mongoose')

const app = express()
//port setting
const PORT = process.env.PORT || 3000


//view engine settings(express-handlebars)
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set(`view engine`, 'hbs')
//express-session settings
app.use(session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
}))
//bodyparser settings
app.use(bodyParser.urlencoded({ extended: true }))
//methodOverride settings
app.use(methodOverride('_method'))

//router settings
app.use(routes)

app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`)
})