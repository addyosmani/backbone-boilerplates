(function (exports) {

  "use strict";

  var mongoose = require('mongoose')
    , connect = require('express/node_modules/connect')
    , parseCookie = connect.utils.parseCookie
    , Session = connect.middleware.session.Session
    , crud = require('./crud')
    , store = require('redis').createClient()
    , pub = require('redis').createClient()
    , sub = require('redis').createClient();

  /**
   * Generic utility for setting up a Redis subscription and
   * create/read/update/delete/lock/unlock socket message handlers
   * for a model.
   */
  function setUpCrudForModel(modelName, socket, hs) {
    // No point in continuing without the required references
    if (!modelName || !socket || !hs) {
      return;
    }

    // Subscribe to Redis messages on the 'modelName' channel
    sub.subscribe(modelName.toLowerCase());

    // Add socket message handlers for this this model
    crud.addListeners({
      'model': mongoose.model(modelName),
      'rooturl': modelName.toLowerCase(),
      'socket': socket,
      'handshake': hs,
      'pub': pub
    });
  }

  exports.init = function (sio, sessionStore) {

    // ----------------------------------------------------
    // Autherization
    //
    sio.set('authorization', function (data, callback) {

      // Without a cookie that holds the user's session id
      // the user can not be authorized.
      if (!data.headers.cookie) {
        return callback('No cookie transmitted.', false);
      }

      data.cookie = parseCookie(data.headers.cookie);
      data.sessionID = data.cookie['express.sid'];
      data.sessionStore = sessionStore;

      // Using the session id found in the cookie, find the
      // session in Redis.  The authorization will fail if the
      // session is not found.
      sessionStore.get(data.sessionID, function (err, session) {
        if (err || !session) {
          return callback('Error', false);
        } else {
          data.session = new Session(data, session);
          return callback(null, true);
        }
      });

    });

    // ----------------------------------------------------
    // Connection
    //
    sio.on('connection', function (socket) {
      var hs = socket.handshake
        , sessionID = hs.sessionID
        , watchedModels = [];

      // Generic message handler to receive all messages
      // published via Redis, convert the message to an object
      // using JSON and emit it through the user's connected
      // socket.  Backbone Sync will receive this object and
      // update the appropriate models based on the 'key'
      sub.on('message', function (channel, message) {
        var msg = JSON.parse(message);
        if (msg && msg.key) {
          socket.emit(msg.key, msg.data);
        }
      });

      // ----------------------------------------------------
      // Connect
      //
      socket.on('connect', function (data, callback) {
        var i, len, d = {};

        watchedModels = data;

        function fillData(model, count) {
          d[model] = { locks: [] };
          return function (err, result) {
            d[model].locks = result;
            // When all of the information has been collected
            // send it back to the client through their callback.
            if (Object.keys(d).length === count) {
              callback(null, d);
            }
          };
        }

        // Return to the client an object containing all of
        // the locks currently maintained that the client is
        // interested in.  The client will use this info to
        // initialize the app with locks if any were created
        // before they got to the app.
        for (i = 0, len = data.length; i < len; i++) {
          store.hkeys(data[i], fillData(data[i], len));
        }

      });

      // ----------------------------------------------------
      // Disconnect
      //
      socket.on('disconnect', function (data, callback) {

        // When a client disconnects remove any locks they
        // might have created by looping through all keys
        // and comparing the session id of the key to the
        // session id of the user who disconnected.
        function removeLocks(val) {
          var key = val;
          return function (err, result) {
            var keys, id, i;
            if (!err && result) {
              keys = Object.keys(result);
              i = keys.length;
              while (i--) {
                id = keys[i];
                if (result[id] === sessionID) {
                  store.hdel(key, id);
                  pub.publish('cms', '/' + key + '/' + id + ':unlock');
                }
              }
            }
          };
        }

        // Only check for locks in the models that the client
        // could have created keys for.
        watchedModels.forEach(function (val, idx, array) {
          store.hgetall(val, removeLocks(val));
        });

      });

      setUpCrudForModel('Todo', socket, hs);
    });

  };

}(exports));