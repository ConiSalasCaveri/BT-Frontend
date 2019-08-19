import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/shared/config.service';
import { HttpClient } from '@angular/common/http';
import { AccountValidationRequest } from './models/account-validation-request.model';

@Injectable()
export class AccountValidationService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {}

  confirm(data: AccountValidationRequest) {
    return this.httpClient
      .post<any>(`${this.configService.getProperty('apiUrl')}/account/confirm`, data);
  }
}
