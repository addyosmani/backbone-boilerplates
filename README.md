#Backbone Boilerplates

Developers have been reqesting examples of how to integrate Backbone.js with a number of different backend technology stacks. To help with this, you can find many of these integration examples in this repository, with their stacks listed below. There are more to come soon and I'm always happy to consider other stacks not already covered.

Option 1
=========
* Node.js
* Express
* Mongoose
* MongoDB

Option 2
=========
* Jade
* Node.js
* Express
* Mongoose
* MongoDB

Option 3
==========
* Haml
* Ruby
* Sinatra
* MongoDB

Option 4
==========
* Grails
* MongoDB

(thanks to [Lauri Piispanen](https://github.com/lauripiispanen))

Option 5
==========
* PHP 
* Slim PHP RESTful framework
* mySQL

(thanks to [Joshua Stauter](https://github.com/dthtvwls))

Option 6
==========
* Rails / Rails Asset Pipeline
* CoffeeScript
* Rails JSON API

(also thanks to [Joshua Stauter](https://github.com/dthtvwls))

Option 7
==========
* Jade
* Stylus
* Node.js
* Express
* Mongoose
* MongoDB
* Socket.io
* Redis

Redis is used to manage sessions and locks using pub/sub to notify clients of any changes.  Socket.io is used to make these notifications as quickly as possible.

(contributed by [James O'Reilly](https://github.com/jamesor))

Option 8
==========
* Vert.x
* MongoDB

(contributed by [Yuichi Ohneda](https://github.com/ohneda))

Option 9
==========
* Django
* sqlite (ORM)

(contributed by [Mohammad Ibrahim](https://github.com/Ibrahim23))

##Instructions

All boilerplates are based on the excellent [HTML5 Boilerplate](http://html5boilerplate.com/) and use a MongoDB backend. 

Please ensure you have [MongoDB](http://www.mongodb.org/downloads) installed and running prior to running any of the boilerplates.

###MongoDB Setup 

Once you've downloaded MongoDB, you'll need to complete two steps to get things up and running.

**Data directories**

MongoDB stores data in the bin/data/db folder but won't actually create this directory for you. Navigate to where you've downloaded and extracted Mongo and run the following from terminal:

<pre>
sudo mkdir -p /data/db/
sudo chown `id -u` /data/db
</pre>

**Running and connecting to your server**

Once this is done, open up two terminal windows. 

In the first, <code>cd</code> to your MongoDB bin directory or type in the complete path to it. You'll need to start mongod.

<pre>
$ ./bin/mongod
</pre>

Next, in the second terminal, start the mongo shell which will connect up to localhost by default.

<pre>
$ ./bin/mongo
</pre>

That's it!.

###Options 1 and 2

The only main difference between Options 1 and 2 is that Option 2 uses [Jade](http://jade-lang.com/) (the Node templating engine) whilst Option 1 allows you to use regular HTML for your layouts. Both run on Node.js with Express and Mongoose.

To get either option running:

* Make sure you have Node.js installed. If not, grab it [here](http://nodejs.org/#download)
* Next, fire up a terminal and run the following lines
   
<pre>
git clone https://github.com/addyosmani/backbone-boilerplates.git
cd option1
./install.sh
node app.js
</pre>

Similarly for option2, simply cd into option2 and run <code>node app.js</code> from there.

Next, navigate to one of the following URLs:

* Option 1: <code>http://localhost:3000/static.html</code>
* Option 2: <code>http://localhost:3000/todo</code>

**Note:** The Jade layout files for Option 2 can be found in the /views folder.

### Option 3

This option uses Ruby, Sinatra and Haml and requires that you have at minimum Ruby and bundler installed as a prerequsite.

<pre>
git clone https://github.com/addyosmani/backbone-boilerplates.git
cd option3
bundle install
ruby app.rb
</pre>

Finally, navigate to <code>http://localhost:4567/todo</code>

**Note:** The Haml layout files for Option 3 can be found in the /views folder.


##Thanks and future plans

I would like to extend my thanks to [Chris Riccomini](https://github.com/criccomini) for his [Weapon of Choice](https://github.com/criccomini) project. It served as the inspiration and a partial base for this repo, which I plan on expanding to cover other setups such as Backbone + Socket.io, Backbone + SocketStream and more.

Backbone Boilerplates is a project that was created to stub further examples for my creative-commons book [Backbone Fundamentals](https://github.com/addyosmani/backbone-fundamentals). The idea is to create further applications for the yet to be written RESTful/backend sections of the book, which have been repeatedly requested on the issue tracker. 

If you notice any major issues, please let me know about them and I'll do my best to fix them up right away.




