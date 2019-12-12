# -*- coding: utf-8 -*-

from odoo import models, fields, api

from odoo.exceptions import ValidationError
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
    _name = 'test.abstract'

    def test(self):
        pass


class TestField(models.Model):
    _name = 'test.fields'
    _description = 'Teste'
    _order = 'sequence'
    _rec_name = 'sequence'
    _log_access = False
    _inherits = {'res.partner': 'partner_id'} #<-delegation inheritance
    """
        With delegation, Partner fields are expososed as 'test.fields', but they are 
        just being linked, so it is possible to use partner fields aswell.
    """

    #SQL contrainnsts = enforce database definition, in this case, to field name be unique
    _sql_constraints = [
        ('test_name_uniq', 'UNIQUE (name)', 'Random number must be unique')]
    """
        _rec_name = quando referenciado, qual campo mostrar
        _log_acess = tira campos como create_date
        _oder = ordena na tree pelo campo

    """

    test_rec = fields.Many2one(
        string='Test rec',
        comodel_name='test.fields')

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

    something = fields.Char(
        string='Type something')

    partner_id = fields.Many2one(
        string='Contato',
        comodel_name='res.partner')

    text = fields.Html(
        string='texto')

    #if the record has less than 5 characters, raise ValidationError.
    #if blank, will raise error because it will be False
    #Apparently, it doesn't work with html fields
    @api.constrains('something')
    def _check_text_size(self):
        for record in self:
            if len(record.something) < 5:
                raise ValidationError('Must have more than 5 characters')

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



