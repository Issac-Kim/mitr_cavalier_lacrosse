function addField(arrName, elementId){
    var input = document.createElement("input");
    input.type = "text";
    input.name = arrName + "[]";

    var brk = document.createElement("br");

    var element = document.getElementById(elementId);
    element.appendChild(input);
    element.appendChild(brk);
}

function populateOnload(){
    populateAccountDropDown();
    populateTeamDropDown();
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

            htmlStr += '<textarea name="about" rows="8" cols="100">' + team.about +' </textarea>';
            htmlStr += '<br>';
            
            htmlStr += '<label>Coaches</label><br>';
            htmlStr += '<div id="edit-coaches-form">';
            htmlStr += '<input type="text" name="coaches[]">'
            htmlStr += '<span onclick="addField(\'coaches\', \'edit-coaches-form\')"> + </span> <br>'
            $.each(team.coaches, function(i, coach) {
                // need to add the plus
                htmlStr += '<input type="text" name="coaches[]" value="' + coach + '">';
                htmlStr += '<br>'
            });
            htmlStr += '</div>';
            htmlStr += '<br>';

            htmlStr += '<label>Tournaments</label><br>'
            htmlStr += '<div id="edit-tournaments-form">';
            htmlStr += '<input type="text" name="tournaments[]">'
            htmlStr += '<span onclick="addField(\'tournaments\', \'edit-tournaments-form\')"> + </span> <br>'
            $.each(team.tournaments, function(i, tournament) {
                // need to add the plus
                htmlStr += '<input type="text" name="tournaments[]" value="' + tournament + '">';
                htmlStr += '<br>'
            });
            htmlStr += '</div>';
            htmlStr += '<br>';

            htmlStr += '<label>Tryouts</label><br>'
            htmlStr += '<div id="edit-tryouts-form">';
            htmlStr += '<input type="text" name="tryouts[]">'
            htmlStr += '<span onclick="addField(\'tryouts\', \'edit-tryouts-form\')"> + </span> <br>'
            $.each(team.tryouts, function(i, tryout) {
                // need to add the plus
                htmlStr += '<input type="text" name="tryouts[]" value="' + tryout + '">';
                htmlStr += '<br>'
            });
            htmlStr += '</div>';
            htmlStr += '<br>';

            htmlStr += '<label>Location</label>';
            htmlStr += '<input type="text" name="location" value="' + team.location + '">';
            htmlStr += '<br>';

            htmlStr += '<label>Fees</label><br>';
            htmlStr += '<textarea name="fees" rows="4" cols="50">' + team.fees + '</textarea>';
            htmlStr += '<br>';

            htmlStr += '<label>Other</label><br>';
            htmlStr += '<textarea name="other" rows="8" cols="100">' + team.other + '</textarea>';
            htmlStr += '<br>';

            htmlStr += '<label>Roster</label><br>';
            htmlStr += '<span onclick="addRosterRow(\'edit-roster-table\')"> Click to add rows + </span>';

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
            htmlStr+= '</table>';

            htmlStr += '<button type="submit">Save</button>';
            htmlStr += '</form>'

            document.getElementById("edit-team-form").innerHTML = htmlStr;
        }, error: function(msg) {
            alert("There was a problem: " + msg.status + " " + msg.statusText);
        }
    });
}

function validateTeamForm () {
    var year = document.forms["addTeamForm"]["year"].value;
    if (year == "") {
        alert("Year/Name must be filled out");
        return false;
    }
}