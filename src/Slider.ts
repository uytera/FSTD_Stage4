import $ = require("jquery");
var jQuery = require("jquery/dist/jquery");

class Runner {
    outerRunnerBar: RunnerBar;
    runnerElement: JQuery;
    runnerRadius: number;
    leftBorder!: number;
    rightBorder!: number;
    currentPosition: number;
    step: number;

    constructor(runnerBar: RunnerBar, runner: HTMLElement, divisions: number){
        this.outerRunnerBar = runnerBar;
        this.runnerElement = $(runner);
        this.runnerRadius = this.runnerElement.outerWidth()!/2;
        this.calculateBorders();
        this.currentPosition = this.leftBorder;
        this.step = this.stepCalculate(divisions);
    }

    calculateBorders(){
        this.leftBorder = this.outerRunnerBar.leftOffset  - this.runnerRadius;
        this.rightBorder = this.leftBorder + this.outerRunnerBar.width + this.runnerRadius * 2;
    }

    stepCalculate(divisions: number){
        return this.outerRunnerBar.width / divisions;
    }
}

class RunnerBar {
    barElement: JQuery;
    width: number;
    leftOffset: number;

    constructor(element: HTMLElement){
        this.barElement = $(element);
        this.width = this.barElement.outerWidth()!;
        this.leftOffset = this.barElement.offset()!.left;
    }
}

;(function ($, window, document, undefined) {
    var pluginName = 'runner',
        defaults = {
            propertyName: "value"
        };

    function Plugin(element: HTMLElement, options: Object) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype.init = function () {
        var sliderElement = this.element
        var sliderOptions = this.options
        var divRunner = document.createElement('div');

        sliderElement.id = "slider";
        divRunner.id = "runner";
        sliderElement.appendChild(divRunner);

        var runnerBar = new RunnerBar(sliderElement);
        var runner = new Runner(runnerBar, divRunner, 10)

        var divRunnerJ = runner.runnerElement;

        divRunnerJ.offset({
            left: runner.leftBorder
        })

        $(window).resize(function(){
            runner.calculateBorders();
        });

        
        function mouseMove(e: MouseEvent){
            if(e.pageX - runner.runnerRadius <= runner.leftBorder){
                return runner.leftBorder;
            }
            if(e.pageX + runner.runnerRadius >= runner.rightBorder){
                return runner.rightBorder - runner.runnerRadius*2;
            }
            if(e.pageX <= runner.currentPosition - runner.step){
                runner.currentPosition -= runner.step;
            }
            if(e.pageX >= runner.currentPosition  + runner.step){
                runner.currentPosition += runner.step;
            }
            return runner.currentPosition - runner.runnerRadius;
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

        $('body').on('mousedown', "#slider", function (e: MouseEvent) {
            runnerMove();

            divRunnerJ.parents().on('mousedown', function(e){
                $('.dragged').offset({
                    left: ((e.pageX - runner.runnerRadius) / 12) * 12
                })
            });
        });

        $('body').on('mousedown', "#runner", function (e: MouseEvent) {
            runnerMove();
        });
    };

    $.fn[pluginName] = function (options: Object) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    }
})(jQuery, window, document);

$(document).ready(function () {

    $('.middle').runner({
        animate: "slow",
        range: "min",    
        value: 50
    });
    
});