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
        var model = new RunnerModel(sliderOptions.leftNumber, sliderOptions.rightNumber, sliderOptions.startPosition);

        var presentor :IRunnerPresentor;
        var presentor = new RunnerPresentor(model);

        var view :IRunnerView;
        var view = new HorizontalRunnerView(presentor, this.element, sliderOptions);

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
        leftNumber: 1000,
        rightNumber: 100000,
        startPosition: 20500
    });

    $('.middle2').runner({
        leftNumber: 1000,
        rightNumber: 100000,
        startPosition: 70890
    }); 
});