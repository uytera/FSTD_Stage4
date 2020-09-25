import $ = require("jquery");
import IRunnerView from "./IRunnerView";
import Runner from "../source/Runner";

export default class RunnerView implements IRunnerView {
    runner!: Runner
    
    constructor(runner: Runner){
        this.runner = runner;
    }

    positionCalculate(mousePosition: number, sensitivity: number){
        var value;
        var relativeMousePosition = mousePosition - this.runner.outerRunnerBar.leftOffset;
        function findIndex(element, index, array){
            return (relativeMousePosition >= element - sensitivity && relativeMousePosition <= element + sensitivity);
        }
        value = this.runner.steps.find(findIndex);
        if(relativeMousePosition < this.runner.steps[0]){
            value = this.runner.steps[0]
        }
        if(relativeMousePosition > this.runner.steps[this.runner.steps.length - 1]){
            value = this.runner.steps[this.runner.steps.length - 1]
        }
        return value;
    }

    presentateValue(value: number){
        $('#slider #presentation1.changing').text(Math.ceil(value));
    }

    
    mouseMove(runner: Runner, e: MouseEvent){
        var value;
        value = this.positionCalculate(e.pageX, runner.sensativity);
        runner.currentPositionIndex = runner.steps.indexOf(value);
        this.presentateValue(runner.stepValue * runner.currentPositionIndex)
        return value + runner.outerRunnerBar.leftOffset - runner.runnerRadius;
    }

    buildMarks(runner: Runner){
        for (var index = 0; index < runner.steps.length; ++index) {
            var mark = document.createElement('div');
            mark.classList.add("mark");
            $(mark).css('left', runner.steps[index] + 'px');
            runner.outerRunnerBar.barElement.append(mark);
        }
    }
}