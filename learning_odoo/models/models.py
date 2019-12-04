# -*- coding: utf-8 -*-

from odoo import models, fields, api

from random import choice
from datetime import date

# class custom-addons/learning_odoo/(models.Model):
#     _name = 'custom-addons/learning_odoo/.custom-addons/learning_odoo/'

#     name = fields.Char()
#     value = fields.Integer()
#     value2 = fields.Float(compute="_value_pc", store=True)
#     description = fields.Text()
#
#     @api.depends('value')
#     def _value_pc(self):
#         self.value2 = float(self.value) / 100

class AbstractModel(models.AbstractModel):
    _name = 'cu200'

    def test(self):
        pass


class TestField(models.Model):
    _name = 'test.fields'
    _description = 'Teste'
    _order = 'sequence'
    _rec_name = 'sequence'
    _log_access = False


    sequence = fields.Float('Sequência',(3,2))

    selecao = fields.Selection(
        selection=[
            ('test1','Teste1'),
            ('test2','Teste2'),
            ('test3','Teste3')
        ],
        string='Test selection field',
        required=True,
        default='test1',
        help='blablabla',
        store=True)

    name = fields.Char(
        string='Random number',
        index=True)


    partner_id = fields.Many2one(
        string='Contato',
        comodel_name='res.partner')

    text = fields.Html(
        string='texto')

    partner_ids = fields.One2many(
        string='Contatos',
        comodel_name='res.partner',
        inverse_name='test_id')

    contatos_geral = fields.Reference(
        [('res.users','Users'),('res.partner','Partner')],
        'Referências')

    def check_exists(self,num):
        found = self.env['test.fields'].search([('name', '=', num)])
        if found:
            return self.check_exists(self.gerar_numero())
        return num

    def gerar_numero(self):
        data_hoje = date.today().strftime('%Y/%m/%d').replace('/','')
        lista = ['0','1','2','3','4','5','6','7','8','9']
        num = [choice(lista) for i in range(5)]
        return "".join(num) + data_hoje[:4]

    @api.model
    def create(self,vals):
        test = super(TestField, self).create(vals)
        test.name = self.check_exists(self.gerar_numero())
        return test

class ResPartner(models.Model):
    _inherit = 'res.partner'


    test_id = fields.Many2one(
        string='Test',
        comodel_name='test.fields')



