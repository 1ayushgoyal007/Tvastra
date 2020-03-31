window.onload  = function(){
    console.log("hello");
    var pImage = document.getElementsByClassName("float-right");
    var temp2 = document.getElementById("p-btn1");
    var tempspan = document.getElementById("blue-btn1");
    temp2.style.border  = "2px solid #0099ff";
    temp2.style.color = "black";
    tempspan.style.color = "#0099ff";
    for(var i=1;i<pImage.length;i++){
        pImage[i].style.display = "none";

    }
}

function showUl(){
    var content = document.querySelector('.ul-list');
    console.log(content.style.display);
    if(content.style.display == 'none'){
        content.style.display = 'block';
    }
    else{
        content.style.display = 'none';
    }
}



function showPara(id,hide,show){
    var hideicon = document.getElementById(show);
    var showicon = document.getElementById(hide);
    var para = document.getElementById(id);
    para.style.display = "block";
    showicon.style.display="none";
    hideicon.style.display = "block";
}
function hidePara(id,hide,show){
    var hideicon = document.getElementById(hide);
    var showicon = document.getElementById(show);
    var para = document.getElementById(id);
    console.log(para);
    para.style.display = "none";
    showicon.style.display = "none";
    hideicon.style.display  = "block";
}






function Display(str,btnn,sps){
    var temps = ["pImg1","pImg2","pImg3","pImg4","pImg5","pImg6","pImg7"];
    var btns = ["p-btn1","p-btn2","p-btn3","p-btn4","p-btn5","p-btn6","p-btn7"];
    var spans = ["blue-btn1","blue-btn2","blue-btn3","blue-btn4","blue-btn5","blue-btn6","blue-btn7"];
    var all = document.getElementsByClassName("float-right");
    var allb = document.getElementsByClassName("how-it-works-btn");
    var alls = document.getElementsByClassName("blue-btn");
    for(var i=0;i<all.length;i++){
        all[i].style.display="none";
        allb[i].style.border = "";
        allb[i].style.color = "";
        alls[i].style.color = "";
    }
    console.log(str);
    for(var i=0;i<temps.length;i++){
            if(str==temps[i] && btnn == btns[i]){
                var temp = document.getElementById(str);
                var temp1 = document.getElementById(btnn);
                var sp = document.getElementById(sps);
                if(temp.style.display=="none"){
                    temp.style.display = "block";
                    temp1.style.border  = "2px solid #0099ff";
                    temp1.style.color = "black";
                    sp.style.color = "#0099ff";
                }
                else{
                    temp.style.display = "none";
                }
            }
    }
}



var target = document.getElementById("input02");
var results = document.querySelector(".suggestions");
var Hospitals = ["Apollo Hospital","Primus Super Hospital","Fortis Hospital","Rockland Hospital"];
var doctors = ["Duke Sanson","Georgea Peter","charlie moon","Rose moon"];
var treatments = ["Dentistry","Cancer","Cardiologic Treatment","Multi organ Transplant","Orthopedic Surgery","Infertility Treatment"];
var matches = [];

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
    while(j<list.length){
        results.innerHTML += '<li class = "result" >' + list[j] +'</li>';
        j++;
    }
    toggleResults("show");
}

