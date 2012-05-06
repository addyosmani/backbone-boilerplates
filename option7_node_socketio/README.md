# TodoMVC

#### A common demo application for popular JavaScript MV* frameworks

## Introduction

This demo was written to illustrate how a server-side JavaScript solution could be applied to the TodosMVC application using sockets.

#### Technologies Used In This Demo

- [Underscore.js](http://documentcloud.github.com/underscore/) - A utility-belt library for JavaScript without extending any of the built-in JavaScript objects.
- [Backbone.js](http://documentcloud.github.com/backbone/) - Gives structure to web applications by providing models with key-value binding and custom events, collections with a rich API of enumerable functions, views with declarative event handling, and connects it all to your existing API over a RESTful JSON interface.
- [backbone.iobind](https://github.com/logicalparadox/backbone.iobind) - Bind socket.io events to backbone models & collections. Also includes a drop-in replacement for Backbone.sync using socket.io.
- [jQuery](http://jquery.com/) - A fast, concise, library that simplifies how to traverse HTML documents, handle events, perform animations, and add AJAX.
- [Node.js](http://nodejs.org/) - Event-driven I/O server-side JavaScript environment based on V8.
- [Express](http://expressjs.com/) - High performance, high class web development for node.js.
- [Jade](http://jade-lang.com/) - High performance template engine heavily influenced by Haml and implemented with JavaScript for node.js.
- [Stylus](http://learnboost.github.com/stylus/) - Expressive, dynamic, robust CSS for node.js
- [Socket.io](http://socket.io/) - Aims to make realtime apps possible in every browser and mobile device, blurring the differences between the different transport mechanisms. It's care-free realtime 100% in JavaScript.
- [Mongoose](http://mongoosejs.com/) - A MongoDB object modeling tool designed to work in an asynchronous environment.
- [MongoDB](http://www.mongodb.org/) - A scalable, high-performance, open source NoSQL database.
- [Redis](http://redis.io/) - an open source, advanced key-value store. It is often referred to as a data structure server since keys can contain strings, hashes, lists, sets and sorted sets.

## Getting the Demo

1. Fork this repo by clicking the "Fork" button above
2. Clone your fork to make a local working copy.  For example:
<pre>
$ git clone git@github.com:[your_github_username]/backbone-boilerplates.git
$ cd backbone-boilerplates/option7_node_socketio
</pre>

## Setting up Dependencies

1. Install [node.js](http://nodejs.org/#download).
2. Install [MongoDB](http://www.mongodb.org/downloads).
3. Start the MongoDB server from a terminal window:
<pre>
$ mongod
</pre>
4. Install [Redis](http://redis.io/download).
5. Start the Redis Server from another terminal window:
<pre>
$ redis-server
</pre>
6. Make sure your current directory is option7_node_socketio before step 7.
<pre>
$ pwd
[your repos path]/backbone-boilerplates/option7_node_socketio
</pre>
7. Install dependencies using the node package manger (npm).
<pre>
$ sudo npm link
</pre>

## Running the Demo

1. Start the Todos demo server from a different terminal window:
<pre>
$ node app
</pre>
2. Visit [http://localhost:3000](http://localhost:3000) in a web browser.

## Credit

- [Jérôme Gravel-Niquet](http://jgn.me/) - Created original demo
- [Addy Osmani](http://addyosmani.com/) - Cleanup, edits
- [James O'Reilly](http://jamesor.com/) - Added server-side tech from node.js to MongoDB.

## License

Public Domain