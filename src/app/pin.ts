export class Pin {

    constructor(id: Number, url: String, title?: String) {}

    public toString = () : string => {
        return JSON.stringify(this);
    }
}