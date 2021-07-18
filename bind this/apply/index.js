Function.prototype.myApply = function (ctx){
    if(typeof this !== 'function'){
        throw new TypeError('Error')       
    }
    ctx = ctx || window
    ctx.fn = this
    let result
    if(arguments[1]){
        result = ctx.fn(...arguments[1])
    }else{
        result = ctx.fn()
    }
    delete ctx.fn
    return result
}
