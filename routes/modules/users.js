const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../../models/user')

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    //檢查使用者是否已經存在
    User.findOne({ email }).then(user => {
        //已經註冊，退回註冊頁
        if (user) {
            console.log('User already exist')
            res.render('register', { name, email, password, confirmPassword })
        } else {
            //未註冊，資料寫入DB
            return User.create({ name, email, password })
                .then(() => res.redirect('/'))
                .catch(error => console.log(error))
        }
    }).catch(error => console.log(error))
})

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/users/login')
    })
})

module.exports = router