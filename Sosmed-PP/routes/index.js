const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();
const { isLoggin, isAdmin } = require('../middlewares/auth')

router.get('/register', UserController.formRegister)
router.post('/register', UserController.postRegister)
router.get('/login', UserController.formLogin)
router.post('/login', UserController.postLogin)

router.use(isLoggin)

router.get('/logout', UserController.goLogout)
router.get('/home', UserController.home)
router.get('/profile', UserController.editProfile)
router.post('/profile', UserController.postProfile)


module.exports = router;
