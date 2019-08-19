import { Injectable } from '@angular/core';
import { ConfigService } from '../../../shared/config.service';
import { HttpClient } from '@angular/common/http';
import { SignUpStep2Request } from './models/sign-up-step2-request.model';

@Injectable()
export class SignUpStep2Service {
  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {}

  validateFiscalEntity(data: SignUpStep2Request) {
    return this.httpClient
      .post<any>(`${this.configService.getProperty('apiUrl')}/fiscal-entity/validate`, data);
  }
}
