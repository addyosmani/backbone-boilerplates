modules = {
    todo {
        dependsOn 'jquery, underscore, backbone'

        resource url: '/todos.css'
	resource url: '/todos.js'
    }
    backbone {
	resource url: '/backbone.js'
    }
    underscore {
	resource url: '/underscore.js'
    }
}
