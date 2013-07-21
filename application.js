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

    $('.expandable').click(function() {
        $(this).css({ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 });
        $(this).addClass('expanded');
    });
});
