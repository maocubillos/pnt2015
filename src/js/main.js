'use strict'

var pnt2015 = angular.module( 'pnt2015', [
  'ui.router',
  'pnt2015.mosaic'
]);

pnt2015.controller('pnt2015Ctrl', ['$rootScope', '$scope', '$state', '$element', function($rootScope, $scope, $state, $element){
  var vm = this;
  $scope.sectionActive = $state.current.name || 'home';
  $scope.mosaicImages = [
    {url: 'image_1.png'},
    {url: 'image_2.png'},
    {url: 'image_3.png'},
    {url: 'image_4.png'},
    {url: 'image_5.png'}
  ]
  $state.get('home').onEnter = function(){
    $scope.isHome = true;
  }
  $state.get('home').onExit = function(){
    $scope.isHome = false;
  }
  $rootScope.$on('$stateChangeSuccess', function(event){
    if($state.current.name === 'section3' ){
      $scope.mosaicSectionActive = $state.current.name;
    }else{
      $scope.mosaicSectionActive = 'home'
    }
  });
}]);

var mosaic = angular.module('pnt2015.mosaic', [])
  .controller('MosaicController', MosaicController)
  .directive('mosaic', MosaicDirective);

/*
* Mosaic Directive
*
*/
function MosaicDirective(){
  console.log('Init Mosaic :: Init Directive');
  return{
    scope:{
      images: '=',
      section: '='
    },
    templateUrl: 'partials/mosaic.html',
    controller: 'MosaicController as MosaicCtrl',
    link: function MosaicLink(){
      debugger;
    }
  }
}

function MosaicController(){
  console.log('Init Mosaic :: Init controller');

  (function(){
    debugger;
  })();
}

pnt2015.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/home");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "partials/home.html"
    })
    .state('section1', {
      url: "/turismo-sostenible",
      templateUrl: "partials/section1.html"
    })
    .state('section1.list', {
      url: "/list",
      templateUrl: "partials/list1.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      },
      onEnter: function(){
        debugger;
      },
      onExit: function(){

      }
    })
    .state('section2', {
      url: "/premio-nacional",
      templateUrl: "partials/section2.html"
    })
    .state('section2.list', {
      url: "/list",
      templateUrl: "partials/list2.html",
      views: {
          "viewA": {
            templateUrl: "partials/list1.html",
            controller: function($scope) {
              $scope.items = ["A", "List", "Of", "Items"];
            },
          },
          "viewB": {
            templateUrl: "partials/list2.html",
            controller: function($scope) {
              $scope.things = ["A", "Set", "Of", "Things"];
            },
          }
      }
    }).state('section3', {
      url: "/ganadores",
      templateUrl: "partials/section3.html"
    })
        .state('section3.page1', {
          url: "/ganador1",
          templateUrl: "partials/ganador1.html"
        })
    .state('section4', {
      url: "/calidad-turistica",
      templateUrl: "partials/section2.html"
    })
    .state('section5', {
      url: "/marca-certificacion",
      templateUrl: "partials/section2.html"
    })
    .state('section6', {
      url: "/directorio",
      templateUrl: "partials/section2.html"
    });


});