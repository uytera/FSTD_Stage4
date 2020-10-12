import $ = require("jquery");
import RunnerBar from "./source/RunnerBar";
import Runner from "./source/Runner";
import Representor from "./source/Representor";
import IRunnerModel from "./model/IRunnerModel";
import IRunnerView from "./view/IRunnerView";
import IRunnerPresentor from "./presentor/IRunnerPresentor";
import RunnerModel from "./model/RunnerModel";
import { RunnerPresentor } from "./presentor/RunnerPresentor";
import RunnerView from "./view/RunnerView";

var jQuery = require("jquery/dist/jquery");

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

        var runnerBar = new RunnerBar(sliderElement, sliderOptions.leftNumber, sliderOptions.rightNumber)
        var runner = new Runner(runnerBar, divRunner, sliderOptions.startPosition);
        var representor = new Representor(divPresentation1);

        var divRunnerJ = runner.runnerElement;
        var representorElementJ = representor.representorElement;
        
        var model :IRunnerModel;
        var model = new RunnerModel(sliderOptions.leftNumber, sliderOptions.rightNumber, sliderOptions.startPosition);

        var presentor :IRunnerPresentor;
        var presentor = new RunnerPresentor(model);

        var view :IRunnerView;
        var view = new RunnerView(runner, presentor);

        presentor.addView(view);

        divRunnerJ.offset({
            left: runner.outerRunnerBar.steps[runner.currentPositionIndex] + runner.outerRunnerBar.leftOffset - runner.runnerRadius
        })

        $(window).resize(function(){
            runner.calculateBorders();
        });

        function runnerMove(){
            divRunnerJ.addClass('dragged');
            representorElementJ.addClass('changing')
            
            divRunnerJ.parents().on('mousemove', function (e) {
                $('.dragged').offset({
                    left: view.mouseMove(e)
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
                    left: view.mouseMove(runner, e)
                })
            });
        });

        $('body').on('mousedown', "#runner", function (e: MouseEvent) {
            runnerMove();
        });

        view.buildMarks(runner);
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
        startPosition: 0
    }); 
});