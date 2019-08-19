import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../shared/config.service';
import { SignUpPetitionersRequest } from './models/sign-up-petitioners-request.model';

@Injectable()
export class SignUpPetitionersService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {}

  createPetitionerAccount(data: SignUpPetitionersRequest) {
    return this.httpClient
      .post<any>(`${this.configService.getProperty('apiUrl')}/account/petitioner`, data);
  }

  getProvinces() {
    return this.httpClient
      .get<any>(`${this.configService.getProperty('apiUrl')}/province`);
  }

  getLocalities(provinceId: any) {
    return this.httpClient
      .get<any>(`${this.configService.getProperty('apiUrl')}/locality`, {
        params: {
          'id': provinceId
        }
      });
  }
}
