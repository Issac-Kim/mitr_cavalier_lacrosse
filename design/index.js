function updateCarousel(id){
    $.ajax({
        type: "GET",
        url: "/api/team/get-teams-images/" + id,
        dataType: "json",
        success: function(responseData, status){
            htmlStr = '';
            $.each(responseData, function(i, image) {
                if(i==0) {
                    htmlStr += '<div class="carousel-item active">';
                } else {
                    htmlStr +='<div class="carousel-item">';
                }
                htmlStr += '<img class="d-block w-100 carousel-img" src="/' + image.path + '" alt="First slide">';
                htmlStr += '</div>';
            });
            document.getElementById("carousel-images").innerHTML = htmlStr;
        }, error: function(msg) {
            alert("There was a problem: " + msg.status + " " + msg.statusText);
        }
    });
}

function loadCarousel(type) {
    $.ajax({
        type: "GET",
        url: "/api/photos/get-images-by-type/"+type,
        dataType: "json",
        success: function(responseData, status){
            console.log(responseData);
            htmlStr = '';
            var j=0;
            $.each(responseData, function(i, image) {
                if(j==0) {
                    htmlStr += '<div class="carousel-item active">';
                } else {
                    htmlStr +='<div class="carousel-item">';
                }
                htmlStr += '<img class="flyer-img" src="/' + image.data.path + '" alt="First slide">';
                htmlStr += '</div>';
                j++;
            });
            console.log(htmlStr);
            document.getElementById("carousel-" + type).innerHTML = htmlStr;
        }, error: function(msg) {
            alert("There was a problem: " + msg.status + " " + msg.statusText);
        }
    });
}

function removePhotoUpdate(){
    console.log("hi");
    if($(this).hasClass("img-active")){
        $(this).removeClass("img-active");
    }else{
        $(this).addClass("img-active");
    }

}

function populatePictures(){
    $.ajax({
        type: "GET",
        url: "/api/photos/get-images-by-type/trophy",
        dataType: "json",
        success: function(responseData, status){
            htmlStr = '';
            var j=0;
            $.each(responseData, function(i, image) {
                if(j==0) {
                    htmlStr += '<div class="carousel-item active">';
                } else {
                    htmlStr +='<div class="carousel-item">';
                }
                htmlStr += '<img class="flyer-img" src="/' + image.data.path + '" alt="First slide">';
                htmlStr += '</div>';
                j++;
            });
            document.getElementById("trophy").innerHTML = htmlStr;
        }, error: function(msg) {
            alert("There was a problem: " + msg.status + " " + msg.statusText);
        }
    });

    $.ajax({
        type: "GET",
        url: "/api/photos/get-images-by-type/general",
        dataType: "json",
        success: function(responseData, status){
            htmlStr = '<div class="row text-center text-lg-left">';
            $.each(responseData, function(i, image) {
                htmlStr +=  '<div class="col-lg-3 col-md-4 col-6"><a href="#" class="d-block mb-4 h-100"><img class="img-fluid img-thumbnail" src="/' + image.data.path +'" alt=""></a></div>';

            });
            htmlStr += '</div>'
            document.getElementById("general").innerHTML = htmlStr;
        }, error: function(msg) {
            alert("There was a problem: " + msg.status + " " + msg.statusText);
        }
    });
}