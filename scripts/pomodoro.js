var countDownDate = new Date("Aug 3 2023, 21:00").getTime();
var task = 'null'
var currentThing = 'work'
var pomosCompleted = 0
var repeated = 0

setInterval(() => {
    console.log(`Upd: (task: ${task} | currentThing: ${currentThing} | pomosCompleted: ${pomosCompleted}`)
}, 1000);

setTimeout(() => {
    if(localStorage.getItem("CurrentSession_reload_TASKNAME")){
        var input = localStorage.getItem("CurrentSession_reload_TASKNAME")

        localStorage.removeItem("CurrentSession_reload_TASKNAME")
    
        task = input
        document.getElementById("timer").innerHTML = `<span class="text-5xl font-strong" style="color:#b84949">starting...</span>`
        document.getElementById("task").innerHTML = 'working on ' + `<span class="text-4xl font-strong" style="color:#49b882"><strong>${input}</strong></span>`
        countdown("timer", 25, 0 );
    
        setTimeout(() => {
            $('#controls').removeClass("hidden")
            setTimeout(() => {
                $('#controls').animate({opacity:1})
            }, 500);
        }, 500);
    
        if(localStorage.getItem("Prefer_POMODOROMUSICPAUSED") === "true"){
            document.getElementById("music-control").innerHTML = `<i class="fa-solid fa-music" style="color:#b84949"></i>`
        } else {
            music()
        }  
    }
}, 100);


// function pomodoroStart(){
//         // Update the count down every 1 second
//         var x = setInterval(function() {
        
//           // Get today's date and time
//           var now = new Date().getTime();
            
//           // Find the distance between now and the count down date
//           var distance = countDownDate - now;
            
//           // Time calculations for days, hours, minutes and seconds
//           var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//           var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//           var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//           var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
//           if(seconds <= 9){
//             seconds = '0'+seconds
//           }
            
//           // Output the result in an element with id="demo"
//           changeAppTitle(`pomodoro / ${minutes + ":" + seconds}`)
//           document.getElementById("timer").innerHTML = 'next break in ' + `<span class="text-5xl font-strong" style="color:#b84949"><strong>${minutes + ":" + seconds}</strong></span>`
            
//           // If the count down is over, write some text 
//           if (distance < 0) {
//             clearInterval(x);
//             document.getElementById("timer").innerHTML = "EXPIRED";
//           }
//         }, 1000);
// }

function hideNotifsMessage(dontremind){
    $('#notifsmessage').animate({opacity:0}, 'slow')
    setTimeout(() => {
        document.getElementById("notifsmessage").style.display = `none`
    }, 1000);
}

function startNotifs() {
    setTimeout(() => {
        if(localStorage.getItem("Temp_NOTIFICATIONS") === "granted"){
            
        } else {
          document.getElementById("notifsmessage").style.display = "flex"
        }
    }, 200);

    if (!("Notification" in window)) {
    } else if (Notification.permission === "granted") {
      localStorage.setItem("Temp_NOTIFICATIONS", "granted")
      document.getElementById("notifsmessage").style.display = "none"
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            localStorage.setItem("Temp_NOTIFICATIONS", "granted")
            document.getElementById("notifsmessage").style.display = "none"
        } else {
            localStorage.setItem("Temp_NOTIFICATIONS", "denied")
        }
      });
    }
  
    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them anymore.
  }
  

  function makeNotification(mode){
    //if(Notification.permission === "granted") {
        if(mode === "work"){
            const notification = new Notification("The break has ended", { body:`Let's go back to work`, icon:`http://192.168.0.50/api/localfiles/public?directory=img/pomodoro-icon.png` });
            return;
        } 

        if(mode === "shortbreak"){
            const notification = new Notification("It's time for a short break", { body:`Come back in 5 minutes`, icon:`http://192.168.0.50/api/localfiles/public?directory=img/pomodoro-icon.png` });
            return;
        } 

        if(mode === "longbreak"){
            const notification = new Notification(`Congrats, you completed a full cycle. It's time for a long break`, { body:`Come back in 15 minutes`, icon:`http://192.168.0.50/api/localfiles/public?directory=img/pomodoro-icon.png` });
            return;
        } 
    //}
  }

function countdown( elementName, minutes, seconds )

{
    if(repeated === 0){
        document.getElementById("pomos-completed").innerHTML = `<i class="fa-solid fa-hashtag" style="color:#4982b8"></i>&nbsp;&nbsp;${pomosCompleted+1}/4`
    } else {
        document.getElementById("pomos-completed").innerHTML = `<i class="fa-solid fa-hashtag" style="color:#4982b8"></i>&nbsp;&nbsp;${pomosCompleted+1}/4 <span style='color:#49b882'>x${repeated+1}</span>`
    }

    var element, endTime, hours, mins, msLeft, time;

    function twoDigits( n )

   

    {return (n <= 9 ? "0" + n : n);}

//A constant of the id function of the countdown element

    element = document.getElementById( elementName );

//The countdown time has been calculated.

//Total time of countdown, added at the end of all   

    endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;

    updateTimer();

    function updateTimer()

    {
        msLeft = endTime - (+new Date);

//What happens when the countdown time ends

//1000 ms = 1s

        if ( msLeft < 1000 ) {
            if(currentThing === "work"){
                element.innerHTML = 'next break in ' + `<span class="text-5xl font-strong" style="color:#b84949">0:00</span>`
            } else if(currentThing === "shortbreak"){
                element.innerHTML = 'take a break, come back in ' + `<span class="text-5xl font-strong" style="color:#4982b8">0:00</span>`
            } else if(currentThing === "longbreak"){
                element.innerHTML = 'see you in ' + `<span class="text-5xl font-strong" style="color:#49b882">0:00</span>`
            }

            setTimeout(() => {
                if(currentThing === 'work'){
                    currentThing = 'shortbreak'

                    if(pomosCompleted === 3){
                        currentThing = 'longbreak'
                        document.getElementById("alarm2").play()
                        makeNotification("longbreak")
                        countdown("timer", 15, 0)
                        return;
                    }

                    document.getElementById("alarm1").play()
                    makeNotification("shortbreak")
                    return countdown("timer", 5, 0)
                }
    
                if(currentThing === 'shortbreak'){
                    currentThing = 'work'
                    pomosCompleted = pomosCompleted + 1
                    document.getElementById("alarm3").play()
                    makeNotification("work")
                    return countdown("timer", 25, 0)
                }

                if(currentThing === 'longbreak'){
                    repeated = repeated + 1
                    currentThing = 'work'
                    pomosCompleted = 0
                    document.getElementById("alarm3").play()
                    makeNotification("longbreak")
                    return countdown("timer", 25, 0)
                }
            }, 1000);  
        }

//What will happen before the countdown ends

        else {

            time = new Date( msLeft );

            hours = time.getUTCHours();

            mins = time.getUTCMinutes();

//Determines how time can be viewed in a webpage

//innerHTML helps to display an element in a webpage

            if(currentThing === "work"){
                changeAppTitle(`pomodoro / work`)
                element.innerHTML = 'next break in ' + `<span class="text-5xl font-strong" style="color:#b84949">${(hours ? hours + ":" + twoDigits( mins ) : mins) + ":" + twoDigits( time.getUTCSeconds() )}</span>`
            } else if(currentThing === "shortbreak"){
                changeAppTitle(`pomodoro / short break`)
                element.innerHTML = 'take a break, come back in ' + `<span class="text-5xl font-strong" style="color:#4982b8">${(hours ? hours + ":" + twoDigits( mins ) : mins) + ":" + twoDigits( time.getUTCSeconds() )}</span>`
            } else if(currentThing === "longbreak"){
                changeAppTitle(`pomodoro / long break`)
                document.getElementById("pomos-completed").innerHTML = `<i class="fa-solid fa-hashtag" style="color:#49b882"></i>&nbsp;&nbsp;<span style='color:#49b882'>${pomosCompleted+1}/4</span>`
                element.innerHTML = 'see you in ' + `<span class="text-5xl font-strong" style="color:#49b882">${(hours ? hours + ":" + twoDigits( mins ) : mins) + ":" + twoDigits( time.getUTCSeconds() )}</span>`
            }

                setTimeout( updateTimer, time.getUTCMilliseconds() + 500 ); 

        }

    }

}

function pomodoroSetup(){
    var modal = document.getElementById("modal-setup").setAttribute("x-data", "{isOpen:true}")
}

function pomodoroBegin(){
    var input = document.getElementById("task-name").value

    if(!input) return;

    task = input
    var modal = document.getElementById("modal-setup").setAttribute("x-data", "{isOpen:false}")
    document.getElementById("timer").innerHTML = `<span class="text-5xl font-strong" style="color:#b84949">starting...</span>`
    document.getElementById("task").innerHTML = 'working on ' + `<span class="text-4xl font-strong" style="color:#49b882"><strong>${input}</strong></span>`
    makeNotification("start")
    countdown("timer", 25, 0 );

    setTimeout(() => {
        $('#controls').removeClass("hidden")
        setTimeout(() => {
            $('#controls').animate({opacity:1})
            $('#controls2').animate({opacity:1})
        }, 500);
    }, 500);

    if(localStorage.getItem("Prefer_POMODOROMUSICPAUSED") === "true"){
        document.getElementById("music-control").innerHTML = `<i class="fa-solid fa-music" style="color:#b84949"></i>`
    } else {
        music()
    }  

    localStorage.setItem("lastPomoName", input)

    startNotifs()
}

function music(){
    document.getElementById("lofi").play()
    document.getElementById("music-control").innerHTML = `<i class="fa-solid fa-music" style="color:#49b882"></i>`
}

function musicControl(){
    var audio = document.getElementById("lofi")
    if(audio.paused){
        localStorage.setItem("Prefer_POMODOROMUSICPAUSED", "false")

        audio.play()
    } else {
        localStorage.setItem("Prefer_POMODOROMUSICPAUSED", "true")
        
        audio.pause()
    }
}

function pomodoro_WHref(url){
    $('body').animate({opacity:0}, 'slow')
    setTimeout(() => {
        window.location.href = (`${url}?f=pomodoro`)
    }, 1000);
}

setInterval(() => {
    var myaudio = document.getElementById("lofi")
    var mins = Math.floor(myaudio.currentTime / 60)
    var seconds = Math.floor(myaudio.currentTime % 60)

    if(mins <= 9){
        mins = '0' + mins
    }

    if(seconds <= 9){
        seconds = '0' + seconds
    }

    var cur_time = mins + ':' + seconds
    if(myaudio.paused){
        document.getElementById("music-control").innerHTML = `<i class="fa-solid fa-music" style="color:#b84949"></i>&nbsp;&nbsp;${cur_time}`
    } else {
        document.getElementById("music-control").innerHTML = `<i class="fa-solid fa-music" style="color:#49b882"></i>&nbsp;&nbsp;${cur_time}`
    }
}, 500);

function pomodoroRestart_ask(){
    var modal = document.getElementById("modal-restart").setAttribute("x-data", "{isOpen:true}")
}

function pomodoroQuit_ask(){
    var modal = document.getElementById("modal-quit").setAttribute("x-data", "{isOpen:true}")
}

function pomodoroQuit(){
    var sound = document.getElementById("seeyounexttime")
    var lofi = document.getElementById("lofi")
    lofi.pause()
    document.getElementById("modal-quit").setAttribute("x-data", "{isOpen:false}")

    setTimeout(() => {
        sound.play() 
    }, 500);

    setTimeout(() => {
        pomodoro_WHref('https://focus.jimi.wtf/')
    }, 2000);
}

function pomodoroRestart(){
    localStorage.setItem("CurrentSession_reload_TASKNAME", task)
    pomodoro_WHref('https://focus.jimi.wtf/pomodoro')
}

function pomodoroRestart2(){
    localStorage.setItem("CurrentSession_reload_TASKNAME", document.getElementById("task-name").value)
    pomodoro_WHref('https://focus.jimi.wtf/pomodoro')
}

function pomodoroSkip(){
    stoprn = true
    newDecide()
}