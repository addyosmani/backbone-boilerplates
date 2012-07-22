window.Todomvc =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  init: -> 
    new Todomvc.Routers.Todos

$(document).ready ->
  Todomvc.init()
  window.Todos = new Todomvc.Collections.Todos 
  new Todomvc.AppView({
  el: $('#todoapp'),
  input: $("#new-todo"),
  todolist: $("#todo-list")
  })
