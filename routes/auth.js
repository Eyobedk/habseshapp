const {Router} = require("express");
const {signup_Get,signup_Post,login_Get,login_Post} = require('../controllers/auth');
const {requireAuth} = require('../middleware/auth');
const router = Router();


router.get('/signup', signup_Get)
router.post('/signup', signup_Post)
router.get('/login', login_Get)
router.post('/login', login_Post)
router.get('/smoothies', requireAuth,(req, res)=>{res.render('smoothies')})

module.exports = router;