const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


const routes = require('./routes/index')
require('./config/mongoose')

const app = express()
//port setting
const port = 3000


//view engine settings(express-handlebars)
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set(`view engine`, 'hbs')
//bodyparser settings
app.use(bodyParser.urlencoded({ extended: true }))
//methodOverride settings
app.use(methodOverride('_method'))

//router settings
app.use(routes)

app.listen(port, () => {
    console.log(`app is running on http://localhost:${port}`)
})