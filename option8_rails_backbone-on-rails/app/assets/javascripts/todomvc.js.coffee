window.Todomvc =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  init: -> 
    new Todomvc.Routers.Todos
    Backbone.history.start()

$(document).ready ->
  Todomvc.init()
