import $ = require("jquery");
import RunnerBar from "./RunnerBar";

export default class Runner {
    outerRunnerBar: RunnerBar; 
    runnerElement: JQuery; 
    runnerRadius: number; 
    leftBorder!: number; //перенести в RunnerBar?
    rightBorder!: number; //перенести в RunnerBar?
    currentPositionIndex: number;
    step!: number;
    sensativity!: number;

    constructor(runnerBar: RunnerBar, runner: HTMLElement, startPosition: number){
        this.outerRunnerBar = runnerBar;
        this.runnerElement = $(runner);
        this.runnerRadius = this.runnerElement.outerWidth()!/2
        this.calculateBorders();
        this.sensativity = this.outerRunnerBar.steps[1]/2;


        if(this.outerRunnerBar.steps.indexOf(startPosition) != -1){
            this.currentPositionIndex = this.outerRunnerBar.steps.indexOf(startPosition);
        }
        else {
            this.currentPositionIndex = 0;
        }
    }


    calculateBorders(){
        this.leftBorder = this.outerRunnerBar.leftOffset + this.outerRunnerBar.steps[0] - this.runnerRadius;
        this.rightBorder = this.outerRunnerBar.leftOffset + this.outerRunnerBar.steps[this.outerRunnerBar.steps.length - 1] + this.runnerRadius;
    }
}