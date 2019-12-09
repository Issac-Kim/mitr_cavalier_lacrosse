$("#create-team-btn").click(function(){
    $("#create-team-btn").addClass("active");
    $("#add-team-btn").removeClass("active");
    $("#edit-team-btn").removeClass("active");
    $("#upload-photo-btn").removeClass("active");
    $("#upload-site-photo-btn").removeClass("active");

    $("#team-create").removeClass("hidden");
    $("#add-team").addClass("hidden");
    $("#edit-team").addClass("hidden");
    $("#upload-photo").addClass("hidden");
    $("#upload-site-photo").addClass("hidden");
});

$("#add-team-btn").click(function(){
    $("#create-team-btn").removeClass("active");
    $("#add-team-btn").addClass("active");
    $("#edit-team-btn").removeClass("active");
    $("#upload-photo-btn").removeClass("active");
    $("#upload-site-photo-btn").removeClass("active");

    $("#team-create").addClass("hidden");
    $("#add-team").removeClass("hidden");
    $("#edit-team").addClass("hidden");
    $("#upload-photo").addClass("hidden");
    $("#upload-site-photo").addClass("hidden");
});

$("#edit-team-btn").click(function(){
    $("#create-team-btn").removeClass("active");
    $("#add-team-btn").removeClass("active");
    $("#edit-team-btn").addClass("active");
    $("#upload-photo-btn").removeClass("active");
    $("#upload-site-photo-btn").removeClass("active");

    $("#team-create").addClass("hidden");
    $("#add-team").addClass("hidden");
    $("#edit-team").removeClass("hidden");
    $("#upload-photo").addClass("hidden");
    $("#upload-site-photo").addClass("hidden");
});

$("#upload-photo-btn").click(function(){
    $("#create-team-btn").removeClass("active");
    $("#add-team-btn").removeClass("active");
    $("#edit-team-btn").removeClass("active");
    $("#upload-photo-btn").addClass("active");
    $("#upload-site-photo-btn").removeClass("active");

    $("#team-create").addClass("hidden");
    $("#add-team").addClass("hidden");
    $("#edit-team").addClass("hidden");
    $("#upload-photo").removeClass("hidden");
    $("#upload-site-photo").addClass("hidden");
});

$("#upload-site-photo-btn").click(function(){
    $("#create-team-btn").removeClass("active");
    $("#add-team-btn").removeClass("active");
    $("#edit-team-btn").removeClass("active");
    $("#upload-photo-btn").removeClass("active");
    $("#upload-site-photo-btn").addClass("active");

    $("#team-create").addClass("hidden");
    $("#add-team").addClass("hidden");
    $("#edit-team").addClass("hidden");
    $("#upload-photo").addClass("hidden");
    $("#upload-site-photo").removeClass("hidden");
});
