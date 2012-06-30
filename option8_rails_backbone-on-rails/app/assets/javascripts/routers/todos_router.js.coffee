class Todomvc.Routers.Todos extends Backbone.Router
  routes: 
    'todos/:id' : 'show'
    '': 'index'

  initialize: ->
    @todos = new Todomvc.Collections.Todos()
    @todos.fetch()

  show: (id) ->
      alert "Entry ID: #{id}"

  index: ->
    view = new Todomvc.Views.TodosIndex(collection: @todos)
    $('#todo-list').html(view.render().el)
