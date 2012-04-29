App.Views.Todos ||= {}

# The DOM element for a todo item...
class App.Views.Todos.TodoView extends Backbone.View

  # ... is a list tag.
  tagName: "li"

  # Cache the template function for a single item.
  template: JST["templates/todos/item"]

  # The DOM events specific to an item.
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
    _.bindAll @, 'render', 'close', 'remove'
    @model.bind 'change', @render
    @model.bind 'destroy', @remove

  # Re-render the contents of the todo item.
  render: ->
    $(@el).html @template @model.toJSON()
    @input = @$ '.todo-input'
    @

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
