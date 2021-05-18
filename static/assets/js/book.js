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
//                if(i%3==0){
//                    content += '<div class="row">';
//                }
                content += '<div class="col-12 col-sm-6 col-lg-4">';
//                    content += '<div class="single-post-area wow fadeInUpBig" data-wow-delay="';
//                    content += '100';
//                    content += 'ms" style="width: 300px;">';
                
                    content += '<div class="single-post-area animated fadeInUpBig" style="animation-delay: ';
                    content += (100+i*300);
                    content += 'ms;">';
                        
                        content += '<a href="#" class="post-thumbnail"><img src="';
                        content += response[i].book_info.img;
                        content += '" alt=""></a>';
                        
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
//                if(i%3==2){
//                   content += '</div>'; 
//                }
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
    var myURL = "http://localhost:5000/show_book_by_name?book_name="+bookname;
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
                        
                        content += '<a href="#" class="post-thumbnail"><img src="';
                        content += response[i].book_info.img;
                        content += '" alt=""></a>';
                        
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