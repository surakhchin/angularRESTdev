'use strict';

angular.module('budgetsApp')

    .controller('JumboController', ['$scope', 'budgetFactory', function($scope, budgetFactory) {

            $scope.date = new Date();

            $scope.sortType     = 'id'; // set the default sort type
            $scope.sortReverse  = false;  // set the default sort order
            $scope.searchBudgets   = '';     // set the default search/filter term

          // create the list of campaign budgets
          //   $scope.budgets = budgetFactory.getBudgets();


            //ok create list of campaign budgets but this time with REST
            $scope.showMenu = false;
            $scope.message = "Loading ... Attempting REST .query call on budget resource";
            budgetFactory.getBudgets().query(
                function(response) {
                    $scope.budgets = response;
                    $scope.showMenu = true;
                },
                function(response) {
                                $scope.message = "Error: "+response.status + "could not GET budget resource from server" + response.statusText;
                            });



            //code for add a budget button

            $scope.mybudget = {budget: 0, cpc: 0, cpm: 0, id: 0, spent: 0};

            $scope.addBudget = function () {


                $scope.budgets.push($scope.mybudget);

                // $scope.commentForm.$setPristine();

                $scope.mybudget = {budget: 0, cpc: 0, cpm: 0, id: 0, spent: 0};
            };

            //code for delete a budget button

            $scope.deleteBudget = function (Budget) {

                if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS BUDGET PLAN?") == true) {
                    $scope.removeIndex = $scope.budgets.map(function (item) {
                    return item.id;
                }).indexOf(Budget.id);
                ~$scope.removeIndex && $scope.budgets.splice($scope.removeIndex, 1);
                } else {
                    console.log(Budget);
                console.log($scope.budgets);
                }


            };

            // code for updating Campaign Budget Object

            $scope.updateObject = function () {
                console.log($scope.mybudget);
                console.log($scope.budgets);

                budgetFactory.getBudgets().update($scope.budgets);




            };




























            $scope.submitComment = function () {
                                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                                $scope.dish.comments.push($scope.mycomment);

                                //REST .UPDATE
                budgetFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                                $scope.commentForm.$setPristine();
                                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            }


        }])



;
