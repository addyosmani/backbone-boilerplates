<?php
require 'ActiveRecord/ActiveRecord.php';
require 'Slim/Slim/Slim.php';

class Todo extends ActiveRecord\Model { }

ActiveRecord\Config::initialize(function($cfg) {
  $cfg->set_connections(array('development' => 'mysql://root:@localhost/todos'));
});


$app = new Slim();

function reqBody() {
  global $app;
  return json_decode($app->request()->getBody(), true);
}

$app->get('/json', function() {
  echo json_encode(array_map(function($todo) { return $todo->attributes(); }, Todo::all()));
});

$app->post('/json', function() {
  $todo = new Todo(reqBody());
  $todo->save();
});

$app->get('/json/:id', function($id) {
  echo Todo::find($id)->to_json();
});

$app->put('/json/:id', function($id) {
  Todo::find($id)->update_attributes(reqBody());
});

$app->delete('/json/:id', function($id) {
  Todo::find($id)->delete();
});

$app->get('/', function() {
  echo file_get_contents('index.html');
});

$app->run();
