// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  if(window.cordova && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  }
  if(window.StatusBar) {
    StatusBar.styleDefault();
  }


});
});

var weathers = {};
weathers.Thunderstorm = {'name': 'Tempestade', 'image':'rain', 'color' : '#462443'};
weathers.Drizzle = {'name': 'Garoa', 'image':'rain', 'color' : '#462443'};
weathers.Rain = {'name': 'Chuva', 'image':'rain', 'color' : '#462443'};
weathers.Clouds = {'name': 'Nuvens', 'image':'clear', 'color' : '#f69165'};
weathers.Clear = {'name': 'Céu Claro', 'image':'clear', 'color' : '#dc4b56'};

app.value('weathers', weathers);

app.controller('defautCtrl', function($scope, $http)
{

  //CENTER THE IMAGE
  /*ico_weather.addEventListener('load', function()
  {
    ico_weather.style.marginLeft = (window.innerWidth - ico_weather.width) / 2 + 'px';
  });*/


  $scope.status = 'Localizando...';
  $scope.weather = {};

  //GET THE WEATHER USING OPEN WEATHER MAP'S API BASED ON LATITUDE AND LONGITUDE
  $scope.getWeather = function(location) {
    var lat = location.coords.latitude;
    var long = location.coords.longitude;

    //TESTES
    //BAHIA
    // lat = -12.970381700000000000;
    // long =  -38.51238200000000000;

    //GET THE DATA
    $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?units=metric&lang=en&mode=json&cnt=1&lat=" + lat +"&lon=" + long + "&mode=json")
    .then(function(res)
    {
      if(res.status == 200 && res.statusText == "OK") //HTTP CHECK
      {
        if(res.data.cod == 200) //found the city
        {

          var weather = $scope.weather = res.data.list[0].weather[0].main; //main weather for today. Like Rain or Clouds. 

          $scope.city = res.data.city.name;

          if(weathers[weather] !== undefined) //weather found
          {
           $scope.weather = weathers[weather];
           
           $scope.weatherStyle = {'background-color': weathers[weather].color};
         }
         else
         {
          $scope.image = 'default';
          $scope.weather.name = 'Novo clima - ' + weather;
        }

      }
      else
      {
        $scope.status = 'Não consegui encontrar a sua localização =(';
      }
    }

  });

  };
  //REQUIRE USER LOCATION
  navigator.geolocation.getCurrentPosition($scope.getWeather);
});
