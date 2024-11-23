import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { URL_SERVICIOS } from '../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class MovementService {
  constructor(
    private httpClient: HttpClient
  ) {}

  getAllByRobotId(robotId: number) {
    //let URL = URL_SERVICIOS + "/movement/all-by-robot/" + robotId.toString();
    let URL = `${URL_SERVICIOS}/movement/all-by-robot/${robotId}`;
    let headers = new HttpHeaders({
      'Authorization':"Bearer " + localStorage.getItem("token")
    });
    return this.httpClient.get<any[]>(URL, { headers }).pipe(
      catchError(this.handleError)
    );
  }  

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unexpected error during authentication';
    if (error.error && error.error.detail) {
      errorMessage = error.error.detail;
    }
    return throwError(() => new Error(errorMessage));
  }
}