class Todomvc.Models.Todo extends Backbone.Model

  paramRoot: 'todo'

  defaults:
    content: 'empty todo...'
    done: false

  initialize: -> 
    console.log("Process NEW todo ...")
    @set "content": @defaults.content if !@get 'content'

  toggle: -> @save done: !@get 'done'

  clear: -> 
    console.log("Process DELETE todo ...")
    @destroy()
