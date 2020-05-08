var target = document.getElementById("input02");
var results = document.querySelector(".suggestions");
var docs = document.querySelectorAll('.each-doctor-item');
var hosps = document.querySelectorAll('.each-hospital-item');

var doctors = [];
var Hospitals = [];
var matches = [];
var treatments = ["Dentistry","Cancer","Cardiologic Treatment","Multi organ Transplant","Orthopedic Surgery","Infertility Treatment"];


for(var i=0;i< hosps.length;i++){
    Hospitals.push(hosps[i].innerText.trim());
}

for(var i=0; i<docs.length ; i++){
    doctors.push(docs[i].innerText.trim());
}

if(target){
    target.focus();
target.addEventListener("keyup",function(event){

    results.innerHTML = "";
    toggleResults("hide");

    if(this.value.length > 0 ){
        matches = getMatches(this.value);

        if(matches.length > 0){
            displayMatches(matches);
        }
    }
});

}

function toggleResults(action){
    if(action == "show"){
        results.classList.add("visible");
    }
    else{
        results.classList.remove("visible");
    }
}

function getMatches(text){
    var match = [];
    for(var i=0;i<Hospitals.length;i++){
        if(Hospitals[i].toLowerCase().indexOf(text.toLowerCase()) != -1){
            match.push(Hospitals[i]);
        }
    }
    for(var i=0;i<doctors.length;i++){
        if(doctors[i].toLowerCase().indexOf(text.toLowerCase()) != -1){
            match.push(doctors[i]);
        }
    }
    for(var i=0;i<treatments.length;i++){
        if(treatments[i].toLowerCase().indexOf(text.toLowerCase()) != -1){
            match.push(treatments[i]);
        }
    }
    if(match.length>0){
    return match;
    }
    else{
        return ["Search not found"];
    }
}
function displayMatches(list){
    var j=0;


    for(var i=0;i<list.length;i++){
        if(doctors.indexOf(list[i]) > -1){
            console.log('stuck here');
            for(var j=0; j<docs.length;i++){
                console.log('its here');
                console.log('list[i]',list[i]);
                console.log('docs[j]',docs[j].innerText.trim());

                if(list[i]==docs[j].innerText.trim()){
                    results.innerHTML += `<li class = "result" ><a  href="${docs[j].pathname}" > ${list[i]} </a> </li>`;
                    break;
                }
                else{
                    break;
                }
            }

    }

    else if(Hospitals.indexOf(list[i]) > -1){
        console.log('stuck here');
        for(var j=0; j<hosps.length ;i++){
            console.log('its here');
            console.log('list[i]',list[i]);
            console.log('hosps[j]',hosps[j].innerText.trim());

            if(list[i]==hosps[j].innerText.trim()){
                results.innerHTML += `<li class = "result" ><a  href="${hosps[j].pathname}" > ${list[i]} </a> </li>`;
                break;
            }
            else{
                break;
            }
        }

}
    else{
        results.innerHTML += '<li class = "result" > <a href="/treatment"   >' + list[i] +'</a></li>';
    }
}

    toggleResults("show");
}
