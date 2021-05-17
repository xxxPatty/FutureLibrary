var type = ["文學小說", "商業理財", "藝術設計", "人文史地", "社會科學", "自然科普", "心理勵志", "醫療保健", "飲食", "生活風格", "旅遊", "宗教命理", "親子教養", "童書/青少年文學", "影視偶像", "輕小說", "漫畫/圖文書", "語言學習", "考試用書", "電腦資訊", "專業/教科書/政府出版品", "參考書"];

function start(){
    //編輯書籍內容 start
    var content = "";
    var borrow_info_content = "";
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
            content += '<div class="form-group"  style="margin: 40px;">';
                content += '<select class="form-control" id="type">';
                    for(var i=0; i<type.length; i++){
                        if(response.book_info.type == type[i]){
                            content += '<option selected="selected">';
                            content += response.book_info.type;
                            content += '</option>';
                        }
                        else{
                            content += '<option>';
                            content += type[i];
                            content += '</option>';
                        }
                    }
                content += '</select>';
            content += '</div>';
            
            document.getElementById("show_original_info").innerHTML = content;
            //輸入框 end
            
            for(var i=0; i<response.borrow_infos.length; i++){
                borrow_info_content += '<div class="row">';
                    borrow_info_content += '<div class="contact-form text-center col-12 col-lg-3" style="margin: auto;">';
                        borrow_info_content += '<h5>';
                        borrow_info_content += response.borrow_infos[i].user_id;
                        borrow_info_content += '</h5>';
                    borrow_info_content += '</div>';
                    
                    borrow_info_content += '<div class="contact-form text-center col-12 col-lg-3" style="margin: auto;">';
                        borrow_info_content += '<h5>';
                        borrow_info_content += response.borrow_infos[i].borrow_time.from;
                        borrow_info_content += '</h5>';
                    borrow_info_content += '</div>';
                
                    borrow_info_content += '<div class="contact-form text-center col-12 col-lg-3" style="margin: auto;">';
                        borrow_info_content += '<h5>';
                        
                        if(i==response.borrow_infos.length-1 && response.returned_time==null){
                                    borrow_info_content += response.borrow_infos[i].borrow_time.to;
                                    borrow_info_content += '</h5>';
                            borrow_info_content += '</div>';
                            
                            borrow_info_content += '<div class="contact-form text-center col-12 col-lg-3" style="margin: auto;">';
                            borrow_info_content += '</div>';
                        }
                        else{//最後一位還沒還
                                    borrow_info_content += "應歸還時間為";
                                    borrow_info_content += response.returned_time;
                                    borrow_info_content += '</h5>';
                            borrow_info_content += '</div>';
                            
                            borrow_info_content += '<div class="contact-form text-center col-12 col-lg-3" style="margin: auto;">';
                                borrow_info_content += '<center><button type="button" class="btn return-btn" onclick="return_book(';
                                borrow_info_content += "'";
                                borrow_info_content += response.borrow_infos[i].user_id;
                                borrow_info_content += "'";
                                borrow_info_content += ')">還書</button></center>';
                            borrow_info_content += '</div>';
                        }
                    
                borrow_info_content += '</div>';
            }
            document.getElementById("borrow_info").innerHTML = borrow_info_content;
        },
        error: function(){
            console.log("error");
        }
    });
    //編輯書籍內容 end
    
    //借閱資料內容 start
    
    //借閱資料內容 end
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
    
    var id = localStorage.getItem("book_id");
    var name = $("#name").val();
    var author = $("#author").val();
    var type = $("#type").val();
    
    console.log("id: "+id);
    console.log("name: "+name);
    console.log("author: "+author);
    console.log("type: "+type);
    
    if(name!="" && author!="" && type!=""){ 
        var myURL = "http://localhost:5000/edit_book?book_id="+id+"&name="+name+"&author="+author+"&type="+type;
        console.log("送出的URL: "+myURL);
        
        $.ajax({
            url: myURL,
            type: "GET",
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function(response){
                console.log("success");
                if(response.message == "success"){
                    window.alert("編輯成功～");
                    window.location.href = 'book.html';
                }
                else{
                    console.log("error");
                    window.alert("編輯失敗T^T");
                }
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
    console.log("刪除中...");
    var id = localStorage.getItem("book_id");
    var myURL = "http://localhost:5000/delete_book?book_id="+id;
    console.log("myURL: "+myURL);
    
    $.ajax({
        url: myURL,
        type: "GET",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function(response){
            console.log("success");
            if(response.message == "success"){
                window.alert("刪除成功～");
                window.location.href = 'book.html';
            }
            else{
                console.log("error");
                window.alert("刪除失敗T^T");
            }
        },
        error: function(){
            console.log("error");
            window.alert("編輯失敗T^T");
        }
    });
}

function return_book(e){
    console.log("開始還書");
//    var book_id = e.getAttribute("id");
//    console.log("拿到的id: "+book_id);
//    localStorage.setItem('book_id', book_id);
//    window.location.href = 'book_detail_info.html';
}

function add_borrow_info(){
    var content = document.getElementById("borrow_info").innerHTML;
    //要幫忙設ID
//        content += '<div class="row">';
//            content += '<div class="contact-form text-center col-12 col-lg-2" style="margin: auto;">';
//                content += '<input type="text" class="form-control" id="name" placeholder="使用者ID">';
//            content += '</div>';
//            content += '<div class="contact-form text-center col-12 col-lg-2" style="margin: auto;">';
//                content += '<input type="text" class="form-control" id="name" placeholder="使用者姓名">';
//            content += '</div>';
//            content += '<div class="contact-form text-center col-12 col-lg-2" style="margin: auto;">';
//                content += '<input type="text" class="form-control" id="name" placeholder="借出日期">';
//            content += '</div>';
//            content += '<div class="contact-form text-center col-12 col-lg-2" style="margin: auto;">';
//                content += '<h5>尚未歸還</h5>';
//            content += '</div>';
//            content += '<div class="contact-form text-center col-12 col-lg-3" style="margin: auto;">';
//                
//            content += '<center><button type="button" class="btn return-btn" onclick="send_borrow_info()">新增</button></center>';
//            content += '</div>';
//        content += '</div>';
//    
//    document.getElementById("borrow_info").innerHTML = content;    
}

window.addEventListener("load", start, false);