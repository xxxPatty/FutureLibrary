//用來記得拿到的base64
var base64;
var image;

$("#book_img_btn").change(function(){
    readURL(this);
});

function readURL(input){
    var myURL = "http://localhost:5000";
    var reader;
    
    
    //若有選到檔案，會被放在一個叫「input.files」的陣列裡
    if(input.files && input.files[0]){//如果有檔案
        console.log("照片: "+input.files[0]);
        reader = new FileReader();
        reader.onload = function (e) {
            $("#book_img").attr("src", e.target.result);
            console.log("這是base64？ "+e.target.result);
            base64 = e.target.result;
//            image = new Image();
//            image.src = base64;
//            document.body.appendChild(image);
//            console.log("照片是: "+image);
//            var a = document.createElement('a');
//            var event = new MouseEvent('click');
//            a.download = '劉耀文.png';
//            a.href = base64;
//
//            a.dispatchEvent(event);
        }
        reader.readAsDataURL(input.files[0]);
      }
    
    var data = {"base64_str" : base64};
    
    console.log("data: " + data.base64_str);
    
//    //將資料傳送至後端
//    $.ajax({
//        url: myURL,
//        data: data,
//        type: "POST",
//        dataType: "json",
//        contentType: 'application/json; charset=utf-8',
//        success: function(response){
//            console.log("success");
//        },
//        error: function(){
//            console.log("error");
//        }
//    });
}

function add_book(){
    var name = $("#name").val();
    var author = $("#author").val();
    var type = $("#type").val();
    var location = $("#location").val();
    
    
    
    console.log("name: "+name);
    console.log("author: "+author);
    console.log("type: "+type);
    console.log("location: "+location);
    console.log("img: "+base64);
    
    if(name!="" && author!="" && type!="" && location!=""){
        var data = {"name" : name, "author" : author, "type" : type, "location" : location, "img" : base64};
        
        $.ajax({
            url: "http://localhost:5000/add_book",
            type: "POST",
            dataType: "json",
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            success: function(response){
                console.log("success");
                window.alert("新增成功～");
                window.location.href = 'book.html';
            },
            error: function(){
                console.log("error");
                window.alert("新增失敗T^T");
            }
        });
    }
    else{
        window.alert("新增失敗T^T\n資料輸入不全...");
    }
}


