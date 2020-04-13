odoo.define('dhtmlx_gantt.Model', function (require) {
    'use strict';
    var AbstractModel = require('web.AbstractModel');
    
    var GanttView = AbstractModel.extend({
        // init: function () {
        //     this._super.apply(this, arguments);
        //     this.data = null;
        // },
        get: function () { // retorna a data para o renderer em state

            var gantt_records = {
                data: this.data,
                linkds: []
            }
            var res = {
                records: gantt_records,
            };
            return res;
        },
        load: function (params) {
            this.modelName = params.modelName;
            this.domain = params.domain;
            this.options_map = {
                'date_start': params.date_start,
                'date_end': params.date_end,
                'text': params.text || 'name',
                'parent': params.parent || null
            }
            //load map fields
    
            return this._fetchData();
        },
        reload: function (handle, params) {
            //reload é chamado sempre que um filtro(domain) é chamado.
            if ('domain' in params) {
                this.domain = params.domain;
            }
            console.log(this.domain);
            return this._fetchData();
        },
        _fetchData: function () {
            var self = this;
            //chama método search read aplicando domain
            return this._rpc({
                model: this.modelName,
                method: 'search_read',
                kwargs: {
                    domain: this.domain
                },
                orderBy: [{
                    name: 'id',
                    asc: true,
                }]
            }).then(function(records) {
                //self.records = records;
                self.create_gantt_date(records);
            });
        },
        ////TODO pegar os parentes filtrados por ID para mostrar no gráfico
        _get_parent: function (parent) {
            var self = this;
            return this._rpc({
                model: 'ir.model.fields', //model parent
                method: 'search_read',
                kwargs: {
                    domain: [['name','=', parent]],
                    fields: ['relation'],
                    limit: 1
                },
            }).then(function(comodel_name) {
                if (comodel_name) {
                    return comodel_name[0]['relation']
                }
                else {
                    return null
                }
            });
        },
        //TODO
        create_gantt_date: function(records) {
            
            var data = []

            var formatFunc = gantt.date.str_to_date("%Y-%m-%d %h:%i:%s", true);

            //calcula a duração da tarefa em dias baseado na data de ínicio e data de término.
            function get_duration(date_start, date_end) {
                if (date_start && date_end)  {
                    try {
                        let date1 = new Date(date_start.replace(/-/g,"/"));
                        let date2 = new Date(date_end.replace(/-/g,"/"));
                        let diffTime = Math.abs(date2 - date1);
                        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        return diffDays
                    }catch (err){
                        console.log(err);
                        return 0
                    }
                }
                return 0
            };
            console.log(this.options_map);
            if (this.options_map['parent']){
                comodel_name = this._get_parent(this.options_map['parent']);
                
            };
            records.forEach(record => {
                if (record[this.options_map['date_start']]) {
                    data.push(
                        {
                            'id': record['id'],
                            'text': record[this.options_map['date_start']],
                            'start_date': formatFunc(record[this.options_map['date_start']]),
                            'open': true,
                            'duration': get_duration(record[this.options_map['date_start']], record[this.options_map['date_end']]),
                            'model': this.modelName,
                            'order': record['id'],
                            'parent': record[this.options_map['parent']][0]
                        }
                    );
                }
            });
            this.data = data;

        },

    });
    return GanttView;
});