Function.prototype.myCall = function (ctx) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    ctx = ctx || window
    ctx.fn = this
    const args = [...arguments].slice(1)
    const result = ctx.fn(args)
    delete ctx.fn
    return result
}
