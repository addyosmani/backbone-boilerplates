class Todomvc.Views.Todo extends Backbone.View

  tagName: 'li'

  template: JST["todos/item"]

  initialize: (todo) ->
    @todo = todo.model

  render: ->
    $(@el).html @template @model.toJSON()
    @input = @$ '.todo-input'
    @
  
  # render: ->
  #   $(@el).html(@template(todo: @todo))
  #   this 

  events:
    "click .check"               : "toggleDone"
    "dblclick label.todo-content": "edit"
    "click span.todo-destroy"    : "clear"
    "keypress .todo-input"       : "updateOnEnter"
    "blur .todo-input"           : "close"

  # The TodoView listens for changes to its model, re-rendering. Since there's
  # a one-to-one correspondence between a **Todo** and a **TodoView** in this
  # app, we set a direct reference on the model for convenience.
  initialize: ->
    console.log("todo view init")
    _.bindAll @, 'render', 'close', 'remove'
    @model.bind 'change', @render
    @model.bind 'destroy', @remove

  # Toggle the `"done"` state of the model.
  toggleDone: -> @model.toggle()

  # Switch this view into `"editing"` mode, displaying the input field.
  edit: ->
    $(@el).addClass 'editing'
    @input.focus()

  # Close the `"editing"` mode, saving changes to the todo.
  close: ->
    @model.save content: @input.val()
    $(@el).removeClass 'editing'

  # If you hit `enter`, we're through editing the item.
  updateOnEnter: (e)-> @close() if e.keyCode == 13

  # Remove the item, destroy the model.
  clear: -> @model.clear()
