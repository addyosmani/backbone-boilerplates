$(function ($, _, Backbone, io) {

  "use strict";

  var Todo, TodoList, Todos, TodoView, AppView, App, socket;

  socket = io.connect();

  // Todo Model
  // ----------

  // Our basic **Todo** model has `title`, `order`, and `done` attributes.
  Todo = Backbone.Model.extend({

    // MongoDB uses _id as default primary key
    idAttribute: "_id",

    noIoBind: false,

    socket: socket,

    url: function () {
      return "/todo" + ((this.id) ? '/' + this.id : '');
    },

    // Default attributes for the todo item.
    defaults: function () {
      return {
        title: "empty todo...",
        order: Todos.nextOrder(),
        done: false
      };
    },

    // Ensure that each todo created has `title`.
    initialize: function () {
      if (!this.get("title")) {
        this.set({"title": this.defaults.title});
      }
      this.on('serverChange', this.serverChange, this);
      this.on('serverDelete', this.serverDelete, this);
      this.on('modelCleanup', this.modelCleanup, this);
      if (!this.noIoBind) {
        this.ioBind('update', this.serverChange, this);
        this.ioBind('delete', this.serverDelete, this);
        this.ioBind('lock', this.serverLock, this);
        this.ioBind('unlock', this.serverUnlock, this);
      }
    },

    // Toggle the `done` state of this todo item.
    toggle: function () {
      this.save({done: !this.get("done")});
    },

    // Remove this Todo and delete its view.
    clear: function (options) {
      this.destroy(options);
      this.modelCleanup();
    },

    serverChange: function (data) {
      data.fromServer = true;
      this.set(data);
    },

    serverDelete: function (data) {
      if (typeof this.collection === 'object') {
        this.collection.remove(this);
      } else {
        this.trigger('remove', this);
      }
    },

    serverLock: function (success) {
      if (success) {
        this.locked = true;
        //this.trigger('lock', this);
      }
    },

    serverUnlock: function (success) {
      if (success) {
        this.locked = false;
      }
    },

    modelCleanup: function () {
      this.ioUnbindAll();
      return this;
    },

    locked: false,

    lock: function (options) {
      if (!this._locked) {
        options = options ? _.clone(options) : {};
        var model = this
          , success = options.success;
        options.success = function (resp, status, xhr) {
          model.locked = true;
          if (success) {
            success(model, resp);
          } else {
            model.trigger('lock', model, resp, options);
          }
        };
        options.error = Backbone.wrapError(options.error, model, options);
        return (this.sync || Backbone.sync).call(this, 'lock', this, options);
      }
    },

    unlock: function (options) {
      if (this.locked) {
        options = options ? _.clone(options) : {};
        var model = this
          , success = options.success;
        options.success = function (resp, status, xhr) {
          model._locked = false;
          if (success) {
            success(model, resp);
          } else {
            model.trigger('unlock', model, resp, options);
          }
        };
        options.error = Backbone.wrapError(options.error, model, options);
        return (this.sync || Backbone.sync).call(this, 'unlock', this, options);
      }
    }
  });

  // Todo Collection
  // ---------------

  TodoList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Todo,

    socket: socket,

    // Returns the relative URL where the model's resource would be
    // located on the server. If your models are located somewhere else,
    // override this method with the correct logic. Generates URLs of the
    // form: "/[collection.url]/[id]", falling back to "/[urlRoot]/id" if
    // the model is not part of a collection.
    // Note that url may also be defined as a function.
    url: function () {
      return "/todo" + ((this.id) ? '/' + this.id : '');
    },

    initialize: function () {
      this.on('collectionCleanup', this.collectionCleanup, this);
      socket.on('/todo:create', this.serverCreate, this);
    },

    serverCreate: function (data) {
      if (data) {
        // make sure no duplicates, just in case
        var todo = Todos.get(data._id);
        if (typeof todo === 'undefined') {
          Todos.add(data);
        } else {
          data.fromServer = true;
          todo.set(data);
        }
      }
    },

    collectionCleanup: function (callback) {
      this.ioUnbindAll();
      this.each(function (model) {
        model.modelCleanup();
      });
      return this;
    },

    // Filter down the list of all todo items that are finished.
    done: function () {
      return this.filter(function (todo) { return todo.get('done'); });
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function () {
      return this.without.apply(this, this.done());
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function () {
      if (!this.length) { return 1; }
      return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function (todo) {
      return todo.get('order');
    }

  });

  // Create our global collection of **Todos**.
  Todos = new TodoList();

  // Todo Item View
  // --------------

  // The DOM element for a todo item...
  TodoView = Backbone.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    // The DOM events specific to an item.
    events: {
      "click .toggle"   : "toggleDone",
      "dblclick .view"  : "edit",
      "click a.destroy" : "clear",
      "keypress .edit"  : "updateOnEnter",
      "blur .edit"      : "close"
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function () {
      this.model.on('change', this.render, this);
      this.model.on('lock', this.serverLock, this);
      this.model.on('unlock', this.serverUnlock, this);
      Todos.on('remove', this.serverDelete, this);
    },

    // Re-render the titles of the todo item.
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('done', this.model.get('done'));
      this.input = this.$('.edit');
      return this;
    },

    // Toggle the `"done"` state of the model.
    toggleDone: function () {
      this.model.toggle();
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function () {
      if (!this.model.locked) {
        this.$el.addClass("editing");
        this.input.focus();
        this.model.lock();
      }
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function () {
      var value = this.input.val();
      if (!value) {
        this.clear();
      }
      this.model.save({title: value});
      this.$el.removeClass("editing");
      this.model.unlock();
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function (e) {
      if (e.keyCode === 13) {
        this.close();
      }
    },

    // Remove the item, destroy the model.
    clear: function () {
      if (!this.model.locked) {
        this.model.clear();
      }
    },

    serverDelete: function (data) {
      if (data.id === this.model.id) {
        this.model.clear({silent: true});
        this.$el.remove();
      }
    },

    serverLock: function () {
      if (!this.$el.hasClass("editing") && this.model.locked) {
        this.$el.addClass('locked');
        this.$('.toggle').attr('disabled', true);
      }
    },

    serverUnlock: function () {
      this.$el.removeClass('locked');
      this.$('.toggle').attr('disabled', false);
    }
  });

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#todoapp"),

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template($('#stats-template').html()),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "keypress #new-todo":  "createOnEnter",
      "click #clear-completed": "clearCompleted",
      "click #toggle-all": "toggleAllComplete"
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos.
    initialize: function (initalData) {

      this.input = this.$("#new-todo");
      this.allCheckbox = this.$("#toggle-all")[0];

      Todos.on('add', this.addOne, this);
      Todos.on('reset', this.addAll, this);
      Todos.on('all', this.render, this);

      this.footer = this.$("footer");
      this.main = $("#main");

      Todos.fetch({
        success: function (todos, models) {
          var data = initalData.todo
            , locks = ((data && data.locks) ? data.locks : [])
            , model;
          _.each(locks, function (lock) {
            model = todos.get(lock);
            if (model) {
              model.lock();
            }
          });
        }
      });
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function () {
      var done = Todos.done().length,
        remaining = Todos.remaining().length;

      if (Todos.length) {
        this.main.show();
        this.footer.show();
        this.footer.html(this.statsTemplate({done: done, remaining: remaining}));
      } else {
        this.main.hide();
        this.footer.hide();
      }

      this.allCheckbox.checked = !remaining;
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function (todo) {
      var view = new TodoView({model: todo});
      $("#todo-list").append(view.render().el);
    },

    // Add all items in the **Todos** collection at once.
    addAll: function () {
      Todos.each(this.addOne);
    },

    // If you hit return in the main input field, create new **Todo** model
    createOnEnter: function (e) {
      if (e.keyCode !== 13) { return; }
      if (!this.input.val()) { return; }

      var t = new Todo({title: this.input.val()});
      t.save();

      //Todos.create({title: this.input.val()});
      this.input.val('');
    },

    // Clear all done todo items, destroying their models.
    clearCompleted: function () {
      _.each(Todos.done(), function (todo) { todo.clear(); });
      return false;
    },

    toggleAllComplete: function () {
      var done = this.allCheckbox.checked;
      Todos.each(function (todo) { todo.save({'done': done}); });
    }

  });

  // Finally, we kick things off by creating the **App** on successful socket connection

  socket.emit('connect', ['todo'], function (err, data) {
    if (err) {
      console.log('Unable to connect.');
    } else {
      App = new AppView(data);
    }
  });

}(jQuery, _, Backbone, io));