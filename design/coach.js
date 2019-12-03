$("#modify-team-btn").click(function(){
    $("#modify-team-btn").addClass("active");
    $("#upload-team-btn").removeClass("active");


    $("#modify-team").removeClass("hidden");
    $("#upload-photos").addClass("hidden");

});

$("#upload-team-btn").click(function(){
    $("#modify-team-btn").removeClass("active");
    $("#upload-team-btn").addClass("active");


    $("#modify-team").addClass("hidden");
    $("#upload-photos").removeClass("hidden");

});

