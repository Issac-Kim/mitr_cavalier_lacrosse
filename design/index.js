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
                htmlStr += '<img class="d-block w-100" src="/' + image.path + '" alt="First slide">';
                htmlStr += '</div>';
            });
            document.getElementById("carousel-images").innerHTML = htmlStr;
        }, error: function(msg) {
            alert("There was a problem: " + msg.status + " " + msg.statusText);
        }
    });
}