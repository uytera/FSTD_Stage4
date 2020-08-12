import $ = require("jquery");

$(document).ready(function () {
    var runnerWidth = $('#runner').outerWidth()/2;
    var leftBorder = $("#slider").offset().left - runnerWidth;
    var rightBorder = leftBorder + $("#slider").outerWidth() + runnerWidth * 2;
    var currentPosition = leftBorder;
    var step = stepCalculate(10);

    $(window).resize(function(){
        leftBorder = $("#slider").offset().left  - runnerWidth;
        rightBorder = leftBorder + $("#slider").outerWidth() + runnerWidth * 2;
    });

    function stepCalculate(divisions){
        return $("#slider").outerWidth() / divisions;
    }
    
    function mouseMove(e){
        if(e.pageX - runnerWidth <= leftBorder){
            return leftBorder;
        }
        if(e.pageX + runnerWidth >= rightBorder){
            return rightBorder - runnerWidth*2;
        }
        if(e.pageX <= currentPosition - step){
            currentPosition -= step;
        }
        if(e.pageX >= currentPosition  + step){
            currentPosition += step;
        }
        return currentPosition - runnerWidth;
    }

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

    $('body').on('mousedown', "#slider", function (e) {
        runnerMove();

        $("#runner").parents().on('mousedown', function(e){
            $('.dragged').offset({
                left: ((e.pageX - runnerWidth) / 12) * 12
            })
        });
    });

    $('body').on('mousedown', "#runner", function (e) {
        runnerMove();
    });
});