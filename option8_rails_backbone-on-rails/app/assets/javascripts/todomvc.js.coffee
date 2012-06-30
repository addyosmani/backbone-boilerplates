window.Todomvc =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  init: -> 
    new Todomvc.Routers.Todos

$(document).ready ->
  Todomvc.init()
  new Todomvc.Views.AppView
