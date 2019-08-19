import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SignInService } from '../auth/sign-in/sign-in.service';

@Injectable()
export class AuthorizeGuard implements CanActivate {

    constructor(
      protected router: Router,
      protected auth: SignInService
      ) {}

     canActivate() {
        if (this.auth.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}
