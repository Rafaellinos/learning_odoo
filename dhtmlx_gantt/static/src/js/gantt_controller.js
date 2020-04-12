odoo.define('dhtmlx_gantt.Controller', function (require) {
    'use strict';

    var AbstractController = require('web.AbstractController');
    var core = require('web.core');
    //var qweb = core.qweb;

    var TestNewView = AbstractController.extend({
        init: function(parent, model, renderer, params){
            this._super.apply(this, arguments);
        },
    });

    return TestNewView;
});