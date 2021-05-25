var ngrok="http://30d2abdc6bba.ngrok.io";
var book_img = ["B-00000", "B-00001", "B-00002", "B-00003", "B-00004", "B-00005", "B-00006", "B-00007", "B-00008", "B-00009", "B-00010", "B-00011", "B-00012", "B-00013", "B-00014", "B-00015", "B-00016", "B-00017", "B-00018", "B-00019"];


function show_all_books(){
    console.log("start");
    var content = "";
//    var book_index=0;
//    for(book_index=0; book_index<20; book_index++){
//        var book_url = "http://localhost:5000/read_image?book_id="+book_img[book_index];
//        $.ajax({
//        url: book_url,
//        type: "GET",
//        dataType: "json",
//        contentType: 'application/json; charset=utf-8',
//        success: function(response){
//            
//        },
//        error: function(){
//            console.log("error");
//        }
//    });
//    }
    
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
                        
                        content += '<a href="#" class="post-thumbnail"><img src="';
                        content += response[i].book_info.img;
//                        content += book_img[i];
                        content += '" alt=""></a>';
                        
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

//依書名查詢書籍
function lookup_by_name(){  
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
                        
//                        content += '<button class="btn post-catagory" id="';
//                        content += response[i]._id;
//                        content += '" style="color: white" onclick="get_id(this)">管理</button>';
                        
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

function lookup_by_type(){
    var booktype = $("#booktype").val();
    console.log("type: "+booktype);
    var myURL = "http://localhost:5000/show_book_by_type?book_type="+booktype;
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

//function get_id(e){
//    console.log("開始拿ID");
//    var book_id = e.getAttribute("id");
//    console.log("拿到的id: "+book_id);
//    localStorage.setItem('book_id', book_id);
//    window.location.href = 'book_detail_info.html';
//}

window.addEventListener("load", show_all_books, false);