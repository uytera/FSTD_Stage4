import $ = require("jquery");
var jQuery = require("jquery/dist/jquery");

class Runner {
    outerRunnerBar: RunnerBar;
    runnerElement: JQuery;
    runnerRadius: number;
    leftBorder!: number;
    rightBorder!: number;
    steps!: Array<number>;
    currentPositionIndex: number;
    step!: number;

    constructor(runnerBar: RunnerBar, runner: HTMLElement, divisions: number, startPosition: number){
        this.outerRunnerBar = runnerBar;
        this.runnerElement = $(runner);
        this.runnerRadius = this.runnerElement.outerWidth()!/2
        this.stepCalculate(divisions);
        this.calculateBorders();

        if(this.steps.indexOf(startPosition) != -1){
            this.currentPositionIndex = this.steps.indexOf(startPosition);
        }
        else {
            this.currentPositionIndex = 0;
        }
    }

    calculateBorders(){
        this.leftBorder = this.outerRunnerBar.leftOffset + this.steps[0] - this.runnerRadius;
        this.rightBorder = this.outerRunnerBar.leftOffset + this.steps[this.steps.length - 1] + this.runnerRadius;
    }

    stepCalculate(divisions: number){
        this.step = ~~(this.outerRunnerBar.width / divisions);
        var indent = (this.outerRunnerBar.width - divisions * this.step)/2;
        this.steps = [];
        this.steps.push(indent);

        while(this.steps[this.steps.length - 1] + this.step <= this.outerRunnerBar.width){
            this.steps.push(this.steps[this.steps.length - 1] + this.step);
        };

        this.steps[this.steps.length - 1] = this.steps[this.steps.length - 1] - indent * 2;
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
        var runner = new Runner(runnerBar, divRunner, sliderOptions.divisions, sliderOptions.startPosition)

        var divRunnerJ = runner.runnerElement;

        divRunnerJ.offset({
            left: runner.steps[runner.currentPositionIndex] + runner.outerRunnerBar.leftOffset - runner.runnerRadius
        })

        $(window).resize(function(){
            runner.calculateBorders();
        });

        
        function mouseMove(e: MouseEvent){
            var index = runner.currentPositionIndex;
            var relativeMousePosition = e.pageX - runner.outerRunnerBar.leftOffset;

            //if((relativeMousePosition >=  runner.steps[index + 1] - 10) && (relativeMousePosition <=  runner.steps[index + 1] + 10)){
            if(relativeMousePosition >=  runner.steps[index + 1] - 10) {
                index += 1;
            }
            //if((relativeMousePosition >=  runner.steps[index - 1] - 10) && (relativeMousePosition <=  runner.steps[index - 1] + 10)){
            if(relativeMousePosition <=  runner.steps[index - 1] + 10){
                index -= 1;
            }

            runner.currentPositionIndex = index;
            return runner.steps[index] + runner.outerRunnerBar.leftOffset - runner.runnerRadius;
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
                    left: clickCalculate(runner, e.pageX)
                })
            });
        });

        $('body').on('mousedown', "#runner", function (e: MouseEvent) {
            runnerMove();
        });

        function clickCalculate(runner: Runner, mousePosition: number){
            var leftOffset = runner.outerRunnerBar.leftOffset;
            var index!: number;
            var relativeMousePosition = mousePosition - leftOffset;

            for (index = 0; index < runner.steps.length; ++index) {
                if(runner.steps[index] > relativeMousePosition){
                    break;
                }
            }
            if(index > 0 && ((runner.steps[index] - relativeMousePosition) > (relativeMousePosition - runner.steps[index - 1]))){
                return runner.steps[index - 1] + leftOffset - runner.runnerRadius;
            }
            runner.currentPositionIndex = index;
            return runner.steps[index] + leftOffset - runner.runnerRadius;
        }

        function buildMarks(runner: Runner){
            for (var index = 0; index < runner.steps.length; ++index) {
                var mark = document.createElement('div');
                mark.classList.add("mark");
                $(mark).css('left', runner.steps[index] + 'px');
                runner.outerRunnerBar.barElement.append(mark);
            }
        }

        buildMarks(runner);
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
        divisions: 4,
        startPosition: 0
    }); 
});