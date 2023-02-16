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
    const errors = []
    if (!name || !email || !password || !confirmPassword) {
        errors.push({ message: '所有欄位都是必填！' })
    }
    if (password !== confirmPassword) {
        errors.push({ message: '密碼和確認密碼不符！' })
    }
    if (errors.length > 0) {
        return res.render('register', { errors, name, email, password, confirmPassword })
    }

    //檢查使用者是否已經存在
    User.findOne({ email }).then(user => {
        //已經註冊，退回註冊頁
        if (user) {
            errors.push({ message: '這個 Email 已被註冊！' })
            res.render('register', { errors, name, email, password, confirmPassword })
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
        req.flash('success_msg', '您已成功登出。')
        res.redirect('/users/login')
    })
})

module.exports = router