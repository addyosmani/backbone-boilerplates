Todomvc.Views.Todos ||= {}

class Todomvc.Views.Todo extends Backbone.View

  tagName: 'li'

  template: JST["todos/item"]

  initialize: (todo) ->
    @todo = todo.model

  render: ->
    $(@el).html @template @model.toJSON()
    @input = @$ '.todo-input'
    @
  
  events:
    "click .check"               : "toggleDone"
    "dblclick label.todo-content": "edit"
    "click span.todo-destroy"    : "clear"
    "keypress .todo-input"       : "updateOnEnter"
    "blur .todo-input"           : "close"

  initialize: ->
    console.log("Process NEW TodoView ... ")
    _.bindAll @, 'render', 'close', 'remove'
    @model.bind 'change', @render
    @model.bind 'destroy', @remove

  toggleDone: -> @model.toggle()

  edit: ->
    $(@el).addClass 'editing'
    @input.focus()

  close: ->
    @model.save content: @input.val()
    $(@el).removeClass 'editing'

  updateOnEnter: (e)-> @close() if e.keyCode == 13

  clear: -> @model.clear()
