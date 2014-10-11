'use strict';

/**
 * @ngdoc service
 * @name zaninApp.AchivementsFactory
 * @description
 * # AchivementsFactory
 * Factory in the zaninApp.
 */
angular.module('zaninApp')
  .factory('AchievementsFactory', function (localStorageService) {

    var game;

    var allAchivements = [
      {name:'over9000', desc:'It\'s over 9000'},
      {name:'combo25', desc:'25 combo'},
      {name:'combo50', desc:'50 combo'},
      {name:'combo100', desc:'100 combo'},
      {name:'combo250', desc:'250 combo'},
      {name:'combo500', desc:'500 combo'},
      {name:'red25', desc:'25 red'},
      {name:'red50', desc:'50 red'},
      {name:'red100', desc:'100 red'},
      {name:'red250', desc:'250 red'},
      {name:'red500', desc:'500 red'},
      {name:'blue25', desc:'25 blue'},
      {name:'blue50', desc:'50 blue'},
      {name:'blue100', desc:'100 blue'},
      {name:'blue250', desc:'250 blue'},
      {name:'blue500', desc:'500 blue'},
      {name:'yellow25', desc:'25 yellow'},
      {name:'yellow50', desc:'50 yellow'},
      {name:'yellow100', desc:'100 yellow'},
      {name:'yellow250', desc:'250 yellow'},
      {name:'yellow500', desc:'500 yellow'},
      {name:'green25', desc:'25 green'},
      {name:'green50', desc:'50 green'},
      {name:'green100', desc:'100 green'},
      {name:'green250', desc:'250 green'},
      {name:'green500', desc:'500 green'},
      {name:'tap25', desc:'25 tap'},
      {name:'tap50', desc:'50 tap'},
      {name:'tap100', desc:'100 tap'},
      {name:'tap250', desc:'250 tap'},
      {name:'tap500', desc:'500 tap'},
      {name:'doubleTap25', desc:'25 doubleTap'},
      {name:'doubleTap50', desc:'50 doubleTap'},
      {name:'doubleTap100', desc:'100 doubleTap'},
      {name:'doubleTap250', desc:'250 doubleTap'},
      {name:'doubleTap500', desc:'500 doubleTap'},
      {name:'swipeRight25', desc:'25 swipeRight'},
      {name:'swipeRight50', desc:'50 swipeRight'},
      {name:'swipeRight100', desc:'100 swipeRight'},
      {name:'swipeRight250', desc:'250 swipeRight'},
      {name:'swipeRight500', desc:'500 swipeRight'},
      {name:'swipeLeft25', desc:'25 swipeLeft'},
      {name:'swipeLeft50', desc:'50 swipeLeft'},
      {name:'swipeLeft100', desc:'100 swipeLeft'},
      {name:'swipeLeft250', desc:'250 swipeLeft'},
      {name:'swipeLeft500', desc:'500 swipeLeft'},
      {name:'tps4', desc:'4 tps'},
      {name:'tps5', desc:'5 tps'},
      {name:'tps6', desc:'6 tps'},
      {name:'tps8', desc:'8 tps'},
      {name:'tps10', desc:'10 tps'},
      {name:'failMaster', desc:'You are the fail master'},
      {name:'feelBalance', desc:'feel the right balance'}
    ];

    //check if the player has already met this achievement
    var checkPlayerAchievement = function(combo, ach){
      // TODO: check game center to check the achievement
      if(ach.indexOf(combo) > -1){
        return 0;
      }
      return 1;
    };

    var checkGestureColorBoringAchievements = function(a, achievements){
      if(game.taps[a].count >= 25 && checkPlayerAchievement(a+'25',achievements)){
        game.metAchievements.push(a+'25');
        achievements.push(a+'25');
      } else if(game.taps[a].count >= 50 && checkPlayerAchievement(a+'50',achievements)){
        game.metAchievements.push(a+'50');
        achievements.push(a+'50');
      } else if(game.taps[a].count >= 100 && checkPlayerAchievement(a+'100',achievements)){
        game.metAchievements.push(a+'100');
        achievements.push(a+'100');
      }else if(game.taps[a].count >= 250 && checkPlayerAchievement(a+'250',achievements)){
        game.metAchievements.push(a+'250');
        achievements.push(a+'250');
      }else if(game.taps[a].count >= 500 && checkPlayerAchievement(a+'500',achievements)){
        game.metAchievements.push(a+'500');
        achievements.push(a+'500');
      }
    };

    function check(g){

      game = g;

      var achievements = localStorageService.get('achievements');
      if(achievements === null){
        achievements = [];
      }

      //Check all Achievements conditions

      //Over 9000
      if(game.points > 9000 && checkPlayerAchievement('over9000',achievements)){
        game.metAchievements.push('over9000');
        achievements.push('over9000');
      }

      //ComboXX
      if(game.highestCombo >= 25 && checkPlayerAchievement('combo25',achievements)){
        game.metAchievements.push('combo25');
        achievements.push('combo25');
      } else if(game.highestCombo >= 50 && checkPlayerAchievement('combo50',achievements)){
        game.metAchievements.push('combo50');
        achievements.push('combo50');
      } else if(game.highestCombo >= 100 && checkPlayerAchievement('combo100',achievements)){
        game.metAchievements.push('combo100');
        achievements.push('combo100');
      }else if(game.highestCombo >= 250 && checkPlayerAchievement('combo250',achievements)){
        game.metAchievements.push('combo250');
        achievements.push('combo250');
      }else if(game.highestCombo >= 500 && checkPlayerAchievement('combo500',achievements)){
        game.metAchievements.push('combo500');
        achievements.push('combo500');
      }

      //Taps per second
      if(game.tapsPerSecond >= 4 && game.points >= 1000 && checkPlayerAchievement('tps4',achievements)){
        game.metAchievements.push('tps4');
        achievements.push('tps4');
      } else if(game.tapsPerSecond >= 5 && game.points >= 2000 && checkPlayerAchievement('tps5',achievements)){
        game.metAchievements.push('tps5');
        achievements.push('tps5');
      } else if(game.tapsPerSecond >= 6 && game.points >= 3000 && checkPlayerAchievement('tps6',achievements)){
        game.metAchievements.push('tps6');
        achievements.push('tps6');
      }else if(game.tapsPerSecond >= 8 && game.points >= 6000 && checkPlayerAchievement('tps8',achievements)){
        game.metAchievements.push('tps8');
        achievements.push('tps8');
      }else if(game.tapsPerSecond >= 10 && game.points >= 7000 && checkPlayerAchievement('tps10',achievements)){
        game.metAchievements.push('tps10');
        achievements.push('tps10');
      }


      //Balance Master
      if( (game.taps.swipeLeft.count === game.taps.swipeRight.count) &&
        game.points > 2000 &&
        checkPlayerAchievement('balanceMaster',achievements)){
        
        game.metAchievements.push('balanceMaster');
        achievements.push('balanceMaster');
      }

      //Tap Engineer
      if( (game.taps.tap.count === game.taps.doubleTap.count) &&
        game.points > 2000 &&
        checkPlayerAchievement('tapEngineer',achievements)){
        
        game.metAchievements.push('tapEngineer');
        achievements.push('tapEngineer');
      }

      //Fail Master
      if(game.points === 0 && checkPlayerAchievement('failMaster', achievements)){
        game.metAchievements.push('failMaster');
        achievements.push('failMaster');
      }

      //Boring color achievements
      checkGestureColorBoringAchievements('red', achievements);
      checkGestureColorBoringAchievements('blue', achievements);
      checkGestureColorBoringAchievements('green', achievements);
      checkGestureColorBoringAchievements('yellow', achievements);

      //Boring gesture achievements
      checkGestureColorBoringAchievements('tap', achievements);
      checkGestureColorBoringAchievements('doubleTap', achievements);
      checkGestureColorBoringAchievements('swipeLeft', achievements);
      checkGestureColorBoringAchievements('swipeRight', achievements);

      //save achievements into localStorage
      localStorageService.add('achievements', achievements);

      for (var i=0; i<game.metAchievements.length; i++){
        gameCenter.reportAchievement('com.neatnait.zanin.achievement.'+game.metAchievements[i], null, null);
      }

    }

    // Public API here
    return {
      check: check,
      allAchivements: allAchivements
    };
  });
