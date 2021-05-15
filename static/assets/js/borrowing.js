function start(){
    localStorage.setItem("user_id", "U-00002");
    var user_id = localStorage.getItem("user_id");
    var myURL = "http://localhost:5000/show_user_by_id?user_id="+user_id;
    var content = "";
    
    $.ajax({
        url: myURL,
        type: "GET",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function(response){
            console.log("success get_borrowed");
            for(var i=0; i<response.borrowing.length; i++){
                if(i%4 == 0){
                    content += '<div class="row sonar-portfolio">';
                }
                
                content += '<div class="col-12 col-lg-3 single_gallery_item landscapes studio animated fadeInUpBig" style="animation-delay: ';
                content += (100+(i%4)*200);
                content += 'ms;">';
                    
                    
                    var tempURL = "http://localhost:5000/show_book_by_id?book_id="+response.borrowed[i];
                    console.log("書的ID: "+response.borrowed[i]);
                    $.ajax({
                        url: tempURL,
                        type: "GET",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        async: false,
                        success: function(data){
                            console.log("success get book_info");
                            console.log("img: "+data.book_info.img);
                            content += '<a class="gallery-img" href="#"><img src="';
                            content += data.book_info.img;
                            content += '" alt=""></a>';
                            
                            content += '<div class="gallery-content">';
                            content += '<h4 style="color: ghostwhite;">';
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
            document.getElementById("show_borrowed_book").innerHTML = content;
            console.log("結束～");
        },
        error: function(){
            console.log("error");
        }
    });
    
}

window.addEventListener("load", start, false);