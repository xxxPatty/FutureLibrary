function update(){
    var content = '<div data-wow-delay="300ms" class="col-12 col-sm-6 col-lg-3 single_gallery_item landscapes studio wow fadeInUpBig"><a class="gallery-img" href="img/portfolio-img/1.jpg"><img src="img/portfolio-img/1.jpg"></a><div class="gallery-content"><h4>Book-5</h4><p>Author-5</p><p>Type-5</p></div></div>';
    
    content += '<div data-wow-delay="500ms" class="col-12 col-sm-6 col-lg-3 single_gallery_item portraits fashion wow fadeInUpBig"><a class="gallery-img" href="img/portfolio-img/2.jpg"><img src="img/portfolio-img/2.jpg"></a><div class="gallery-content"><h4>Book-6</h4><p>Author-6</p><p>Type-6</p></div></div>';

    document.getElementById("test").innerHTML = content;
}

//window.addEventListener("load", start, false);