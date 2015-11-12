var flatten = function (obj) {
    var toReturn = {};
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if ((typeof obj[i]) == 'object') {
            var flatObject = flatten(obj[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;
                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = obj[i];
        }
    }
    return toReturn;
};
