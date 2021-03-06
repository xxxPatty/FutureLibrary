function start(){
    var content = "";
    
    $.ajax({
        url: "http://localhost:5000/show_all_books",
        type: "GET",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function(response){
            console.log("success");
            
            for(var i=0; i<response.length; i++){
                console.log(i+": "+response[i].book_info.name);
                content += '<div class="col-12 col-sm-6 col-lg-4">';
                
                    content += '<div class="single-post-area animated fadeInUpBig" style="animation-delay: ';
                    content += (100+i*300);
                    content += 'ms;">';
                        
                        content += '<a href="#" class="post-thumbnail">';
                
                        var tempURL = "http://localhost:5000/read_image?book_id="+response[i]._id;
                
                        $.ajax({
                            url: tempURL,
                            type: "GET",
                            dataType: "json",
                            contentType: 'application/json; charset=utf-8',
                            async: false,
                            success: function(data){
                                console.log("success get book_info");
                                
                                content += data.img;

                            },
                            error: function(){
                                console.log("error");
                            }
                        });
                        
                        content += '</a>';
                        content += '<button class="btn post-catagory" id="';
                        content += response[i]._id;
                        content += '" style="color: white" onclick="get_id(this)">管理</button>';
                        
                        content += '<div class="post-content">';
                            content += '<div class="post-meta">';
                                content += '<span>';
                                content += response[i].book_info.author;
                                content += '| </span>';
                                content += '<span>';
                                content += response[i].book_info.type;
                                content += '</span>';
                            content += '</div>';
                            content += '<span class="post-title">';
                            content += response[i].book_info.name;
                            content += '</span>';
                        content += '</div>';
                    content += '</div>';
                content += '</div>';
            }
            document.getElementById("show_all_books").innerHTML = content;
        },
        error: function(){
            console.log("error");
        }
    });
    
    
}

//跳轉到「新增書籍」的頁面
function add_book(){
    window.location.href = 'add_book.html';
}

//依書名查詢書籍
function lookup_book(){  
    var bookname = $("#bookname").val();
    console.log("bookname: "+bookname);
    var myURL = "http://localhost:5000/show_book_by_name?book_name="+bookname;
    console.log("url: "+myURL);
    var content = "";
    
    $.ajax({
        url: myURL,
        type: "GET",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function(response){
            console.log("success");
            
            for(var i=0; i<response.length; i++){
                console.log(i+": "+response[i].book_info.name);
                content += '<div class="col-12 col-sm-6 col-lg-4">';
                    content += '<div class="single-post-area animated fadeInUpBig" style="animation-delay: ';
                    content += (100+i*300);
                    content += 'ms;">';
                        
                        
                        var tempURL = "http://localhost:5000/read_image?book_id="+response[i]._id;
                
                        $.ajax({
                            url: tempURL,
                            type: "GET",
                            dataType: "json",
                            contentType: 'application/json; charset=utf-8',
                            async: false,
                            success: function(data){
                                console.log("success get book_info");
                                content += '<a class="post-thumbnail" href="#">';
                                content += data.img;
                                content += '</a>';

                            },
                            error: function(){
                                console.log("error");
                            }
                        });
                        
                        content += '<button class="btn post-catagory" id="';
                        content += response[i]._id;
                        content += '" style="color: white" onclick="get_id(this)">管理</button>';
                        
                        content += '<div class="post-content">';
                            content += '<div class="post-meta">';
                                content += '<span>';
                                content += response[i].book_info.author;
                                content += '| </span>';
                                content += '<span>';
                                content += response[i].book_info.type;
                                content += '</span>';
                            content += '</div>';
                            content += '<span class="post-title">';
                            content += response[i].book_info.name;
                            content += '</span>';
                        content += '</div>';
                    content += '</div>';
                content += '</div>';
            }
            document.getElementById("show_all_books").innerHTML = content;
        },
        error: function(){
            console.log("error");
        }
    });
    
}


function get_id(e){
    console.log("開始拿ID");
    var book_id = e.getAttribute("id");
    console.log("拿到的id: "+book_id);
    localStorage.setItem('book_id', book_id);
    window.location.href = 'book_detail_info.html';
}

window.addEventListener("load", start, false);