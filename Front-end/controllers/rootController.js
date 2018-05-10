angular.module('jenhaoApp', [])
    .controller('rootCtrl', function ($scope, $http) {
        var vm = this;
        vm.ownerName = "Jen-Hao";
    })

    .controller('authCtrl', function ($scope, $http) {
        var vm = this;
        vm.authorizeView = true;
        vm.menuView = false;
        vm.accessResult = "Please fill out the form"

        vm.account = {};

        vm.submitKey = () => {
            console.log(vm.account);

            $http.post('api', vm.account)
                .then(
                    function successCallback(response) {
                        vm.accessResult = response.data;
                        vm.menuView = true;
                        vm.authorizeView = false;
                    },
                    function errorCallback(response) {
                        vm.accessResult = response.data;
                    }
                )
        }
    })

    .controller('menuCtrl', function ($scope, $http) {

        var vm = this;
        vm.ctrlName = "select one button";
        vm.bucketsList = [];

        vm.listBuckets = () => {
            vm.ctrlName = "List buckets";
            $http.post('api/listBuckets')
                .then(
                    function successCallback(response) {
                        console.log("Get it, list:",response.data);
                        vm.bucketsList = response.data;
                    },
                    function errorCallback(response) {
                    }
                )
        }

        vm.addBucket = () => {
            vm.ctrlName = "Add a bucket";
        }

    });