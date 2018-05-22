var GlobalVariable = new StartingVariable(false, null);
$(document).ready(GlobalVariable.pick_number());

// changed the hotdog the_number to the_numberZ b/c things are 
// better w/ the z at the end
function StartingVariable(correct, the_numberZ) {
  this.correct = correct;
  this.the_number = the_numberZ;

  this.pick_number = function() {
    var random_number = Math.ceil(Math.random() * 100);
    this.the_number = random_number;
    var walkCenter = new Walking();
    walkCenter.startWalk();
  };

}

function Walking() {

  this.Step = {
    step: 0,
    wallUp: false
  };

  this.startWalk = function() {
    this.walkBath = this.walkBath.bind(this);
    this.wlkCenter = setInterval(this.walkBath, 70);
  }.bind(this);

  this.walkBath = function() {
    this.Step.step += 0.3;

    if (this.Step.step >= 40 && !this.Step.wallUp) {
      this.Step.wallUp = true;
      var slidein = new SideWalls();
      slidein.slideWallsClose();
    }
    if (this.Step.step <= 45) {
      $(".walkDude").css({
        left: this.Step.step + "%"
      });

    } else {
      var modal = new Modal();
      modal.openModal();
      this.panick();
      clearInterval(this.wlkCenter);
    }
  };

  this.panick = function() {
    this.reset = setTimeout(function() {
      $(".walkDude").removeClass("walkLeftDude");
    }.bind(this), 100);

    $(".walkDude").addClass("animationPanick");
  };

  this.run = function() {

    this.reset = setTimeout(function() {
      $(".walkDude").removeClass("animationPanick");
    }, 100);

    $(".walkDude").addClass("gtfo");
    this.step = 45;
    this.run = setInterval(this.runBtch.bind(this), 100);
  };

  this.runBtch = function() {
    this.step += 1.3;

    if (this.step <= 105) {
      $(".walkDude").css({
        left: this.step + "%"
      });

    } else {

      clearInterval(this.run);

    }
  };

}


function Modal() {
  this.openModal = function() {
    this.modal = $(".modal");
    this.modal.css("display", "block");

    this.modal.on("click", this.closeModal.bind(this));
  };


  this.closeModal = function() {
    this.modal.css("display", "none");
    $(".center").removeClass("hide");
    var clock=new Clock(35);

    var guess = new GuessClick();
    guess.button();

  };
}

function GuessClick() {

  this.MakeG = {
    the_number: GlobalVariable.the_number,
    the_guess: null,
    element: $(".responsive_div"),
    submit: $(".guess_input")

  };

  this.button = function() {
    this.MakeG.submit.on("keydown", function(e) {
      if (e.keyCode === 13) {
        this.make_guess()
      }
    }.bind(this));
  };

  this.make_guess = function() {
    this.MakeG.the_guess = parseInt($(".guess_input").val());
    $(".guess_input").val("")

    if (isNaN(this.MakeG.the_guess)) {
      this.MakeG.element.text("WTF!");
      this.MakeG.element.addClass("animated shake enterText ");
      var reset = setTimeout(function() {
        this.MakeG.element.removeClass("animated shake  ");
      }.bind(this), 700);
    }
    if (this.MakeG.the_guess > this.MakeG.the_number) {

      this.MakeG.element.text("Too High!");
      this.MakeG.element.addClass("animated shake enterText ");
      var reset = setTimeout(function() {
        this.MakeG.element.removeClass("animated shake  ");
      }.bind(this), 700);
    }
    if (this.MakeG.the_guess < this.MakeG.the_number) {
      this.MakeG.element.text("Too Low!");
      this.MakeG.element.addClass("animated shake enterText");
      var reset = setTimeout(function() {
        this.MakeG.element.removeClass("animated shake ");
      }.bind(this), 700);
    }
    if (this.MakeG.the_guess === this.MakeG.the_number) {
      this.MakeG.element.text("You guessed it!");
      this.MakeG.element.addClass("animated flipInX won");
      $("input.guess_input").attr({
        disabled: true
      });
      GlobalVariable.correct = true;
    }
  };
}


function SideWalls() {
  this.slide = 300;

  this.slideWallsClose = function() {
    this.slideIt = setInterval(this.slideTime.bind(this), 33);
  }.bind(this);

  this.slideTime = function() {
    this.slide -= 1;
    if (this.slide > 255.5) {
      $(".wall-left").css({
        left: "-" + this.slide + "px"
      });
      $(".wall-right").css({
        right: "-" + this.slide + "px"
      });
    } else {
      clearInterval(this.slideIt);
    }
  };

  this.sideWallsOpen = function() {
    this.SideWalls = {
      pos: $(".wall-left").position(),
      posLocation: function() {
        return this.SideWalls.pos.left;
      }.bind(this)

    };

    this.changedPos = this.SideWalls.posLocation();
    this.changedPos *= -1;

    this.slideTimeOpen = function() {

      this.changedPos += 10;
      if (this.changedPos <= 310) {
        $(".wall-left").css({
          left: "-" + this.changedPos + "px"
        });
        $(".wall-right").css({
          right: "-" + this.changedPos + "px"
        });
      } else {
        clearInterval(this.slideOpen);
        var runs = new Walking();
        runs.run();
      }
    }
    this.slideOpen = setInterval(this.slideTimeOpen.bind(this), 300);
  };


}

function Clock(num) {
  var cWall=new CloseWalls(3500);
  cWall.CloseWall();
  this.counter=num;

  this.handleClockTick=function() {

    this.clock = $(".clock");
    this.clock.addClass("animated pulse ");

    var reset = setTimeout(function() {
      this.clock.removeClass("animated pulse ");
    }.bind(this), 700)
    this.clock.text(this.counter);
    this.counter--

    if (this.counter < 10) {
      this.clock.removeClass("seconds10");
      this.clock.addClass("seconds5");
    }

    if (this.counter < 0 && !GlobalVariable.correct) {
      $("input.guess_input").attr({
        disabled: true
      });
      clearInterval(this.timer);
      finishOutPut();
    } else if (GlobalVariable.correct) {
      clearInterval(this.timer);
      finishOutPut();
    }
  };

    this.timer=setInterval(this.handleClockTick.bind(this), 1000);


}

function CloseWalls(time) {
  this.add = time;

  this.CloseWall=function(){
    this.closeWall = setInterval(this.closeWallTimer.bind(this), 900);
  }.bind(this);

  this.closeWallTimer=function() {

    this.add -= 10;
    if (GlobalVariable.correct) {

      clearInterval(this.closeWall);
      this.openWall(this.add);
      var sideWallsOp = new SideWalls();
      sideWallsOp.sideWallsOpen();


    }

    if (this.add > 3100 && !GlobalVariable.correct) {
      var changeTop = $('.bricks').css({
        top: "-" + this.add + "px"
      })

    } else if (!GlobalVariable.correct) {
      clearInterval(this.closeWall);

      youDie(this.add);
    }

  };

  this.openWall=function(time){
          this.add = time;
          this.openWall = setInterval(this.openWallTimer, 1000);


              this.openWallTimer=function(){
                  this.add += 100;

                  if (this.add < 3800) {
                    var changeTop = $('.bricks').css({
                      top: "-" + this.add + "px"
                    })

                  } else {
                    clearInterval(this.openWall);
                  }

           };
   };

}


// function openWall(time) {
//   var add = time;
//
//   function openWallTimer(adds) {
//
//     add += 100;
//
//     if (add < 3800) {
//       var changeTop = $('.bricks').css({
//         top: "-" + add + "px"
//       })
//
//     } else {
//       clearInterval(openWall);
//     }
//
//   }
//
//   var openWall = setInterval(openWallTimer, 1000);
// }

function youDie(time) {
  var YouDie = {
    add: time,
    squish: false,
    // squishAudio: new Audio('sounds/sqwish.mp3'),
    openWall: setInterval(openWallTimer, 100)
  }

  function openWallTimer() {

    YouDie.add -= 100;
    if (YouDie.add > 2970 && !YouDie.squish) {
      YouDie.squish = true;
      // YouDie.squishAudio.play();
    }
    if (YouDie.add > 1800) {
      var changeTop = $('.bricks').css({
        top: "-" + YouDie.add + "px"
      })

    } else {
      clearInterval(openWall);
    }

  }


}



function finishOutPut() {
  var responseDiv = $(".responsive_div");
  var waitText = null;
  if (GlobalVariable.correct) {
    waitText = setTimeout(function() {
      responseDiv.text("You Win!");
      playAgain();
    }, 1300);

  } else {
    var youDie = setTimeout(function() {
      $(".responsive_div").text("He Died..");
      $(".responsive_div").addClass("animated shake enterText");
      waitText = setTimeout(function() {
        $(".responsive_div").addClass("enterText");
        responseDiv.text("You Lose");
        playAgain();
      }, 1300);
    }, 350);


  }
}

function playAgain() {
  var playAgainBtn = setTimeout(function() {
    $(".start").html("");
    var button = $("<button>", {
      click: restart,
      class: "btn",
      text: "Play Again?"
    });
    $(".start").append(button);
    $(".btn").addClass("animated flipInX")

  }, 1500);


}

function restart() {
  location.reload();
}
