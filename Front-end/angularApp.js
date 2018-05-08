angular.module('jenhaoApp', [])
.controller('rootCtrl', function($scope, $http){
    var vm = this;
    vm.ownerName ="Jen-Hao";
})

.controller('authCtrl', function($scope, $http){
    var vm = this;
    vm.authorize = true;

    vm.account = {};
    vm.startAuth = () => {
        if (vm.authorize == true){
            vm.authorize = false;
        }else{
            vm.authorize = true;
        }
    }

    vm.submit = () =>{
        console.log(vm.account);

        $http.post('api',vm.account).
        then(function(response) {
            console.log("posted from front-end successfully",response.config.data);

        }).catch(function(response) {
            console.error("error in posting");
        })
    }

    vm.reset = () =>{
        vm.account = {};

    }
});

