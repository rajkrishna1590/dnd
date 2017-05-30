import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { Scehma } from '../_models/index';

@Injectable()
export class SchemaService {
    constructor(private http: Http, private config: AppConfig) { }

     

    createScehma(schema: Scehma) {
        return this.http.post(this.config.apiUrl + '/schemas/schema', schema, this.jwt());
    }
 
 

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}