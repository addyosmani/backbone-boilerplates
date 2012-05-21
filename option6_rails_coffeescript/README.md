This is the classic [Backbone Todos app](http://addyosmani.github.com/todomvc),
refactored to leverage CoffeeScript and Rails' Asset Pipeline,
and backended by a Rails JSON API.

Install
-------

### If you don't already know this dance: ###

    git clone git://github.com/addyosmani/backbone-boilerplates.git

    cd backbone-boilerplates/option6_rails_coffeescript/

make sure mongodb is running and that the database in config/mongoid.yml is correct. Then...

    bundle install

    rails server

    open http://localhost:3000

### For a _really_ fun time ###

Check [http://localhost:3000/todos.json](http://localhost:3000/todos.json)
while you use the Backbone app to see the data updating.
All communication between Backbone and Rails is over the API;
front and back ends are completely decoupled.