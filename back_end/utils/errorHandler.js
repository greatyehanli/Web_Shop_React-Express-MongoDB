//创建一个自定义的error的原型, 从error本体上面继承过来, super个message过去, 然后自己加个status的码

module.exports = class ErrorHandler extends Error{
    constructor(message, status){
        super(message)
        this.status = status
    }
}