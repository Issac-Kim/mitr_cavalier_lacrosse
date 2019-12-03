// navbar scroll color animation
$(document).scroll(function(){
    var pos = $(document).scrollTop();
    var home_content = $("#home-content").offset().top;
    if(pos >= home_content){
        $("#over-background").css("background-color", "black"); // make navbar background black when scrolling down
    }else{
        $("#over-background").css("background-color", "transparent");; // reset navbar to transparent
    }
});

function updateMenu(){
    $.ajax({
        type: "GET",
        url: "/api/team/get-teams",
        dataType: "json",
        success: function(responseData, status){
            var boysCount = 0;
            var girlsCount = 0;
            var mensCount = 0;
            $.each(responseData, function(i, team) {
                if(team.gender == "Boys") { boysCount++; }
                if(team.gender == "Mens") { mensCount++; }
                if(team.gender == "Girls") { girlsCount++; }
            });

            $.each(responseData, function(i, team) {
                var link = document.createElement("a");
                link.className = "dropdown-item";
                link.href = "/api/team/team-page/" + team._id;
                var text = document.createTextNode(team.gender + ' ' + team.year);
                link.appendChild(text);
                var element;
                if(team.gender == "Boys"){
                    element = document.getElementById("youth-boys");
                    boysCount--;
                    element.appendChild(link);
                    if(boysCount > 0){ 
                        var div = document.createElement("div");
                        div.className = "dropdown-divider";
                        element.appendChild(div);
                     }
                } else if (team.gender == "Girls") {
                    element = document.getElementById("youth-girls");
                    boysCount--;
                    element.appendChild(link);
                    if(girlsCount > 0){ 
                        var div = document.createElement("div");
                        div.className = "dropdown-divider";
                        element.appendChild(div);
                    }
                } else if (team.gender == "Mens") {
                    element = document.getElementById("mens");
                    mensCount--;
                    element.appendChild(link);
                    if(mensCount > 0){ 
                        var div = document.createElement("div");
                        div.className = "dropdown-divider";
                        element.appendChild(div);
                     }
                }
            });
        }, error: function(msg) {
            alert("There was a problem: " + msg.status + " " + msg.statusText);
        }
    });
}


$( document ).ready(function() {
    var htmlStr = `
    <nav class="navbar navbar-expand" id="over-background">
            <a class="navbar-brand" href="/"><img height="50em" src="/design/resources/pictures/cavs_logo_white.png"/></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Boys </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">

                            <div id="youth-boys"></div>
                            
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Girls </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            
                            <div id="youth-girls"></div>
                        
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Mens </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            
                            <div id="mens"></div>
                        </div>
                    </li>
                    
                    <li class="nav-item">
                        <a class="nav-link" href="http://www.cavalierlacrosse.com/Store/Default.asp?menu=TAB:20350&org=Cavalierlacrosse.com"> Store </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="http://www.cavalierlacrosse.com/Registration/Default.asp?n=68011&org=Cavalierlacrosse.com""> Register </a>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        US Lacrosse
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="https://www.uslaxmagazine.com/?utm_source=LA_navigation">USLaxMagazine</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="http://www.uslacrosse.org/membership.aspx?utm_source=LA_navigation">Membership</a>              
                        </div>
                    </li>
                </ul>

                <ul class="nav navbar-nav navbar-right">
                    <li class="nav-item">
                        <a class="nav-link" href="/api/user/login">Settings</a>
                    </li>
                </ul>
            </div>
        </nav>
        `;

        document.getElementById("navbar").innerHTML = htmlStr;
        updateMenu();
});