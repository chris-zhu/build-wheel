Function.prototype.myBind = function (ctx) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    ctx = ctx || window
    let _this = this
    const args = [...arguments].slice(1)
    const Temp = function () { }
    let f = function () {
        return _this.apply(this instanceof Temp ? this : ctx, [...args, ...arguments])
    }
    Temp.prototype = _this.prototype
    f.prototype = new Temp()
    return f
}