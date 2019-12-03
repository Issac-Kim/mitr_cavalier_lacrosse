// navbar scroll color animation
$(document).scroll(function(){ 
    var pos = $(document).scrollTop() - 100;
    var home_content = $("#home-content").offset().top;
    if(pos >= home_content){
        $("#over-background").css("background-color", "black"); // make navbar background black when scrolling down
    }else{
        $("#over-background").css("background-color", "transparent"); // reset navbar to transparent
    }
});