var appRouter = angular.module('jenhaoApp', ['ngMaterial', 'ngMessages', 'ui.router'])

appRouter.config(function($stateProvider){
    $stateProvider

    .state({
        name:"page1",
        url:"/page1",
        template: "<h1>This is page1</h1>"
    })

    .state({
        name:"page2",
        url:"/page2",
        template: "<h1>This is page2</h1>"
    })

    .state({
        name:"page3",
        url:"/page3",
        template: "<h1>This is page3</h1>"
    })
})