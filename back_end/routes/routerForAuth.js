const router = require('express').Router()
// controllers 来操控我们的db里面的数据, controller就是把本来我们应该写在routes的syntax给封装到了新的js文件= 模块化
//module.exports只能用require, export default可以用import的解构赋值
const {register, login, forgotPassword, resetPassword} = require('../controller/authController')

router.post('/register', register)

router.post('/login', login)

router.post('/forgotPassword', forgotPassword)

router.put('/resetPassword/:rstToken', resetPassword)

module.exports = router