This is the classic [Backbone Todos app](http://addyosmani.github.com/todomvc),
backended by a Vert.x EventBus.  
This sample app will show you how to keep collections synced in realtime in different browsers with Vert.x EventBus.

### Dependencies

First, make sure that you have installed JDK7.
Vert.x requires JDK 1.7.0 or later.
And we use MongoDB as our data store.

1. Vert.x - <http://vertx.io/>
  * The app is implemented in Vert.x [1.2.3](http://vertx.io/downloads/vert.x-1.2.3.final.tar.gz.html)
2. MongoDB - <http://www.mongodb.org/>

By default, the app connects to MongoDB running on localhost with its default port.

### To Run

<pre>
$ vertx run app.js
</pre>

2. Visit [http://localhost:8080](http://localhost:8080)