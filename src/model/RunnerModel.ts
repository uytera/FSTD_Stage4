import IRunnerModel from "./IRunnerModel";

export default class RunnerModel implements IRunnerModel{
    private minorBorderNumber: number;
    private majorBorderNumber: number;
    private runnerNumber: number;

    constructor(leftBorderNumber: number, rightBorderNumber: number, runnerNumber: number){
        this.minorBorderNumber = leftBorderNumber;
        this.majorBorderNumber = rightBorderNumber;
        this.runnerNumber = runnerNumber;
    }

    getMinorBorderNumber(){
        return this.minorBorderNumber;
    }
    getMajorBorderNumber(){
        return this.majorBorderNumber;
    }
    getRunnerNumber(){
        return this.runnerNumber;
    }

    setMinorBorderNumber(leftBorderNumber: number){
        this.minorBorderNumber = leftBorderNumber;
    }
    setMajorBorderNumber(rightBorderNumber: number){
        this.majorBorderNumber = rightBorderNumber;
    }
    setRunnerNumber(runnerNumber: number){
        this.runnerNumber = runnerNumber;
    }
}