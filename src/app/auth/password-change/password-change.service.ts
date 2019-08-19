import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/shared/config.service';
import { PasswordChangeRequest } from './models/password-change-request.model';

@Injectable()
export class PasswordChangeService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {}

  changePassword(data: PasswordChangeRequest) {
    return this.httpClient
        .post<any>(`${this.configService.getProperty('apiUrl')}/account/changePassword`, data);
  }
}
