(function () {
    'use strict';

    String.prototype.capitalizeFirstLetter = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    String.prototype.pluralize = function () {
        return this + 's';
    }

    String.prototype.camelSplit = function () {
        return this
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, function (str) { return str.toUpperCase(); })
    }

    String.prototype.prepend = function (s) {
        return s + this;
    }
})();