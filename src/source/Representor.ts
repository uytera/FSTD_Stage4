import $ = require("jquery");

export default class Representor {
    representorElement: JQuery;

    constructor(element: HTMLElement){
        this.representorElement = $(element);
    }
}