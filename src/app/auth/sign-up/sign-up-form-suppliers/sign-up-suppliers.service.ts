import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/shared/config.service';
import { HttpClient } from '@angular/common/http';
import { SignUpSuppliersRequest } from './models/sign-up-suppliers-request.model';

@Injectable()
export class SignUpSuppliersService {

  constructor(
  private httpClient: HttpClient,
  private configService: ConfigService
  ) {}

  createSupplierAccount(data: SignUpSuppliersRequest) {
    return this.httpClient
      .post<any>(`${this.configService.getProperty('apiUrl')}/account/supplier`, data);
  }

  getProvinces() {
    return this.httpClient
      .get<any>(`${this.configService.getProperty('apiUrl')}/province`);
  }

  getLocalities(provinceId: any) {
    console.log('pid: ', provinceId);
    return this.httpClient
      .get<any>(`${this.configService.getProperty('apiUrl')}/locality`, {
        params: {
          'id': provinceId
        }
      });
  }

  getBorderingProvinces(provinceId: any) {
    return this.httpClient
      .get<any>(`${this.configService.getProperty('apiUrl')}/province/bordering`, {
        params: {
          'id': provinceId
        }
      });
  }

  getCategories() {
    return this.httpClient
      .get<any>(`${this.configService.getProperty('apiUrl')}/category`);
  }
}
