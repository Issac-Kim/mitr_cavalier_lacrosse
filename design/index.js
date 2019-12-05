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
                htmlStr +=  '<div class="col-lg-3 col-md-4 col-6"><div class="thumbnail-back"><img class="img-fluid img-thumb" data-toggle="modal" data-target="#exampleModal" src="/' + image.data.path +'" alt=""></div></div>';

            });
            htmlStr += '</div>'
            document.getElementById("general").innerHTML = htmlStr;
            $(".img-thumb").click(function(){
                document.getElementById("modal-image").innerHTML = '<img src="' + $(this).attr("src") + '" width="100%"/>'; 
                $("#modal").removeClass("modal-down");
                $("#modal").addClass("modal-up");
            });
            $("#modal-close").click(function(){
                $("#modal").addClass("modal-down");
                $("#modal").removeClasse("modal-up");
            });
            $("#modal").click(function(evt){
                if(evt.target.id == "modal-image")
                    return;
                //For descendants of menu_content being clicked, remove this check if you do not want to put constraint on descendants.
                if($(evt.target).closest('#modal-image').length)
                    return;    
                $("#modal").addClass("modal-down");
                $("#modal").removeClass("modal-up");
                
                
            });
    

        }, error: function(msg) {
            alert("There was a problem: " + msg.status + " " + msg.statusText);
        }
    });
}