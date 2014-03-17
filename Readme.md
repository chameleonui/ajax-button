
# AJAX Button

Simple 1 state ajax button.

## Installation

Install with [component(1)](http://component.io):

```sh
$ component install chameleonui/ajax-button
```

If you want to `build example`, you will need to have stylus and chameleon-stylus-plugin installed.

```sh
$ npm install stylus -g     // install stylus globaly
$ npm install               // install package dependencies
``` 

## API

```js
new AjaxButton([options]);
```

```html
<a href="http://experiments.apiary.io/ajax-button" class="button-primary js-ajax-button"><i class="fa fa-check"></i> Send data</a>
```

For now, more you can learn from `example.html`.


### Options

```jss
method: 'POST',
contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
callback: function (xhrResponse) {
    return xhrResponse.status >= 200 && xhrResponse.status <= 399;
},
states: {
    stateDefault: {
        content: '<i class="fa fa-check"></i> Send data',
        classes: 'button-primary',
        title: 'State Default'
    },
    XHRrequest: {
        content: '<i class="fa fa-spinner fa-spin"></i>',
        classes: 'button-disabled',
        title: 'Loading ...'
    }
}
```

* **callback** - Function returning boolean true|false. xhrResponse is full response, xhrResponse.status is returned status 


## ToDo

Write complete readme


## Author(s)

[Edgedesign s.r.o.](http://www.edgedesing.cz) – [Daniel Sitek](https://github.com/danielsitek)

## License

The MIT License (MIT)

Copyright © 2013 Edgedesign s.r.o.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.