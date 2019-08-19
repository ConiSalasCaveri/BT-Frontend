import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/shared/config.service';
import { PasswordRecoverRequest } from './models/password-recover-request.model';

@Injectable()
export class PasswordRecoverService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) { }

  recoverPassword(data: PasswordRecoverRequest) {
    return this.httpClient
      .post<any>(`${this.configService.getProperty('apiUrl')}/account/reset`, data);
  }
}
