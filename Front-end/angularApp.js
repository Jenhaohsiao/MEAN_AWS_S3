angular.module('jenhaoApp', [])
    .controller('rootCtrl', function ($scope, $http) {
        var vm = this;
        vm.ownerName = "Jen-Hao";
    })

    .controller('authCtrl', function ($scope, $http) {
        var vm = this;
        vm.authorize = true;
        vm.accessResult = "Please fill out the form"

        vm.account = {};
        vm.startAuth = () => {
            if (vm.authorize == true) {
                vm.authorize = false;
            } else {
                vm.authorize = true;
            }
        }

        vm.submit = () => {
            console.log(vm.account);

            $http.post('api', vm.account)
                .then(
                    function successCallback(response) {
                        vm.accessResult = response.data;
                    },
                    function errorCallback(response) {
                        vm.accessResult = response.data;
                    }

                )
        }

        vm.reset = () => {
            vm.account = {};

        }
    });