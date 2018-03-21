import "../css/main.css";

$( () => {

    const urlNasaTitle = "https://api.nasa.gov/planetary/apod?api_key=Ydd7HempAFV4s8wuLdzrUnesTlLZUxWqmve3CjBX"; 
    const urlMars = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=Ydd7HempAFV4s8wuLdzrUnesTlLZUxWqmve3CjBX";

    $.ajax({
        url: urlNasaTitle,
        dataType: "json"
    }).done(function(response) {
        add(response);
    })

    $.ajax({
        url: urlMars,
        dataType: "json"
    }).done(function(response) {
        addPhoto( response );
    })

    let add = (response) => {
        let titleImageUrl = response.hdurl;
        $("header").css("background-image", `url( ${titleImageUrl} )`);
    }

    let addPhoto = (response) => {
        for(var i= 0; i < 6; i++) {
            let newImg = $("<img>").attr("src", response.photos[i].img_src);
            $("div").append(newImg);
        }
        $("div").data("counter", i);
    }

    $("button").on("click", (event) => {
        event.preventDefault();
        $.ajax({
            url: urlMars,
            dataType: "json"
        }).done(function(response) {
            var counter = $("div").data("counter");
            var counterMax = counter + 5;
            for( counter; counter <= counterMax; counter++ ) {
                let newImg = $("<img>").attr("src", response.photos[counter].img_src);
                $("div").append(newImg);                
            }
            $("div").data("counter", counter);            
        })
    })
})