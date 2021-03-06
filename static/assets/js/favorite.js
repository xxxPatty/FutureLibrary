function start(){
    var user_id = localStorage.getItem("user_id");
    var myURL = "http://localhost:5000/show_user_by_id?user_id="+user_id;
    var content = "";
    var favorite_book = [];
    
    $.ajax({
        url: myURL,
        type: "GET",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function(response){
            console.log("success get_favorite");
            for(var i=0; i<response.favorite.length; i++){
                favorite_book[i] = response.favorite[i];
            }
            if(response.favorite.length==0){
                content += '<div class="container">';
                    content += '<div class="row" style="text-align: center; margin-left: 300px;">';
                        content += '<span style="color: ghostwhite;">還沒有喜歡的唷！<br>趕快去加～</span>';
                    content += '</div>';
                    content += '<div class="row" style="align: center; valign=center;">';

                        content += '<img src="../static/img/no_book.png" style="height: 300px; display: block; margin: 0 auto;">';
                    content += '</div>';
                
                    
                content += '</div>';
            }
            for(var i=0; i<response.favorite.length; i++){
                if(i%4 == 0){
                    content += '<div class="row sonar-portfolio">';
                }
                
                content += '<div class="col-12 col-lg-3 single_gallery_item landscapes studio animated fadeInUpBig" style="width: 300px; animation-delay: ';
                content += (100+(i%4)*200);
                content += 'ms;">';
                
                var tempURL = "http://localhost:5000/read_image?book_id="+response.favorite[i];
                    $.ajax({
                        url: tempURL,
                        type: "GET",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        async: false,
                        success: function(data){
                            console.log("success get book_info");
                            content += '<a class="gallery-img" href="#">';
                            content += data.img;
                            content += '</a>';
                            
                        },
                        error: function(){
                            console.log("error");
                        }
                    });
                    
                    
                    tempURL = "http://localhost:5000/show_book_by_id?book_id="+response.favorite[i];
                    console.log("書的ID: "+response.favorite[i]);
                    $.ajax({
                        url: tempURL,
                        type: "GET",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        async: false,
                        success: function(data){
                            console.log("success get book_info");
                            
                            content += '<div class="gallery-content">';
                            content += '<h4 style="color: ghostwhite;">';
                            //目前喜歡
                            if(favorite_book.includes(data._id)){
                                content += '<button style="background-color: transparent;border-style:none; padding:10px;" onclick="favorite(';
                                content += "'";
                                content += data._id;
                                content += "'";
                                content += ')"><i id="';
                                content += data._id;
                                content += '" class="fa fa-heart" style="font-size:30px;color:#FF6A6A;"></i></button>';
                                
                            }
                            else{
                                content += '<button style="background-color: transparent;border-style:none; padding:10px;" onclick="favorite(';
                                content += "'";
                                content += data._id;
                                content += "'";
                                content += ')"><i id="';
                                content += data._id;
                                content += '" class="fa fa-heart-o" style="font-size:30px;color:#FFE4E1;"></i></button>';
                            }
                            
                            content += data.book_info.name;
                            content += '</h4><p>';
                            content += data.book_info.author;
                            content += '</p><p>';
                            content += data.book_info.type;
                            content += '</p></div>';
                    
                        },
                        error: function(){
                            console.log("error");
                        }
                    });
                    
                    content += '</div>';
                
                if(i%4 == 3){
                    content += '</div>';
                }
            }
            document.getElementById("show_favorite_book").innerHTML = content;
            console.log("結束～");
        },
        error: function(){
            console.log("error");
        }
    });
    
}

function favorite(id){
    console.log("點選我的最愛");
    console.log("最愛書本的ID: "+id);
    var book = document.getElementById(id);
    //原本喜歡
    if(book.getAttribute("class")=="fa fa-heart"){
        console.log("原本喜歡")
        book.setAttribute("class", "fa fa-heart-o");
        book.style.color = "#FFE4E1";
        
        //告訴後端 移出喜歡delete_user_favorite
        var myURL = "http://localhost:5000/delete_user_favorite?user_id="+localStorage.getItem("user_id")+"&book_id="+id;
        $.ajax({
            url: myURL,
            type: "GET",
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function(response){
                console.log("success");
                if(response.message == "success"){//登入失敗
                    console.log("成功移出我的最愛");
                }
                else{//登入成功
                    console.log("無法移出我的最愛");
                    window.alert("無法移出我的最愛");
    //                window.location.href='index.html';
                }
            },
            error: function(){
                console.log("error");
            }
        });
    }
    else{//原本不喜歡
        book.setAttribute("class", "fa fa-heart");
        book.style.color = "#FF6A6A";
        
        //告訴後端 加到喜歡
        var myURL = "http://localhost:5000/edit_user_favorite?user_id="+localStorage.getItem("user_id")+"&book_id="+id;
        $.ajax({
            url: myURL,
            type: "GET",
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function(response){
                console.log("success");
                if(response.message == "success"){//登入失敗
                    console.log("成功加入我的最愛");
                }
                else{//登入成功
                    console.log("無法加入我的最愛");
                    window.alert("無法加入我的最愛");
    //                window.location.href='index.html';
                }
            },
            error: function(){
                console.log("error");
            }
        });
    }
}

window.addEventListener("load", start, false);