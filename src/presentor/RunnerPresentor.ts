import $ = require("jquery");
import IRunnerView from "../view/IRunnerView";
import IRunnerModel from "../model/IRunnerModel";
import IRunnerPresentor from "./IRunnerPresentor";


export class RunnerPresentor implements IRunnerPresentor{
    
    model: IRunnerModel;
    views: Array<IRunnerView>;

    constructor(model: IRunnerModel){
        this.model = model;
        this.views = [];
    }

    addView(view: IRunnerView){
        this.views.push(view);
    }

    changeMinorBorder(leftBorderNumber: number){
        this.model.setMinorBorderNumber(leftBorderNumber);
    }
    changeMajorBorder(rightBorderNumber: number){
        this.model.setMajorBorderNumber(rightBorderNumber);
    }
    changeRunnerNumber(runnerNumber: number){
        this.model.setRunnerNumber(runnerNumber);
    }

    getMinorBorderNumber(){
        return this.model.getMinorBorderNumber();
    }
    getMajorBorderNumber(){
        return this.model.getMajorBorderNumber();
    }
    getRunnerNumber(){
        return this.model.getRunnerNumber();
    }
}
