//$(document).on('ready', function() {
//    $(".variable").slick({
//        dots: true,
//        infinite: true,
//        variableWidth: true
//    });
//});

$(window).load(function() {
    start();
    if(start()){
        console.log("開始設定");
        $(".variable").slick({
            dots: true,
            infinite: true,
            variableWidth: true
        });
    }
    
});

function start(){
    console.log("start");
    //show_new_books
    var content = "";
    $.ajax({
        url: "http://localhost:5000/show_new_book",
        type: "GET",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function(response){
            console.log("success");
            for(var i=0; i<response.length; i++){
                console.log("進來迴圈了！");
                
//                content += '<div><img src="../static/img/blog-img/lp2.png" style="height: 300px; width: auto;"><div class="hero-slides-content"><div class="line"></div><h2 style="color: ghostwhite">書名</h2><p style="color: ghostwhite">作者 | 種類</p></div></div>';
                
                content += '<div>';
                    content += '<img src="';
                    content += response[i].book_info.img;
//                    content += '../static/img/blog-img/lp2.png';
                    content += '" style="height: 300px; width: auto;">';
                    content += '<div class="hero-slides-content">';
                        content += '<div class="line"></div>';
                        content += '<h2 style="color: ghostwhite">';
                        content += response[i].book_info.name;
                        content += '</h2>';
                        content += '<p style="color: ghostwhite">';
                        content += response[i].book_info.author;
                        content += ' | ';
                        content += response[i].book_info.type;
                        content += '</p>';
                    content += '</div>';
                content += '</div>';
            }
            document.getElementById("show_new_book").innerHTML = content;
//            $(".variable")[0].slick.refresh();
            return true;
        },
        error: function(){
            console.log("error");
        }
    });
}

//document.addEventListener("load", start, false);