export class Pin {

    id: number;
    url: string;
    description?: string;

    constructor(id, url, description?) {
        this.id = id;
        this.url = url;
        this.description = description;
    }
}