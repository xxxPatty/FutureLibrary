var ngrok="http://30d2abdc6bba.ngrok.io";

function register(){
    console.log("register");
    var myURL= ngrok+"/register?";
    
    
    var email = $("#contact-email").val();
    var password = $("#contact-password").val();
    var name = $("#contact-name").val();
    var phone = $("#contact-phone").val();
    console.log("email: "+email);
    console.log("password: "+password);
    console.log("name: "+name);
    console.log("phone: "+phone);
    
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

//    $.ajax({
//        url: myURL,
//        //url: "coursetest.json",
//        type: "GET",
//        dataType: "json",
//        contentType: 'application/json; charset=utf-8',
//        success: function(response){
//            console.log("success");
//            createTable(response);
//            for(var i=0; i<response.length; i++){
//                console.log("time: "+response[i].course_time[3]);
//                console.log("name: "+response[i].name);
//                console.log("id: "+response[i].course_id);
//                console.log("teacher: "+response[i].teacher);
//                console.log("classroom: "+(response[i].classroom).name);
//            }
//        },
//        error: function(){
//            console.log("error");
//        }
//    });