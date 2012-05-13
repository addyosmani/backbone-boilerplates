load('vertx.js');

vertx.deployVerticle('mongo-persistor', null, 1, function() {
    load('static_data.js');
});

var webServerConf = {

    web_root: 'public',
    port: 8080,
    host: 'localhost',
    ssl: false,

    bridge: true,

    permitted: [
        {
            address : 'vertx.mongopersistor',
            match : {
                collection : 'todos'
            }
        },
        {
            address : 'todos.broadcast.event'
        }        
        
    ]
};

vertx.deployVerticle('web-server', webServerConf);