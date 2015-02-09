//pageNo按照现实中的习惯，从1开始计数。SQL语句中需做相应处理
angular.module('app').directive('paging', function ($timeout) {
    return {
        replace: true,
        scope: {
            page: '=pageObject',
            query: '=clickFunction'
        },
        controller: function ($scope, $element) {
            $scope.createHtml = function () {
                var maxPage = Math.ceil($scope.page.itemsCount / $scope.page.pageSize);
                var pageNo = $scope.page.pageNo;
                var str = '<div class="sabrosus">';
                if (maxPage > 10) {
                    if (pageNo > 3) {//minPage + 2
                        str += '<a href="javascript:;">《</a>';
                        str += '……';
                    }
                    for (var i = pageNo <= 2 ? 1 : pageNo - 2 ; i <= (pageNo >= maxPage - 2 ? maxPage : pageNo + 2) ; i++) {
                        if (i == 1) {
                            if (pageNo == 1) {
                                str += '<span class="disabled">《</span>';
                                str += '<span class="current">' + i + '</span>';
                            } else {
                                str += '<a href="javascript:;">《</a>';
                                str += '<a href="javascript:;">' + i + '</a>';
                            }
                        } else if (i == maxPage) {
                            if (pageNo == maxPage) {
                                str += '<span class="current">' + i + '</span>';
                                str += '<span class="disabled">》</span>';
                            } else {
                                str += '<a href="javascript:;">' + i + '</a>';
                                str += '<a href="javascript:;">》</a>';
                            }
                        } else {
                            if (pageNo == i) {
                                str += '<span class="current">' + i + '</span>';
                            } else {
                                str += '<a href="javascript:;">' + i + '</a>';
                            }
                        }
                    }
                    if (pageNo < maxPage - 2) {
                        str += '……';
                        str += '<a href="javascript:;">》</a>';
                    }
                } else {
                    for (var i = 1 ; i <= maxPage ; i++) {
                        if (i == 1) {
                            if (pageNo == 1) {
                                str += '<span class="disabled">《</span>';
                                str += '<span class="current">' + i + '</span>';
                            } else {
                                str += '<a href="javascript:;">《</a>';
                                str += '<a href="javascript:;">' + i + '</a>';
                            }
                        } else if (i == maxPage) {
                            if (pageNo == maxPage) {
                                str += '<span class="current">' + i + '</span>';
                                str += '<span class="disabled">》</span>';
                            } else {
                                str += '<a href="javascript:;">' + i + '</a>';
                                str += '<a href="javascript:;">》</a>';
                            }
                        } else {
                            if (pageNo == i) {
                                str += '<span class="current">' + i + '</span>';
                            } else {
                                str += '<a href="javascript:;">' + i + '</a>';
                            }
                        }
                    }
                }

                str += '</div>';
                $element.html(str);
                $scope.bindEvent();
            };
            $scope.bindEvent = function () {
                $element.find('a').on('click', function () {
                    var text = $(this).html();
                    var pageNo = $scope.page.pageNo;
                    if ($.trim(text) == '《') {
                        $scope.page.pageNo = pageNo - 1;
                    } else if ($.trim(text) == '》') {
                        $scope.page.pageNo = pageNo + 1;
                    } else {
                        $scope.page.pageNo = parseInt(text);
                    }
                    $scope.query();
                    $scope.createHtml();
                });
            }
            $scope.createHtml();
            $scope.$watch('page.itemsCount', function () {
                $scope.createHtml();
            })
        }
    }
});