const express = require('express')
const router = express.Router()
const {getPersonalInfo} = require('../controller/protectedController')
const {tokenValidation} = require('../middlewares/authorizationCheck')

//tokenValidation需要在getProtectedResource前, 因为我们要先check是不是validuser才给数据
router.get('/user/me', tokenValidation, getPersonalInfo)

module.exports = router 