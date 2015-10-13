﻿module KanbanBoardApp {
    export class Settings {
        //public static ApiLocation = "https://yeticode.azure-api.net/kanban";
        //public static ApiLocation = "https://yeticode-kanbanboardapi.azurewebsites.net";
        public static ApiLocation = "http://localhost:2943/";
    }

    var app = angular.module('KanbanBoardApp', ['ngRoute', 'ngDraggable', 'ui.bootstrap', 'AdalAngular']);
    
    app.config(
        ['$routeProvider', '$locationProvider', '$httpProvider', 'adalAuthenticationServiceProvider', ($routeProvider, $locationProvider, $httpProvider, adalProvider) => {
            $routeProvider.when('/boards', {
                controller: 'BoardController',
                templateUrl: '/App/Views/Board.html',
                requireADLogin: true
            }).when('/', {
                controller: 'HomeController',
                templateUrl: 'App/Views/Login.html'
            });

            $httpProvider.defaults.headers.common['Ocp-Apim-Subscription-Key'] = '7cbb6034a7da4095a7904032077975c9';

            adalProvider.init(
                {
                    //instance: 'http://localhost:56134/',
                    //tenant: false,
                    tenant: 'johnyeticodeco.onmicrosoft.com',
                    clientId: '1349a492-7dd3-4105-9605-059e12770f9f',
                    extraQueryParameter: 'nux=1'
                    //cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
                },
                $httpProvider
            );
        }]);

    app.controller("HomeContorller", ['$scope', HomeController]);
    app.controller("BoardController", ['$scope', '$http', '$modal', BoardController]);
    app.controller("AddBoardController", ['$scope', '$http', '$modalInstance', AddBoardController]);
    app.controller("AddColumnController", ['$scope', '$http', '$modalInstance', 'currentBoard', AddColumnController]);
    app.controller("AddTaskController", ['$scope', '$http', '$modalInstance', 'currentBoard', 'columnSlug', AddTaskController]);
    app.controller("UpdateTaskController", ['$scope', '$http', '$modalInstance', 'currentBoard', 'columns', 'currentTask', UpdateTaskController]);
}