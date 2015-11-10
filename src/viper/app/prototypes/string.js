(function () {
    'use strict';

    String.prototype.capitalizeFirstLetter = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    String.prototype.pluralize = function () {
        return this + 's';
    }
})();