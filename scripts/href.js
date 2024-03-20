function WHref(url, isLocal, openNewWindow, refing){
    if(url === "../app"){
        var usertoken = localStorage.getItem("Acc_Mail")
        if(!usertoken){
            document.body.style.overflow = 'hidden'
            $('#Filtrunavbar').animate({height:'100%'}, 'slow')
            setTimeout(() => {
                window.location.href = ('../start')
            }, 800);

            return;
        }
    }

    if(refing === false){
        if(isLocal === true){
            if(openNewWindow === true){
                window.open(url)
            } else {
                window.location.href = (url)
            }
        } else {
            if(openNewWindow === true){
                window.open(url)
            } else {
                window.location.href = (url)
            }
        }

        return;
    }

    const currentUrl = new URL(document.URL)

    if(isLocal === true){
        if(openNewWindow === true){
            window.open(url+`?f=${currentUrl.pathname}`)
        } else {
            window.location.href = (url+`?f=${currentUrl.pathname}`)
        }
    } else {
        if(openNewWindow === true){
            window.open(url+`?ref=Filtru`)
        } else {
            window.location.href = (url+`?ref=Filtru`)
        }
    }
}