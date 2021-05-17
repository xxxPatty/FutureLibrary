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
    var content = "";
    $.ajax({
        url: "http://localhost:5000/show_new_book",
        type: "GET",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function(response){
            console.log("success");
            for(var i=0; i<response.length; i++){
                
                content += '<div>';
                    content += '<img src="';
                    content += response[i].book_info.img;
                    content += '" style="height: auto; width: 300px; margin:auto;">';
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
}

window.addEventListener("load", start, false);