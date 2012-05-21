# Our basic **Todo** model has `content`, `order`, and `done` attributes.
class App.Models.Todo extends Backbone.Model

  idAttribute: '_id'

  paramRoot: 'todo'

  # Default attributes for the todo.
  defaults:
    content: 'empty todo...'
    done: false

  # Ensure that each todo created has `content`.
  initialize: -> @set "content": @defaults.content if !@get 'content'

  # Toggle the `done` state of this todo item.
  toggle: -> @save done: !@get 'done'

  # Remove this Todo and delete its view.
  clear: -> @destroy()
