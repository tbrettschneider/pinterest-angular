import { Injectable } from '@angular/core';
import { Http, Headers, Request, Response, RequestOptions } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from "rxjs/Observable";
import { Pin } from './pin';

@Injectable()
export class PinterestService {

    private apiUrl = "http://localhost:8080/api";

    constructor(private http: Http) {
    }

    findAll(): Observable<Pin[]> {
        return this.http.get(this.apiUrl + "/pins")
        .map((res:Response) => res.json())
        .catch(this.errorHandler);
    }

    create(pin: Pin) {
        console.log(pin);
        var options = new RequestOptions({
            headers: new Headers({'Content-Type': 'application/json'})
        });
        var body = {url: pin.url, description: pin.description};
        
        this.http.post("http://localhost:8080/api/pins", body, options)
        .map((res:Response) => res.json())
        .subscribe(res => console.log(res));
    }

    private errorHandler(error: Error | any): Observable<any> {
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
