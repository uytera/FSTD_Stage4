class RunnerPresentor implements IRunnerPresentor{
    
    model: RunnerModel;
    view: RunnerView;

    constructor(model: RunnerModel, view: RunnerView){
        this.model = model;
        this.view = view;
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
