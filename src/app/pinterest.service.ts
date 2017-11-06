import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import { Pin } from './pin';

@Injectable()
export class PinterestService {

    private apiUrl = "http://localhost:8080/api/pins";

    constructor(private http: Http) {
    }

    findAll(): Observable<Pin[]> {
        return this.http.get(this.apiUrl)
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}