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
    if( $state.current.name === 'home' ){
      $scope.useMosaic = true;
    }else if($state.current.name === 'section3'){
      $scope.useMosaic = false;
      $scope.showList = true;
    }else{
      $scope.useMosaic = false;
    }
    $scope.mosaicSectionActive = $state.current.name;
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
      
    }
  }
}

function MosaicController(){
  console.log('Init Mosaic :: Init controller');

  (function(){
    
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
      templateUrl: "partials/section3.html",
      controller: function($scope) {
        $scope.$parent.showList = true;
        $scope.winnersList = {
          category1:{
            categoryName: 'Mejor en acciones para la conservación del patrimonio cultural',
            winners: [
              {name: 'Gaira Cafe cumbia house',logoURL: '', URL: 'section3.page1'}
            ]
          },
          category2:{
            categoryName: 'Mejor en acciones para la conservación de la naturaleza, los ecosistemas y las especies',
            winners: [
              {name: 'Abordar viajes y turismo',logoURL: '',  URL: 'section3.page2'},
              {name: 'Sonesta hotel',logoURL: '',  URL: 'section3.page3'}
            ]
          },
          category3:{
            categoryName: 'Mejor en acciones para el Beneficio de las comunidades Locales',
            winners: [
              {name: 'Combia',logoURL: '',  URL: 'section3.page4'}
            ]
          },
          category4:{
            categoryName: 'Mejor en turismo verde',
            winners: [
              {name: 'Expreso Viajes y Turismo',logoURL: '',  URL: 'section3.page5'},
              {name: 'Armenia Hotel',logoURL: '',  URL: 'section3.page6'},
              {name: 'El Hotel don Lolo',logoURL: '',  URL: 'section3.page7'}
            ]
          }
        };
      }
    })
        .state('section3.page1', {
          url: "/ganador1",
          templateUrl: "partials/ganador1.html",
          controller: function($scope) {
            $scope.title = 'Gaira cafe y cumbia house';
            $scope.$parent.$parent.useMosaic = true;
            $scope.$parent.$parent.showList = false;
          }
        })
        .state('section3.page2', {
          url: "/ganador2",
          templateUrl: "partials/ganador2.html",
          controller: function($scope) {
            $scope.title = 'Abordar';
            $scope.$parent.$parent.useMosaic = true;
            $scope.$parent.$parent.showList = false;
          }
        })
        .state('section3.page3', {
          url: "/ganador3",
          templateUrl: "partials/ganador3.html"
        })
        .state('section3.page4', {
          url: "/ganador4",
          templateUrl: "partials/ganador4.html"
        })
        .state('section3.page5', {
          url: "/ganador5",
          templateUrl: "partials/ganador5.html"
        })
        .state('section3.page6', {
          url: "/ganador6",
          templateUrl: "partials/ganador6.html"
        })
        .state('section3.page7', {
          url: "/ganador7",
          templateUrl: "partials/ganador7.html"
        })
    .state('section4', {
      url: "/calidad-turistica",
      templateUrl: "partials/section4.html"
    })
    .state('section5', {
      url: "/marca-certificacion",
      templateUrl: "partials/section5.html"
    })
    .state('section6', {
      url: "/directorio",
      templateUrl: "partials/section6.html"
    });


});