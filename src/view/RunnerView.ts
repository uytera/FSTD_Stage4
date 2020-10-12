import $ = require("jquery");
import IRunnerView from "./IRunnerView";
import IRunnerPresentor from "../presentor/IRunnerPresentor";
import Runner from "../source/Runner";
import RunnerBar from "../source/RunnerBar";

export default class RunnerView implements IRunnerView {
    runner!: Runner
    runnerBar!: RunnerBar
    presentor!: IRunnerPresentor
    
    constructor(runner: Runner, presentor: IRunnerPresentor){
        this.runner = runner;
        this.runnerBar = runner.outerRunnerBar;
        this.presentor = presentor;
    }

    positionCalculate(mousePosition: number, sensitivity: number){
        var value;
        var relativeMousePosition = mousePosition - this.runnerBar.leftOffset;
        function findIndex(element, index, array){
            return (relativeMousePosition >= element - sensitivity && relativeMousePosition <= element + sensitivity);
        }
        value = this.runnerBar.steps.find(findIndex);
        if(relativeMousePosition < this.runnerBar.steps[0]){
            value = this.runnerBar.steps[0]
        }
        if(relativeMousePosition > this.runnerBar.steps[this.runnerBar.steps.length - 1]){
            value = this.runnerBar.steps[this.runnerBar.steps.length - 1]
        }
        return value;
    }

    presentateValue(value: number){
        $('#slider #presentation1.changing').text(Math.ceil(this.presentor.getRunnerNumber() * this.runnerBar.stepValue));
    }

    
    mouseMove(e: MouseEvent){
        var value;
        value = this.positionCalculate(e.pageX, this.runner.sensativity);
        this.runner.currentPositionIndex = this.runnerBar.steps.indexOf(value);
        this.presentor.changeRunnerNumber(this.runner.currentPositionIndex);
        this.presentateValue(this.runnerBar.stepValue * this.runner.currentPositionIndex)
        return value + this.runnerBar.leftOffset - this.runner.runnerRadius;
    }

    buildMarks(){
        for (var index = 0; index < this.runnerBar.steps.length; ++index) {
            var mark = document.createElement('div');
            mark.classList.add("mark");
            $(mark).css('left', this.runnerBar.steps[index] + 'px');
            this.runnerBar.barElement.append(mark);
        }
    }
}