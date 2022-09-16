const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();
const { isLoggin, isAdmin } = require('../middlewares/auth');
const multer = require('multer')


const fileStorageEngine = multer.diskStorage({
    destination : (req, file, cb) => {
      cb(null, "../images");
    }, 
      filename: (req, file, cb) => {
      cb(null, Date.now() + "--" + file.originalname)
    }
})
  
const upload = multer({ storage : fileStorageEngine})
  
// app.post('/singe', upload.single('image'), (req, res) => {
//     console.log(req.file);  
//     res.send("single file upload success")
// })


router.get('/register', UserController.formRegister)
router.post('/register', UserController.postRegister)
router.get('/login', UserController.formLogin)
router.post('/login', UserController.postLogin)

router.use(isLoggin)

router.get('/logout', UserController.goLogout)
router.get('/home', UserController.home)
router.post('/home', UserController.handleTweet)
router.get('/profile', UserController.editProfile)
router.post('/profile', UserController.postProfile)
// router.post('/profile',  upload.single("photo"), UserController.postProfile)
router.get('/profile/detail', UserController.detailProfile)
router.get('/listUser', UserController.listUser)
router.get('/listUser/:id/delete', UserController.deleteUser)

module.exports = router;
