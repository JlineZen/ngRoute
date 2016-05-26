angular.module('demo', ['ngRoute'])
			.directive('helloTab', function() {
				return {
					restrict: 'E',
					replace: true,
					transclude: true,
					template: '<div><div ng-transclude></div></div>'
				}
			})
			.factory('getArticles', ['$http', function($http) {
					return $http.get('data/data.json');
			}])
			.config(['$routeProvider', function($routeProvider) {
				$routeProvider
					.when('/home', {
						template: '<h3>This is {{message}} page</h3>',
						controller: 'homeCtrl'
					})
					.when('/articles', {
						template: '<ul><li ng-repeat="article in articles"><a href="#/article/{{$index+1}}">{{article.title}}</a></li></ul>',
						controller: 'articlesCtrl'
					}).
					when('/article/:id', {
						template: '<h4>{{poem.title}}</h4><p>{{poem.content}}</p>',
						controller: 'articleCtrl'
					})
					.when('/about', {
						template: '<h3>This is {{message}} page</h3>',
						controller: 'aboutCtrl'
					})
					.otherwise({
						redirectTo: '/home'
					})
			}])
			.controller('homeCtrl', ['$scope', function($scope) {
				$scope.message = "home";
			}])
			.controller('aboutCtrl', ['$scope', function($scope) {
				$scope.message = "about";
			}])
			.controller('articlesCtrl', ['$scope', 'getArticles', function($scope, getArticles) {
				getArticles.then(
					function(resp) {
						$scope.articles = resp.data.articles;
					}, function(error) {
						console.log(error);
						$scope.articles = [];
					}
				);
			}])
			.controller('articleCtrl', [
				'$scope', 
				'$routeParams', 
				'getArticles', 
				function($scope, $routeParams, getArticles) {
					getArticles.then(
						function(resp) {
							resp.data.articles.forEach(function(item, index) {
								if ($routeParams.id == item.id) {
									$scope.poem = item;
									return false;
								}
							});
						},
						function(error) {
							console.log(error);
						}
					);
			}]);