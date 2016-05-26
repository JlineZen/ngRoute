angular.module('demo', ['ngRoute'])
			.directive('helloTab', function() {
				return {
					restrict: 'E',
					replace: true,
					transclude: true,
					template: '<div><div ng-transclude></div></div>'
				}
			})
			.config(['$routeProvider', function($routeProvider) {
				$routeProvider
					.when('/home', {
						template: '<h3>This is {{message}} page</h3>',
						controller: 'homeCtrl'
					})
					.when('/articles', {
						template: '<ul><li ng-repeat="article in articles"><a href="#/article/{{$index+1}}">{{article.title}}</a></li></ul>',
						controller: 'articlesCtrl',
						resolve: {
							'getArticles': ['$http', function($http) {
									return $http.get('data/data.json');
							}]
						}
					}).
					when('/article/:id', {
						template: '<h4>{{poem.title}}</h4><p>{{poem.content}}</p>',
						controller: 'articleCtrl',
						resolve: {
							'getArticles': ['$http', function($http) {
									return $http.get('data/data.json');
							}]
						}
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
				$scope.articles = getArticles.data.articles;
			}])
			.controller('articleCtrl', [
				'$scope', 
				'$routeParams', 
				'getArticles', 
				function($scope, $routeParams, getArticles) {
					getArticles.data.articles.forEach(function(item, index) {
						if ($routeParams.id == item.id) {
							$scope.poem = item;
							return false;
						}
					});
			}]);