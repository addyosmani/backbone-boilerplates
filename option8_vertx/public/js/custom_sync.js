(function (undefined) {
    // Common JS // require JS
    var _, Backbone, exports;
    if (typeof window === 'undefined' || typeof require === 'function') {
        _ = require('underscore');
        Backbone = require('backbone');
        exports = Backbone;
        if (module) module.exports = exports;
    } else {
        _ = this._;
        Backbone = this.Backbone;
        exports = this;
    }

    var methodMap = {
        'create': 'save',
        'update': 'save',
        'delete': 'delete',
        'read':   'find'
    };

    var query = function(action, model){
        var base = {'action': action, 'collection': 'todos'};
        if(action === 'save'){
            base.document = model;
        }else{
            base.matcher = model.id ? { _id: model.id } : {};
        }
        return base;
    };

    Backbone.sync = function(method, model, options) {

        var params = query(methodMap[method], model);

        var replyHandler = function(reply, replier){
            var data;
            if(params.action === 'save'){
                data = {_id: reply._id || model.id};
            }

            if(params.action === 'find'){
                data = model.id ? reply.results[0] : reply.results;
            }
            if(reply.status === 'ok' || reply.status == 'more-exist'){
                options.success(data || model, reply.status, options);
                model.eventBus.publish('todos.broadcast.event', {model: model, method: method});
                if(reply.status == 'more-exist'){
                  replier(new Object,replyHandler);
                }
            }else{
                options.error(model, options);
            }

        };

        if(params.action){
            model.eventBus.send('vertx.mongopersistor', params, replyHandler);
        }

    };

})();
