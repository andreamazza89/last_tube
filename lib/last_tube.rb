require 'sinatra/base'

class LastTube < Sinatra::Base
  get '/' do
    'Hello LastTube!'
  end
end
