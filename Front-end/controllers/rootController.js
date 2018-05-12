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
        vm.uploadObjectView = false;

        vm.bucketsList = [];

        vm.newBucket = {};
        vm.newBucket.name = "";
        vm.selectedBucket = null;

        vm.uploadObject64 = null;

        vm.listBuckets = () => {
            vm.listBucketsView = true;
            vm.listAddBucketView = false;
            vm.listBucketObjectView = false;
            vm.uploadObjectView = false;

            vm.ctrlName = "List buckets";
            $http.post('api/listBuckets')
                .then(
                    function successCallback(response) {
                        console.log("Get it, list:", response.data);
                        vm.bucketsList = response.data;
                    },
                    function errorCallback(response) {}
                )
        }

        vm.getSrc = function (selectedBucketName, item) {

            if (!selectedBucketName || !item) {
                return `#`
            } else {
                // return "https://s3.ca-central-1.amazonaws.com/rugsbucket/"+ item.Key;
                return `https://s3.ca-central-1.amazonaws.com/${selectedBucketName}/${item.Key}`;
            }

        }
        //list bucket objects
        vm.listObjects = function (selectedBucketName) {
            vm.listBucketsView = false;
            vm.listAddBucketView = false;
            vm.listBucketObjectView = true;
            vm.uploadObjectView = false;

            vm.selectedBucket = selectedBucketName;
            vm.ctrlName = "List buckets Objects";

            $http.post('api/listBucketObjects', {
                    bucketName: selectedBucketName
                })
                .then(
                    function successCallback(response) {
                        console.log("Get it, list:", response.data);
                        vm.bucketObjectList = response.data.Versions;
                    },
                    function errorCallback(err) {
                        console.log(err);
                    }
                )
        }


        vm.selectAddBucket = function () {
            vm.ctrlName = "Add a bucket";
            vm.listBucketsView = false;
            vm.listAddBucketView = true;
            vm.listBucketObjectView = false;
            vm.uploadObjectView = false;

        }

        vm.submitAddBucket = function () {
            vm.ctrlName = "";

            $http({
                method: 'POST',
                url: 'api/addABucket',
                data: vm.newBucket
            }).then(
                function successCallback(response) {
                    console.log("Added bucket successful");
                    vm.ctrlName = response.data.message;
                    vm.newBucket.name = "";
                },
                function errorCallback(err) {
                    console.log("add bucket fail");
                    vm.ctrlName = err.data.message.message;
                }
            )
        }

        vm.onUploadObject = function (selectedBucketName) {
            vm.selectedBucket = selectedBucketName;
            vm.ctrlName = "Upload Object to: " + selectedBucketName;
            vm.listBucketsView = false;
            vm.listAddBucketView = false;
            vm.listBucketObjectView = false;
            vm.uploadObjectView = true;
        }

        vm.getBase64 = function (file) {

            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                console.log(reader.result);
                vm.uploadObject64 = reader.result;
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };


        }

        vm.submitUploadFile = function (selectedBucketName) {

            var file = document.getElementById('selectedFile').files[0];
            vm.getBase64(document.getElementById('selectedFile').files[0]);

            setTimeout(function () {

                var uploadObject = {};
                uploadObject.bucketName = selectedBucketName;
                uploadObject.fileName = file.name;
                uploadObject.file = vm.uploadObject64;

                $http.post('upload/uploadObject', uploadObject)
                    .then(
                        function successCallback(response) {
                            console.log("upload object successful");
                            vm.ctrlName = response.data.message;
                        },
                        function errorCallback(response) {
                            console.log("upload object fail");
                            vm.ctrlName = response.data.message;
                        }
                    )

            }, 3000);
        }

        vm.deleObject = function (selectedBucketName, selectedObject) {

            objectWillDel = {};
            objectWillDel.bucketName = selectedBucketName;
            objectWillDel.objectKey = selectedObject.Key;

            $http({
                method: 'POST',
                url: 'api/deleObject',
                data: objectWillDel
            }).then(
                function successCallback(response) {
                    console.log("Del object successful");
                    vm.listObjects(selectedBucketName);
                    vm.ctrlName = response.data.message;
                },
                function errorCallback(response) {
                    console.log("Del object fail");
                    vm.ctrlName = response.data.message;
                }
            )
        }

        vm.deleBucket = function (selectedBucketName) {

            bucketWillDel = {};
            bucketWillDel.bucketName = selectedBucketName;

            $http({
                method: 'POST',
                url: 'api/deleBucket',
                data: bucketWillDel
            }).then(
                function successCallback(response) {
                    console.log("Del Bucket successful");
                    vm.listBuckets();
                    vm.ctrlName = response.data.message;
                    // vm.newBucket.name = "";
                    // vm.viewObjects(selectedBucketName);
                },
                function errorCallback(response) {
                    console.log("Del Bucket fail");
                    vm.ctrlName = response.data.message;
                }
            )
        }

    });