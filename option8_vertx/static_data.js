load('vertx.js');

var eb = vertx.eventBus;

var pa = 'vertx.mongopersistor';

var todos = [
  {
    done: false,
    text: 'todo1',
    order: 1
  },
  {
    done: false,
    text: 'todo2',
    order: 2
  }
];

// First delete everything
eb.send(pa, {action: 'delete', collection: 'todos', matcher: {}});

for (var i = 0; i < todos.length; i++) {
  eb.send(pa, {
    action: 'save',
    collection: 'todos',
    document: todos[i]
  });
}
