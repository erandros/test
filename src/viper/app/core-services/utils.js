(function () {
    'use strict';

    angular
    .module('viper')
    .factory('utils', [function () {
        return {
            flatten: flatten,
            typify: typify,
            clone: clone,
            isNatural: isNatural
        }
        
        /* Flattens a deep object.
        Example: 
        { a: { b: 1, d: 2}, c: 3 } 
        is flattened to
        { a.b: 1, a.d: 2, c: 3}
        */
        function flatten(obj) {
            var toReturn = {};
            for (var i in obj) {
                if (!obj.hasOwnProperty(i)) continue;
                if ((typeof obj[i]) == 'object') {
                    var flatObject = this.flatten(obj[i]);
                    for (var x in flatObject) {
                        if (!flatObject.hasOwnProperty(x)) continue;
                        toReturn[i + '.' + x] = flatObject[x];
                    }
                } else {
                    toReturn[i] = obj[i];
                }
            }
            return toReturn;
        }

        /* Receives a string like 'user,password:password,remember:checkbox'
        and returns the array
        [
            {name: 'user', type: 'text'}, 
            {name: 'password', type: 'password'},
            {name: 'remember', type: 'checkbox'}
        ]
        'text' is the default type of a field
        */
        function typify(fields) {
            return fields.split(',').map(function (field) {
                var obj = {};
                var res = field.match(/(\w+)(\:[^\s\(]+)?(\(.+\))?/);
                obj.name = res[1];
                obj.type = res[2] ? res[2].substring(1) : "text";
                var params = res[3]
                obj.params = params ? params.substring(1, params.length - 1).split(' ') : params;
                return obj;
            })
        }

        /* Clones an object using jQuery extend */
        function clone(obj) {
            return jQuery.extend(true, {}, obj);
        }

        /* Returns true if n is an integer higher than or equals 0 */
        function isNatural(n) {
            n = n.toString(); // force the value incase it is not
            var n1 = Math.abs(n),
                n2 = parseInt(n, 10);
            return !isNaN(n1) && n2 === n1 && n1.toString() === n;
        }
    }])
})();