var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var flag = false;
var level = 0;

$(document).keydown(function() {
  if (flag === false) {
    flag = true;
    nextSequence();
  }
})

function nextSequence() {
  if (flag === true) {
    $("h1").html("level " + level);
    for (var i = 0; i <= level; i++) {
      setTimeout(function() {
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);
        $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColor);
      }, 500*i);
    }
    level++;
  }
}


$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  if (userClickedPattern.length === gamePattern.length) {
    if (checkAnswer(userClickedPattern, gamePattern) === true) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    } else {
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").html("Game Over, Press Any Key to Restart");
      flag = false;
      level = 0;
    }
    userClickedPattern = [];
    gamePattern = [];
  }
})

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(a, b) {
  if (a.length !== b.length) {
    return false;
  } else {
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
}
