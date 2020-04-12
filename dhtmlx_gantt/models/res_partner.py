from odoo import models, api

class ResPartner(models.Model):
    _inherit = 'res.partner'


    @api.model
    def get_things(self, domain, **kw):
        domain = [tuple(d) for d in domain]
        print(domain)
        return self.search(domain)