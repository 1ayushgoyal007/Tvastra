window.onload = function(){
    var passwordInput = document.querySelector('.passwordField');
    passwordInput.onvalid = function(e){
        e.target.setCustomValidity("");
        if(!e.target.validity.valid){
            e.target.setCustomValidity("this field cannot be blank");
        }
    }
    setTimeout(function(){
        var errorElement = document.querySelector(".error");
        var successElement = document.querySelector('.success');
        if(errorElement != null){
            errorElement.style.display = "none";
        }
        if(successElement != null){
            successElement.style.display = "none";
        }
        },5000);
}
