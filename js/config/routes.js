( function() {
  'use strict';

  Donna.app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    // Begone, hash paths!
    $locationProvider.html5Mode(true);

    $routeProvider.when( '/', {
      templateUrl: Donna.templates.index,
      controller: 'IndexController'
    });

    $routeProvider.when( '/sign_in', {
      templateUrl: Donna.templates.signIn,
      controller: 'AuthenticationController'
    });

    $routeProvider.otherwise({redirectTo: '/'});

  }]);

  Donna.app.run(['$rootScope', '$location', 'Auth', '$http', function ($rootScope, $location, Auth, $http) {

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
      if (!Auth.isAuthenticated()) {
        // Clear the Authorization header & redirect
        $http.defaults.headers.common['Authorization'] = undefined;
        $location.path('/sign_in');
      } else {
        // Make sure the Authorization header is set
        $http.defaults.headers.common['Authorization'] = 'Bearer '+ Auth.token().access_token;
      }
    });

  }]);

})();
