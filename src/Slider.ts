import $ = require("jquery");

$(document).ready(function () {
    var runnerWidth = $('#runner').outerWidth()/2;
    var leftBorder = $("#slider").offset().left;
    var rightBorder = leftBorder + $("#slider").outerWidth();

    //alert(leftBorder + " " + rightBorder);

    function runnerMove(){
        $("#runner").addClass('dragged');
        
        $('#runner').parents().on('mousemove', function (e) {
            $('.dragged').offset({
                left: mouseMove(e)
            })
        });

        $('#runner').parents().on('mouseup', function (e) {
            $('#runner').removeClass('dragged');
        });
    };

    function mouseMove(e){
        if(e.pageX - runnerWidth <= leftBorder){
            return leftBorder;
        }
        if(e.pageX + runnerWidth >= rightBorder){
            return rightBorder - runnerWidth*2;
        }
        return e.pageX - runnerWidth;
    }

    $('body').on('mousedown', "#slider", function (e) {
        runnerMove();

        $("#runner").parents().on('mousedown', function(e){
            $('.dragged').offset({
                left: e.pageX - runnerWidth
            })
        });
    });

    $('body').on('mousedown', "#runner", function (e) {
        runnerMove();
    });
});