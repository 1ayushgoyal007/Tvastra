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

function Display(str,btnn,sps){
    var temps = ["pImg1","pImg2","pImg3","pImg4","pImg5","pImg6","pImg7"];
    var btns = ["p-btn1","p-btn2","p-btn3","p-btn4","p-btn5","p-btn6","p-btn7"];
    var spans = ["blue-btn1","blue-btn2","blue-btn3","blue-btn4","blue-btn5","blue-btn6","blue-btn7"];
    var all = document.getElementsByClassName("float-right");
    var allb = document.getElementsByClassName("Consultation");
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
