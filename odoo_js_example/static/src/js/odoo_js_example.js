odoo.define('odoo_js_example.main', function (require) {
    const AbstractAction = require('web.AbstractAction');
    //abstract action is the base class for all cliente actions
    const core = require('web.core');
    //extend method to subclass a widget
    const OurAction = AbstractAction.extend({
        // start: function () {
        //     this.$el.html('hello');
        // }
        template: "hello_world.ClientAction",
        info: "this message comes from the JS"
    });
    // define the obj
    // reguster the obj
    core.action_registry.add('odoo_js_example.action', OurAction)
    // type in the browser console:
    // odoo.__DEBUG__.services["web.web_client"].do_action("odoo_js_example.action")
    // to see the hello message.
  });