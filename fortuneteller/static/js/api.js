var testApp = angular.module("testApp", []);
testApp.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});
testApp.controller("testController", function ($scope, $http, $timeout,) {
    var uuid = uuid();
    $scope.home = "This is the homepage";
    $scope.uuid = uuid;

    $scope.getRequest = function () {
        console.log("I've been pressed!");
        $http.get("http://127.0.0.1:8000/api/fortune/count/", {
            headers: {
                "Authorization": "Token 4cdf0ff1ce73836573336b63f912a4fe00b7fb44"

            }
        }).then(
            function successCallback(response) {
                $scope.response = response;
                getFortune(response.data['total']);
                console.log($scope.uuid);
            },
            function errorCallback(response) {
                console.log("Unable to perform get request");
            }
        );
    };

    function getFortune(num) {
        console.log("GetFortune has been called!");
        num = Math.floor((Math.random() * num) + 1);
        enrollFortunefunction(num);

    };


    function enrollFortunefunction(num, uuid) {
        $http.post("http://127.0.0.1:8000/api/givenFortunes/",
            {
                "fortune_word": num,
                "is_used": false,
                "unique_qr": $scope.uuid,
                "has_shaken": false,
                "the_user": null
            }, {
                headers: {
                    "Authorization": "Token 4cdf0ff1ce73836573336b63f912a4fe00b7fb44"
                }
            }).then(
            function successCallback(response) {
                $timer = $timeout(function () {
                    $scope.getData();
                }, 1000)
            },
            function errorCallback(response) {
                console.log("Unable to perform get request");
            }
        );
    }


    function uuid() {
        function randomDigit() {
            if (crypto && crypto.getRandomValues) {
                var rands = new Uint8Array(1);
                crypto.getRandomValues(rands);
                return (rands[0] % 16).toString(16);
            } else {
                return ((Math.random() * 16) | 0).toString(16);
            }
        }

        var crypto = window.crypto || window.msCrypto;
        return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, randomDigit);
    }


    function hasShaken() {
        $http.get("http://127.0.0.1:8000/api/givenFortunes/" + $scope.uuid, {
            headers: {
                "Authorization": "Token 4cdf0ff1ce73836573336b63f912a4fe00b7fb44"

            }
        }).then(
            function successCallback(response) {
                $scope.response = response;
                if (response.data['has_shaken'] == true) {
                    $scope.$apply(function () {
                        $location.path('/');
                        $window.location.reload();
                    });
                }
            },
            function errorCallback(response) {
                console.log("Unable to perform get request");
            }
        );
    }

    $scope.getData = function () {
        var url = 'http://127.0.0.1:8000/api/givenFortunes/' + $scope.uuid
        $http.get(url, {
            headers: {
                "Authorization": "Token 4cdf0ff1ce73836573336b63f912a4fe00b7fb44"
            }
        }).then(
            function successCallback(response) {
                $scope.response = response;
                if (response.data['is_used'] === true) {
                    $http.get("http://127.0.0.1:8000/api/fort/" + response.data['fortune_word'], {
                        headers: {
                            "Authorization": "Token 4cdf0ff1ce73836573336b63f912a4fe00b7fb44"

                        }
                    }).then(
                        function successCallback(response) {
                            $scope.response = response;
                            getFortune(response.data['total']);
                            window.alert('Your fortune for today is:' + response.data['fortune']);
                            $timeout.cancel(timer);
                            $scope.hasShaken();


                        },
                        function errorCallback(response) {
                            console.log("Unable to perform get request");
                        }
                    );
                }

                console.log("Yes! Checked the uuid again");

            },
            function errorCallback(response) {
                console.log("Unable to perform get request");
            }
        );
    };

    $scope.hasShakenTimer = function () {
        timer = $timeout(function () {
            $scope.getData();
            $scope.hasShaken();
        }, 1000)
    };

});
