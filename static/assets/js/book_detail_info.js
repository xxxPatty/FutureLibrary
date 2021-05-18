var type = ["文學小說", "商業理財", "藝術設計", "人文史地", "社會科學", "自然科普", "心理勵志", "醫療保健", "飲食", "生活風格", "旅遊", "宗教命理", "親子教養", "童書/青少年文學", "影視偶像", "輕小說", "漫畫/圖文書", "語言學習", "考試用書", "電腦資訊", "專業/教科書/政府出版品", "參考書"];

var isreturn;
var isdelete=false; //是否能刪除，預設是不行，除非目前沒有借閱資料

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
            if(response.borrow_infos.length==0){
                isreturn = true;
                isdelete = true;
            }
        //編輯書籍內容 end
            
            //顯示借閱資料 start
            for(var i=0; i<response.borrow_infos.length; i++){
                borrow_info_content += '<div class="row">';
                    borrow_info_content += '<div class="contact-form text-center col-12 col-lg-3" style="margin-top: 17px;">';
                        borrow_info_content += '<h5>';
                        borrow_info_content += response.borrow_infos[i].user_id;
                        borrow_info_content += '</h5>';
                    borrow_info_content += '</div>';
                    
                    borrow_info_content += '<div class="contact-form text-center col-12 col-lg-3" style="margin-top: 17px;">';
                        borrow_info_content += '<h5>';
                        borrow_info_content += response.borrow_infos[i].borrow_time.from;
                        borrow_info_content += '</h5>';
                    borrow_info_content += '</div>';
                
                    borrow_info_content += '<div class="contact-form text-center col-12 col-lg-3" style="margin-top: 17px;">';
                        borrow_info_content += '<h5>';
                        
                        if(i!=response.borrow_infos.length-1 || response.returned_time==null){
                            isreturn = true;
                                    borrow_info_content += response.borrow_infos[i].borrow_time.to;
                                    borrow_info_content += '</h5>';
                            borrow_info_content += '</div>';
                            
                            borrow_info_content += '<div class="contact-form text-center col-12 col-lg-3" style="margin-top: 17px;">';
                            borrow_info_content += '</div>';
                        }
                        else if(i==response.borrow_infos.length-1){//最後一位還沒還
                            isreturn = false;
//                                    borrow_info_content += "應歸還時間為";
//                                    borrow_info_content += response.returned_time;
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
    //顯示借閱資料 end
    
    console.log("初始畫面 結束");
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
    if(isdelete){
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
    else{
        window.alert("無法刪除，此書已被借閱過～");
    }
}

function return_book(user_id){
    console.log("開始還書");
    console.log("user_id: "+user_id);
    console.log("book_id: "+localStorage.getItem("book_id"));
    var myURL = "http://localhost:5000/return_book?user_id="+user_id+"&book_id="+localStorage.getItem("book_id");
    $.ajax({
        url: myURL,
        type: "GET",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function(response){
            console.log("success");
            if(response.message == "success"){//登入失敗
                window.alert("歸還成功～");
                window.location.href='book_detail_info.html';
            }
            else{//登入成功
                window.alert("歸還失敗～");
            }
        },
        error: function(){
            console.log("error");
            window.alert("歸還失敗～");
        }
    });
//    var book_id = e.getAttribute("id");
//    console.log("拿到的id: "+book_id);
//    localStorage.setItem('book_id', book_id);
//    window.location.href = 'book_detail_info.html';
}

//新增借閱資料（多出一行，供使用者輸入）
function add_borrow_info(){
    var today_date = new Date();
    var year = today_date.getFullYear();
    var month = today_date.getMonth()+1;//js從0開始取
    var date = today_date.getDate();
    
    if(month<10){
        month = "0" + month;
    }
    if(date<10){
        date = "0" + date;
    }
    
    var today = year+"-"+month+"-"+date;
    console.log("today: "+today);
    
    var year_return = today_date.getFullYear();
    var month_return = today_date.getMonth()+1;//js從0開始取
    var date_return = today_date.getDate()+7;
    
    
    if(date_return<10){
        date_return = "0" + date_return;
    }
    else if((month_return==1 || month_return==3 || month_return==5 || month_return==7 || month_return==8 || month_return==10 || month_return==12) && date_return>31){
        month_return += 1;
        date_return -= 31;
        if(date_return<10){
            date_return = "0" + date_return;
        }
    }
    else if((month_return==4 || month_return==6 || month_return==9 || month_return==11) && date_return>30){
        month_return += 1;
        date_return -= 30;
        if(date_return<10){
            date_return = "0" + date_return;
        }
    }
    else if(month_return==2 && year_return%4==0 && date_return>29){
        month_return += 1;
        date_return -= 29;
        if(date_return<10){
            date_return = "0" + date_return;
        }
    }
    else if(month_return==2 && year_return%4!=0 && date_return>28){
        month_return += 1;
        date_return -= 28;
        if(date_return<10){
            date_return = "0" + date_return;
        }
    }
    if(month_return<10){
        month_return = "0" + month_return;
    }
    var need_return = year_return+"-"+month_return+"-"+date_return;
    
    console.log("新增借閱資料的input");
    var content = document.getElementById("borrow_info").innerHTML;
    //要幫忙設ID
    
    if(isreturn){
        content += '<div class="row">';
            content += '<div class="contact-form text-center col-12 col-lg-3" style="margin: auto;">';
                content += '<input type="text" class="form-control" id="borrow_info_user_id" placeholder="使用者ID">';
            content += '</div>';
            content += '<div class="contact-form text-center col-12 col-lg-3" style="margin: auto;">';
                content += '<h5>';
                content += today;
                content += '</h5>';
            content += '</div>';
            content += '<div class="contact-form text-center col-12 col-lg-3" style="margin: auto;">';
                content += '<h5>應在「';
                content += need_return;
                content += '」歸還</h5>';
            content += '</div>';
            content += '<div class="contact-form text-center col-12 col-lg-3" style="margin: auto;">';
                content += '<center><button type="button" class="btn return-btn" onclick="send_borrow_info()">新增</button></center>';
            content += '</div>';
        content += '</div>';
        document.getElementById("borrow_info").innerHTML = content;
    }
    else{
        window.alert("書籍尚未歸還，無法借出～");
    }
}

//新增借閱資料（傳給後端）
function send_borrow_info(){
    console.log("送出借閱資料到後端");
    var user_id = $("#borrow_info_user_id").val();
    console.log("user ID: "+ user_id);
    console.log("book ID: "+localStorage.getItem("book_id"));
    
    var myURL = "http://localhost:5000/borrow_book?user_id="+user_id+"&book_id="+localStorage.getItem("book_id");
    $.ajax({
        url: myURL,
        type: "GET",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function(response){
            console.log("success");
            if(response.message == "success"){//登入失敗
                window.alert("新增成功！");
                window.location.href = "book_detail_info.html";
            }
            else{//登入成功
                window.alert("新增失敗！");
            }
        },
        error: function(){
            console.log("error");
        }
    });
}

window.addEventListener("load", start, false);