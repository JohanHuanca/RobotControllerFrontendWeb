import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../../config/config';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RobotService {
  constructor(
    private httpClient: HttpClient
  ) {}

  getAllRobotByMy() {
    // let URL = URL_SERVICIOS + "/robot/all-by-my";
    let URL = `${URL_SERVICIOS}/robot/all-by-my`;
    let headers = new HttpHeaders({
      'Authorization':"Bearer " + localStorage.getItem("token")
    });
    return this.httpClient.get<any[]>(URL, { headers }).pipe(
      catchError(this.handleError)
    );
  }  

  getRobotByToken(robotToken: string) {
    // let URL = URL_SERVICIOS + "/robot/by-token/" + robotToken;
    let URL = `${URL_SERVICIOS}/robot/by-token/${robotToken}`;
    let headers = new HttpHeaders({
      'Authorization':"Bearer " + localStorage.getItem("token")
    });
    return this.httpClient.get<any>(URL, { headers }).pipe(
      catchError(this.handleError)
    );
  }  

  exacuteMovement(movementId: number, robotToken: string) {
    // let URL = URL_SERVICIOS + "/robot/execute-movement/" + movementId + "/" + robotToken;
    let URL = `${URL_SERVICIOS}/robot/execute-movement/${movementId}/${robotToken}`;
    let headers = new HttpHeaders({
      'Authorization':"Bearer " + localStorage.getItem("token")
    });
    return this.httpClient.post<any>(URL, {}, { headers }).pipe(
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
