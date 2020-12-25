
require 'sidekiq/web'
require 'sidekiq-scheduler/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq'
  devise_for :users

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'calendar#show'
  get :load_notes, controller: :calendar
  resources :notes
end
