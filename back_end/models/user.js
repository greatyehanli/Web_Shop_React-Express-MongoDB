const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email cannot be empty'],
        // email has to be unique in the DB
        unique: true,
        // mongoose feature to check if the the incoming email attribute in user collection is in valid email format
        // takes in a regular expression for email validation, display a msg on error
        match:[/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Email is not valid"]
    },

    username: {
        type: String,
        // required, message on error. => grammar sugar in mongoose
        required: [true, 'Username cannot be empty']
    },

    password: {
        type: String,
        required: [true, 'Password cannot be empty'],
        minlength: 8,
        // 在我们查询user的时候, 是不是把password这个attribute也当做结果的一部分返回
        select: false
    },

    // token为String, expire的值为一个Date形式的值
    ResetToken: String,
    resetTokenExpiringTime: Date
})

//所有和userSchema相关的预操作行为都会触发这个pre中间件, 用model触发也是schema相关的, 都联系着
// pre/post middleware. 在userSchema被进行某些操作前后执行, 在这里是save.
//这里如果是箭头函数的话不行, this就指向了这个userSchema, 但是调用中间件的是我们新创建的user呀, product之类的, 还是谁调用this是谁保险
//这里的是不是async函数都可以, 不一定非得强制async, 只是我们在这需要async所有使用的
userSchema.pre('save', async function(next){
    // 如果要存的password属性相对于之前没有改变, 那么就不会rehash, else hash一下
    //在改密码的时候用, 改前是个从db里面拿出来的hash, 我们输入新密码了, 这个函数对比下发现这个密码变了, 然后下面从新sign和hash新密码
    if(!this.isModified('password')){
        //没有改密码, 下一位中间件走起
        return next()
    }
    // 10 is the number of rounds to use
    const salt = await bcrypt.genSalt(10)
    //这个password是authController里面的回调函数中从req.body里面拿出来要存数据库的, 在创建新的data的时候, save前会执行这个中间件
    //把本来的password在save前被中间件截下来改成加盐的hash, 然后下一个中间件, 直到把save前的相关中间件跑完就正式save
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

//下面不是schema中间件, 是自定义的model使用的methods, 这里叫validateCredentials, 这里也必须用function, 因为调用它的this不是userSchema是model
userSchema.methods.validateCredentials = async function(passwordFromUserInput){
    // 这里不用设置salt的rounds, 他们搞数学的都提前给我们搞定了
    return await bcrypt.compare(passwordFromUserInput, this.password)
}

userSchema.methods.generateAccessToken = function(){
    //用server的一个35位的私钥根据用户的_id来签一个JWT作为access token, 10min过期
    //payload, private key, 
    return jwt.sign({
        // 这个_id是存到mongoDB之后自动分的一个id
        id: this._id,
        // 这个env在server里面require过了, 被调用的时候可以使用server外scope的env
    }, process.env.JWT_PRIVATE_KEY, {
        // 这个里面定义的是JWT的signOption, 选项是固定的, 比如expiresIn是预先定义好的名字, 不能改
        expiresIn: process.env.JWT_EXPIRE_DURATION
    })
}

userSchema.methods.generateResetToken = function(){
    //这个是随机生成的重置token
    const token = crypto.randomBytes(32).toString('hex')

    //我们再把这个token hash一下存到db里面
    //比如md5.update(message, 'utf8').digest('hex'); 
    //使用的hash函数叫什么, 放入什么信息,是什么文字编码(encoding), 然后计算成hex形式的hash格式
    this.ResetToken = crypto.createHash("sha256").update(token).digest('hex')


    //1000= 1sec, 给user当前的model对象加个resetTokenExpiringTime的attribute
    //这个值没有被hash进resetToken里面, 是自己设定的属性
    this.resetTokenExpiringTime = Date.now() + 300 *(60*1000)

    //return的是没有hash的token
    return token
}


module.exports = new mongoose.model('user', userSchema)