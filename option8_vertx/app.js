load('vertx.js');
vertx.deployModule('vertx.mongo-persistor-v1.0', null, 1, function() {
    load('static_data.js');
});

var webServerConf = {

    web_root: 'public',
    port: 8080,
    host: 'localhost',
    ssl: false,

    bridge: true,

    inbound_permitted: [
        {
            address : 'vertx.mongopersistor',
            match : {
                collection : 'todos'
            }
        },

        {
            address : 'todos.broadcast.event'
        }        
        
    ],

    outbound_permitted: [
        {}
    ]
};

vertx.deployModule('vertx.web-server-v1.0', webServerConf);
