"use strict";angular.module("zaninApp",["ngCookies","ngResource","ngSanitize","ngRoute","ngTouch","ngAnimate","hmTouchEvents"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/splash.html",controller:"SplashCtrl"}).when("/game",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("zaninApp").controller("MainCtrl",["$scope","$interval","$timeout","$animate",function(a,b,c,d){function e(){b.cancel(f);var c=b(function(){a.createNewAction()},j);return f=c,c}var f,g,h,i=function(a,b){this.gesture=a,this.color=b},j=5e3;a.init=function(){a.colors=[{color:"blue",side:"left"},{color:"red",side:"left"},{color:"green",side:"right"},{color:"yellow",side:"right"}],a.firstClick=null,a.gestures=[{g:"tap"},{g:"doubleTap"}],a.actions=[],a.points=0,a.timeLeft=101,a.totalTimePlayed=0,a.level=1,a.combo=0,a.maxlvl=20,a.baselvl=2,a.ratePoints=1.2,a.ratetime=1,a.points=a.baselvl,a.maxenergy=7,a.energy=0,a.timeincrease=1,a.actions.push(a.createRandomAction()),a.actions.push(a.createRandomAction()),a.actions.push(a.createRandomAction()),a.actions.push(a.createRandomAction())},a.load=function(b){c(function(){a.init()},b)},b(function(){function b(a,b){return Math.log(b)/Math.log(a)}var c=Math.floor(b(a.baselvl,a.points));c<=a.maxlvl&&(a.level=c),a.timeLeft<=0?(a.lvl="GAME OVER",a.level="GAME OVER",a.timeLeft=0):a.timeLeft-=Math.floor(a.level/a.ratetime)},1e3),c(function(){a.colors=[{color:"blue",side:"right"},{color:"red",side:"right"},{color:"green",side:"left"},{color:"yellow",side:"left"}]},4e4),b(function(){a.gestures=[{g:"tap"},{g:"doubleTap"},{g:"swipeLeft"},{g:"swipeRight"}]},2e4),a.createRandomAction=function(){var b=a.colors[Math.floor(a.colors.length*Math.random())].color,c=a.gestures[Math.floor(a.gestures.length*Math.random())].g;return new i(c,b)},a.aciertos=function(){a.points+=Math.floor(a.ratePoints*a.level),a.timeLeft+=(a.energy+1)*a.timeincrease,a.combo++,a.energy<a.maxenergy&&a.energy++,a.createNewAction()},a.fallos=function(){a.combo=0,a.energy=0},a.createNewAction=function(){a.actions.splice(0,1),a.actions.push(a.createRandomAction())};var k=function(b){b===a.actions[0].color?(a.aciertos(),e(),d.addClass(angular.element("."+b),"pushed",function(){d.removeClass(angular.element("."+b),"pushed")})):a.fallos()};a.checkGesture=function(b,c){return console.log(g+" - "+c+" - "+a.actions[0].gesture),"doubleTap"===g&&"tap"===c&&h===b?(g=c,void(h=b)):(a.actions[0].gesture===c?k(b):"tap"===g&&"tap"===c&&"doubleTap"===a.actions[0].gesture||a.fallos(),g=c,void(h=b))}}]),angular.module("zaninApp").controller("SplashCtrl",["$scope","$interval","$timeout","$animate","$location",function(a,b,c,d,e){a.go=function(a){e.path(a)}}]);