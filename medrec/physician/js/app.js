var app = angular.module("medrecApp", []);

app.controller("TimeCtrl", TimeCtrl);
app.controller("DrugListCtrl", DrugListCtrl);


function TimeCtrl() {
	var currentDate = new Date();
	this.timeString = currentDate.toTimeString();
}


function DrugListCtrl($scope, $http) {
	$scope.hasDrugInfo = false;

	$http.get('http://dev.ca.com:8282/rest/abl/medrecdb/v1/main:DRUGS', {
		headers: {'Authorization':'Basic YWRtaW46UGFzc3dvcmQx'}
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
		$scope.hasDrugInfo = false;
	}

	$scope.liveButttonPressed = function () {
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

	$scope.virtualButttonPressed = function () {
		var brandname = $scope.selectedPrescription.NAME;
		var URL = 'http://localhost:54084/drug/event.json?search=brand_name:' + brandname;

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

	$scope.toggle = true;

	$scope.$watch('toggle', function () {
		$scope.toggleText = $scope.toggle ? 'Live' : 'Virtual';
	});

	$scope.invokeButttonPressed = function () {
		var URL;
		var brandname = $scope.selectedPrescription.NAME;
		if ($scope.toggleText == "Live") {
			URL = 'https://api.fda.gov/drug/event.json?search=brand_name:' + brandname;

			
		} else {
//			URL = 'http://localhost:54084/drug/event.json?search=brand_name:' + brandname;
			URL = 'http://172.17.17.20:8001/drug/event.json?search=brand_name:' + brandname;
		}

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




	/*  Function to invoke API when the select drop-down changes
	$scope.selectedItemChanged = function () {
		var brandname = $scope.selectedPrescription.NAME;
		var URL = 'https://api.fda.gov/drug/event.json?search=brand_name:' + brandname;     
 
	/**	Desktop Virtual Service	     	
		var URL = 'http://localhost:54084/drug/event.json?search=brand_name:' + brandname; 
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
	*/

}
