# -*- coding: utf-8 -*-
from odoo import http

# class Custom-addons/learningOdoo/(http.Controller):
#     @http.route('/custom-addons/learning_odoo//custom-addons/learning_odoo//', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/custom-addons/learning_odoo//custom-addons/learning_odoo//objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('custom-addons/learning_odoo/.listing', {
#             'root': '/custom-addons/learning_odoo//custom-addons/learning_odoo/',
#             'objects': http.request.env['custom-addons/learning_odoo/.custom-addons/learning_odoo/'].search([]),
#         })

#     @http.route('/custom-addons/learning_odoo//custom-addons/learning_odoo//objects/<model("custom-addons/learning_odoo/.custom-addons/learning_odoo/"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('custom-addons/learning_odoo/.object', {
#             'object': obj
#         })