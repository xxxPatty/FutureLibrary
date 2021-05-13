function start(){
    var content = "";
    var img_base64 = "";
    var book_id = localStorage.getItem("book_id");
    var myURL = "http://localhost:5000/show_book_by_id?book_id="+book_id;
    
    
    
    $.ajax({
        url: myURL,
        type: "GET",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function(response){
            console.log("success");
            
            //照片 start
            img_base64 += '<img id="book_img" src="';
            img_base64 += response.book_info.img;
            img_base64 += '">';
            document.getElementById("show_book").innerHTML = img_base64;
            //照片 end
            
            //輸入框 start
            content += '<div class="form-group" style="margin: 40px;">';
                content += '<input type="text" class="form-control" id="name" placeholder="書名" value="';
                content += response.book_info.name;
                content += '">';
            content += '</div>';
            content += '<div class="form-group" style="margin: 40px;">';
                content += '<input type="text" class="form-control" id="author" placeholder="作者" value="';
                content += response.book_info.author;
                content += '">';
            content += '</div>';
            content += '<div class="form-group" style="margin: 40px;">';
                content += '<input type="text" class="form-control" id="type" placeholder="種類" value="';
                content += response.book_info.type;
                content += '">';
            content += '</div>';
            
            document.getElementById("show_original_info").innerHTML = content;
            //輸入框 end
        },
        error: function(){
            console.log("error");
        }
    });
}

$("#book_img_btn").change(function(){
    readURL(this);
});

function readURL(input){
    var myURL = "http://localhost:5000/add_book";
    var base64;
    var reader;
    
    //若有選到檔案，會被放在一個叫「input.files」的陣列裡
    if(input.files && input.files[0]){//如果有檔案
        
        reader = new FileReader();
        reader.onload = function (e) {
            $("#book_img").attr("src", e.target.result);
            console.log("這是base64？ "+e.target.result);
            base64 = e.target.result;
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

//編輯書籍
function edit_book(){
    
    var id = "還沒寫";
    var name = $("#name").val();
    var author = $("#author").val();
    var type = $("#type").val();
    
//    console.log("id: "+id);
//    console.log("name: "+data.name);
//    console.log("author: "+data.author);
//    console.log("type: "+data.type);
    
    if(name!="" && author!="" && type!=""){
//        var data = {"name" : name, "author" : author, "type" : type, "location" : location, "img" : base64};
        
        var myURL = "http://localhost:5000/edit_book?book_id="+id+"&name="+name+"&author="+author+"&type="+type;
        
        $.ajax({
            url: myURL,
            type: "GET",
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function(response){
                console.log("success");
                window.alert("編輯成功～");
                window.location.href = 'book.html';
            },
            error: function(){
                console.log("error");
                window.alert("編輯失敗T^T");
            }
        });
    }
    else{
        window.alert("編輯失敗T^T\n資料輸入不全...");
    }
}

//刪除書籍
function delete_book(){
    
}

window.addEventListener("load", start, false);