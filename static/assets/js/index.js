window.addEventListener("load", start, false);

function start(){
    var user_id = localStorage.getItem("user_id");
    console.log("user_id: "+user_id);
}