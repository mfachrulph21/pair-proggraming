const { User } = require('../models')

class Controller {

    static formLogin(req, res) {
        res.render('login')
    }

    static formRegister(req, res) {
        res.render('register')
    }

    static postRegister(req, res) {
        const { username, email, password, role } = req.body
        User.create({ username, email, password, role })
        .then((data) => {
            res.redirect('/login')
        })
        .catch((err) => {
            res.send(err)
        })

    } 
}

module.exports = Controller