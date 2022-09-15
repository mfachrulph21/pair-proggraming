const { User } = require('../models')
const bcrypt = require('bcryptjs');

class Controller {
    static home(req, res) {
        console.log(req.session);
        res.render('home')
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

    static formLogin(req, res) {
        const { error } = req.query

        res.render('login', { error })
    }
    
    static postLogin(req, res) {
        const { username, password } = req.body

        User.findOne({ where: {username} })
        .then((data) => {
            if(data) {
                const validPw = bcrypt.compareSync(password, data.password)
                
                if(validPw) {
                    req.session.userId = data.id //set session di controller login
                    req.session.role = data.role

                    return res.redirect('/home')
                } else {
                    const errors = 'Invalid username/password'
                    return res.redirect(`/login?error=${errors}`)
                }
            } else {
                const errors = 'Invalid username/password'
                return res.redirect(`/login?error=${errors}`)
            }
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static goLogout(req, res) {
        req.session.destroy((err) => {
            if(err) res.send(err)
            else {
                res.redirect('/login')
            }
        })
    }
}

module.exports = Controller