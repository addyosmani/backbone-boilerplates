(function (exports) {

  "use strict";

  exports.init = function (app) {

    app.get('/', function (req, res) {
      res.render('index', {
        'title': 'TodosMVC with Backbone.js, Node.js, MongoDB, Socket.io and Redis'
      });
    });

  };

}(exports));