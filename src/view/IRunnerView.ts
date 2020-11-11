import Runner from "../source/Runner";

export default interface IRunnerView{
    //Moving logic
    positionCalculate(mousePosition: number, sensitivity: number): number;

    //Presentation logic
    presentateValue(value: number): void;

    //Event logic when moving the mouse
    mouseMove(e: MouseEvent): number;

    // setStartFunction(startFunction: Function): void;

    setEndFunction(startFunction: Function): void;

    setStartMoveFunction(startFunction: Function): void;

    setEndMoveFunction(endFunction: Function): void;
}