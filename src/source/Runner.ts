import $ = require("jquery");
import RunnerBar from "./RunnerBar";

export default class Runner {
    outerRunnerBar: RunnerBar; 
    runnerElement: JQuery; 
    runnerRadius: number; 
    leftBorder!: number; //перенести в RunnerBar?
    rightBorder!: number; //перенести в RunnerBar?
    currentPositionIndex: number;
    //steps!: Array<number>; //перенести в RunnerBar
    step!: number;
    sensativity!: number;

    constructor(runnerBar: RunnerBar, runner: HTMLElement, startPosition: number){
        this.outerRunnerBar = runnerBar;
        this.runnerElement = $(runner);
        this.runnerRadius = this.runnerElement.outerWidth()!/2
        //this.stepCalculateRange(leftRagneBorder, rightRagneBorder);
        this.calculateBorders();
        this.sensativity = this.outerRunnerBar.steps[1]/2;


        if(this.outerRunnerBar.steps.indexOf(startPosition) != -1){
            this.currentPositionIndex = this.outerRunnerBar.steps.indexOf(startPosition);
        }
        else {
            this.currentPositionIndex = 0;
        }
    }

    // private _stepCalculate(divisions: number){
    //     this.step = ~~(this.outerRunnerBar.width / divisions);
    //     var indent = (this.outerRunnerBar.width - divisions * this.step)/2;
    //     this.steps = [];
    //     this.steps.push(indent);

    //     while(this.steps[this.steps.length - 1] + this.step <= this.outerRunnerBar.width){
    //         this.steps.push(this.steps[this.steps.length - 1] + this.step);
    //     };

    //     this.steps[this.steps.length - 1] = this.steps[this.steps.length - 1] - indent;
    // }


    calculateBorders(){
        this.leftBorder = this.outerRunnerBar.leftOffset + this.outerRunnerBar.steps[0] - this.runnerRadius;
        this.rightBorder = this.outerRunnerBar.leftOffset + this.outerRunnerBar.steps[this.outerRunnerBar.steps.length - 1] + this.runnerRadius;
    }

    // stepCalculateDivision(divisions: number){
    //     this._stepCalculate(divisions);
    // }

    // stepCalculateRange(leftRagneBorder: number, rightRagneBorder: number){
    //     var range = rightRagneBorder - leftRagneBorder;
    //     var divisions: number;

    //     if(range > this.outerRunnerBar.width){
    //         divisions = this.outerRunnerBar.width;
    //     }
    //     else{
    //         divisions = range;
    //     }

    //     this.stepValue = range / divisions;

    //     this._stepCalculate(divisions);
    // }
}