import $ = require("jquery");
var jQuery = require("jquery/dist/jquery");

class Runner {
    outerRunnerBar: RunnerBar;
    runnerElement: JQuery;
    runnerRadius: number;
    leftBorder!: number;
    rightBorder!: number;
    currentPositionIndex: number;
    steps!: Array<number>;
    step!: number;
    stepValue!: number;
    sensativity!: number;

    constructor(runnerBar: RunnerBar, runner: HTMLElement, leftRagneBorder: number, rightRagneBorder: number, startPosition: number){
        this.outerRunnerBar = runnerBar;
        this.runnerElement = $(runner);
        this.runnerRadius = this.runnerElement.outerWidth()!/2
        this.stepCalculateRange(leftRagneBorder, rightRagneBorder);
        this.calculateBorders();

        if(this.steps.indexOf(startPosition) != -1){
            this.currentPositionIndex = this.steps.indexOf(startPosition);
        }
        else {
            this.currentPositionIndex = 0;
        }
    }

    private _stepCalculate(divisions: number){
        this.step = ~~(this.outerRunnerBar.width / divisions);
        var indent = (this.outerRunnerBar.width - divisions * this.step)/2;
        this.steps = [];
        this.steps.push(indent);

        while(this.steps[this.steps.length - 1] + this.step <= this.outerRunnerBar.width){
            this.steps.push(this.steps[this.steps.length - 1] + this.step);
        };

        this.steps[this.steps.length - 1] = this.steps[this.steps.length - 1] - indent;

        this.sensativity = this.steps[1]/2;
    }

    calculateBorders(){
        this.leftBorder = this.outerRunnerBar.leftOffset + this.steps[0] - this.runnerRadius;
        this.rightBorder = this.outerRunnerBar.leftOffset + this.steps[this.steps.length - 1] + this.runnerRadius;
    }

    stepCalculateDivision(divisions: number){
        this._stepCalculate(divisions);
    }

    stepCalculateRange(leftRagneBorder: number, rightRagneBorder: number){
        var range = rightRagneBorder - leftRagneBorder;
        var divisions: number;

        if(range > this.outerRunnerBar.width){
            divisions = this.outerRunnerBar.width;
        }
        else{
            divisions = range;
        }

        this.stepValue = range / divisions;

        this._stepCalculate(divisions);
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

class Representor {
    representorElement: JQuery;

    constructor(element: HTMLElement){
        this.representorElement = $(element);
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
        var divPresentation1 = document.createElement('div');

        sliderElement.id = "slider";
        divRunner.id = "runner";
        divPresentation1.id = "presentation1";
        sliderElement.appendChild(divRunner);
        sliderElement.appendChild(divPresentation1);

        var runnerBar = new RunnerBar(sliderElement);
        var runner = new Runner(runnerBar, divRunner, sliderOptions.leftNumber, sliderOptions.rightNumber, sliderOptions.startPosition);
        var representor = new Representor(divPresentation1);

        var divRunnerJ = runner.runnerElement;
        var representorElementJ = representor.representorElement;

        divRunnerJ.offset({
            left: runner.steps[runner.currentPositionIndex] + runner.outerRunnerBar.leftOffset - runner.runnerRadius
        })

        $(window).resize(function(){
            runner.calculateBorders();
        });

        function positionCalculate(mousePosition: number, sensitivity: number){
            var value;
            var relativeMousePosition = mousePosition - runner.outerRunnerBar.leftOffset;

            function findIndex(element, index, array){
                return (relativeMousePosition >= element - sensitivity && relativeMousePosition <= element + sensitivity);
            }

            value = runner.steps.find(findIndex);

            if(relativeMousePosition < runner.steps[0]){
                value = runner.steps[0]
            }
            if(relativeMousePosition > runner.steps[runner.steps.length - 1]){
                value = runner.steps[runner.steps.length - 1]
            }

            return value;
        }

        function presentateValue(value: number){
            $('#slider #presentation1.changing').text(Math.ceil(value));
        }

        function mouseMove(runner: Runner, e: MouseEvent){
            var value;
            value = positionCalculate(e.pageX, runner.sensativity);

            runner.currentPositionIndex = runner.steps.indexOf(value);
            presentateValue(runner.stepValue * runner.currentPositionIndex)

            return value + runner.outerRunnerBar.leftOffset - runner.runnerRadius;
        }

        function runnerMove(){
            divRunnerJ.addClass('dragged');
            representorElementJ.addClass('changing')
            
            divRunnerJ.parents().on('mousemove', function (e) {
                $('.dragged').offset({
                    left: mouseMove(runner, e)
                })
            });

            divRunnerJ.parents().on('mouseup', function (e) {
                divRunnerJ.removeClass('dragged');
                representorElementJ.removeClass('changing')
            });
        };

        $('body').on('mousedown', "#slider", function (e: MouseEvent) {
            runnerMove();

            divRunnerJ.parents().on('mousedown', function(e){
                $('.dragged').offset({
                    left: mouseMove(runner, e)
                })
            });
        });

        $('body').on('mousedown', "#runner", function (e: MouseEvent) {
            runnerMove();
        });

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
        leftNumber: 1000,
        rightNumber: 100379,
        //divisions: 200,
        startPosition: 0
    }); 
});