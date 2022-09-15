const { User, Profile, Post} = require('../models')
const bcrypt = require('bcryptjs');
// const {Translate} = require('@google-cloud/translate').v2;
// const translate = new Translate({projectId});


class Controller {

    static formRegister(req, res) {
        res.render('register')
    }

    static postRegister(req, res) {
        const { username, email, password, role } = req.body
        let allData;

        User.create({ username, email, password, role })
        .then((resultCreate) => {
            return User.findOne({
                where : {
                    username : username
                }
            })
        })
        .then((resultFindOne) => {
            return Profile.create({UserId : resultFindOne.id})
        })
        .then(() => {
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

    static home(req, res) {
        let result;

        User.findAll({
            include : [Profile, Post]
        })
        .then((data) => {
            result = data
            return Profile.findOne({
                where : {
                    id : req.session.userId
                }
            })
        })
        .then((dataProfile) => {
            // res.send({result, dataProfile})
            res.render('home', { result, dataProfile })
        })
        .catch((err) => {
            res.send(err)
        })
    }
    
    static handleTweet(req,res) {
        // console.log(req.body, 'ini di handle tweet')

        const { category, content } = req.body
        Post.create({ category, content, UserId : req.session.userId})
        .then(() => {
            res.redirect('/home')
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

    static editProfile(req, res) {
        Profile.findOne({
            include : User,
            where : {
                UserId : req.session.userId
            }
        })
        .then((data) => {
            // console.log(data)
            // res.send(data)
            res.render('profile', { data })
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static postProfile(req, res) {
        console.log(req.session);
        console.log(req.body)
        let { name, biodata, birthDate, gender, email, phone, photo } = req.body
        Profile.update({name, biodata, birthDate, gender, email, phone, photo}, {
            where : {
                UserId : req.session.userId
            }
        })
        .then((data) => {
            res.redirect('/home')
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static detailProfile(req, res) {
        User.findOne({
            include: [Profile, Post],
            where : {
                id : req.session.userId
            }
        })
        .then((result) => {
            // res.send(result)
            res.render('profileDetail', { result } )    
        })
        .catch((err) => {
            res.send(err)
        })   
    }

    static listUser(req, res) {}


}

module.exports = Controller