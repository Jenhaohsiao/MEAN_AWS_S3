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

        vm.submit = () => {
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

        vm.reset = () => {
            vm.account = {};

        }
    });