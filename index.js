/**
 * 
 * Action - Toggle Button
 * 
 */

var $ = require('jquery');
var Emitter = require('emitter');

var defaults = {
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    callback: function (xhrResponse) {
        return xhrResponse.status >= 200 && xhrResponse.status <= 399;
    },
    states: {
        stateDefault: {
            content: '<i class="fa fa-check"></i> Send data',
            classes: 'button-primary',
            title: 'State A'
        },
        XHRrequest: {
            content: '<i class="fa fa-spinner fa-spin"></i>',
            classes: 'button-disabled',
            title: 'Loading ...'
        }
    }
};

function AjaxButton(options) {
    this.options = options || {};
    for (var i in defaults) {
        if (!(this.options[i])) this.options[i] = defaults[i];
    }
    this.response = {};
    this.self;
    this.active = 0;
    this.postData = {};
}

module.exports = AjaxButton;

Emitter(AjaxButton.prototype);

AjaxButton.prototype.init = function(self, data) {
    
    var component = this;
    component.self = self;
    component.postData = data ? data : {};

    component._stateChange('XHRrequest');
};

AjaxButton.prototype._click = function(fn) {
    var component = this;

    $(component.self).on('click.ajaxpost', function(event) {

        event.preventDefault();
        fn(event);
    });
};

AjaxButton.prototype._clearEvent = function() {
    
    var component = this;

    $(component.self).off('click.ajaxpost');
};

AjaxButton.prototype._stateChange = function(newStateName) {
    
    var component = this;

    // clear binded event - prevents multiple clicks
    component._clearEvent();

    // replace full class list
    if (component.options.states[newStateName]) {

        component.self.setAttribute('class', component.options.states[newStateName].classes);
        component.self.setAttribute('title', component.options.states[newStateName].title);
        component.self.innerHTML = component.options.states[newStateName].content;

        component[newStateName]();

    } else {

        console.error('State: ' + newStateName + ' does not exist');
    }
};

AjaxButton.prototype.stateDefault = function() {

    var component = this;

    component._click(function(){

        component._stateChange('XHRrequest');

    });
};

AjaxButton.prototype.XHRrequest = function() {
    
    var component = this;

    component._click(function(){});

    component.active = 1;

    component.emit('request');

    component._xhr(component.self.getAttribute('href'), component.postData, component.options.contentType, component.options.method, function(xhr){

        component.response = xhr;
        component._XHRresponse();

    });
};

AjaxButton.prototype._XHRresponse = function() {
    
    var component = this;

    component.active = 0;
    
    component._stateChange('stateDefault');

    if ( component.options.callback(component.response) ) {

        component.emit('success');

    } else {

        component.emit('error');
    }

    component.emit('response');
};

AjaxButton.prototype._xhr = function(setUrl, data, contentType, method, resFn) {

    $.ajax({
        type: method,
        url: setUrl,
        data: data,
        contentType: contentType
    })
    .done(function(data, textStatus, jqXHR) {
        resFn(jqXHR);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        resFn(jqXHR);
    });
};
