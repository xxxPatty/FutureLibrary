var ngrok="http://30d2abdc6bba.ngrok.io";

function add_book(){
    window.location.href = 'add_book.html';
}

//依書名查詢書籍
function lookup_book(){
    
    var bookname = $("#bookname").val();
    var myURL = "http://localhost:5000/show_book_by_name_one_page?book_name="+bookname+"&page=0";
    
    console.log("myURL: "+myURL);
    
//    $.ajax({
//        url: "",
//        type: "GET",
//        dataType: "json",
//        contentType: 'application/json; charset=utf-8',
//        success: function(response){
//            console.log("success");
//            
//        },
//        error: function(){
//            console.log("error");
//        }
//    });
    
}

function get_id(e){
    var id = e.getAttribute("id");
    console.log("拿到的id: "+id);
    localStorage.setItem("id", id);
    window.location.href = 'book_detail_info.html';
}