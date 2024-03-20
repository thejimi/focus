function noise_start(type){
    var defaultTypes = ["brown", "white", "pink"]
    if(!defaultTypes.includes(type)){
        return alert(type)
    }

    document.getElementById("click").play()

    hideHeadphonesMessage()

    changeAppTitle(`${type} noise`)

    $('#title').animate({opacity:0, fontSize:'3rem'})
    $(`#${type}`).animate({opacity:0, fontSize:'1rem'})

    document.body.classList.remove("gray")
    document.body.style.backgroundColor = `black`
    document.getElementById("section").style.cursor = `none`

    document.getElementById("text").innerHTML = `${type} noise`
    
    setTimeout(() => {
        $('#section').animate({opacity:0})
        $('#text').animate({opacity:1})
       setTimeout(() => {
        $('#leave').animate({opacity:1})
       }, 500);
    }, 500);

    setTimeout(() => {
        document.getElementById("title").style.display = "none"
        document.getElementById(`${type}`).style.display = "none"
    }, 2000);

    setTimeout(() => {
    const vol = new Tone.Volume(-50).toDestination();
    var noise = new Tone.Noise(type).connect(vol).start();

    var autoFilter = new Tone.AutoFilter({
	    frequency: "8n",
	    baseFrequency: 200,
	    octaves: 100
    }).toDestination().start();
    noise.connect(autoFilter);
    autoFilter.start();
    }, 900);
}

$(document).keydown(function(e) {
    if (e.key === "Escape") { // escape key maps to keycode `27`
        localStorage.setItem("Temp_NOISESESSIONJUSTFINISHED", "true")
       $('#text').animate({opacity:0})
       $('#leave').animate({opacity:0})
       setTimeout(() => {
            window.location.href = ('https://focus.jimi.wtf/noise')
       }, 500);
   }
});