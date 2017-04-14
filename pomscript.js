/*
function pomodoro(){
  var alarm= new Audio('http://freesound.org/data/previews/269/269570_5126800-lq.mp3'),
breakTime=($('.time1').text())*60,
 workTime=($('.time2').text())*60,
 timerTime=($('.time2').text())*60,
 timerFlag=false,
 $start=$('.start'),
 $bigcir=$('.bigcir'),
 timer, m, s;
//countDown function: 
 function countDown(){
 timerTime--;
 m=parseInt(timerTime/60);
 s=timerTime%60;
 if(s<10){s='0'+s;}
$start.text(m+':'+s); 
  if(timerTime===0){clearInterval(timer);
    alarm.play();
    timerFlag=!timerFlag;   
    if(timerFlag){$bigcir.click()}//this will automatically run both work and break time without any pause; without this line of code, it will stop when work time is 0, then need to click to start counting down break time.
  }
 }
 $bigcir.click(function(){
  timerTime= (timerFlag) ? breakTime : workTime;
timer=setInterval(countDown,30);  
 }) 
}
pomodoro();
*/
function pomodoro(){
  var alarm= new Audio('http://freesound.org/data/previews/269/269570_5126800-lq.mp3'),
breakTime=5,
 workTime=25,
 startFlag=false,
 nextFlag=false,
 pauseWorkFlag=false,
 pauseBreakFlag=false,
 workFlag=false,
 breakFlag=false,
 $start=$('.start'),
 $status=$('.status'),
 $bigcir=$('.bigcir'),
 $fill=$('.fill'),
 timer1, timer2, total1, total2, m, s;
function counting2(){
 total2--;
 m=parseInt(total2/60);
 s=total2%60;
 if(s<10){s='0'+s;}
$start.text(m+':'+s); 
$status.text('WORK');
  if(total2===0){clearInterval(timer2);
    $bigcir.css('border', '');
    $start.text("START BREAK");
    $fill.stop();
    $fill.css('height','0%');
    $status.text('');
    alarm.play();
    nextFlag=false;
    startFlag=true;
    workFlag=false;
  }
 }
function counting1(){
 total1--;
 m=parseInt(total1/60);
 s=total1%60;
if(s<10){s='0'+s;}
$start.text(m+':'+s); 
$status.text('BREAK');
  if(total1===0){clearInterval(timer1);
    $bigcir.css('border', '');
    $start.text('START WORK');
    $fill.stop();
    $fill.css('height','0%');
    $status.text('');
    alarm.play();
    nextFlag=true;//
    startFlag=false;
    breakFlag=false; 
  }
 }
$('.br1').click(function(){
  if(breakTime>1) {breakTime--;}      
       $('.time1').text(breakTime); 
 });
$('.br2').click(function(){
  if(breakTime<60) {breakTime++;}      
       $('.time1').text(breakTime); 
 }); 
$('.wo1').click(function(){
  if(workTime>1) {workTime--;}      
       $('.time2').text(workTime); 
 });
$('.wo2').click(function(){
  if(workTime<60) {workTime++;}      
       $('.time2').text(workTime); 
 }); 
 $bigcir.click(function(){
clearInterval(timer2);
clearInterval(timer1);
   if(!startFlag){
    if(!workFlag){
      $bigcir.css('border', '7px solid green');
      alarm.pause();
      alarm.currentTime=0;
workFlag=true;
 timer2=setInterval(counting2,30);  
    
   total2=($('.time2').text())*60; 
   $fill.animate({height: '100%'}, (total2*33));
   
    }
 else{
   if(!pauseWorkFlag){
clearInterval(timer2);
$fill.stop();
$bigcir.css('border', '7px solid black');
   pauseWorkFlag=true;
   }
   else{
     s=Math.floor(s);
     total2=(m*60)+s;
     $fill.animate({height: '100%'}, (total2*33));
     $bigcir.css('border', '7px solid green');
    timer2=setInterval(counting2,30);
    pauseWorkFlag=false;
   }
 }   
   }      
   else{
  if(!breakFlag){
    $bigcir.css('border', '7px solid purple');
    alarm.pause();
    alarm.currentTime=0;
    breakFlag=true;
   
timer1=setInterval(counting1,30);  
   total1=($('.time1').text())*60; 
    $fill.animate({height: '100%'}, (total1*33));
  }
else{
  if(!pauseBreakFlag){
    $bigcir.css('border', '7px solid black');
    $fill.stop();
    clearInterval(timer1);
    pauseBreakFlag=true;
  }
  else{
    $bigcir.css('border', '7px solid purple');
    s=Math.floor(s);
    total1=(m*60)+s;
    $fill.animate({height: '100%'}, (total1*33));
    timer1=setInterval(counting1,30);
    pauseBreakFlag=false;
  }
}
   }

 });
 $('.next').click(function(){
   if(!startFlag){     
     clearInterval(timer2);
     alarm.pause();
      alarm.currentTime=0;
  $bigcir.css('border', '');
   $fill.stop();
  $fill.css('height','0%');
     $start.text("START BREAK");
     $status.text('');
     startFlag=true;
    breakFlag=false;
    pauseWorkFlag=false;
    workFlag=false;//fixing working click next then run out breaking, then shows negative numbers
   }
else{  
  clearInterval(timer1);
  alarm.pause();
      alarm.currentTime=0;
$bigcir.css('border', '');
 $fill.stop();
$fill.css('height','0%');
  $start.text("START WORK");
  $status.text('');
  startFlag=false;
 workFlag=false;
  pauseWorkFlag=false;
}
 
 });
$('.reset').click(function(){
 clearInterval(timer1);
  clearInterval(timer2);
  alarm.pause();
  alarm.currentTime=0;
$bigcir.css('border', '');
 $fill.stop();
$fill.css('height','0%');
$start.text("START WORK");
  $status.text('');
 $('.time1').text('1');
 $('.time2').text('1');
   startFlag=false;
 nextFlag=false;
 pauseWorkFlag=false;
 pauseBreakFlag=false;
 workFlag=false;
 breakFlag=false;
});
}
pomodoro();
