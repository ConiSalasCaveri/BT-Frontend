import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, OperatorFunction, ObservableInput } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { SignInService } from '../auth/sign-in/sign-in.service';
import { Router } from '@angular/router';
import { ConfigService } from './config.service';
import { RefreshTokenNotFoundError } from './refresh-token-not-found-error';

@Injectable()

export class InterceptorService implements HttpInterceptor {

  constructor(
    private auth: SignInService,
    private router: Router,
    public configService: ConfigService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
      return this.auth.getTokenAsObservable().pipe(
        mergeMap(token =>
          next.handle(this.cloneRequest(request, token)).pipe(
            catchError((firstRequestError: HttpErrorResponse) => {
              this.checkServerError(firstRequestError);

              if (firstRequestError.status === 401) {
                return this.auth.getRefreshTokenAsObservable().pipe(
                  mergeMap(newToken =>
                    next
                      .handle(this.cloneRequest(request, newToken))
                      .pipe(
                        catchError(error => this.onSeccondRequestError(error))
                      )
                  ),
                 catchError(error => this.onRefreshTokenError(error))
                );
              }

              throw firstRequestError;
            })
          )
        ),
       catchError(error => this.onRefreshTokenError(error))
      );
    }

    private cloneRequest(
      request: HttpRequest<any>,
      token: string
    ): HttpRequest<any> {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

  private checkServerError(
    error: HttpErrorResponse
  ): OperatorFunction<HttpEvent<any>, HttpEvent<any>> {
    if (error.status === 500) {
      // this.router.navigate(['error-500']);
    }
    return null;
  }

  private onSeccondRequestError(
    error: HttpErrorResponse
  ): ObservableInput<never> {
    this.checkServerError(error);
    if (error.status === 403) {
      // Occurs when not having access to a specific action
      // redirect to Error page
    }
    throw error;
  }

  private onRefreshTokenError(
    error: Error
  ): Observable<HttpEvent<any>> {
    if (
      error instanceof RefreshTokenNotFoundError ||
      (error instanceof HttpErrorResponse && error.status === 401) // Occurs when refreshToken expires
    ) {
      this.redirectToLogin();
    }
    throw error;
  }

  private redirectToLogin() {
   this.router.navigate(['signin']);
  }

}
