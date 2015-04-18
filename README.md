# mirror-js [![Build Status](https://travis-ci.org/arnaud-xp/mirror-js.svg?branch=master)](https://travis-ci.org/arnaud-xp/mirror-js)

Simple JavaScript reflection API.

I made this module for my personal use, but do not hesitate to leave your thoughts around here !

## Installation

    $ npm install mirror-js

## Usage

```javascript
var baseObj = {};

var mirror = require('mirror-js');

var clone = mirror(baseObj).clone();
```

## API

### .clone()

Returns an exact copy of reflected object
    
```javascript
var myObject = {
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

    copy = mirror(myObject).clone();

console.log(copy.hello); // Hello World !
```

### .methods()

Returns a list of reflected object's methods

```javascript
var myObject = {
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

    methods = mirror(myObject).methods();

console.log(methods); // [sayHello]
```

### .properties()

Returns a list of reflected object's properties

```javascript
var myObject = {
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

    properties = mirror(myObject).properties();

console.log(properties); // [hello, sub]
```

### .prop()

Returns the value of a reflected object's property

```javascript
var myObject = {
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

    property = mirror(myObject).prop('sayHello'); 

console.log(property); // [Function]
```

### .construct()

Returns reflected object's constructor

```javascript
var myObject = {
        hello: 'Hello World !',

        sayHello: function () {
            return this.hello;
        }
    };

    const = mirror(myObject).constructor(); 

console.log(cons); // [Function]
```

### .hasProperty()

Whether or not cloned object has a given property

```javascript
var myObject = {
        hello: 'Hello World !',

        sayHello: function () {
            return this.hello;
        }
    }; 

console.log(mirror(myObject).hasProperty('hello')); // true
console.log(mirror(myObject).hasProperty('bye')); // false
```

### .hasMethod()

Whether or not cloned object has a given method

```javascript
var myObject = {
        hello: 'Hello World !',

        sayHello: function () {
            return this.hello;
        }
    }; 

console.log(mirror(myObject).hasMethod('hello')); // false
console.log(mirror(myObject).hasMethod('sayHello')); // true
```

### .name()

Returns cloned object's name

```javascript
var Glass = function (color) {
    this.color = color
};

Glass.prototype = (function () {
    return {
        constructor: Glass,
        break: function () {
            return '...';
        }
    }
});

console.log(mirror(Glass).name()); // Glass
```

## License

The MIT License (MIT)

Copyright (c) 2015 Arnaud PONEL

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
