
(function () {
	var app = angular.module("medrecApp");
	app.controller("PatientDetailsCtrl", PatientDetailsCtrl);


	function PatientDetailsCtrl($scope, $http) {

		$scope.letterLimit = 10;

//		$http.get('http://172.17.17.91:8282/rest/abl/medrecdb/v1/main:PATIENTS', {
		$http.get('http://dev.ca.com:8080/medrecdb-patients', {
			headers: {'Authorization':'Basic YWRtaW46Q0FkZW1vMTIzIQ=='}
		})
			.then(function (response) {
				$scope.patient = response.data;
				console.log("Response is: " + $scope.patient);
			}).
			catch(function (response) {
				// Handle error
				var data = response.data;
				var status = response.status;
				var statusText = response.statusText;
				var headers = response.headers;
				var config = response.config;
				console.log("Response data is: " + data);
			});
	}
})();
