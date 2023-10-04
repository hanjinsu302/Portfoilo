$(function () {
    $(".modalbtn").click(function () {
        $(".modal").fadeIn();
    });

    $(".modal_content").click(function (event) {
        event.stopPropagation();
    });
    

    $(".modal, .close_button").click(function () {
        $(".modal").fadeOut();
    });
});