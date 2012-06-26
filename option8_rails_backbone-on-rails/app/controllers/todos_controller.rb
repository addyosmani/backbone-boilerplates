class TodosController < ApplicationController
  respond_to :html, :json

  def create
    respond_with Todo.create params[:todo]
  end

  def index
    respond_with @todos = Todo.all
  end

  def update
    respond_with Todo.find(params[:id]).update_attributes params[:todo]
  end

  def destroy
    respond_with Todo.find(params[:id]).destroy
  end

end
