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
              ctx.lineWidth = 50;
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
  $('#stopTimer').hide();
}

$('.showWord').click(function(){ 
  showWord(); 
});
$('#word').click(function(){ hideWord();   });
$('.start').click(function(){ start(); })

$('body').keyup(function(e){
   if(e.keyCode == 32){
       scoreTracker(); 
   }
});

function showWord(){

  randomWord = random[Math.floor(Math.random() * random.length)]
    $('#word').show();
    $('#wordText').html(randomWord);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

}


function hideWord(){

    $('#word').hide();
    $('.start').show();
    $('.showWord').hide();

}

function start(){
  
    $('.start').hide();
    $('#stopTimer').show();
    secs = 30;
    timer();
  
}

function restart(){
  $('.showWord').show();
  $('#stopTimer').hide();
}
//=================================TIMER=========================//
var secs =  0;
var currentSeconds = 0;
function timer(){
  Decrement();
 
  function Decrement() {
      currentMinutes = Math.floor(secs / 60);
      currentSeconds = secs % 60;
      if(currentSeconds <= 9) currentSeconds =  currentSeconds;
      secs--;
      document.getElementById("timerText").innerHTML = currentSeconds;
      if(secs !== -1) setTimeout(Decrement,1000);
      
      if(secs == -1) {
        restart();  
      }
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
   
      $("#displayScore").html("You scored: " + currentSeconds);
      secs = 0;
      restart();
      teamTurn();
 
}

 function teamTurn(){

    teams[currentTeam].score = currentSeconds + teams[currentTeam].score;
     currentTeam = currentTeam ? 0 : 1;

     $('#teamScoreOne').html(teams[0].score);
     $('#teamScoreTwo').html(teams[1].score);

     $('#teamName').html(teams[currentTeam].name);
 }



hideAll();

}