odoo.define('dhtmlx_gantt.View', function (require) {
    'use strict';
    var AbstractView = require('web.AbstractView');
    var view_registry = require('web.view_registry');
    var GanttViewController = require('dhtmlx_gantt.Controller');
    var GanttViewModel = require('dhtmlx_gantt.Model');
    var GanttViewRenderer = require('dhtmlx_gantt.Renderer');
    
    var GanttViewView = AbstractView.extend({
        display_name: 'name',
        icon: 'fa-tasks',
        config: _.extend({}, AbstractView.prototype.config,{
            Model: GanttViewModel,
            Controller: GanttViewController,
            Renderer: GanttViewRenderer,
        }),
        viewType: 'test',
        groupable: false,
        init: function (viewInfo, params) {
            //var self = this;
            this._super.apply(this, arguments);
            this.loadParams.type = 'list';
            this.loadParams.date_start = this.arch.attrs.date_start;
            this.loadParams.date_end = this.arch.attrs.date_end;
            this.loadParams.text = this.arch.attrs.text;
            this.loadParams.parent = this.arch.attrs.parent;
            

            //loadParams is here!!!!
            // console.log('this on view');
            // console.log(this['model']);
            //var attrs = this.arch.attrs;

            //model Params
            //this.loadParams.
        },
    });

    view_registry.add('test', GanttViewView)
    return GanttViewView
});