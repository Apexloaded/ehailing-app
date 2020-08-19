import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map, retry, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {cleanObject} from '../helpers';


const API_STORAGE_KEY = 'specialkey';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = environment.api;

    constructor(
        private http: HttpClient,
    ) { }

    getApi(url: string): Observable<any> {
        const apiUrl = `${this.apiUrl}/${url}`;
        return this.http.get(apiUrl, httpOptions).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    postApi(url: string, data): Observable<any> {
        const apiUrl = `${this.apiUrl}/${url}`;
        const payload = cleanObject(data);
        return this.http.post(apiUrl, payload, httpOptions).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    updateApi(url: string, data): Observable<any> {
        const payload = cleanObject(data);
        const apiUrl = `${this.apiUrl}/${url}`;
        return this.http.put(apiUrl, payload, httpOptions).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    patchApi(url: string, data = {}): Observable<any> {
        const apiUrl = `${this.apiUrl}/${url}`;
        return this.http.patch(apiUrl, data, httpOptions).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    deleteApi(url: string): Observable<{}> {
        const apiUrl = `${this.apiUrl}/${url}`;
        return this.http.delete(apiUrl, httpOptions).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    getImageUrl(str: string) {
        return `${this.apiUrl}/assets/images/${str}`;
    }

    private handleError(error: HttpErrorResponse) {
        console.log(error);
        if (error.error instanceof ErrorEvent) {
            console.error(`\n\n::Frontend Error: ${error.status}\n\n`);
        } else {
            console.error(`\n\n::Backend Error:\n\n`);
        }
        return throwError(error);
    }

    private extractData(res: Response) {
        const body = res;
        return body || {};
    }

}
