function addField(arrName, elementId){
    var input = document.createElement("input");
    input.className = "form-control";
    input.type = "text";
    input.name = arrName + "[]";

    var element = document.getElementById(elementId);
    element.appendChild(input);
}

function populateOnload(){
    populateAccountDropDown();
    populateTeamDropDown();
    populatePhotoDropDown();
}

function addRosterRow(table){
    var htmlStr ="";
    htmlStr += "<tr>";
    htmlStr += '<td><input type ="text" name="number[]"></td>';
    htmlStr += '<td><input type ="text" name="first[]"></td>';
    htmlStr += '<td><input type ="text" name="last[]"></td>';
    htmlStr += '<td><input type ="text" name="position[]"></td>';
    htmlStr == '</tr>';

    document.getElementById(table).insertAdjacentHTML('beforeend',htmlStr);
}

function populateTeamDropDown(){
    $.ajax({
        type: "GET",
        url: "/api/team/get-teams",
        dataType: "json",
        success: function(responseData, status){
            //Loops through each project in the responseData 
            $.each(responseData, function(i, team) {
                var select = document.createElement("option");
                select.value = team._id;
                var text = document.createTextNode(team.gender + ' ' + team.year);
                select.appendChild(text);

                var element = document.getElementById("edit-team-select");
                element.appendChild(select);
            });
        }, error: function(msg) {
            alert("There was a problem: " + msg.status + " " + msg.statusText);
        }
    });
}

function populateAccountDropDown(){
    $.ajax({
        type: "GET",
        url: "/api/user/get-all-users",
        dataType: "json",
        success: function(responseData, status){
            //Loops through each project in the responseData 
            $.each(responseData, function(i, user) {
                var select = document.createElement("option");
                select.value = user._id;
                var text = document.createTextNode(user.username);
                select.appendChild(text);

                var element = document.getElementById("team-account-drop-down");
                element.appendChild(select);
            });
        }, error: function(msg) {
            alert("There was a problem: " + msg.status + " " + msg.statusText);
        }
    });
}

function populatePhotoDropDown(){
    $.ajax({
        type: "GET",
        url: "/api/team/get-teams",
        dataType: "json",
        success: function(responseData, status){
            //Loops through each project in the responseData 
            $.each(responseData, function(i, team) {
                var select = document.createElement("option");
                select.value = team._id;
                var text = document.createTextNode(team.gender + ' ' + team.year);
                select.appendChild(text);

                var element = document.getElementById("upload-photo-select");
                element.appendChild(select);
            });
        }, error: function(msg) {
            alert("There was a problem: " + msg.status + " " + msg.statusText);
        }
    });
}

function editTeamForm(id){
    $.ajax({
        type: "GET",
        url: "/api/team/get-team-by-id/" + id,
        dataType: "json",
        success: function(team, status){
            //Loops through each project in the responseData 
            var htmlStr = ""
            htmlStr += '<form id="edit-team-form" role="form" method="post" action="/api/team/update-team-by-id/' + id + '">'
            
            htmlStr += '<label>About</label><br>';
            htmlStr += '<textarea class="form-control" name="about" rows="8" cols="100">' + team.about +' </textarea>';
            htmlStr += '<br>';
            
            htmlStr += '<label>Coaches</label>';
            htmlStr += '<button type="button" onclick="addField(\'coaches\', \'edit-coaches-form\')"> + </button> <br>';
            htmlStr += '<div id="edit-coaches-form">';
            $.each(team.coaches, function(i, coach) {
                htmlStr += '<input class="form-control" type="text" name="coaches[]" value="' + coach + '">';
            });
            htmlStr += '<input class="form-control" type="text" name="coaches[]">';
            htmlStr += '</div>';
            htmlStr += '<br>';

            htmlStr += '<label>Tournaments</label>';
            htmlStr += '<button type="button" onclick="addField(\'tournaments\', \'edit-tournaments-form\')"> + </button> <br>';
            htmlStr += '<div id="edit-tournaments-form">';
            $.each(team.tournaments, function(i, tournament) {
                htmlStr += '<input class="form-control" type="text" name="tournaments[]" value="' + tournament + '">';
            });
            htmlStr += '<input class="form-control" type="text" name="tournaments[]">'
            htmlStr += '</div>';
            htmlStr += '<br>';

            htmlStr += '<label>Tryouts</label>';
            htmlStr += '<button type="button" onclick="addField(\'Tryouts\', \'edit-tryouts-form\')"> + </button> <br>';
            htmlStr += '<div id="edit-tryouts-form">';
            $.each(team.tryouts, function(i, tryout) {
                htmlStr += '<input class="form-control" type="text" name="tryouts[]" value="' + tryout + '">';
            });
            htmlStr += '<input class="form-control" type="text" name="tryouts[]">'
            htmlStr += '</div>';
            htmlStr += '<br>';

            htmlStr += '<label>Location</label>';
            htmlStr += '<input class="form-control" type="text" name="location" value="' + team.location + '">';
            htmlStr += '<br>';

            htmlStr += '<label>Fees</label><br>';
            htmlStr += '<textarea class="form-control" name="fees" rows="4" cols="50">' + team.fees + '</textarea>';
            htmlStr += '<br>';

            htmlStr += '<label>Other</label><br>';
            htmlStr += '<textarea class="form-control" name="other" rows="8" cols="100">' + team.other + '</textarea>';
            htmlStr += '<br>';

            htmlStr += '<label>Roster</label><br>';
            htmlStr += '<button type="button" onclick="addRosterRow(\'edit-roster-table\')"> + </button>';

            htmlStr += '<table border="1">';
            htmlStr += '<thead> <tr> <th>#</th><th>First Name</th><th>Last Name</th><th>Postion</th></tr></thead>';
            htmlStr += '<tbody id="edit-roster-table">'
            $.each(team.roster, function(i, player){
                htmlStr += '<tr>';
                htmlStr += '<td><input type ="text" name="number[]" value="' + player.Number + '"></td>';
                htmlStr += '<td><input type ="text" name="first[]" value="' + player.firstName + '"></td>';
                htmlStr += '<td><input type ="text" name="last[]" value="' + player.lastName + '"></td>';
                htmlStr += '<td><input type ="text" name="position[]" value="' + player.position + '"></td>';
                htmlStr += '</tr>'
            });
            htmlStr += '</tbody>';
            htmlStr += '</table> <br>';

            htmlStr += '<button class="btn btn-primary" type="submit">Save</button>';
            htmlStr += '</form>'

            document.getElementById("edit-team-form").innerHTML = htmlStr;
        }, error: function(msg) {
            alert("There was a problem: " + msg.status + " " + msg.statusText);
        }
    });
}

function uploadPhotoForm(id) {
    console.log(id);
    var photoForm = "";
    photoForm += '<br><form id="upload-photo-form" enctype="multipart/form-data" method="post" action="/api/team/upload/' + id + '">';
    photoForm += '<label>Upload Photo(s)</label><br>';
    photoForm += '<input class="form-control-file" type="file" accept="image/*" name="photo" multiple>'
    photoForm += '<br><button class="btn btn-primary" type="submit">Save</button>'
    photoForm += '</form>'
    document.getElementById("upload-photo-form").innerHTML = photoForm;
}

function validateTeamForm () {
    var year = document.forms["addTeamForm"]["year"].value;
    if (year == "") {
        alert("Year/Name must be filled out");
        return false;
    }
}