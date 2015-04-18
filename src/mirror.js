(function () {
    'use strict';

    module.exports = (function () {

        var mirror = (function () {

            function Reflect(obj) {
                if (typeof obj !== 'object') {
                    throw new Error('This is not an object');
                }

                this._obj = obj;
            }

            Reflect.prototype = (function () {

                /**
                 * Retrieves a list of properties of an object
                 * @param  {object} obj     Object to retrieve properties of
                 * @param  {string} filter  Filter to exlude or include only specific properties types
                 * @return {array}          List of properties
                 */
                var _getProperties = function (obj, filter) {
                    var objProperties = [],
                        prop,
                        propFilter = filter ? new RegExp(filter, 'i') : undefined;

                    for (prop in obj) {
                        if (obj.hasOwnProperty(prop)) {
                            if (propFilter) {
                                if (propFilter.test(typeof obj[prop])) {
                                    objProperties.push(prop);
                                }
                            } else {
                                objProperties.push(prop);
                            }
                        }
                    }

                    return objProperties;
                };

                return {

                    constructor: Reflect,

                    /**
                     * Returns an exact copy of reflected object
                     * @return {object} Copy of base object
                     */
                    clone: function () {
                        if (this._obj === null) {
                            return null;
                        }

                        return Object.create(this._obj);
                    },

                    /**
                     * Returns a list of reflected object's methods
                     * @return {array} List of methods
                     */
                    methods: function () {
                        return _getProperties(this._obj, '^function$');
                    },

                    /**
                     * Returns a list of reflected object's properties
                     * @return {array} List of properties
                     */
                    properties: function () {
                        return _getProperties(this._obj, '^((?!function).)*$');
                    },

                    /**
                     * Returns the value of a reflected object's property
                     * @param  {string} property Property to retrieve
                     * @return {mixed}          Reflected's object property
                     */
                    prop: function (property) {
                        var prop;
                        for (prop in this._obj) {
                            if (this._obj.hasOwnProperty(prop) && prop === property) {
                                return this._obj[prop];
                            }
                        }

                        return null;
                    },

                    /**
                     * Returns reflected object's constructor
                     * @return {function} Reflected object's constructor
                     */
                    construct: function () {
                        return this._obj.constructor;
                    },

                    /**
                     * Whether or not cloned object has a given property
                     * @param  {string}  property Property to check
                     * @return {Boolean}          Whether or not object has property
                     */
                    hasProperty: function (property) {
                        return this._obj.hasOwnProperty(property);
                    },

                    /**
                     * Whether or not cloned object has a given method
                     * @param  {string}  method Method to check
                     * @return {Boolean}        Whether or not object has method
                     */
                    hasMethod: function (method) {
                        return this._obj.hasOwnProperty(method) && typeof this._obj[method] === 'function';
                    },

                    /**
                     * Returns cloned object's name
                     * @return {string} Object name
                     */
                    name: function () {
                        return this.construct().name;
                    }

                };

            }());

            return function (obj) {
                return new Reflect(obj);
            };

        }());

        return mirror;

    }());

}());
