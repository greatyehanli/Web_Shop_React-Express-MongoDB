// controller的主要作用其实就是代替routers里面的回调函数, 这样方便代码管理和维护更新
// 回调里面能用的我们在这里都能用, server/router.js里面有的不用require, 因为最后都会一层一层合并到server.js.
//唯一一点不好的就是没有method关键词提示了......
const User = require('../models/user')
const errorPrototype = require('../utils/errorHandler')
const sendEmail = require('../utils/emailer')
const crypto = require('crypto')

module.exports.register = async (req, res, next) =>{
    const {email, username, password} = new User(req.body)

    try {
        //create的时候
        const newUser = await User.create({
            email,
            username,
            password
        })
        // 在HTTP协议中，201 Created 是一个代表成功的应答状态码，表示请求已经被成功处理，并且创建了新的资源
        issueAccessToken(newUser, 201, res)
    } catch (error) {
        //直接return, 并且执行下个中间件
        return next(error)
        // res.status(500).json({
        //     status: 'failure',
        //     newUser
        // })
    }
}

module.exports.login = async (req, res, next) =>{
    const {email, password} = req.body
    //check if password exists, 不是undefined, Nan, null, 0 , false, "", 剩下的都是true
    if(!email || !password){
        // 我们自定义的json response
        // res.status(400).json({
        //     status: 'failure',
        //     err: "Email or Password cannot be empty"
        // }
        return next(new errorPrototype('Email or Password cannot be empty', 400))
        // )
    }

    try {
        //email:email的缩写
        //我们之前写的是password里面的select是false, 现在需要password也被返回的时候就要设置select为+password
        //findOne() => If no document satisfies the query, the method returns null. 但是不是reject, 还是resolved
        //如果直接报错不返回才调到catch block
        const returnedUser = await User.findOne({email}).select("+password")
        
        if(!returnedUser){
            // res.status(404).json({
            //     status: "failure",
            //     err: "Email or password is not found"
            // })
            //401 unauthorized
            return next(new errorPrototype('Email or password is not found', 401))
        }

        // 因为user里面的自定义model中间件运行的比这里的慢, 我们不在这里await的话, 那边还在等结果就会给我们一个pending的 promise
        //然后下面那个isValid就永远为true
        //就是这个await bcrypt.compare(passwordFromUserInput, this.password), 对比花的时间比较长
        //我们需要 isValid = await (await bcrypt.compare(passwordFromUserInput, this.password))
        //不然的话就会变成
        /*
            if(await bcrypt.compare(passwordFromUserInput, this.password) = true, 
            因为是pending的promise对象, 默认true
        */ 

        const isValid = await returnedUser.validateCredentials(password)
        
        if(!isValid){
            // res.status(404).json({
            //     status: "failure",
            //     err: "Password invalid"
            // })
            return next(new errorPrototype('Password invalid', 401))

        }

        issueAccessToken(returnedUser, 200, res)

        // res.status(200).json({
        //     status: "success",
        //     token: 'this is a fake token'
        // })

    } catch (error) {
        return next(error)
        // res.status(500).json({
        //     status: "failure",
        //     err: error.message
        // })
    }
}

module.exports.forgotPassword = async (req, res, next) =>{
    const {email} = req.body

    //收到用户的email了, 先验证下看看db里面存不存在
    try {
         const returnedUser = await User.findOne({email})

         if(!returnedUser){
             return next(new errorPrototype("The email was not registered", 404))
         }
         //token在这里就被加入到这个user model的实例对象里面了, 因为这个function return了一个属性
         const resetToken = returnedUser.generateResetToken()

         //存下这个新改变的user
         await returnedUser.save()

         //router.put('/resetPassword/:rstToken', resetPassword) router里面规定的
         const resetPageUrl = `http://localhost:3000/resetPassword/${resetToken}`

         const remindingInfo = `
            <h3>Please click the link below to reset password</h3>
            <a href="${resetPageUrl} clicktracking=off"> Password Reset </a>
            <a>${resetPageUrl} </a>
         `
         
         try {
             
             await sendEmail({
                 to: returnedUser.email,
                 subject: "Reset Password",
                 html: remindingInfo
             })

             res.status(200).json({
                 sucess: true,
                 data: "sent sucessfully"
             })

         } catch (error) {
            user.resetToken = undefined
            user.resetTokenExpiringTime = undefined
            await returnedUser.save()
            
            return next(new errorPrototype("email cannot be sent", 500))
         }

    } catch (error) {
        next(error)
    }
}

module.exports.resetPassword = async (req, res, next) =>{
    const hashUnhashedToken = crypto.createHash("sha256").update(req.params.rstToken).digest('hex')

    try {
        const returnedUser = await User.findOne({
            ResetToken: hashUnhashedToken,
            // 比一下看看token到底有没有过期, 就是是不是比现在的时间大, 大的话就没过期. $gt返回一个bool
            resetTokenExpiringTime: {$gt: Date.now()}
        })
        console.log(hashUnhashedToken);
        if(!returnedUser){
            console.log("in the wrong route?");
            return next(new errorPrototype("The token is either invalid or expired"), 400)
        }

        console.log(returnedUser, req.params.rstToken);
        //params里面是邮件给我们的的token, body是前端form用户填写后返回的
        returnedUser.password = req.body.password
        //清除一下这两个属性, 因为当改完密码他们就没用了
        returnedUser.ResetToken = undefined
        returnedUser.resetTokenExpiringTime = undefined

        //然后user model里面的中间件就会重新hash一下
        await returnedUser.save()
        // console.log("in the wrong route?");

        res.status(201).json({
            success: true,
            data: "Password has been successfuly reset. "
        })
    } catch (error) {
        // console.log("in the wrong route?");
        next(error)
    }
}

//define some customized functions

const issueAccessToken = (User, status, res)=>{
    //成功, 然后把JWT也放进去, 最后parse成json发送
    //因为时间是10分钟过期, 每次的token都有不一样的值
    const accessToken = User.generateAccessToken()
    //发送token给browser
    return res.status(status).json({
        success: true,
        accessToken
    })
}