"use strict";angular.module("zaninApp",["ngCookies","ngResource","ngSanitize","ngRoute","ngTouch","hmTouchEvents"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("zaninApp").controller("MainCtrl",["$scope","$interval","$timeout",function(a,b,c){function d(){b.cancel(e);var c=b(function(){a.createNewAction()},i);return e=c,c}var e,f,g,h=function(a,b){this.gesture=a,this.color=b},i=5e3;a.colors=[{color:"blue",side:"left"},{color:"red",side:"left"},{color:"green",side:"right"},{color:"orange",side:"right"}],a.firstClick=null,a.gestures=[{g:"tap"},{g:"doubleTap"}],a.actions=[],a.points=0,a.timeLeft=60,a.totalTimePlayed=0,a.lvl="Level 1",b(function(){a.timeLeft<=0?(a.lvl="GAME OVER",a.timeLeft=0):(a.totalTimePlayed++,a.totalTimePlayed<30?(a.timeLeft--,a.lvl="Level 1"):a.totalTimePlayed<60?(a.timeLeft--,a.timeLeft--,a.lvl="Level 2"):a.totalTimePlayed<90?(a.timeLeft-=3,a.lvl="Level 3"):a.totalTimePlayed<120&&(a.timeLeft-=4,a.lvl="Level 4"))},1e3),c(function(){a.colors=[{color:"blue",side:"right"},{color:"red",side:"right"},{color:"green",side:"left"},{color:"orange",side:"left"}]},5e4),b(function(){a.gestures=[{g:"tap"},{g:"doubleTap"},{g:"swipeLeft"},{g:"swipeRight"}]},2e4),a.init=function(){a.actions.push(a.createRandomAction()),a.actions.push(a.createRandomAction()),a.actions.push(a.createRandomAction()),a.actions.push(a.createRandomAction())},a.createRandomAction=function(){var b=a.colors[Math.floor(a.colors.length*Math.random())].color,c=a.gestures[Math.floor(a.gestures.length*Math.random())].g;return new h(c,b)},a.aciertos=function(){a.points++,a.timeLeft++,a.createNewAction()},a.createNewAction=function(){a.actions.splice(0,1),a.actions.push(a.createRandomAction())};var j=function(b){b===a.actions[0].color?(a.aciertos(),d()):console.log("no")};a.checkGesture=function(b,c){return"doubleTap"===f&&"tap"===c&&g===b?(f=c,void(g=b)):(f=c,g=b,void(a.actions[0].gesture===c&&j(b)))}}]);