const { User, Profile, Post} = require('../models')

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

    static formProfile(req, res) {

    }

    static home(req, res)  {
        let id = req.params.id
        let result;

        User.findAll({
            include : [Profile, Post]
        })
        .then((data) => {
            result = data
            return Profile.findOne({
                where : {
                    UserId : id
                }
            })

            // res.send(data)
          
        })
        .then((dataProfile) => {
            res.send({result, dataProfile})
            // res.render('home', { result, dataProfile })

        })
        .catch((err) => {
            res.send(err)
        })
    }
}

module.exports = Controller