# -*- coding: utf-8 -*-
{
    'name': "Módulo para JS testes",

    'summary': """
        Módulo criado com scaffold para testes
        ./odoo-bin scaffold /path  """,

    'description': """
        Long description of module's purpose
    """,

    'author': "Rafael",
    'website': "http://rafaellino.com.br/",

    'category': 'Uncategorized',
    'version': '0.1',

    'depends': ['base'],
    'qweb': ['static/src/xml/hello_world.xml'],
    'data': [
        'views/backend_assets.xml',
    ],
    # only loaded in demonstration mode
    #'demo': [
    #    'demo/demo.xml',
    #],
}