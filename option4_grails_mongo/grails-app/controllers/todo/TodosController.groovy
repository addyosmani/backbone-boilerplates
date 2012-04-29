package todo

import grails.converters.JSON

class TodosController {

    def index() {
        render( Todo.findAll() as JSON )
    }
    
    def save() {
    	def todo = new Todo(request.JSON);
    	render( todo.save() as JSON )
    }
    
	def delete() {
		def todo = Todo.findById(params.id)
		todo?.delete()
		render(todo as JSON );
	}
	
	def edit() {
		def todo = Todo.findById(params.id)
		bindData(todo, request.JSON)
		render(todo.save() as JSON )				
	}
}
