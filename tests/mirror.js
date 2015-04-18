(function () {
    'use strict';

    var assert = require('chai').assert,
        mirror = require('../src/mirror'),

        testObj = {
            hello: 'Hello World !',

            sayHello: function () {
                return this.hello;
            },

            sub: {
                sayHello: function () {
                    return 'Hi People !';
                }
            }
        };

    describe('mirror()', function () {

        it('should return an instance of Reflect if initialized with an object', function () {

            assert.equal(mirror(testObj).constructor.name, 'Reflect');

        });

        it('should throw an Error if initialized with a non object', function () {

            assert.throws(function () {
                mirror('Hello World');
            });

            assert.throws(function () {
                mirror(42);
            });

        });

        describe('.clone()', function () {

            it('should return a clone of base object', function () {

                var clone = mirror(testObj).clone();

                assert.deepEqual(testObj, clone);

            });

            it('should not reference base object', function () {

                var clone = mirror(testObj).clone();

                clone.hello = 'Hi Dudes !';

                assert.strictEqual(testObj.hello, 'Hello World !');
                assert.strictEqual(clone.hello, 'Hi Dudes !');

            });

        });

        describe('.methods()', function () {

            it('should return an array', function () {

                var shouldBeArray     = mirror(testObj).methods(),
                    shouldAlsoBeArray = mirror({}).methods();

                assert.strictEqual(Array.isArray(shouldBeArray), true);
                assert.strictEqual(Array.isArray(shouldAlsoBeArray), true);

            });

            it('should return an array of methods', function () {

                var test = mirror(testObj).methods();

                assert.equal((function () {
                    var flag = true;

                    test.forEach(function (elem) {    
                        if (typeof testObj[elem] !== 'function') {
                            flag = false;
                        }
                    });
                    return flag;
                }()), true);

            });

        });

        describe('.properties()', function () {

            it('should return an array', function () {

                var shouldBeArray     = mirror(testObj).properties(),
                    shouldAlsoBeArray = mirror({}).properties();

                assert.strictEqual(Array.isArray(shouldBeArray), true);
                assert.strictEqual(Array.isArray(shouldAlsoBeArray), true);

            });

            it('should return an array of properties', function () {

                var test = mirror(testObj).properties();

                assert.equal((function () {
                    var flag = true;

                    test.forEach(function (elem) {    
                        if (typeof testObj[elem] === 'function') {
                            flag = false;
                        }
                    });
                    return flag;
                }()), true);

            });

        });

        describe('.prop()', function () {

            it('should return the value of a property', function () {

                var test = mirror(testObj).prop('sayHello');

                console.log(test);

                assert.strictEqual(test, testObj.sayHello);

            });

            it('should return undefined if property does not exists', function () {

                var test = mirror(testObj).prop('test');

                assert.isNull(test);

            });

        });

        describe('.construct()', function () {

            it('should return a function', function () {

                assert.typeOf(mirror(testObj).construct(), 'function');

            });

        });

        describe('.hasProperty()', function() {

            it('should return true if property exists', function () {

                assert.ok(mirror(testObj).hasProperty('hello'));

            });

            it('should return false if property doesn\'t exists', function () {

                assert.notOk(mirror(testObj).hasProperty('bye'));

            });

            it('should return false if no property is given', function () {

                assert.notOk(mirror(testObj).hasProperty());

            });

        });

        describe('.hasMethod()', function () {

            it('should return true if method exists', function () {

                assert.ok(mirror(testObj).hasMethod('sayHello'));

            });

            it('should return false if method does not exists', function () {

                assert.notOk(mirror(testObj).hasMethod('sayGoodbye'));

            });

            it('should return false if given property exists but is no method', function () {

                assert.notOk(mirror(testObj).hasMethod('hello'));

            });

        });

        describe('.name()', function () {

            it('should return a string', function () {

                assert.typeOf(mirror(testObj).name(), 'string');

            });

            it('should have same name as base object', function () {

                assert.equal(mirror(testObj).name(), testObj.constructor.name);

            });

        });

    });

}());