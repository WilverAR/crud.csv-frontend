import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import {BehaviorSubject, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService<T> {
  private dataSubject = new BehaviorSubject<T[]>([]);
  data$ = this.dataSubject.asObservable();

  basePath: string = environment.serverBasePath;
  resourceEndpoint: string = '/resources';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    }
    else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
  private resourcePath() {
    return this.basePath + this.resourceEndpoint;
  }

  getAll(): Observable<T[]> {
    console.log('Getting all resources from server.');
    return this.http.get<T[]>(this.resourcePath(), this.httpOptions).pipe(
      tap(data => this.dataSubject.next(data)),
      catchError(this.handleError)
    );
  }

  getOne(id: number): Observable<T> {
    return this.http.get<T>(this.resourcePath() + '/' + id, this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.resourcePath(), JSON.stringify(item), this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }

  update(id: number, item: T): Observable<T> {
    return this.http.put<T>(this.resourcePath() + '/' + id, JSON.stringify(item), this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }

  delete(id: number) {
    return this.http.delete<T>(this.resourcePath() + '/' + id, this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }
}
