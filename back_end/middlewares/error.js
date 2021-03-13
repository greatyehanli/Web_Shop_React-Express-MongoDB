const errorPrototype = require('../utils/errorHandler')

//all incoming requests should go through this error middlerware
//我们必须把它放到最后面, 不然request在进入相应的route之前, 没错也会被返回个500就很伤
//这个error的参数是我们出错的时候我们自己用next给pass进去的, 会一直传承到所有的middlerware走完
const errorHandler = (error, req, res, next)=>{

    if(error.code === 11000){
        //400 bad request
        error = new errorPrototype("Duplicate Field Value in Database. e.g. email already registered", 400)
    }
    
    if(error.name === 'ValidationError'){
        error = new errorPrototype("ValidationError", 400)
    }

    res.status(error.status || 500).json({
        success: false,
        error: error.message || "Server Internal Error"
    })

}

module.exports = errorHandler