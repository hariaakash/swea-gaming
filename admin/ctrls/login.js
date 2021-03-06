angular.module('gameApp')
	.controller('loginCtrl', function ($scope, $rootScope, $http, $location, $state) {
		$rootScope.checkAuth();
		$scope.login = function () {
			$http({
				method: 'POST',
				url: $rootScope.apiUrl + 'admin/login',
				data: $scope.user
			}).then(function (res) {
				if (res.data.status == true) {
					var adminKey = res.data.adminKey;
					Cookies.set('adminKey', adminKey);
					$location.path('/home');
					swal({
						title: 'Success',
						text: 'You have successfully Signed In !!',
						type: 'success',
						showConfirmButton: true
					});
				} else {
					swal({
						title: 'Failed',
						text: res.data.msg,
						type: 'error',
						timer: 2000,
						showConfirmButton: true
					});
				}
			}, function (res) {
				swal("Fail", "Some error occurred, try again.", "error");
			});
		};
	});
