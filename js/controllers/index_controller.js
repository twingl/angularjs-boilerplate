( function() {
  'use strict';

  Donna.controllers.controller( 'IndexController', ['$scope', '$http', 'Auth', function($scope, $http, Auth) {

    $scope.user = { name: "..." };

    //FIXME this is being fired during the (un)authentication
    //process, resulting in unauthenticated requests being made
    //before the headers can be set
    $http.get('http://api.twin.gl/v1/users/me').success(
      function(data) {
        $scope.user = data;
      }); //$http.get /v1/users/me

  }]);

})();
