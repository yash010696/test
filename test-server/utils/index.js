exports.trimTextOfObject = function (obj) {
    let keys = Object.keys(obj);
    for (let index = 0; index < keys.length; index++) {
        if (typeof obj[keys[index]] === 'string') {
            obj[keys[index]] = obj[keys[index]].trim();
        } else {
            obj[keys[index]] = obj[keys[index]];
        }
    }
    return obj;
}