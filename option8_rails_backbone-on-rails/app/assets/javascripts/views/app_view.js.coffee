class Todomvc.AppView extends Backbone.View

  el: $('#todoapp')

  statsTemplate: JST["todos/stats"]

  events:
    "keypress #new-todo"  : "createOnEnter"
    "keyup #new-todo"     : "showTooltip"
    "click .todo-clear a" : "clearCompleted"
    "click .mark-all-done": "toggleAllComplete"

  initialize: (options) ->

    @input = options.input
    @todolist = options.todolist
    _.bindAll @, 'addOne', 'addAll', 'render', 'toggleAllComplete'

    @allCheckbox = @$('.mark-all-done')[0]

    @Todos = Todos

    Todos.bind 'add',   @addOne
    Todos.bind 'reset', @addAll
    Todos.bind 'all',   @render

    Todos.fetch()

  render: ->
     console.log("Process AppView render")
     done = Todos.done().length
     remaining = Todos.remaining().length
 
     @$('#todo-stats').html @statsTemplate
       total:      Todos.length
       done:       done
       remaining:  remaining
 
     @allCheckbox.checked = !remaining
 
  addOne: (todo)->
    console.log("Process AppView addOne ...")
    view = new Todomvc.Views.Todo model: todo
    @todolist.append view.render().el

  addAll: (Todos) -> Todos.each @addOne

  newAttributes: ->
    content: @input.val()
    order:   Todos.nextOrder()
    done:    false

  createOnEnter: (e)->
    console.log('Process AppView createOnEnter ...')
    if e.keyCode == 13
      @Todos.create @newAttributes()
      @input.val ''

  clearCompleted: ->
    _.each Todos.done(), (todo)-> todo.clear()
    false

  showTooltip: (e)->
    tooltip = @$ '.ui-tooltip-top'
    val = @input.val()
    tooltip.fadeOut()
    clearTimeout @tooltipTimeout if @tooltipTimeout
    return if val == '' || val == @input.attr 'placeholder'
    show = -> tooltip.show().fadeIn()
    @tooltipTimeout = _.delay show, 1000

  toggleAllComplete: ->
    done = @allCheckbox.checked
    Todos.each (todo)-> todo.save 'done': done
