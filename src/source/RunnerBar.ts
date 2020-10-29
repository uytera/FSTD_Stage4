import $ = require("jquery");

export default class RunnerBar {
    barElement: JQuery;
    width: number;
    leftOffset: number;
    step!: number;
    steps!: Array<number>;
    stepValue!: number;
    sensativity!: number;

    constructor(element: HTMLElement, leftRagneBorder: number, rightRagneBorder: number){
        this.barElement = $(element);
        this.width = this.barElement.outerWidth()!;
        this.leftOffset = this.barElement.offset()!.left;
        this.stepCalculateRange(leftRagneBorder, rightRagneBorder);
        this.sensativity = this.steps[1]/2;
    }

    private _stepCalculate(divisions: number){
        this.step = ~~(this.width / divisions);
        var indent = (this.width - divisions * this.step)/2;
        this.steps = [];
        this.steps.push(indent);

        while(this.steps[this.steps.length - 1] + this.step <= this.width){
                this.steps.push(this.steps[this.steps.length - 1] + this.step);
        };

        this.steps[this.steps.length - 1] = this.steps[this.steps.length - 1] - indent;
    }

    stepCalculateRange(leftRagneBorder: number, rightRagneBorder: number){
        var range = rightRagneBorder - leftRagneBorder;
        var divisions: number;
        

        if(range > this.width){
            divisions = this.width;
        }
        else{
            divisions = range;
        }
        
        this.stepValue = range / divisions;

        this._stepCalculate(divisions);
    }

    stepCalculateDivision(divisions: number){
        this._stepCalculate(divisions);
    }
}
