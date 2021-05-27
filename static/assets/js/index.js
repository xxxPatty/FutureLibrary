var week = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

function set(){
    $(".variable").slick({
        dots: true,
        infinite: true,
        variableWidth: true,
        centerMode: true,
          centerPadding: '60px',
          slidesToShow: 3,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 3
              }
            },
            {
              breakpoint: 480,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
              }
            }
          ]
        });
}

function start(){
    console.log("start");
    //顯示新書 start
    var content = "", myURL, temp_img;
    $.ajax({
        url: "http://localhost:5000/show_new_book",
        type: "GET",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function(response){
            console.log("success");
            for(var i=0; i<response.length; i++){
                myURL = "http://localhost:5000/read_image?book_id="+response[i]._id;
                console.log("myURL: "+myURL);
                content += '<div>';
                
                    $.ajax({
                        url: myURL,
                        type: "GET",
                        dataType: "json",
                        async:false,
                        contentType: 'application/json; charset=utf-8',
                        success: function(data){
                            console.log("success");
                            temp_img = data.img;
                        },
                        error: function(){
                            console.log("error");
                        }
                    });
                    content += temp_img;
                    content += '<div class="hero-slides-content">';
                        content += '<div class="line"></div>';
                        content += '<h2 style="color: ghostwhite; width:300px; font-size: 20px; font-weight:bold; text-align: center; padding: 10px;">';
                        content += response[i].book_info.name;
                        content += '</h2>';
                        content += '<p style="color: ghostwhite; text-align: center;">';
                        content += response[i].book_info.author;
                        content += ' | ';
                        content += response[i].book_info.type;
                        content += '</p>';
                    content += '</div>';
                content += '</div>';
            }
            document.getElementById("show_new_book").innerHTML = content;
            set();
        },
        error: function(){
            console.log("error");
        }
    });
    //顯示新書 end
    
    
    //顯示圖書館資訊 start
    $.ajax({
        url: "http://localhost:5000/show_library",
        type: "GET",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function(response){
            console.log("success");
            document.getElementById("library_name").innerHTML = response.name;
            document.getElementById("library_location").innerHTML = response.address;
            var start="", end="";
            for(var i=0; i<7; i++){
                start += '<div class="contact-form text-center col-12 col-lg-1" style="margin: auto; align-items: center;">';
                    start += '<span>';
                    start += response.time[week[i]].substr(0, 5);
                    start += '</span>';
                start += '</div>';
                
                end += '<div class="contact-form text-center col-12 col-lg-1" style="margin: auto; align-items: center;">';
                    end += '<span>';
                    end += response.time[week[i]].substr(6, 5);
                    end += '</span>';
                end += '</div>';
            }
            
            document.getElementById("library_time_start").innerHTML = start;
            document.getElementById("library_time_end").innerHTML = end;
        },
        error: function(){
            console.log("error");
        }
    });
    //顯示圖書館資訊 end
    
    //得知使用者身份 start
    var myURL = "http://localhost:5000/show_user_by_id?user_id="+localStorage.getItem("user_id");
    var menubar = "";
    $.ajax({
        url: myURL,
        type: "GET",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function(response){
            console.log("success");
            menubar += '<li class="nav-item active">';
                menubar += '<a class="nav-link" href="index.html">首頁</a>'
            menubar += '</li>';
            if(response.role == "admin"){//登入失敗
                localStorage.setItem("role", "admin");
                menubar += '<li class="nav-item">';
                    menubar += '<a class="nav-link" href="book.html">書籍管理</a>';
                menubar += '</li>';
                menubar += '<li class="nav-item">';
                    menubar += '<a class="nav-link" href="add_book.html">新增書籍</a>';
                menubar += '</li>';
            }
            else{//登入成功
                localStorage.setItem("role", "user");
                menubar += '<li class="nav-item">';
                    menubar += '<a class="nav-link" href="borrowed.html">已借出</a>';
                menubar += '</li>';
                menubar += '<li class="nav-item">';
                    menubar += '<a class="nav-link" href="borrowing.html">待歸還</a>';
                menubar += '</li>';
                menubar += '<li class="nav-item">';
                    menubar += '<a class="nav-link" href="favorite.html">我的最愛</a>';
                menubar += '</li>';
                menubar += '<li class="nav-item">';
                    menubar += '<a class="nav-link" href="lookup.html">查詢書籍</a>';
                menubar += '</li>';
            }
//            else{
//                menubar += '<li class="nav-item active">';
//                menubar += '<a class="nav-link" href="login.html">登入</a>'
//            menubar += '</li>';
//            }
            menubar += '<li class="nav-item">';
                    menubar += '<a class="nav-link" href="login.html">登出</a>';
                menubar += '</li>';
            document.getElementById("menubar").innerHTML = menubar;
        },
        error: function(){
            console.log("error");
        }
    });
    //得知使用者身份 end
}

window.addEventListener("load", start, false);