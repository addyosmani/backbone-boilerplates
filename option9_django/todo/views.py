import json

from django.http import HttpResponse
from django.core import serializers
from django.views.generic import View 
from django.views.decorators.csrf import csrf_exempt


from .models import Todo

class TodoView(View):

	
	
	def get(self, request,todo_id= None, **kwargs):
		

		if todo_id:
			todo = Todo.objects.get(pk=todo_id)
			data = {'text':todo.text,'order':todo.order, 'done':todo.done,'_id':todo.id}
			return HttpResponse(json.dumps(data), content_type='application/json', status=200)


		else:
			todos = Todo.objects.all()
			data = []
			for todo in todos:
			 data.append({'text':todo.text,'order':todo.order, 'done':todo.done,'_id':todo.id})

		return HttpResponse(json.dumps(data), content_type='application/json', status=200)


	def post(self, request,*args, **kwargs):

		DATA = json.loads(request.body)
		
		todo= Todo.objects.create(
			text = DATA.get('text'),
			done = DATA.get('done'),
			order = DATA.get('order')
			)
		DATA['_id'] = todo.id
         
		return HttpResponse(json.dumps(DATA), content_type='application/json', status=201)

	def put(self, request,todo_id, **kwargs):


		todo = Todo.objects.get(pk=todo_id)
		DATA = json.loads(request.body)
		print (DATA)
		
		todo.text = DATA.get('text').encode('utf-8')
		todo.done = DATA.get('done')
		todo.order = DATA.get('order')
		todo.save()
		DATA['_id'] = todo.id
        
		return HttpResponse(json.dumps(DATA), content_type='application/json', status=200)

	def delete(self, request,todo_id, **kwargs):


		todo = Todo.objects.get(pk=todo_id)
		todo.delete()
         
		return HttpResponse('')


	

	@csrf_exempt
	def dispatch(self,*args,**kwargs):
		return super(TodoView,self).dispatch(*args, **kwargs)

  





