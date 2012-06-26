class Todomvc.Views.TodosIndex extends Backbone.View

  el: $('#todoapp')

  initialize: ->
    @collection.on('reset', @addAll, this)
    @collection.on('add', this.addOne, this)
    $('#new-todo').on "keypress", {collection: @collection}, @keyTodoInput

  addAll: ->
    @collection.each(@addOne)

  addOne: (todo) ->
    console.log(todo)
    view = new Todomvc.Views.Todo({model: todo})
    $("#todo-list").append(view.render().el)
  
  createTodo: (event) ->
    event.preventDefault()
    Todomvc.Collections.Todos.create content: $('#new-todo-content').val()

  keyTodoInput: (e) ->
    # console.log(event.type, event.keyCode)
    return if (e.keyCode != 13)
    return if (!this.value)
    console.log(e.data.collection)

    e.data.collection.create content: this.value
    this.value = ''
