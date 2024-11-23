import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../../config/config';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(request: any) {
    const URL = `${URL_SERVICIOS}/auth/login`;
    return this.httpClient.post<any>(URL, request).pipe(
      map((response: any) => {
        localStorage.setItem('token', response.access_token); // Guardar el token directamente
        return response;
      }),
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