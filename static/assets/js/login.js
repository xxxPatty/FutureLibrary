function login(){
    console.log("login");
    var myURL= "http://localhost:5000/login?";
    
    
    var email = $("#contact-email").val();
    var password = $("#contact-password").val();
//    console.log("email: "+email);
//    console.log("password: "+password);
    
    myURL += "email="+email+"&password="+password;
    console.log("myURL: "+myURL);
    
//    $.ajax({
//        url: myURL,
//        type: "GET",
//        dataType: "json",
//        contentType: 'application/json; charset=utf-8',
//        success: function(response){
//            console.log("success");
//            if(response._id == false){//登入失敗
//                window.alert("帳號/密碼錯誤！");
//            }
//            else{//登入成功
//                console.log("_ID: "+response._id);
//                sessionStorage.setItem("_id", response._id);
//                window.location.href='index.html';
//            }
//        },
//        error: function(){
//            console.log("error");
//        }
//    });
    
}