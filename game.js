var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var canvasWidth = canvas.getAttribute("width");
var canvasHeight = canvas.getAttribute("height");
var w1 = (screenWidth/2) - screenWidth*0.1;;
var w2 = screenWidth*0.07;
document.getElementById("title").style.marginLeft = w1+"px";
canvas.style.marginLeft = w2+"px"; 

var tankWidth = 80;
var tankHeight = 50;
var turretWidth = 60;
var turretHeight = 6;
var missileWidth = 20;
var missileHeight = 8;

var playerActive = 1;
var moves1 = 4;
var moves2 = 4; 
var weapon1 = "Single Shot";
var weapon2 = "Single Shot";
var angle1 = 30;
var angle2 = 30;
var power1 = 1;
var power2 = 1;
var player1 = "Player 1";
var player2 = "Player 2";
var score1 = 0;
var score2 = 0;
var pause = false;
var quit = false;
var gameOver = false;
var fire1 = false;
var fire2 = false;
var missile1Angle = angle1;
var missile2Angle = angle2;
var bullets1 = 5;
var bullets2 = 5;
var t=0.2;

var baseY = 490;
var tank1X = 70;
var tank1Y = 437;
var tank2X = 1130;
var tank2Y = 436;
var missile1X = turretWidth-20;
var	missile1Y = turretHeight-7;;
var	missile2X=turretWidth-20;
var	missile2Y=turretHeight-7;

var bg1 = new Image();
var bg2 = new Image();
var fireButton = new Image();
var moveButton = new Image();
var weaponButton = new Image();
var angleButton = new Image();
var powerButton = new Image();
var tank1 = new Image();
var tank2 = new Image();
var turret = new Image();
var missile = new Image();

bg1.src = "assets/background_1.png";
bg2.src = "assets/castle_bricks.png";
fireButton.src = "assets/fire_button.png";
moveButton.src = "assets/move_button.png";
weaponButton.src = "assets/weapong.png";
angleButton.src = "assets/angle_button.png";
powerButton.src = "assets/powerslider.png";
tank1.src = "assets/tank11.png";
tank2.src = "assets/tank113.png";
turret.src = "assets/tanks_turret3.png";
missile.src = "assets/bazooka.png";

var gamePlayAudio = new Audio("audio/BurtBacharach.wav");


function stopAudio(audio){
    audio.pause();
    audio.currentTime = 0;
}

document.addEventListener('keydown', function(event){
        	if(event.keyCode==70){//f fire button
        		if(playerActive==1){
	        		if(bullets1>0){	
	        			fire1=true;
	        			bullets1--;
	        		}	
        		}
        		else{
        			if(bullets2>0){
        				fire2=true;
        				bullets2--;
        			}
        		}

        	}
            if(event.keyCode==87){//w weapon up

            }
            if(event.keyCode==83){//s weapon down

            }
            if(event.keyCode==65){//a tank move left
            		if(playerActive==1){
						if(moves1>0){
							moves1--;
							tank1X-=10;
						}
					}
					else{
						if(moves2>0){
							moves2--;
							tank2X-=10;
						}
			        }
			}
            if(event.keyCode==68){//d tank move right	
				if(playerActive==1){
					if(moves1>0){
						moves1--;
						tank1X+=10;
					}
				}
				else{
					if(moves2>0){
						moves2--;
						tank2X+=10;
					}
				}
            }
            if(event.keyCode==74){//j angle decrease
            	if(playerActive==1){
            		if(angle1>0){
						angle1--;
            		}
				}
				else{
					if(angle2>0){
						angle2--;
					}
				}
            }
            if(event.keyCode==76){//l angle increase
            	if(playerActive==1){
					if(angle1<60){
						angle1++;
					}
				}
				else{
					if(angle2<60){
						angle2++;
					}
				}
            }
        	if(event.keyCode==78){//n power increase
            	if(playerActive==1){
					if(power1>1){
						power1--;
					}
				}
				else{
					if(power2>1){
						power2--;
					}
				}
        	}
            if(event.keyCode==77){//m power increase
            	if(playerActive==1){
					if(power1<3){
						power1++;
					}
				}
				else{
					if(power2<3){
						power2++;
					}
				}
        	}

        	if(event.keyCode==80){//p pause/resume
        		if(pause==false){
        			pause=true;
        		}
        		else{
        			pause=false;	
        			animation();
        		}
        		if(quit==true&&pause==true){
        				initialise();
						quit=false;
						pauseGameDraw();
        			}
        	}
        	if(event.keyCode==82){//r restart
        		window.location.reload();
        	}
        	if(event.keyCode==81){//q quit
        		quit=true;
        	}
        	if(event.keyCode==85){
        		if(playerActive==1){
        			playerActive=2;
        		}
        		else{
        			playerActive=1;
        		}
        	}
    },false);


function drawAssets(){ //Function to draw Backgrounds, Buttons, Letters.
	ctx.drawImage(bg1,0,0,canvasWidth,canvasHeight);
	ctx.drawImage(bg2,0,490,canvasWidth,200);
	ctx.drawImage(moveButton,50,520,150,65);
	ctx.drawImage(weaponButton,250,515,190,70);
	ctx.drawImage(fireButton,540,520,170,60);
	ctx.drawImage(angleButton,800,520,180,60);
	ctx.drawImage(powerButton,1050,520,170,60);
	ctx.fillStyle = "orange";
	ctx.font = "bold 25px Arial";
	ctx.fillText("A",65,564);
	ctx.fillText("D",173,564);
	ctx.fillText("F",620,600);
	ctx.fillText("J",817,576);
	ctx.fillText("L",953,576);
	ctx.font = "bold 15px Arial";
	ctx.fillText("W",420,555);
	ctx.fillText("S",422,578);
	ctx.fillText("N",1124,573);
	ctx.fillText("M",1203,573);
}

function drawValues(){
	ctx.fillStyle = "#FF0000";
	ctx.font = "bold 22px Arial";

	if(playerActive==1){
		ctx.fillText(moves1,120,576);
		ctx.font = "bold 17px Arial";
		ctx.fillText(weapon1,283,568);
		ctx.font = "bold 22px Arial";
		ctx.fillText(angle1,879,575);
		ctx.fillText(power1,1160,575);
		if(power1==1){
			ctx.fillRect(1061.5,530,10,15);
		}
		if(power1==2){
			ctx.fillRect(1061.5,530,75,15);
		}
		if(power1==3){
			ctx.fillRect(1061.5,530,150,15);	
		}

	}

	else{
		ctx.fillText(moves2,120,576);
		ctx.font = "bold 17px Arial";
		ctx.fillText(weapon2,283,568);
		ctx.font = "bold 22px Arial";
		ctx.fillText(angle2,879,575);
		ctx.fillText(power2,1160,575);
		if(power2==1){
			ctx.fillRect(1061.5,530,10,15);
		}
		if(power2==2){
			ctx.fillRect(1061.5,530,75,15);
		}
		if(power2==3){
			ctx.fillRect(1061.5,530,150,15);	
		}
	}
}

function drawHill(){
	ctx.beginPath();
	ctx.strokeStyle = "green";
	ctx.fillStyle = "darkgreen";
	ctx.moveTo(30,baseY);
	ctx.bezierCurveTo(100,470,200,550,300,350);
	ctx.bezierCurveTo(400,250,500,300,550,150);
	ctx.bezierCurveTo(650,100,680,100,700,100);
	ctx.bezierCurveTo(750,250,800,150,850,200);
	ctx.bezierCurveTo(900,200,950,250,1000,350);
	ctx.bezierCurveTo(1050,480,1100,480,1120,480);
	ctx.bezierCurveTo(1150,490, 1200,480,canvasWidth-30,baseY);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	ctx.fillStyle = "#FFFFFF";
}

function drawTank1(){
	ctx.drawImage(tank1,tank1X,tank1Y,tankWidth,tankHeight);
}

function drawTank2(){
	ctx.drawImage(tank2,tank2X,tank2Y,tankWidth,tankHeight);
}

function drawTurret1(){
	ctx.save();
	ctx.translate(tank1X+37,tank1Y+6);
	ctx.rotate(-1*angle1*Math.PI/180);
	ctx.drawImage(turret,0,0,turretWidth,turretHeight);
	ctx.restore();
	missile1Angle=angle1;
}

function drawTurret2(){
	ctx.save();
	ctx.translate(tank2X+40,tank2Y+13);
	ctx.rotate(Math.PI+angle2*Math.PI/180);
	ctx.drawImage(turret,0,0,turretWidth,turretHeight);
	ctx.restore();
	missile2Angle=angle2;
}

function missile1Draw(){
	ctx.save();
	ctx.translate(tank1X+37,tank1Y+6);
	ctx.rotate(-1*missile1Angle*Math.PI/180);
	ctx.drawImage(missile,missile1X,missile1Y,missileWidth,missileHeight);
	ctx.restore();
	missile1X+=(2.7*power1*Math.cos(missile1Angle*Math.PI/180));
}

function missile2Draw(){
	ctx.save();
	ctx.translate(tank2X+40,tank2Y+13);
	ctx.rotate(Math.PI+missile2Angle*Math.PI/180);
	ctx.drawImage(missile,missile2X,missile2Y,missileWidth,missileHeight);
	ctx.restore();
	missile2X+=(2.7*power2*Math.cos(missile2Angle*Math.PI/180));	
}

function playerDataDraw(){
	ctx.font = "bold 32px Trebuchet MS";
	ctx.fillStyle = "#123524";
	ctx.fillText(player1,20,80);
	ctx.fillText(score1,20,120);
	ctx.fillText(player2,1100,80);
	ctx.fillText(score2,1205,120);
	ctx.font = "bold 25px Trebuchet MS";
	ctx.fillStyle = "darkred";
	ctx.fillText("Player Active: "+playerActive,20,160);
	ctx.fillText("Pause: P",1125,160);
	ctx.fillText("Quit: Q",1138,193);
}

function pauseGameDraw(){
	ctx.fillStyle = "#000000";
	ctx.globalAlpha = 0.6;
	ctx.fillRect(canvasWidth-canvasWidth*0.73,canvasHeight-canvasHeight*0.8,600,300);
	ctx.globalAlpha = 1;
	ctx.fillStyle = "#FF0000";
	ctx.font = "40px Trebuchet MS";
	ctx.fillText("GAME PAUSED",canvasWidth-canvasWidth*0.59,canvasHeight-canvasHeight*0.65);
	ctx.font = "30px Trebuchet MS";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("Press P to resume",canvasWidth-canvasWidth*0.59,canvasHeight-canvasHeight*0.52);
	ctx.fillText("Press R to restart",canvasWidth-canvasWidth*0.59,canvasHeight-canvasHeight*0.40);
}

function quitGameDraw(){
	ctx.fillStyle = "#000000";
	ctx.globalAlpha = 0.6;
	ctx.fillRect(canvasWidth-canvasWidth*0.73,canvasHeight-canvasHeight*0.8,600,300);
	ctx.globalAlpha = 1;
	ctx.fillStyle = "#FF0000";
	ctx.font = "40px Trebuchet MS";
	ctx.fillText("Are you sure to Quit?",canvasWidth-canvasWidth*0.64,canvasHeight-canvasHeight*0.65);
	ctx.font = "30px Trebuchet MS";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("Press P to resume",canvasWidth-canvasWidth*0.59,canvasHeight-canvasHeight*0.52);
	ctx.fillText("Press R to restart",canvasWidth-canvasWidth*0.59,canvasHeight-canvasHeight*0.40);
}

function gameOverDraw(){//end screen to draw on canvas when the game is over
	ctx.fillStyle = "#000000";
	ctx.globalAlpha = 0.6;
	ctx.fillRect(canvasWidth-canvasWidth*0.73,canvasHeight-canvasHeight*0.8,600,300);
	ctx.globalAlpha = 1;
	ctx.fillStyle = "#FF0000";
	ctx.font = "40px Trebuchet MS";
	ctx.fillText("GAME OVER",canvasWidth-canvasWidth*0.59,canvasHeight-canvasHeight*0.65);
	ctx.font = "30px Trebuchet MS";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText(player1+" : "+score1,canvasWidth-canvasWidth*0.68,canvasHeight-canvasHeight*0.53);
	ctx.fillText(player2+" : "+score2,canvasWidth-canvasWidth*0.45,canvasHeight-canvasHeight*0.53);
	ctx.fillText("Press R to restart",canvasWidth-canvasWidth*0.60,canvasHeight-canvasHeight*0.40);
}

function initialise(){
	drawAssets();
	drawValues();
	drawHill();
	drawTurret1();
	drawTurret2();
	drawTank1();
	drawTank2();
	playerDataDraw();
}

function animation(){

	initialise();

	if(fire1==true){
		missile1Draw();
	}
	if(fire2==true){	
		missile2Draw();
	}	

	if(pause==true){
		pauseGameDraw();
		return;
	}
	if(quit==true){
		pause=true;
		quitGameDraw();
		return;
	}

	if((moves1==0&&moves2==0)||(bullets1==0&&bullets2==0)){//Gameover function
		gameOver=true;
		gameOverDraw();
		return;
	}

	requestAnimationFrame(animation);
}

animation();