var app = angular.module("medrecApp", []);

app.controller("TimeCtrl", TimeCtrl);
app.controller("DrugListCtrl", DrugListCtrl);


function TimeCtrl() {
	var currentDate = new Date();
	this.timeString = currentDate.toTimeString();
}


function DrugListCtrl($scope, $http) {
	$scope.hasDrugInfo = false;

	$http.get('http://172.17.17.91:8282/rest/abl/medrecdb/v1/main:DRUGS', {
		headers: { "Authorization": "Basic YWRtaW46UGFzc3dvcmQx" }
	})
		.then(function (response) {
			$scope.drug = response.data;
			console.log("Response is: " + $scope.drug);
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

	$scope.selectedItemChanged = function () {
		var brandname = $scope.selectedPrescription.NAME;
		var URL = 'https://api.fda.gov/drug/event.json?search=brand_name:' + brandname;
		console.log(URL);

		$http.get(URL)
			.then(function (response) {
				$scope.drugresult = response.data.results[0];
				$scope.manufacturer = response.data.results[0].patient.drug[0].openfda.manufacturer_name;
				$scope.hasDrugInfo = true;
			}).
			catch(function (response) {
				$scope.hasDrugInfo = false;
				// Handle error
				var data = response.data;
				var status = response.status;
				var statusText = response.statusText;
				var headers = response.headers;
				var config = response.config;
				console.log("Response data is: " + data);
			});
	}
}
