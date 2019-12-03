$(document).scroll(function(){
    var pos = $(document).scrollTop() - 100;
    var home_content = $("#home-content").offset().top;
    if(pos >= home_content){
        $("#over-background").css("background-color", "black");
    }else{
        $("#over-background").css("background-color", "transparent");
    }
});