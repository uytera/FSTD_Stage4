interface IRunnerPresentor{
    changeMinorBorder(minorBorderNumber: number): void;
    changeMajorBorder(majorBorderNumber: number): void;
    changeRunnerNumber(runnerNumber: number): void;

    getMinorBorderNumber(): number;
    getMajorBorderNumber():number;
    getRunnerNumber(): number;
}