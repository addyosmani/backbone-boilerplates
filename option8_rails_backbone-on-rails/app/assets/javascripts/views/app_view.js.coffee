class Todomvc.AppView extends Backbone.View

  # Instead of generating a new element, bind to the existing skeleton of
  # the App already present in the HTML.

  # Our template for the line of statistics at the bottom of the app.
  statsTemplate: JST["templates/todos/stats"]

  # Delegated events for creating new items, and clearing completed ones.
  events:
    "keypress #new-todo"  : "createOnEnter"
    "keyup #new-todo"     : "showTooltip"
    "click .todo-clear a" : "clearCompleted"
    "click .mark-all-done": "toggleAllComplete"
    "click #new-todo"         : "click"

  # At initialization we bind to the relevant events on the `Todos`
  # collection, when items are added or changed. Kick things off by
  # loading any preexisting todos that might be saved.
  initialize: (selector, new_selector) ->
    console.log(Todos)
    @$el = selector
    console.log(@)
    _.bindAll @, 'addOne', 'addAll', 'render', 'toggleAllComplete'

    @input = new_selector 
    @allCheckbox = @$('.mark-all-done')[0]

    @Todos = Todos

    Todos.bind 'add',   @addOne
    Todos.bind 'reset', @addAll
    Todos.bind 'all',   @render

    Todos.fetch()

  # Re-rendering the App just means refreshing the statistics -- the rest
  # of the app doesnt change.
  render: ->
     console.log("render")
#    done = Todos.done().length
#    remaining = Todos.remaining().length
#
#    @$('#todo-stats').html @statsTemplate
#      total:      Todos.length
#      done:       done
#      remaining:  remaining
#
#    @allCheckbox.checked = !remaining
#
  # Add a single todo item to the list by creating a view for it, and
  # appending its element to the `<ul>`.
  addOne: (todo)->
    console.log("addone")
    view = new window.Todomvc.Views.Todo model: todo
    @$('#todo-list').append view.render().el

  # Add all items in the **Todos** collection at once.
  addAll: (Todos) -> Todos.each @addOne

  # Generate the attributes for a new Todo item.
  newAttributes: ->
    content: @input.val()
    order:   Todos.nextOrder()
    done:    false

  # If you hit return in the main input field, create new **Todo** model
  createOnEnter: (e)->
    console.log(e)
    if e.keyCode == 13
      @Todos.create @newAttributes()
      @input.val ''

  # Clear all done todo items, destroying their models.
  clearCompleted: ->
    _.each Todos.done(), (todo)-> todo.clear()
    false

  # Lazily show the tooltip that tells you to press `enter` to save
  # a new todo item, after one second.
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

  click: ->
    console.log("click event")

# Finally, we kick things off by creating the **App**.
 
