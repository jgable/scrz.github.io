$(function() {
    var doc = $(document);

    var added;
    doc.scroll(function(e){
        if (doc.scrollTop() > 5) {
            if (added) return;
            added = true;
            $('body').addClass('scroll');
        } else {
            $('body').removeClass('scroll');
            added = false;
        }
    })
});
