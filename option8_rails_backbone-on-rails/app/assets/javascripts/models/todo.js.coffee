class Todomvc.Models.Todo extends Backbone.Model

  paramRoot: 'todo'

  # Default attributes for the todo.
  defaults:
    content: 'empty todo...'
    done: false

  # Ensure that each todo created has `content`.
  initialize: -> @set "content": @defaults.content if !@get 'content'
