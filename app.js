function init() {
  //Canvas
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  //Variables
  var canvasx = $(canvas).offset().left;
  var canvasy = $(canvas).offset().top;
  var last_mousex = last_mousey = 0;
  var mousex = mousey = 0;
  var mousedown = false;
  var tooltype = 'draw';
  //Mousedown
  $(canvas).on('mousedown', function(e) {
      last_mousex = mousex = parseInt(e.clientX-canvasx);
    last_mousey = mousey = parseInt(e.clientY-canvasy);
      mousedown = true;
  });
  //Mouseup
  $(canvas).on('mouseup', function(e) {
      mousedown = false;
  });
  //Mousemove
  $(canvas).on('mousemove', function(e) {
      mousex = parseInt(e.clientX-canvasx);
      mousey = parseInt(e.clientY-canvasy);
      if(mousedown) {
          ctx.beginPath();
          if(tooltype=='draw') {
              ctx.globalCompositeOperation = 'source-over';
              ctx.strokeStyle = 'black';
              ctx.lineWidth = 3;
          } else {
              ctx.globalCompositeOperation = 'destination-out';
              ctx.lineWidth = 10;
          }
          ctx.moveTo(last_mousex,last_mousey);
          ctx.lineTo(mousex,mousey);
          ctx.lineJoin = ctx.lineCap = 'round';
          ctx.stroke();
      }
      last_mousex = mousex;
      last_mousey = mousey;
  });
  //Use draw|erase
  use_tool = function(tool) {
      tooltype = tool; //update
  }
 
//=================================END OF CANVAS==================================//
// RANDOM WORD GENERATOR
var random = ["horse", "door", "song","trip", "backbone", "bomb",
"round", "treasure", "garbage",
"park", "pirate", "ski",
"state", "whistle", "palace",
"baseball", "coal", "queen",
"dominoes", "photograph", "computer",
"hockey aircraft", "hot dog",
"salt and pepper", "key", "iPad",
"whisk", "frog", "lawnmower",
"mattress", "pinwheel", "cake",
"circus", "battery", "mailman",
"cowboy", "password", "bicycle",
"skate", "electricity", "lightsaber",
"thief", "teapot", "deep",
"spring", "nature", "shallow",
"toast", "outside", "America",
"roller", "blading", "gingerbread", "man", "bowtie",
"half", "spare", "wax",
"light", "bulb", "platypus", "music",
"sailboat", "popsicle", "brain",
"birthday cake", "skirt", "knee",
"pineapple", "tusk", "sprinkler",
"money", "spool", "lighthouse",
"doormat", "face", "flute",
"rug", "snowball", "purse",
"owl", "gate", "suitcase",
"stomach", "doghouse", "pajamas",
"bathroom", "scale", "peach", "newspaper",
"watering", "can", "hook", "school",
"beaver", "french fries", "beehive",
"beach", "artist", "flagpole",
"camera", "hair dryer", "mushroom",
"toe", "pretzel", "TV",
"quilt", "chalk", "dollar",
"soda", "chin", "swing",
"garden", "ticket", "boot",
"cello", "rain", "clam",
"pelican", "stingray", "fur",
"blowfish", "rainbow", "happy"]
function hideAll(){
  $('#word').hide();
  $('.start').hide();
}
function showWord(){
  randomWord = random[Math.floor(Math.random() * random.length)]
  $('.showWord').click(function(){
    $('#word').show();
    $('#wordText').html(randomWord);
  });
}
function hideWord(){
  $('#word').click(function(){
    $('#word').hide();
    $('.start').show();
    $('.showWord').hide();
  })
}
function start(){
  $('.start').click(function(){
    $('.start').hide();
    secs = 30;
    timer();
  })
}
//=================================TIMER=========================//
var secs =  30;
var currentSeconds = 0;
function timer(){
  Decrement();
  scoreTracker();
  function Decrement() {
      currentMinutes = Math.floor(secs / 60);
      currentSeconds = secs % 60;
      if(currentSeconds <= 9) currentSeconds = "0" + currentSeconds;
      secs--;
      document.getElementById("timerText").innerHTML = "0:"+currentSeconds;
      if(secs !== -1) setTimeout(Decrement,1000);
  
  }
}
//===============================TEAM SCORES===============================//
var currentTeam = 0;
        var teams = [
        {
          name: "Team 1",
          score:0
        },{
          name: "Team 2",
          score:0
        }
      ];
function scoreTracker(){
    $("#stopTimer").click(function(){
       // document.getElementById("displayScore").innerHTML = "You scored: " + currentSeconds;
       teamTurn();
      secs = 0;
  })
 
}
 function teamTurn(){
     teams[currentTeam].score++;
     currentTeam = currentTeam ? 0 : 1;
     $('#teamName').html(teams[currentTeam].name);
 }
hideAll();
showWord();
hideWord();
start();
}