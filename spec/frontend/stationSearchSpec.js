var api = jasmine.createSpy('api');
var searchEngine = new stationSearch(api);
var searchParameters = ['vic', 'cross', 'brixton'];
var randomSearchParameter = searchParameters[Math.floor(Math.random()*searchParameters.length)];

describe('Station search', function() {
  
  it('.search() sends the correct request to the api',function() {
    searchEngine.search(randomSearchParameter, function(result) {console.log(result)});
    expect(api).toHaveBeenCalled();
  });
});
