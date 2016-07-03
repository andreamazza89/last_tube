require 'sinatra/base'
require 'haml'


class LastTube < Sinatra::Base

  set :haml, format: :html5

  get '/' do
    'Welcome to LastTube!'
  end

  get '/tubes/search' do
    haml :station_search, locals: { from_station: 'placeholder for Station found'  }
  end
end
