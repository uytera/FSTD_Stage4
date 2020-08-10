import $ = require("jquery");

$(document).ready(function () {
    var runnerWidth = $('#runner').outerWidth()/2;

    function RunnerMove(){
        $("#runner").addClass('dragged');
        
        $('#runner').parents().on('mousemove', function (e) {
            $('.dragged').offset({
                left: e.pageX - runnerWidth
            })
        });

        $('#runner').parents().on('mouseup', function (e) {
            $('#runner').removeClass('dragged');
        });
    }

    $('body').on('mousedown', "#slider", function (e) {
        RunnerMove();

        $("#runner").parents().on('mousedown', function(e){
            $('.dragged').offset({
                left: e.pageX - runnerWidth
            })
        })
    });

    $('body').on('mousedown', "#runner", function (e) {
        RunnerMove();
    });
});