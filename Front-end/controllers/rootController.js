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
        vm.account.apiKey = "AKIAJQULL24YO6PNPBQA";
        vm.account.apiToken = "YbbwJf+k9CRdeY0US8YvIfZ0rhk0cWdXFiPBrJNC";


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

        vm.reset = () => {
            vm.account = {};
        }
    })

    .controller('menuCtrl', function ($scope, $http) {

        var vm = this;
        vm.ctrlName = "select one button";
        vm.listBucketsView = false;
        vm.listAddBucketView = false;
        vm.listBucketObjectView = false;
        
        vm.bucketsList = [];

        vm.newBucket = {};
        vm.newBucket.name = "";
        vm.selectedBucket = null;

        vm.listBuckets = () => {
            vm.listBucketsView = true;
            vm.listAddBucketView = false;
            vm.listBucketObjectView = false;
            
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

            vm.getSrc = function(selectedBucketName,item){

            // return "https://s3.ca-central-1.amazonaws.com/rugsbucket/"+ item.Key;
            return `https://s3.ca-central-1.amazonaws.com/${selectedBucketName}/${item.Key}`;

        }
        //list bucket objects
        vm.viewObjects = (name) => {
            vm.listBucketsView = false;
            vm.listAddBucketView = false;
            vm.listBucketObjectView = true;
            vm.selectedBucket = name;
            vm.ctrlName = "List buckets Objects";
            $http.post('api/listBucketObjects', {bucketName:name})
                .then(
                    function successCallback(response) {
                        console.log("Get it, list:",response.data);
                        vm.bucketObjectList = response.data.Versions;
                    },
                    function errorCallback(err) {
                        console.log(err);
                    }
                )
        }


        vm.selectAddBucket = () => {
            vm.ctrlName = "Add a bucket";
            vm.listBucketsView = false;
            vm.listAddBucketView = true;
            vm.listBucketObjectView = false;
            
        }

        vm.submitAddBucket = () => {
            
            console.log("bucket name:", vm.newBucket );

            // $http.post('api/addABucket',newBucketName )
            $http.post('api/addABucket',vm.newBucket)
            .then(
                function successCallback(response) {
                    console.log("add bucket success");
                    // console.log("Added a new bucket:",response.data);
                    // vm.bucketsList = response.data;
                },
                function errorCallback(response) {
                    console.log("add bucket fail");
                }
            )
        }

    })
    .controller('bucketCtrl', function ($scope, $http) {
        var vm = this;
        vm.ownerName = "Jen-Hao";
    });