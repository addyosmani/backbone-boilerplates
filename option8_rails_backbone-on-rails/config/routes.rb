Todomvc::Application.routes.draw do
  get "todos/index"

  resources :todos
  root to: 'todos#index'
end
