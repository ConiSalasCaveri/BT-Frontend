import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/shared/config.service';
import { LoginRequest } from './models/login-request.model';
import { Observable, throwError } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { RefreshTokenNotFoundError } from 'src/app/shared/refresh-token-not-found-error';

@Injectable()
export class SignInService {
  public static readonly TOKEN = 'token';
  public static readonly REFRESHTOKEN = 'refreshToken';
  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {}

  login(data: LoginRequest) {
    return this.httpClient
      .post<any>(`${this.configService.getProperty('apiUrl')}/account/login`, data);
  }

  isLoggedIn() {
    return this.getToken() != null
      && this.getToken() !== undefined;
  }

  getToken() {
    return localStorage.getItem(SignInService.TOKEN);
  }

  getRefreshToken() {
    return localStorage.getItem(SignInService.REFRESHTOKEN);
  }

  getRefreshTokenAsObservable(): Observable<string> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return throwError('Invalid refresh token');
    } else {
      return this.httpClient
        .post<any>(`${this.configService.getProperty('apiUrl')}/account/refresh`, {
          refreshToken: refreshToken
        })
        .pipe(
          map(response => {
            const accessToken = response.data.accessToken;
            localStorage.setItem(SignInService.TOKEN, response.data.accessToken);
            localStorage.setItem(SignInService.REFRESHTOKEN, response.data.refreshToken);
            return accessToken;
          })
        );
    }
  }

  getTokenAsObservable(): Observable<string> {
    const accessToken = localStorage.getItem('token');
    return new Observable<string>(o => {
      o.next(accessToken);
    });
  }
}
