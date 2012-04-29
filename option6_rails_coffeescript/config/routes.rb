App::Application.routes.draw do
  resources :todos
  root to: 'todos#index'
end
