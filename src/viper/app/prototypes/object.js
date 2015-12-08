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

/* Receives a string like 'user,password:password,remember:checkbox'
and returns the array
[
 {name: 'user', type: 'text'}, 
 {name: 'password', type: 'password'},
 {name: 'remember', type: 'checkbox'}
]
'text' is the default type of a field
 */
var typifyFields = function (fields) {
    return fields.split(',').map(function (field) {
        var split = field.split(':');
        return {
            name: split[0],
            type: split[1] || 'text'
        }
    })
};

var clone = function (obj) {
    return jQuery.extend(true, {}, obj);
};
