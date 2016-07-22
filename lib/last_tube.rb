require 'sinatra/base'
require 'haml'


class LastTube < Sinatra::Base

  set :haml, format: :html5
  set :public_folder, './lib'

  get '/' do
    redirect '/tubes/search'
  end

  get '/tubes/search' do
    @from_station_search_result = 'placeholder for Station found'
    haml :station_search
  end
end
