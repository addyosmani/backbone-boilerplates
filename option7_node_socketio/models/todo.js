(function (module) {

  "use strict";

  var mongoose = require('mongoose')
    , TodoSchema;

  TodoSchema = new mongoose.Schema({
    title: { 'type': String, 'default': 'empty todo...' },
    order: { 'type': Number },
    done: { 'type': Boolean, 'default': false }
  });

  module.exports = mongoose.model('Todo', TodoSchema);

}(module));