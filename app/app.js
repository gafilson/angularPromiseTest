'use strict';

window.resolvePromiseProviderPromise;
window.promiseProviderPromise = new Promise((resolve, reject) => {
  window.resolvePromiseProviderPromise = resolve;
});

// Declare app level module which depends on views, and components
angular.module('myApp', [
      'ngRoute',
      'myApp.view1',
      'myApp.view2',
      'myApp.version'
    ])

    .run(['$q', '$window', function ($q, $window) {
      $window.resolvePromiseProviderPromise($q);
    }])

    .controller('fooController', ['$scope', '$window', function ($scope, $window) {
      $scope.foo = 'foo';
      $window.doWithPromise(() => {
        $scope.foo = 'bar';
      })

    }])
;


window.doWithPromise = function (resolve, reject) {
  return window.promiseProviderPromise.then(($q) => {
    return $q.when().then(resolve, reject);
  });
}



