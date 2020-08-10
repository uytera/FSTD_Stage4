import $ = require("jquery");

$(document).ready(function () {
    var runnerWidth = $('#runner').outerWidth()/2;

    $('body').on('mousedown', "#runner", function (e) {
        $(this).addClass('dragged');
        
        $('.dragged').offset({
            left: e.pageX - runnerWidth
        })
        //alert($(this).attr('class'));
        $(this).parents().on('mousemove', function (e) {
            $('.dragged').offset({
                left: e.pageX - runnerWidth
            })
        });
        
        $(this).parents().on('mouseup', function (e) {
            $('#runner').removeClass('dragged');
        });

        //$('.dragged')
        //e.preventDefault();
    });

    // $('#slider').on('mouseout', function (e) { 
    //     $("#runner").removeClass('dragged');
    // });
    // $('#runner').on('mousemove', function(e){
    //     var offset = $('#runner').offset();
    //     alert(e.pageX);
    //     var grabX = e.pageX - offset.left;
    //     $('#runner').offset({
    //         left: e.pageX - grabX
    //     })
    //     //alert(e.pageX + " " + e.pageY);
    // });
});