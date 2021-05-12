var ngrok="http://30d2abdc6bba.ngrok.io";

function add_book(){
    console.log("add_book");
}

function lookup_book(){
    console.log("lookup_book");
    var myURL= ngrok;
    
    var bookname = $("#bookname").val();
    console.log("bookname: "+bookname);
    
    myURL += "book_name="+bookname;
    console.log("myURL: "+myURL);
    
    $.ajax({
        url: myURL,
        type: "GET",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function(response){
            console.log("success");
            
        },
        error: function(){
            console.log("error");
        }
    });
    
}

function get_id(e){
    var id = e.getAttribute("id");
    console.log("拿到的id: "+id);
    localStorage.setItem("id", id);
    window.location.href = 'book_detail_info.html';
}