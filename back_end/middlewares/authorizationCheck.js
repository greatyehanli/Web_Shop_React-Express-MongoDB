const JWT = require('jsonwebtoken')
const User = require('../models/user')
const errorPrototype = require('../utils/errorHandler')

module.exports.tokenValidation = async(req, res, next) =>{

    let accessToken = undefined
    //如果请求头里面有authorization不为空, 并且是Bearer(持票者)
    if(req.header('Authorization') && req.header('Authorization').startsWith('Bearer')){
        // Bearer "asduyguhoihdid", 我们要index1的token
        //这种写法和header("Authorization")一样
        accessToken = req.headers.authorization.split(" ")[1]
    }

    //如果token是undefined
    if(!accessToken){
        return next(new errorPrototype("Not authorized to access the target path", 401))
    }
    // console.log('Im in the tokenValidation function', req.header('Authorization'));

    // 上面查下是不是token在请求头的authorization里面
    //下面就去真正的验证token里面的id是不是在数据库里面可以找得到
    try {
        // console.log('verifying');

        //get a decoded token that has visible content using 私钥
        const decryption = JWT.verify(accessToken, process.env.JWT_PRIVATE_KEY, function(err, decode){
            if(err){
                return next(new errorPrototype("This id doesn't have a corresponding user that matches it", 401))
            }
            return decode
        })
        // console.log('verifying');

        //search through user collection to check if 有这个id的user是不是真的存在
        const returnedUser = await User.findById(decryption.id)

        if(!returnedUser){
            return next(new errorPrototype("This id doesn't have a corresponding user that matches it", 401))
            // console.log("????", returnedUser)

        }

        req.user = returnedUser
        // console.log('verified, ', returnedUser);

        next()
    } catch (error) {
        return new errorPrototype("Not authorized to access the target path")
    }
}