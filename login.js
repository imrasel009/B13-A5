document.getElementById("btn-login").addEventListener("click", function(){
   const userInput = document.getElementById("input-username");
    const userName = userInput.value;

    const inputPin = document.getElementById("input-pin");
    const pinNumber = inputPin.value;

    if(userName=="admin" && pinNumber=="admin123"){
        alert("Sign In Success");
    }else{
        alert("Sign In failed");
        return;
    }
    
    
    
});
