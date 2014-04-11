"use strict";angular.module("zaninApp",["ngCookies","ngResource","ngSanitize","ngRoute","ngTouch","ngAnimate","hmTouchEvents","chartjs-directive","LocalStorageModule"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/splash.html",controller:"SplashCtrl"}).when("/game",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/menu",{templateUrl:"views/menu.html",controller:"MenuCtrl"}).when("/chart",{templateUrl:"views/chart.html",controller:"ChartCtrl"}).when("/records",{templateUrl:"views/records.html",controller:"RecordsCtrl"}).when("/tutorial",{templateUrl:"views/tutorial.html",controller:"TutorialCtrl"}).when("/tutorial",{templateUrl:"views/tutorial.html",controller:"TutorialCtrl"}).otherwise({redirectTo:"/"})}]).run(["$rootScope","$location",function(a,b){a.go=function(c,d){a.side=d,b.path(c)}}]),angular.module("zaninApp").controller("MainCtrl",["$rootScope","$scope","$interval","$timeout","$animate","$location",function(a,b,c,d,e,f){function g(){b.timeLeft=5,d(function(){b.loaded=!0},2e3),k=c(function(){function a(a,b){return Math.log(b)/Math.log(a)}var d=Math.floor(a(b.baselvl,b.game.points));d<=b.maxlvl&&(b.level=d),b.game.points>n&&(n+=o,h()),b.timeLeft<=0?(b.timeLeft=0,c.cancel(k),q.fade(1,0,1e3),i(),f.path("/menu")):b.timeLeft-=Math.floor(b.level/b.ratetime)},1e3)}function h(){b.colors.sort(function(){return.5-Math.random()})}function i(){j(),b.game.end=new Date,b.game.timePlayed=b.game.end-b.game.start,a.game=b.game,console.log(b.game)}function j(){b.game.highestCombo<b.combo&&(b.game.highestCombo=b.combo),b.game.combos.push({combo:b.combo,lost:new Date})}var k,l,m,n,o,p=function(a,b){this.gesture=a,this.color=b};b.path="game";var q=new Howl({urls:["audio/loop.wav"],loop:!0});b.init=function(){b.game={start:new Date,end:!1,taps:{red:{count:0,color:"#E74A43"},blue:{count:0,color:"#44C1EB"},yellow:{count:0,color:"#FFC634"},green:{count:0,color:"#33cc99"},misses:{count:0,color:"#4D5360"}},combos:[]},b.loaded=!1,b.colors=[{color:"blue",side:"left"},{color:"red",side:"left"},{color:"green",side:"right"},{color:"yellow",side:"right"}],b.firstClick=null,b.gestures=[{g:"tap"},{g:"doubleTap"}],b.actions=[],b.game.points=0,b.timeLeft=0,b.totalTimePlayed=0,b.level=1,b.combo=0,b.game.highestCombo=0,b.maxlvl=20,b.baselvl=2,b.ratePoints=1.2,b.ratetime=.7,b.game.points=b.baselvl,b.maxenergy=7,b.energy=0,b.timeincrease=1,n=300,o=300,d(function(){g()},2e3);var a=b.colors[Math.floor(b.colors.length*Math.random())].color,c=b.gestures[1].g,e=new p(c,a);b.actions.push(e),b.actions.push(b.createRandomAction()),b.actions.push(b.createRandomAction()),b.actions.push(b.createRandomAction())},b.getComboClass=function(){return Math.ceil(b.combo/20)},b.load=function(){b.init()},c(function(){b.gestures=[{g:"tap"},{g:"doubleTap"},{g:"swipeLeft"},{g:"swipeRight"}]},2e4),b.createRandomAction=function(){var a=b.colors[Math.floor(b.colors.length*Math.random())].color,c=b.gestures[Math.floor(b.gestures.length*Math.random())].g;return new p(c,a)},b.aciertos=function(a){b.game.points+=Math.floor(b.ratePoints*b.level),b.timeLeft+=(b.energy+1)*b.timeincrease,b.combo++,b.energy<b.maxenergy&&b.energy++,b.game.taps[a].count++,b.createNewAction()},b.fallos=function(){j(),b.combo=0,b.energy=0,b.game.taps.misses.count++},b.createNewAction=function(){b.actions.splice(0,1),b.actions.push(b.createRandomAction())};var r,s=function(a){a===b.actions[0].color?(b.aciertos(a),e.addClass(angular.element("."+a),"pushed",function(){e.removeClass(angular.element("."+a),"pushed")})):b.fallos()},t=0;b.checkGesture=function(a,c,d){return b.loaded=!0,"tap"===d&&"doubleTap"===b.actions[0].gesture?t?(b.fallos(),void(t=0)):void t++:t&&"doubleTap"!==d?(b.fallos(),void(t=0)):(t=0,b.actions[0].gesture===d?s(c):b.fallos(),l=d,m=c,void(r=a))}}]),angular.module("zaninApp").controller("SplashCtrl",["$scope","$interval","$timeout","$animate","$location","User","localStorageService",function(a,b,c,d,e,f,g){a.path="splash",a.go=function(a){e.path("/"+a)};var h=g.get("userId");if(console.log(h),null==h){var i=new f;i.$save(function(a){console.log(a),g.add("userId",a._id)})}}]),angular.module("zaninApp").controller("MenuCtrl",["$rootScope","$scope","$interval","$timeout","GameStat","localStorageService",function(a,b,c,d,e,f){a.path="menu";var g=f.get("userId");void 0===a.game&&(a.game={}),void 0===a.oldPoints&&(a.oldPoints=0);var h=document.querySelector("#points"),i=new Odometer({el:h,value:a.oldPoints,format:"d"});d(function(){i.update(a.game.points)},3e3),void 0!==a.game&&(a.oldPoints=a.game.points);var j=new e;j.user=g,j.data=a.game,j.$save(),b.msToTime=function(a){var b=parseInt(a%1e3/100),c=parseInt(a/1e3%60),d=parseInt(a/6e4%60),e=parseInt(a/36e5%24);return e=10>e?"0"+e:e,d=10>d?"0"+d:d,c=10>c?"0"+c:c,d+"' "+c+"'' "+b+"'''"}}]),angular.module("zaninApp").controller("ChartCtrl",["$rootScope","$scope","$interval","$timeout",function(a,b,c,d){b.path="chart";var e=[],f=a.game.taps;for(var g in f)e.push({value:f[g].count,color:f[g].color});d(function(){b.clicksChart={data:e,options:{}}},1e3)}]),angular.module("zaninApp").controller("RecordsCtrl",["$scope","$rootScope","GameStat",function(a,b,c){b.path="rercords",a.test="",c.query({},function(a){console.log(a)});var d=new c;d.user="sook",console.log("sook here"),console.log(d),d.$save()}]),angular.module("zaninApp").controller("TutorialCtrl",["$scope","$rootScope",function(a,b){b.path="tutorial"}]),angular.module("zaninApp").factory("GameStat",["$resource",function(a){var b=a("http://gamestats-neatnait.rhcloud.com/api/gamestat/:gameStatId",{gameStatId:"@id"},{charge:{method:"POST",params:{charge:!0}}});return b}]),angular.module("zaninApp").factory("User",["$resource",function(a){var b=a("http://gamestats-neatnait.rhcloud.com/api/user/:userId",{userId:"@id"},{});return b}]);