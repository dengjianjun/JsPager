var app = angular.module('myApp', []);
app.controller('customerController', function($scope, $http, $element) {
    $scope.url = 'Content/CustomersData.txt?pageIndex=1&pageSize=10';
    var allCustomers;
    $scope.customers = [];
    $scope.loadData = function() {
        $http.get($scope.url)
            .success(function(response) {
                allCustomers = response;
                debugger;
                var pageIndex = 1, pageSize = 10;
                var beginIndex = (pageIndex - 1) * pageSize;
                var endIndex = pageIndex * pageSize - 1;
                for (var i = beginIndex; i < endIndex; i++) {
                    if (!allCustomers.Rows[i]) {
                        break;
                    }
                    $scope.customers.push(allCustomers.Rows[i]);
                }
                var pageCount = parseInt((allCustomers.Total / pageSize)) + (allCustomers.Total % pageSize ? 1 : 0);
                var navigator = pager(pageSize, pageIndex, pageCount, 'Content/CustomersData.txt');
                //var dv = $('<div></div>');
                //dv.append($(navigator));

                $scope.navigator = navigator;
                //$element.html($scope.navigator);
            }).filter(
                'to_trusted', ['$sce', function($sce) {
                    return function(text) {
                        return $sce.trustAsHtml(text);
                    };
                }]
            );
    };
    //$scope.loadData();
});