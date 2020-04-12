odoo.define('dhtmlx_gantt.Renderer', function (require) {
    'use strict';
    var AbstractRenderer = require('web.AbstractRenderer');
    var FormRenderer = require('web.FormRenderer');
    var core = require('web.core');
    var qweb = core.qweb;

    var TestNewView = AbstractRenderer.extend({
        template: "lliege_timeline.ganttrender",
        init: function (parent, state, params) {
            this._super.apply(this, arguments);
            
        },
        // _render: function () {
            
        //     // console.log(this.state);
        //     //this.$el.append(qweb.render('ViewM2mGroup', {}));
        // },
        on_attach_callback: function() {
            this._renderGantt();
        },
        updateState: function (state, params) {
            //método chamado toda vez que o search é atualizado (aplicado filtro.)
            var res = this._super.apply(this, arguments);
            gantt.clearAll();
            this._renderGantt();
            return res;
        },
        _renderGantt: function () {
            var self = this;
            gantt.init(this.$('.gantt_dhtml').get(0)); //inicia o gantt com elemento na dom
            
            // //gantt options
            gantt.config.columns = [
                {name: "text", label: 'Project/Task', tree: true},
		        {name: "start_date", label: "Date Start"},
		        {name: "duration", label: "Duration"},
            ];
            gantt.config.readonly = true;
            //gantt.clearAll();
            //configuration of drag timeline
			gantt.config.drag_timeline = {
                ignore:"",
                useKey: false
            };
            gantt.attachEvent("onTaskClick", function(id,e){
                if (e.target.className == "gantt_task_content"){
                   var record = gantt.getTask(id);
                   return self.do_action({ //open view
                            'name': ("Project/Task"),
                            'type': 'ir.actions.act_window',
                            'view_mode': 'form',
                            'res_model': record.model,
                            'res_id': parseInt(id.replace(/[A-Za-z]/,"")),
                            'target': 'new',
                            'views': [[false, 'form']],
                            'nodestroy': true,
                   })
                   }
                return true;
            });
            console.log(this.state);
            gantt.parse(this.state.records); //rederiza o gantt

        },
    });
    return TestNewView;
});