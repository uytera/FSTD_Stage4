import $ = require("jquery");
import RunnerBar from "./RunnerBar";

export default class Runner {
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