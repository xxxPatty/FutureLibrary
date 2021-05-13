function register(){
    console.log("register");
    var myURL= "http://localhost:5000/register?";
    
    
    var email = $("#contact-email").val();
    var password = $("#contact-password").val();
    var name = $("#contact-name").val();
    var phone = $("#contact-phone").val();
//    console.log("email: "+email);
//    console.log("password: "+password);
//    console.log("name: "+name);
//    console.log("phone: "+phone);
    
    myURL += "email="+email+"&password="+password+"&name="+name+"&phone="+phone;
    console.log("myURL: "+myURL);
    
    $.ajax({
        url: myURL,
        type: "GET",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function(response){
            console.log("success");
            if(response._id == false){//註冊失敗
                window.alert("此mail已註冊～");
            }
            else{//註冊成功
                console.log("_ID: "+response._id);
                //sessionStorage.setItem("_id", response._id);
                window.alert("註冊成功～");
                window.location.href = "login.html";
            }
        },
        error: function(){
            console.log("error");
        }
    });
    
}