const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();

router.get('/register', Controller.formRegister);
router.post('/register', Controller.postRegister);
router.get('/login', Controller.formLogin);
router.post('/login', Controller.formLogin);
// router.get('/profile/:id'. Controller.formProfile);
router.get('/home/:id', Controller.home);


module.exports = router;
