import $ = require("jquery");
import IRunnerView from "./IRunnerView";
import IRunnerPresentor from "../presentor/IRunnerPresentor";
import Runner from "../source/Runner";
import RunnerBar from "../source/RunnerBar";
import Representor from "../source/Representor"

export default class RunnerView implements IRunnerView {
    runner!: Runner
    runnerBar!: RunnerBar
    presentor!: IRunnerPresentor
    sliderElement!: HTMLElement
    sliderOptions!: Object
    divRunner!: HTMLElement
    divPresentation1!: HTMLElement
    divPresentation2!: HTMLElement
    divPresentation3!: HTMLElement
    representor1!: Representor
    representor2!: Representor
    representor3!: Representor


    constructor(presentor: IRunnerPresentor, element: HTMLElement, sliderOptions: Object){
        this.sliderElement = element;
        this.divRunner = document.createElement('div');
        this.divPresentation1 = document.createElement('div');
        this.divPresentation2 = document.createElement('div');
        this.divPresentation3 = document.createElement('div');

        this.sliderElement.id = "slider";
        this.divRunner.id = "runner";
        
        this.divPresentation1.id = "presentation1";
        this.divPresentation1.classList.add("presentor")
        this.divPresentation2.id = "presentation2";
        this.divPresentation2.classList.add("presentor")
        this.divPresentation3.id = "presentation3";
        this.divPresentation3.classList.add("presentor")

        this.sliderElement.appendChild(this.divRunner);
        this.sliderElement.appendChild(this.divPresentation1);
        this.sliderElement.appendChild(this.divPresentation2);
        this.sliderElement.appendChild(this.divPresentation3);
        
        this.presentor = presentor
        this.runnerBar = new RunnerBar(this.sliderElement, sliderOptions.leftNumber, sliderOptions.rightNumber)
        this.runner = new Runner(this.runnerBar, this.divRunner, sliderOptions.startPosition);
        this.representor1 = new Representor(this.divPresentation1);
        this.representor2 = new Representor(this.divPresentation2);
        this.representor3 = new Representor(this.divPresentation3);
        
        this.executeInitialPreparations();
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

    executeInitialPreparations(){
        var viewThis = this;
        var divRunnerJ = viewThis.runner.runnerElement;
        var representorElementJ = viewThis.representor1.representorElement;
        $('#slider #presentation1').text(Math.ceil(this.presentor.getRunnerNumber() * this.runnerBar.stepValue));
        $('#slider #presentation2').text(viewThis.presentor.getMinorBorderNumber());
        $('#slider #presentation3').text(viewThis.presentor.getMajorBorderNumber());

        divRunnerJ.offset({
            left: viewThis.runner.outerRunnerBar.steps[viewThis.runner.currentPositionIndex] + viewThis.runner.outerRunnerBar.leftOffset - viewThis.runner.runnerRadius
        })

        $(window).resize(function(){
            viewThis.runner.calculateBorders();
        });

        function runnerMove(){
            divRunnerJ.addClass('dragged');
            representorElementJ.addClass('changing')
            
            divRunnerJ.parents().on('mousemove', function (e) {
                $('.dragged').offset({
                    left: viewThis.mouseMove(e)
                })
            });

            divRunnerJ.parents().on('mouseup', function (e) {
                divRunnerJ.removeClass('dragged');
                representorElementJ.removeClass('changing')
            });
        };

        $('body').on('mousedown', "#slider", function (e: MouseEvent) {
            runnerMove();

            divRunnerJ.parents().on('mousedown', function(e){
                $('.dragged').offset({
                    left: viewThis.mouseMove(e)
                })
            });
        });

        $('body').on('mousedown', "#runner", function (e: MouseEvent) {
            runnerMove();
        });
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