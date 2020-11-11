import $ = require("jquery");
import RunnerBar from "./source/RunnerBar";
import Runner from "./source/Runner";
import Representor from "./source/Representor";
import IRunnerModel from "./model/IRunnerModel";
import IRunnerView from "./view/IRunnerView";
import IRunnerPresentor from "./presentor/IRunnerPresentor";
import RunnerModel from "./model/RunnerModel";
import { RunnerPresentor } from "./presentor/RunnerPresentor";
import HorizontalRunnerView from "./view/HorizontalRunnerView";

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
        var sliderOptions = this.options
        
        var model :IRunnerModel;
        var model = new RunnerModel(sliderOptions.minBorder, sliderOptions.maxBorder, sliderOptions.startPosition);

        var presentor :IRunnerPresentor;
        var presentor = new RunnerPresentor(model);

        var view :IRunnerView;
        var view = new HorizontalRunnerView(presentor, this.element, sliderOptions);

        if(sliderOptions.startFunction != null){
            sliderOptions.startFunction()
        }
        if(sliderOptions.endFunction != null){
            view.setEndFunction(sliderOptions.endFunction)
        }

        if(sliderOptions.endMoveFunction != null){
            view.setEndMoveFunction(sliderOptions.endMoveFunction)
        }
        if(sliderOptions.startMoveFunction != null){
            view.setStartMoveFunction(sliderOptions.startMoveFunction)
        }      

        presentor.addView(view);

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
        startFunction: function(){ alert("start1") },
        endMoveFunction: function(){ alert("endMove1") },
        minBorder: 1000,
        maxBorder: 100000,
        startPosition: 20500
    });

    $('.middle2').runner({
        startFunction: function(){ alert("start2") },
        endMoveFunction: function(){ alert("endMove2") },
        minBorder: 1000,
        maxBorder: 100000,
        startPosition: 70890
    }); 
});