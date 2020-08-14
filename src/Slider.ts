import $ = require("jquery");
var jQuery = require("jquery/dist/jquery");

;(function ($, window, document, undefined) {
    var pluginName = 'runner',
        defaults = {
            propertyName: "value"
        };

    // конструктор плагина
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        //alert(element.id);
        this.init();
    }
    // Тут пишем код самого плагина
    // Здесь у нас уже есть доступ к DOM, и входным параметрам
    // через объект, типа this.element и this.options
    Plugin.prototype.init = function () {
        var sliderElement = this.element
        var divRunner = document.createElement('div');
        sliderElement.id = "slider";
        divRunner.id = "runner";
        sliderElement.appendChild(divRunner);
        
        var sliderElementJ = $(sliderElement);
        var divRunnerJ = $(divRunner);

        var runnerWidth = divRunnerJ.outerWidth()/2;
        var leftBorder = sliderElementJ.offset().left - runnerWidth;
        var rightBorder = leftBorder + sliderElementJ.outerWidth() + runnerWidth * 2;
        var currentPosition = leftBorder;
        var step = stepCalculate(10);

        divRunnerJ.offset({
            left: leftBorder
        })

        $(window).resize(function(){
            leftBorder = sliderElementJ.offset().left  - runnerWidth;
            rightBorder = leftBorder + sliderElementJ.outerWidth() + runnerWidth * 2;
        });

        function stepCalculate(divisions){
            return sliderElementJ.outerWidth() / divisions;
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
            divRunnerJ.addClass('dragged');
            
            divRunnerJ.parents().on('mousemove', function (e) {
                $('.dragged').offset({
                    left: mouseMove(e)
                })
            });

            divRunnerJ.parents().on('mouseup', function (e) {
                divRunnerJ.removeClass('dragged');
            });
        };

        $('body').on('mousedown', "#slider", function (e) {
            runnerMove();

            divRunnerJ.parents().on('mousedown', function(e){
                $('.dragged').offset({
                    left: ((e.pageX - runnerWidth) / 12) * 12
                })
            });
        });

        $('body').on('mousedown', "#runner", function (e) {
            runnerMove();
        });
    };

    // Простой декоратор конструктора,
    // предотвращающий дублирование плагинов
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    }
})(jQuery, window, document);

$(document).ready(function () {
    // var runnerWidth = $('#runner').outerWidth()/2;
    // var leftBorder = $("#slider").offset().left - runnerWidth;
    // var rightBorder = leftBorder + $("#slider").outerWidth() + runnerWidth * 2;
    // var currentPosition = leftBorder;
    // var step = stepCalculate(10);

    $('.middle').runner();

    // $('#runner').offset({
    //     left: leftBorder
    // })

    // $(window).resize(function(){
    //     leftBorder = $("#slider").offset().left  - runnerWidth;
    //     rightBorder = leftBorder + $("#slider").outerWidth() + runnerWidth * 2;
    // });

    // function stepCalculate(divisions){
    //     return $("#slider").outerWidth() / divisions;
    // }
    
    // function mouseMove(e){
    //     if(e.pageX - runnerWidth <= leftBorder){
    //         return leftBorder;
    //     }
    //     if(e.pageX + runnerWidth >= rightBorder){
    //         return rightBorder - runnerWidth*2;
    //     }
    //     if(e.pageX <= currentPosition - step){
    //         currentPosition -= step;
    //     }
    //     if(e.pageX >= currentPosition  + step){
    //         currentPosition += step;
    //     }
    //     return currentPosition - runnerWidth;
    // }

    // function runnerMove(){
    //     $("#runner").addClass('dragged');
        
    //     $('#runner').parents().on('mousemove', function (e) {
    //         $('.dragged').offset({
    //             left: mouseMove(e)
    //         })
    //     });

    //     $('#runner').parents().on('mouseup', function (e) {
    //         $('#runner').removeClass('dragged');
    //     });
    // };

    // $('body').on('mousedown', "#slider", function (e) {
    //     runnerMove();

    //     $("#runner").parents().on('mousedown', function(e){
    //         $('.dragged').offset({
    //             left: ((e.pageX - runnerWidth) / 12) * 12
    //         })
    //     });
    // });

    // $('body').on('mousedown', "#runner", function (e) {
    //     runnerMove();
    // });
});