var ngrok="http://30d2abdc6bba.ngrok.io";
var book_img = ["B-00000", "B-00001", "B-00002", "B-00003", "B-00004", "B-00005", "B-00006", "B-00007", "B-00008", "B-00009", "B-00010", "B-00011", "B-00012", "B-00013", "B-00014", "B-00015", "B-00016", "B-00017", "B-00018", "B-00019"];


function show_all_books(){
    console.log("start");
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

//?????????????????????
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
//    console.log("?????????ID");
//    var book_id = e.getAttribute("id");
//    console.log("?????????id: "+book_id);
//    localStorage.setItem('book_id', book_id);
//    window.location.href = 'book_detail_info.html';
//}

window.addEventListener("load", show_all_books, false);