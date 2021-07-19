function newCreate(proto, propertiesObject) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
        throw TypeError('Object prototype may only be an Object: ' + proto)
    }
    function F() { }
    F.prototype = proto
    const o = new F()

    if (propertiesObject !== undefined) {
        Object.keys(propertiesObject).forEach(prop => {
            let desc = propertiesObject[prop]
            if (typeof desc !== 'object' || desc === null) {
                throw TypeError('Object prorotype may only be an Object: ' + desc)
            } else {
                Object.defineProperty(o, prop, desc)
            }
        })
    }

    return o
}

module.exports = newCreate