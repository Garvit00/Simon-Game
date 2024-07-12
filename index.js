var buttoncolors = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userclickedpattern = [];
var level = 0;
var started = false;
$(document).on('keypress touchstart', function(){
    if(level == 0){
        nextSequence();
    }
});
function nextSequence(){
    userclickedpattern=[];
    var randomnumber = Math.floor(Math.random()*4);
    var randomchosencolor = buttoncolors[randomnumber];
    gamepattern.push(randomchosencolor);
    $("#" + randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomchosencolor);
    $("#level-title").text("Level"+" "+level);
    level=level+1;
};
$(".btn").on("click", function(event){
   var userchosencolor = event.target.id;
   userclickedpattern.push(userchosencolor);
   playsound(userchosencolor);
   animatepress(userchosencolor);
   var lastindex =(userclickedpattern.length)-1;
   checkanswer(lastindex);
});
function playsound(name){
      var audio = new Audio("sounds/" + name + ".mp3");
      audio.play();
    };
function animatepress(currentcolor){
    $("#" + currentcolor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentcolor).removeClass("pressed");
    },100);
};
function checkanswer(currentlevel){
if(userclickedpattern[currentlevel]===gamepattern[currentlevel]){
    console.log("success");
    if(userclickedpattern.length===gamepattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
} else { 
    console.log("wrong");
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game over, Press any key to Restart");
    startover();
}
}
function startover(){
    level = 0;
    gamepattern = [];
};